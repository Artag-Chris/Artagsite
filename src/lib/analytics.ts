// Typed helpers for dataLayer & gtag events used across the site.
// Only the events defined in the growth plan are pushed here, so GTM
// stays the single source of truth and reports stay comparable.

export type AnalyticsEventName =
  | 'select_project'
  | 'project_outbound_click'
  | 'cv_download'
  | 'contact_submitted'
  | 'view_mode_changed'

export interface SelectProjectParams {
  project_slug: string
  location: string
  locale: string
}

export interface ProjectOutboundClickParams {
  project_slug: string
  link_type: 'repository' | 'demo'
  location: string
  locale: string
}

export interface CvDownloadParams {
  location: string
  locale: string
  file_name: string
}

export interface UserProvidedData {
  email: string
  sha256_email_address?: string
}

export interface ContactSubmittedParams {
  project_type: string
  location: string
  locale: string
  user_data?: UserProvidedData
}

const PRODUCTION_HOST = 'www.artagdev.com.co'

/**
 * Normalizes an email address according to Google's User-Provided Data rules:
 * trim, lowercase, remove dots in local-part for gmail.com / googlemail.com,
 * and verify basic `@` + domain syntax so GA4 never receives malformed `e0` values.
 */
export function normalizeEmailForGoogle(rawEmail: string): string | null {
  const cleaned = rawEmail.trim().toLowerCase()
  if (!cleaned || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) return null

  const [localPart, domain] = cleaned.split('@')
  if (!localPart || !domain) return null

  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const normalizedLocal = localPart.replace(/\./g, '')
    if (!normalizedLocal) return null
    return `${normalizedLocal}@${domain}`
  }

  return cleaned
}

/**
 * Computes lowercase hex SHA-256 using Web Crypto API (HTTPS only).
 * Returns null gracefully on non-secure contexts to avoid GA4 `e2`/`e3` errors.
 */
async function sha256Hex(value: string): Promise<string | null> {
  if (
    typeof window === 'undefined' ||
    !window.isSecureContext ||
    !window.crypto?.subtle
  ) {
    return null
  }
  try {
    const bytes = new TextEncoder().encode(value)
    const digest = await window.crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return null
  }
}

/**
 * Builds a GA4 / GTM compliant `user_data` object.
 * Never returns empty fields (prevents missing/empty PII diagnostics).
 */
export async function buildUserProvidedData(
  email?: string
): Promise<UserProvidedData | undefined> {
  if (!email) return undefined
  const normalized = normalizeEmailForGoogle(email)
  if (!normalized) return undefined

  const hashed = await sha256Hex(normalized)
  return hashed
    ? { email: normalized, sha256_email_address: hashed }
    : { email: normalized }
}

export function trackEvent(name: AnalyticsEventName, params: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  // Never measure previews, localhost or alternate hosts.
  if (window.location.hostname !== PRODUCTION_HOST) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
}

/**
 * Tracks a successful contact submission with GA4 User-Provided Data.
 * Sets `gtag('set', 'user_data', ...)` when gtag.js is present and pushes
 * `user_data` in the `contact_submitted` dataLayer event for GTM.
 */
export async function trackContactSubmitted({
  email,
  projectType,
  location,
  locale,
}: {
  email: string
  projectType: string
  location: string
  locale: string
}): Promise<void> {
  if (typeof window === 'undefined') return
  if (window.location.hostname !== PRODUCTION_HOST) return

  const userData = await buildUserProvidedData(email)

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (gtag && userData) {
    gtag('set', 'user_data', userData)
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'contact_submitted',
    project_type: projectType,
    location,
    locale,
    ...(userData ? { user_data: userData } : {}),
  })
}
