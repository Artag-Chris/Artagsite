import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-'.]*$/, 'El nombre solo puede contener letras y espacios'),

  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .max(100, 'El email no puede exceder 100 caracteres'),

  projectType: z
    .enum(['collaboration', 'question', 'feedback', 'just-saying-hi', 'other'])
    .catch('other'),

  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(5000, 'El mensaje no puede exceder 5000 caracteres'),

  website: z
    .string()
    .optional()
    .default(''),

  timestamp: z
    .string()
    .optional()
    .default(''),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
