import nodemailer from 'nodemailer';

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 10;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIp(req: any): string {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.trim()) {
    return fwd.split(',')[0].trim();
  }
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = buckets.get(ip);
  if (!entry || entry.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Método no permitido.' });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Demasiados envíos recientes. Por favor intente nuevamente en unos minutos.',
    });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const email = String(body.email || '').trim();
  const company = String(body.company || '').trim();
  const subject = String(body.subject || '').trim();
  const description = String(body.description || '').trim();

  if (!name || !email || !subject || !description) {
    return res.status(400).json({
      success: false,
      error: 'Por favor complete todos los campos obligatorios marcados con *.',
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Por favor ingrese un correo electrónico válido.',
    });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'ventas@sidemaca.com';

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('[Sidema Contact] Missing SMTP configuration in environment variables.');
    return res.status(500).json({
      success: false,
      error: 'El servicio de correo no está configurado en el servidor.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; color: #212529; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #003485; border-bottom: 2px solid #003485; padding-bottom: 8px;">
          Nuevo contacto desde sidemaca.com
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Nombre:</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Correo:</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Teléfono:</td><td>${escapeHtml(phone || 'No indicado')}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Empresa:</td><td>${escapeHtml(company || 'No indicada')}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Asunto:</td><td>${escapeHtml(subject)}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-left: 4px solid #003485;">
          <strong>Mensaje / Pregunta:</strong>
          <p style="white-space: pre-wrap; margin-top: 8px;">${escapeHtml(description)}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portal Sidema C.A." <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Contacto Web] ${subject}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('[Sidema Contact] Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: 'No se pudo enviar el mensaje en este momento. Intente nuevamente más tarde.',
    });
  }
}

