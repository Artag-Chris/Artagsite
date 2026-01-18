import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contactSchema'
import { sendContactEmail } from '@/lib/email/emailConfig'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { isSpam } from '@/lib/anti-spam'
import { z } from 'zod'

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limit (1 request per 5 minutes)
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

    // Parse request body
    const body = await request.json()

    // Validate request using Zod schema
    const validatedData = contactFormSchema.parse(body)

    // Check for spam
    if (isSpam(validatedData.message, validatedData.website)) {
      // Silently reject spam (don't reveal detection to potential spammers)
      console.warn(`Spam detected from IP: ${clientIp}`)
      return NextResponse.json({
        success: true,
        message: 'Tu mensaje ha sido recibido. Te contactaremos pronto.',
      })
    }

    // Send email
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
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.errors[0]?.message || 'Validación fallida',
        },
        { status: 400 }
      )
    }

    // Handle other errors
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al procesar tu solicitud. Por favor intenta de nuevo.',
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/contact
 * Handle CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_DOMAIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
