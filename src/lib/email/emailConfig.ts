import nodemailer from 'nodemailer'
import { ContactFormData } from '@/types/contact'

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

/**
 * Email template for contact form submission
 */
function getEmailTemplate(data: ContactFormData, clientIp: string): string {
  const projectTypeMap: Record<string, string> = {
    'web-development': 'Desarrollo Web',
    'mobile-app': 'Aplicación Móvil',
    'ui-ux-design': 'Diseño UI/UX',
    'consulting': 'Consultoría',
    'other': 'Otro',
  }

  const timestamp = new Date().toLocaleString('es-CO', { 
    timeZone: 'America/Bogota' 
  })

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; }
        .header { border-bottom: 3px solid #4f46e5; padding-bottom: 15px; margin-bottom: 20px; }
        .header h2 { color: #1f2937; margin: 0; }
        .content { margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #4f46e5; margin-bottom: 5px; }
        .field-value { color: #374151; line-height: 1.6; }
        .footer { border-top: 1px solid #e5e7eb; padding-top: 15px; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nuevo Contacto desde artagdev.com.co</h2>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="field-label">Nombre:</div>
                <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${data.email}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Tipo de Proyecto:</div>
                <div class="field-value">${projectTypeMap[data.projectType] || data.projectType}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Mensaje:</div>
                <div class="field-value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Información Técnica:</strong></p>
            <p>IP del Cliente: ${clientIp}</p>
            <p>Fecha/Hora: ${timestamp}</p>
        </div>
    </div>
</body>
</html>
  `
}

/**
 * Send contact form email
 */
export async function sendContactEmail(data: ContactFormData, clientIp: string): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_FROM,
      to: process.env.CONTACT_ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: `Nuevo contacto de ${data.name} - Artagdev`,
      html: getEmailTemplate(data, clientIp),
      replyTo: data.email,
    })

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

/**
 * Verify email configuration
 */
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify()
    return true
  } catch (error) {
    console.error('Email configuration error:', error)
    return false
  }
}
