import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contactSchema'
import { isEmailServiceConfigured, sendContactEmail } from '@/lib/email/emailConfig'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { isSpam } from '@/lib/anti-spam'

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_DOMAIN,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  'https://www.artagdev.com.co',
  'https://artagdev.com.co',
  ...(process.env.NODE_ENV !== 'production'
    ? ['http://localhost:3000', 'http://127.0.0.1:3000']
    : []),
].filter(Boolean) as string[]

const MAX_BODY_SIZE = 15_000 // 15KB
const MIN_SUBMIT_TIME_MS = 1_500 // 1.5s — bots submit faster

/**
 * POST /api/contact
 * Handle contact form submissions via Resend with silent bot protection
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Origin / Referer validation (CSRF protection)
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const hasInvalidOrigin =
      Boolean(origin) &&
      !ALLOWED_ORIGINS.some(
        (allowed) => origin === allowed || origin!.startsWith(allowed + '/')
      )
    const hasInvalidReferer =
      !origin &&
      Boolean(referer) &&
      !ALLOWED_ORIGINS.some((allowed) => referer!.startsWith(allowed))

    if (hasInvalidOrigin || hasInvalidReferer) {
      return NextResponse.json(
        { success: false, error: 'Origen no permitido.' },
        { status: 403 }
      )
    }

    // 2. Body size check
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Solicitud demasiado grande.' },
        { status: 413 }
      )
    }

    // 3. Parse and validate body contract
    const body = await request.json()
    const parsed = contactFormSchema.safeParse(body)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues?.[0]
      return NextResponse.json(
        {
          success: false,
          error: firstIssue?.message || 'Por favor verifica los campos del formulario.',
        },
        { status: 400 }
      )
    }

    const { name, email, projectType, message, website, timestamp } = parsed.data
    const clientIp = getClientIp(request)

    // 4. Silent honeypot & minimum submission time check (bots)
    if (website.trim().length > 0) {
      console.warn(`[contact] Honeypot triggered from IP: ${clientIp}`)
      return NextResponse.json({ success: true })
    }

    const submittedAt = Number(timestamp)
    if (
      Number.isFinite(submittedAt) &&
      submittedAt > 0 &&
      Date.now() - submittedAt < MIN_SUBMIT_TIME_MS
    ) {
      console.warn(
        `[contact] Fast submission detected from IP: ${clientIp} (${Date.now() - submittedAt}ms)`
      )
      return NextResponse.json({ success: true })
    }

    if (isSpam(message, website)) {
      console.warn(`[contact] Spam content detected from IP: ${clientIp}`)
      return NextResponse.json({ success: true })
    }

    // 5. Rate limit check
    const rateLimit = checkRateLimit(clientIp)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Demasiadas solicitudes. Por favor intenta de nuevo en unos minutos.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }

    // 6. Ensure Resend API key is configured
    if (!isEmailServiceConfigured()) {
      console.error('[contact] Missing RESEND_API_KEY')
      return NextResponse.json(
        {
          success: false,
          error: 'El servicio de correo no está disponible temporalmente.',
        },
        { status: 503 }
      )
    }

    // 7. Send owner email + non-blocking visitor auto-reply & optional n8n webhook
    await sendContactEmail({ name, email, projectType, message }, clientIp)

    return NextResponse.json({
      success: true,
      message: 'Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.',
    })
  } catch (error) {
    console.error('[contact] Failed to send contact email:', error)
    return NextResponse.json(
      {
        success: false,
        error:
          'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a info@artagdev.com.co.',
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/contact
 * Handle CORS preflight — only allow known origins
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigin = ALLOWED_ORIGINS.find(
    (allowed) => origin === allowed || origin.startsWith(allowed + '/')
  )

  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin || 'https://www.artagdev.com.co',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
