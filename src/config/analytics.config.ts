/**
 * Analytics Configuration
 * Centralized configuration for all analytics and tracking pixels
 * 
 * All IDs are stored in environment variables (.env.local)
 * to keep sensitive information out of version control
 */

export const analyticsConfig = {
  google: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
  meta: {
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  },
  tiktok: {
    pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '',
  },
} as const

/**
 * Validates that all required analytics IDs are configured
 * Logs warnings for missing IDs in development
 */
export function validateAnalyticsConfig() {
  const missing: string[] = []

  if (!analyticsConfig.google.gtmId) missing.push('NEXT_PUBLIC_GTM_ID')
  if (!analyticsConfig.google.gaId) missing.push('NEXT_PUBLIC_GA_ID')
  if (!analyticsConfig.meta.pixelId) missing.push('NEXT_PUBLIC_META_PIXEL_ID')
  if (!analyticsConfig.tiktok.pixelId) missing.push('NEXT_PUBLIC_TIKTOK_PIXEL_ID')

  if (missing.length > 0) {
    console.warn('⚠️ Missing analytics configuration:', missing.join(', '))
  }

  return missing.length === 0
}
