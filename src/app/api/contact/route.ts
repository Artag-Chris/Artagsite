import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contactSchema'
import { sendContactEmail } from '@/lib/email/emailConfig'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { isSpam } from '@/lib/anti-spam'
import { z } from 'zod'

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_DOMAIN,
  'https://www.artagdev.com.co',
  'https://artagdev.com.co',
].filter(Boolean) as string[]

const MAX_BODY_SIZE = 15_000 // 15KB
const MIN_SUBMIT_TIME_MS = 3_000 // 3 seconds — bots submit faster

/**
 * POST /api/contact
 * Handle contact form submissions with bot protection
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Origin validation (CSRF protection)
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const isValidOrigin =
      !origin || // allow if no origin (direct curl, same-origin)
      ALLOWED_ORIGINS.some(
        (allowed) => origin === allowed || origin?.startsWith(allowed + '/')
      )
    const isValidReferer =
      !referer ||
      ALLOWED_ORIGINS.some(
        (allowed) => referer?.startsWith(allowed)
      )

    if (!isValidOrigin && !isValidReferer) {
      return NextResponse.json(
        { success: false, error: 'Origen no permitido.' },
        { status: 403 }
      )
    }

    // 2. Body size check
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Solicitud demasiado grande.' },
        { status: 413 }
      )
    }

    // 3. Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // 4. Check rate limit
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
            'X-RateLimit-Limit': '1',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }

    // 5. Parse and validate
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // 6. Timing check: reject if submitted too fast (bot)
    if (validatedData.timestamp) {
      const submitTime = parseInt(validatedData.timestamp)
      const elapsed = Date.now() - submitTime
      if (!isNaN(submitTime) && elapsed < MIN_SUBMIT_TIME_MS) {
        console.warn(`Fast submission detected from IP: ${clientIp} (${elapsed}ms)`)
        return NextResponse.json(
          { success: true, message: 'Tu mensaje ha sido recibido. Te contactaremos pronto.' }
        )
      }
    }

    // 7. Spam check
    if (isSpam(validatedData.message, validatedData.website)) {
      console.warn(`Spam detected from IP: ${clientIp}`)
      return NextResponse.json({
        success: true,
        message: 'Tu mensaje ha sido recibido. Te contactaremos pronto.',
      })
    }

    // 8. Send email
    await sendContactEmail(
      {
        name: validatedData.name,
        email: validatedData.email,
        projectType: validatedData.projectType,
        message: validatedData.message,
      },
      clientIp
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues && error.issues.length > 0 ? error.issues[0] : null
      const errorMessage = firstError ? firstError.message : 'Validación fallida'

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar tu solicitud. Por favor intenta de nuevo.' },
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
