// Typed helpers for dataLayer events used across the site.
// Only the four events defined in the growth plan are pushed here, so GTM
// stays the single source of truth and reports stay comparable.

export type AnalyticsEventName =
  | 'select_project'
  | 'project_outbound_click'
  | 'cv_download'
  | 'contact_submitted'

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

export interface ContactSubmittedParams {
  project_type: string
  location: string
  locale: string
}

export function trackEvent(name: AnalyticsEventName, params: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  // Never measure previews, localhost or alternate hosts.
  if (window.location.hostname !== 'www.artagdev.com.co') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
}
