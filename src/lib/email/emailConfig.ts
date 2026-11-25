import nodemailer from 'nodemailer'
import { ContactFormData } from '@/types/contact'

const RESEND_API_URL = 'https://api.resend.com/emails'
const DEFAULT_FROM_EMAIL = 'Artag <info@artagdev.com.co>'
const DEFAULT_TO_EMAIL = 'scristxyz@gmail.com'
const REPLY_TO_CORPORATE = 'info@artagdev.com.co'

const PROJECT_TYPE_LABELS: Record<string, string> = {
  collaboration: 'Colaboración',
  question: 'Pregunta o Idea',
  feedback: 'Retroalimentación',
  'just-saying-hi': 'Saludo',
  other: 'Otro',
}

export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getResendApiKey(): string {
  return (process.env.RESEND_API_KEY || '').trim()
}

function hasSmtpFallback(): boolean {
  return Boolean(
    (process.env.GMAIL_USER || '').trim() &&
      (process.env.GMAIL_PASSWORD || '').trim()
  )
}

export function isEmailServiceConfigured(): boolean {
  return Boolean(getResendApiKey() || hasSmtpFallback())
}

export async function sendResendEmail(
  apiKey: string,
  payload: Record<string, unknown>
): Promise<void> {
  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12_000),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Resend HTTP ${res.status}: ${errText.slice(0, 300)}`)
  }
}

/**
 * Send primary contact notification via Resend (when RESEND_API_KEY is configured)
 * or fallback to Gmail SMTP (GMAIL_USER + GMAIL_PASSWORD) when RESEND_API_KEY is empty,
 * plus optional non-blocking n8n webhook notification.
 */
export async function sendContactEmail(
  data: ContactFormData,
  clientIp?: string
): Promise<void> {
  const resendKey = getResendApiKey()
  const from = (process.env.CONTACT_FROM_EMAIL || '').trim() || DEFAULT_FROM_EMAIL
  const toOwner =
    (process.env.CONTACT_TO_EMAIL || '').trim() ||
    (process.env.CONTACT_ADMIN_EMAIL || '').trim() ||
    DEFAULT_TO_EMAIL
  const topicLabel = PROJECT_TYPE_LABELS[data.projectType] || data.projectType
  const formattedDate = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
  })

  const subject = `[Artag Web · ${data.projectType}] Nuevo mensaje de ${data.name}`

  const ownerText = [
    'Nuevo mensaje desde artagdev.com.co',
    '',
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Motivo: ${topicLabel} (${data.projectType})`,
    `Fecha: ${formattedDate}`,
    ...(clientIp ? [`IP: ${clientIp}`] : []),
    '',
    'Mensaje:',
    data.message,
  ].join('\n')

  const ownerHtml = `
    <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#18181b;max-width:600px;">
      <h2 style="margin:0 0 12px 0;">Nuevo contacto en artagdev.com.co</h2>
      <p style="margin:0 0 12px 0;">
        <strong>Nombre:</strong> ${escapeHtml(data.name)}<br/>
        <strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a><br/>
        <strong>Motivo:</strong> ${escapeHtml(topicLabel)} (${escapeHtml(data.projectType)})
      </p>
      <hr style="border:none;border-top:1px solid #e4e4e7;margin:16px 0;" />
      <p style="white-space:pre-wrap;margin:0 0 16px 0;">${escapeHtml(data.message)}</p>
      <hr style="border:none;border-top:1px solid #e4e4e7;margin:16px 0;" />
      <p style="font-size:12px;color:#71717a;margin:0;">
        Fecha (Bogotá): ${escapeHtml(formattedDate)}${clientIp ? ` · IP: ${escapeHtml(clientIp)}` : ''}
      </p>
    </div>
  `

  const secondaryTasks: Promise<unknown>[] = []

  if (resendKey) {
    // 1A. Primary notification via Resend
    await sendResendEmail(resendKey, {
      from,
      to: [toOwner],
      reply_to: data.email,
      subject,
      text: ownerText,
      html: ownerHtml,
    })

    // 2A. Auto-reply to visitor from corporate info@artagdev.com.co (only via Resend so @gmail.com is never exposed)
    const sendAutoReply = (process.env.CONTACT_SEND_AUTOREPLY ?? 'true') !== 'false'
    if (sendAutoReply) {
      const replyText = [
        `Hola ${data.name},`,
        '',
        'Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos pronto desde info@artagdev.com.co.',
        '',
        'Saludos,',
        'Christian Henao — Artag',
        'https://www.artagdev.com.co · info@artagdev.com.co',
      ].join('\n')

      const replyHtml = `
        <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#18181b;max-width:600px;">
          <p>Hola ${escapeHtml(data.name)},</p>
          <p>Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos pronto.</p>
          <p style="margin-top:20px;">
            Saludos,<br/>
            <strong>Christian Henao — Artag</strong><br/>
            <a href="https://www.artagdev.com.co" style="color:#0284c7;text-decoration:none;">artagdev.com.co</a> · ${REPLY_TO_CORPORATE}
          </p>
        </div>
      `

      secondaryTasks.push(
        sendResendEmail(resendKey, {
          from,
          to: [data.email],
          reply_to: REPLY_TO_CORPORATE,
          subject: 'Recibimos tu mensaje — Artag',
          text: replyText,
          html: replyHtml,
        })
      )
    }
  } else if (hasSmtpFallback()) {
    // 1B. Fallback to configured SMTP when RESEND_API_KEY is intentionally empty
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: from || process.env.GMAIL_FROM || process.env.GMAIL_USER,
      to: toOwner,
      replyTo: data.email,
      subject,
      text: ownerText,
      html: ownerHtml,
    })
  } else {
    throw new Error('No email transport configured (missing RESEND_API_KEY and SMTP fallback)')
  }

  const webhookUrl = (process.env.N8N_CONTACT_WEBHOOK_URL || '').trim()
  if (webhookUrl) {
    secondaryTasks.push(
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          message: data.message,
          source: 'artagdev.com.co',
        }),
        signal: AbortSignal.timeout(3_000),
      })
    )
  }

  if (secondaryTasks.length > 0) {
    const results = await Promise.allSettled(secondaryTasks)
    results.forEach((res, idx) => {
      if (res.status === 'rejected') {
        console.warn(`[contact] Secondary task #${idx + 1} failed (non-blocking):`, res.reason)
      }
    })
  }
}
