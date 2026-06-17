export type ProjectType =
  | 'collaboration'
  | 'question'
  | 'feedback'
  | 'just-saying-hi'
  | 'other'

export interface ContactFormData {
  name: string
  email: string
  projectType: ProjectType
  message: string
  website?: string
  timestamp?: string
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
