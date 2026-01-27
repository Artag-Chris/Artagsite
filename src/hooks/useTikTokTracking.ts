import { useCallback } from 'react'

// Extend Window interface for TikTok Pixel
declare global {
  interface Window {
    ttq?: any
  }
}

// TikTok Pixel standard events
export const TikTokEvents = {
  PAGE_VIEW: 'PageView',
  CLICK_BUTTON: 'ClickButton',
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart',
  ADD_TO_WISHLIST: 'AddToWishlist',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  ADD_PAYMENT_INFO: 'AddPaymentInfo',
  PURCHASE: 'Purchase',
  PLACE_AN_ORDER: 'PlaceAnOrder',
  COMPLETE_PAYMENT: 'CompletePayment',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  SUBSCRIBE: 'Subscribe',
  SEARCH: 'Search',
  VIEW_CART: 'ViewCart',
  WATCH_VIDEO: 'WatchVideo',
  CONTACT: 'Contact',
  DOWNLOAD: 'Download',
  SUBMIT_FORM: 'SubmitForm',
} as const

export type TikTokEventName = typeof TikTokEvents[keyof typeof TikTokEvents]

export interface TikTokEventData {
  [key: string]: any
  value?: number
  currency?: string
  content_id?: string
  content_ids?: string[]
  content_type?: string
  content_name?: string
  content_category?: string
  query?: string
  status?: string
}

export interface TikTokUserData {
  phone_number?: string
  email?: string
  external_id?: string
  first_name?: string
  last_name?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  [key: string]: any
}

/**
 * Hook for tracking TikTok Pixel events
 * Provides methods to track standard and custom events
 *
 * @example
 * const { trackEvent, trackPageView, identifyUser } = useTikTokTracking()
 *
 * // Track standard event
 * trackEvent(TikTokEvents.PURCHASE, {
 *   value: 99.99,
 *   currency: 'USD',
 *   content_name: 'Product Name'
 * })
 *
 * // Track page view
 * trackPageView()
 *
 * // Identify user
 * identifyUser({
 *   email: 'user@example.com',
 *   phone_number: '+1234567890'
 * })
 */
export function useTikTokTracking() {
  const isTikTokPixelAvailable = useCallback(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return !!window.ttq
  }, [])

  /**
   * Track a standard TikTok Pixel event
   */
  const trackEvent = useCallback(
    (eventName: TikTokEventName, eventData?: TikTokEventData) => {
      if (!isTikTokPixelAvailable()) {
        console.warn('TikTok Pixel is not available')
        return
      }

      try {
        window.ttq?.track(eventName, eventData || {})
        console.log(`✓ TikTok Pixel tracked: ${eventName}`, eventData)
      } catch (error) {
        console.error(`Failed to track TikTok Pixel event: ${eventName}`, error)
      }
    },
    [isTikTokPixelAvailable]
  )

  /**
   * Track a page view
   */
  const trackPageView = useCallback(() => {
    trackEvent(TikTokEvents.PAGE_VIEW)
  }, [trackEvent])

  /**
   * Identify a user with TikTok Pixel
   * Useful for conversion tracking and audience building
   */
  const identifyUser = useCallback(
    (userData: TikTokUserData) => {
      if (!isTikTokPixelAvailable()) {
        console.warn('TikTok Pixel is not available')
        return
      }

      try {
        window.ttq?.identify(userData)
        console.log('✓ TikTok Pixel user identified', { ...userData, email: '***' })
      } catch (error) {
        console.error('Failed to identify user with TikTok Pixel', error)
      }
    },
    [isTikTokPixelAvailable]
  )

  /**
   * Track a custom event with TikTok Pixel
   */
  const trackCustomEvent = useCallback(
    (eventName: string, eventData?: TikTokEventData) => {
      if (!isTikTokPixelAvailable()) {
        console.warn('TikTok Pixel is not available')
        return
      }

      try {
        window.ttq?.track(eventName, eventData || {})
        console.log(`✓ TikTok Pixel custom event tracked: ${eventName}`, eventData)
      } catch (error) {
        console.error(`Failed to track TikTok Pixel custom event: ${eventName}`, error)
      }
    },
    [isTikTokPixelAvailable]
  )

  return {
    trackEvent,
    trackPageView,
    trackCustomEvent,
    identifyUser,
    isAvailable: isTikTokPixelAvailable(),
  }
}
