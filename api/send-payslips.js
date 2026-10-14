function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function storageObjectUrl(baseUrl, bucket, path) {
  const encodedPath = String(path || "").split("/").map(encodeURIComponent).join("/");
  return `${String(baseUrl || "").replace(/\/$/, "")}/storage/v1/object/authenticated/${encodeURIComponent(bucket)}/${encodedPath}`;
}

async function selectRows(baseUrl, serviceRoleKey, table, query) {
  const response = await fetch(`${String(baseUrl || "").replace(/\/$/, "")}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    }
  });
  if (!response.ok) throw new Error(`Could not read ${table}`);
  return response.json();
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const fallbackFrom = process.env.EMAIL_FROM || "DUOMOLD <onboarding@resend.dev>";
  if (!resendApiKey || !supabaseUrl || !serviceRoleKey) {
    res.status(500).json({ error: "Missing email or Supabase server secrets" });
    return;
  }

  const payload = req.body || {};
  const userId = String(payload.userId || "").trim();
  const testRecipient = String(process.env.EMAIL_TEST_TO || "").trim();
  const requestedAttachments = Array.isArray(payload.attachments) ? payload.attachments.slice(0, 10) : [];
  if (!userId || !requestedAttachments.length) {
    res.status(400).json({ error: "Missing user or attachments" });
    return;
  }

  const users = await selectRows(supabaseUrl, serviceRoleKey, "users", `select=id,name,email&id=eq.${encodeURIComponent(userId)}&limit=1`);
  const user = users[0];
  const recipient = testRecipient || String(user?.email || "").trim();
  const employeeName = String(user?.name || "Colaborador").trim();
  if (!user || !recipient) {
    res.status(404).json({ error: "Employee or employee email not found" });
    return;
  }

  let totalBytes = 0;
  const attachments = [];
  for (const item of requestedAttachments) {
    const path = String(item?.path || "").trim();
    if (!path) {
      res.status(400).json({ error: "Invalid attachment" });
      return;
    }
    const records = await selectRows(
      supabaseUrl,
      serviceRoleKey,
      "payslips",
      `select=file_name,storage_path&user_id=eq.${encodeURIComponent(userId)}&storage_path=eq.${encodeURIComponent(path)}&limit=1`
    );
    const payslip = records[0];
    const filename = String(payslip?.file_name || "").trim();
    if (!payslip || !filename.toLowerCase().endsWith(".pdf")) {
      res.status(403).json({ error: "Payslip does not belong to employee" });
      return;
    }
    const fileResponse = await fetch(storageObjectUrl(supabaseUrl, "payslips", path), {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`
      }
    });
    if (!fileResponse.ok) {
      res.status(502).json({ error: `Could not load ${filename}` });
      return;
    }
    const bytes = Buffer.from(await fileResponse.arrayBuffer());
    totalBytes += bytes.length;
    if (totalBytes > 15 * 1024 * 1024) {
      res.status(413).json({ error: "Attachments exceed 15 MB" });
      return;
    }
    attachments.push({ filename, content: bytes.toString("base64") });
  }

  const subject = "Recibos de vencimento - DUOMOLD";
  const text = `Olá ${employeeName},\n\nSeguem em anexo os recibos de vencimento selecionados.\n\nCumprimentos,\nDUOMOLD`;
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#111"><h2>${escapeHtml(subject)}</h2><p>Olá ${escapeHtml(employeeName)},</p><p>Seguem em anexo os recibos de vencimento selecionados.</p><p>Cumprimentos,<br>DUOMOLD</p></div>`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: String(process.env.EMAIL_FROM || fallbackFrom).trim(),
      to: [recipient],
      subject,
      text,
      html,
      attachments
    })
  });

  const responseText = await response.text();
  res.status(response.status).setHeader("Content-Type", "application/json");
  res.send(responseText || JSON.stringify({ ok: true }));
};
