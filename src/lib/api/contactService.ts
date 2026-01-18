import { ContactFormData, ContactFormResponse } from '@/types/contact'

/**
 * Submit contact form to API
 */
export async function submitContact(
  data: ContactFormData
): Promise<ContactFormResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result: ContactFormResponse = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Error al enviar el formulario')
    }

    return result
  } catch (error) {
    console.error('Contact form error:', error)
    throw error instanceof Error
      ? error
      : new Error('Error al enviar el formulario')
  }
}
