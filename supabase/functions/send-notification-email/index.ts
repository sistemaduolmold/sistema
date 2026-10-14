const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

type EmailRequest = {
  to?: string[];
  subject?: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildHtml(subject: string, text: string) {
  const safeSubject = escapeHtml(subject || "");
  const safeText = escapeHtml(text || "").replaceAll("\n", "<br>");
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">${safeSubject}</h2>
      <div>${safeText}</div>
    </div>
  `.trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const fallbackFrom = Deno.env.get("EMAIL_FROM") || "DUOMOLD <onboarding@resend.dev>";
  if (!apiKey) return jsonResponse({ error: "Missing RESEND_API_KEY secret" }, 500);

  let payload: EmailRequest;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON payload" }, 400);
  }

  const to = [...new Set((payload.to || []).map((item) => String(item || "").trim()).filter(Boolean))];
  const subject = String(payload.subject || "").trim();
  const text = String(payload.text || "").trim();
  const html = String(payload.html || "").trim();
  const from = String(payload.from || fallbackFrom).trim();
  const replyTo = String(payload.replyTo || "").trim();

  if (!to.length) return jsonResponse({ error: "Missing recipients" }, 400);
  if (!subject) return jsonResponse({ error: "Missing subject" }, 400);
  if (!text) return jsonResponse({ error: "Missing body text" }, 400);

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
  if (!response.ok) {
    return new Response(responseText || JSON.stringify({ error: "Resend request failed" }), {
      status: response.status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }

  return new Response(responseText || JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
});
