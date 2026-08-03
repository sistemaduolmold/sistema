function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildHtml(subject, text) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>
      <div>${escapeHtml(text).replaceAll("\n", "<br>")}</div>
    </div>
  `.trim();
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fallbackFrom = process.env.EMAIL_FROM || "DUOMOLD <onboarding@resend.dev>";
  if (!apiKey) {
    res.status(500).json({ error: "Missing RESEND_API_KEY secret" });
    return;
  }

  const payload = req.body || {};
  const testRecipient = String(process.env.EMAIL_TEST_TO || "").trim();
  const to = testRecipient
    ? [testRecipient]
    : [...new Set((Array.isArray(payload.to) ? payload.to : []).map((item) => String(item || "").trim()).filter(Boolean))];
  const subject = String(payload.subject || "").trim();
  const text = String(payload.text || "").trim();
  const html = String(payload.html || "").trim();
  const from = String(payload.from || fallbackFrom).trim();
  const replyTo = String(payload.replyTo || "").trim();

  if (!to.length) {
    res.status(400).json({ error: "Missing recipients" });
    return;
  }
  if (!subject) {
    res.status(400).json({ error: "Missing subject" });
    return;
  }
  if (!text) {
    res.status(400).json({ error: "Missing body text" });
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html: html || buildHtml(subject, text),
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  });

  const responseText = await response.text();
  res.status(response.status).setHeader("Content-Type", "application/json");
  res.send(responseText || JSON.stringify({ ok: true }));
};
