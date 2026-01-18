/**
 * Contact Form Data Type
 * Defines the structure of contact form submissions
 */

export type ProjectType = 
  | 'web-development' 
  | 'mobile-app' 
  | 'ui-ux-design' 
  | 'consulting' 
  | 'other'

export interface ContactFormData {
  name: string
  email: string
  projectType: ProjectType
  message: string
  website?: string // Honeypot field (should be empty)
}

export interface ContactFormResponse {
  success: boolean
  message?: string
  error?: string
}

export interface RateLimitState {
  count: number
  lastReset: number
}
