import { useCallback } from 'react'

// Extend Window interface for Meta Pixel
declare global {
  interface Window {
    fbq?: any
  }
}

// Meta Pixel standard events
export const MetaEvents = {
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart',
  ADD_TO_WISHLIST: 'AddToWishlist',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  ADD_PAYMENT_INFO: 'AddPaymentInfo',
  PURCHASE: 'Purchase',
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  SEARCH: 'Search',
  PAGE_VIEW: 'PageView',
} as const

export type MetaEventName = typeof MetaEvents[keyof typeof MetaEvents]

export interface MetaEventData {
  [key: string]: any
  value?: number
  currency?: string
  content_ids?: string[]
  content_type?: string
  content_name?: string
  content_category?: string
}

/**
 * Hook for tracking Meta Pixel events
 * Provides methods to track standard and custom events
 *
 * @example
 * const { trackEvent, trackCustomEvent } = useMetaTracking()
 *
 * // Track standard event
 * trackEvent(MetaEvents.PURCHASE, {
 *   value: 99.99,
 *   currency: 'USD',
 *   content_name: 'Product Name'
 * })
 *
 * // Track custom event
 * trackCustomEvent('custom_event_name', { custom_data: 'value' })
 */
export function useMetaTracking() {
  const isMetaPixelAvailable = useCallback(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return !!window.fbq
  }, [])

  /**
   * Track a standard Meta Pixel event
   */
  const trackEvent = useCallback(
    (eventName: MetaEventName, eventData?: MetaEventData) => {
      if (!isMetaPixelAvailable()) {
        console.warn('Meta Pixel is not available')
        return
      }

      try {
        window.fbq?.('track', eventName, eventData || {})
        console.log(`✓ Meta Pixel tracked: ${eventName}`, eventData)
      } catch (error) {
        console.error(`Failed to track Meta Pixel event: ${eventName}`, error)
      }
    },
    [isMetaPixelAvailable]
  )

  /**
   * Track a custom event with Meta Pixel
   */
  const trackCustomEvent = useCallback(
    (eventName: string, eventData?: MetaEventData) => {
      if (!isMetaPixelAvailable()) {
        console.warn('Meta Pixel is not available')
        return
      }

      try {
        window.fbq?.('trackCustom', eventName, eventData || {})
        console.log(`✓ Meta Pixel custom event tracked: ${eventName}`, eventData)
      } catch (error) {
        console.error(`Failed to track Meta Pixel custom event: ${eventName}`, error)
      }
    },
    [isMetaPixelAvailable]
  )

  /**
   * Track a page view (useful for SPA route changes)
   */
  const trackPageView = useCallback(() => {
    trackEvent(MetaEvents.PAGE_VIEW)
  }, [trackEvent])

  return {
    trackEvent,
    trackCustomEvent,
    trackPageView,
    isAvailable: isMetaPixelAvailable(),
  }
}
