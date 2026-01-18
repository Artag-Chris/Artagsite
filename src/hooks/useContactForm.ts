'use client'

import { useState, useCallback } from 'react'
import { contactFormSchema } from '@/lib/validations/contactSchema'
import { submitContact } from '@/lib/api/contactService'
import { ContactFormData, ContactFormResponse } from '@/types/contact'

interface UseContactFormState {
  formData: ContactFormData
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
}

export function useContactForm() {
  const [state, setState] = useState<UseContactFormState>({
    formData: {
      name: '',
      email: '',
      projectType: 'web-development',
      message: '',
      website: '',
    },
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          [name]: value,
        },
        error: null,
      }))
    },
    []
  )

  const handleSelectChange = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        projectType: value as any,
      },
      error: null,
    }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        error: null,
      }))

      try {
        // Validate form data
        const validatedData = contactFormSchema.parse(state.formData)

        // Submit to API
        const response = await submitContact({
          name: validatedData.name,
          email: validatedData.email,
          projectType: validatedData.projectType,
          message: validatedData.message,
        })

        if (response.success) {
          setState((prev) => ({
            ...prev,
            isSubmitting: false,
            isSubmitted: true,
            formData: {
              name: '',
              email: '',
              projectType: 'web-development',
              message: '',
              website: '',
            },
          }))

          // Reset success state after 3 seconds
          setTimeout(() => {
            setState((prev) => ({
              ...prev,
              isSubmitted: false,
            }))
          }, 3000)
        } else {
          setState((prev) => ({
            ...prev,
            isSubmitting: false,
            error: response.error || 'Error al enviar el formulario',
          }))
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Error al procesar tu solicitud'

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: errorMessage,
        }))
      }
    },
    [state.formData]
  )

  return {
    ...state,
    handleChange,
    handleSelectChange,
    handleSubmit,
  }
}
