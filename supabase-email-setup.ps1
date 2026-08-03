# DUOMOLD Supabase email setup
# Run this in PowerShell from the project root after installing the Supabase CLI.

$ProjectRef = "wdgoqfixddwrgycplexi"

Write-Host "1. Login to Supabase"
Write-Host "   supabase login"

Write-Host ""
Write-Host "2. Link this folder to the Supabase project"
Write-Host "   supabase link --project-ref $ProjectRef"

Write-Host ""
Write-Host "3. Set the email secrets"
Write-Host "   supabase secrets set RESEND_API_KEY=YOUR_RESEND_API_KEY EMAIL_FROM='DUOMOLD <noreply@your-domain.pt>' --project-ref $ProjectRef"

Write-Host ""
Write-Host "4. Deploy the Edge Function"
Write-Host "   supabase functions deploy send-notification-email --project-ref $ProjectRef --use-api"

Write-Host ""
Write-Host "5. Optional local test"
Write-Host "   supabase functions serve send-notification-email --env-file supabase/functions/.env"

Write-Host ""
Write-Host "Notes:"
Write-Host "- Replace YOUR_RESEND_API_KEY with the real key from Resend."
Write-Host "- Use a verified sender domain and SPF/DKIM to reduce spam filtering."
Write-Host "- The app falls back to mailto if the function is unavailable."
