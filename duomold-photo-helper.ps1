param(
  [int]$Port = 17777
)

$ErrorActionPreference = "Stop"

function Sanitize-Name {
  param(
    [string]$Value,
    [string]$Fallback = "item"
  )

  $text = ($Value | ForEach-Object { "$_" }).Trim()
  if (-not $text) { return $Fallback }

  $invalid = [IO.Path]::GetInvalidFileNameChars()
  foreach ($char in $invalid) {
    $text = $text.Replace($char, "-")
  }

  $text = ($text -replace "\s+", " ").Trim()
  $text = ($text -replace "[^\w\-\.\(\) ]", "-")
  $text = ($text -replace "-{2,}", "-").Trim("-")
  if (-not $text) { return $Fallback }
  return $text
}

function Get-SafeFileName {
  param(
    [string]$Value,
    [string]$Url = "",
    [string]$Fallback = "file"
  )

  $text = ($Value | ForEach-Object { "$_" }).Trim()
  $extension = ""

  if ($text -match '\.([A-Za-z0-9]+)$') {
    $extension = "." + $Matches[1].ToLower()
    $text = $text -replace '\.[^.]+$', ''
  }

  if (-not $extension -and $Url) {
    try {
      $uri = [Uri]$Url
      $path = $uri.AbsolutePath
      if ($path -match '\.([A-Za-z0-9]+)$') {
        $extension = "." + $Matches[1].ToLower()
      }
    } catch {}
  }

  $baseName = Sanitize-Name -Value $text -Fallback $Fallback
  if (-not $extension) { return $baseName }
  return "$baseName$extension"
}

function Remove-WebMark {
  param([string]$Path)
  if (Get-Command Unblock-File -ErrorAction SilentlyContinue) {
    try { Unblock-File -Path $Path } catch {}
  }
}

function Write-Response {
  param(
    $Context,
    [int]$StatusCode,
    [string]$Body,
    [string]$ContentType = "application/json; charset=utf-8"
  )

  $bytes = [Text.Encoding]::UTF8.GetBytes($Body)
  $Context.Response.StatusCode = $StatusCode
  $Context.Response.ContentType = $ContentType
  $Context.Response.Headers.Add("Access-Control-Allow-Origin", "*")
  $Context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  $Context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
  $Context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $Context.Response.OutputStream.Close()
}

function Get-DownloadsRoot {
  $userProfile = [Environment]::GetFolderPath("UserProfile")
  $candidate = Join-Path $userProfile "Downloads"
  if (Test-Path $candidate) { return $candidate }
  return $userProfile
}

$listener = [System.Net.HttpListener]::new()
$prefix = "http://127.0.0.1:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Duomold photo helper listening on $prefix"

$client = [System.Net.Http.HttpClient]::new()
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = $context.Request.Url.AbsolutePath.TrimEnd("/")
    if ($context.Request.HttpMethod -eq "OPTIONS") {
      Write-Response -Context $context -StatusCode 204 -Body ""
      continue
    }

    if ($requestPath -eq "/ping") {
      Write-Response -Context $context -StatusCode 200 -Body '{"ok":true}'
      continue
    }

    if ($requestPath -ne "/download" -or $context.Request.HttpMethod -ne "POST") {
      Write-Response -Context $context -StatusCode 404 -Body '{"ok":false,"error":"not_found"}'
      continue
    }

    $reader = [System.IO.StreamReader]::new($context.Request.InputStream, $context.Request.ContentEncoding)
    $body = $reader.ReadToEnd()
    $reader.Close()
    $payload = $body | ConvertFrom-Json

    if (-not $payload.rootName -or -not $payload.entries) {
      Write-Response -Context $context -StatusCode 400 -Body '{"ok":false,"error":"invalid_payload"}'
      continue
    }

    $rootName = Sanitize-Name -Value $payload.rootName -Fallback "moldo"
    $rootPath = Join-Path (Get-DownloadsRoot) $rootName
    New-Item -ItemType Directory -Force -Path $rootPath | Out-Null

    foreach ($entry in $payload.entries) {
      $folderName = Sanitize-Name -Value $entry.folder -Fallback "imagens"
      $targetDir = Join-Path $rootPath $folderName
      New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

      $fileName = Get-SafeFileName -Value $entry.name -Url $entry.url -Fallback "file"
      $targetPath = Join-Path $targetDir $fileName
      $bytes = $client.GetByteArrayAsync([string]$entry.url).GetAwaiter().GetResult()
      [System.IO.File]::WriteAllBytes($targetPath, $bytes)
      Remove-WebMark -Path $targetPath
    }

    Write-Response -Context $context -StatusCode 200 -Body (@{ ok = $true; path = $rootPath } | ConvertTo-Json -Compress)
  }
} finally {
  $client.Dispose()
  $listener.Stop()
  $listener.Close()
}
