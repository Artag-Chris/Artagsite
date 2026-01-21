"use client"

import { useCallback } from "react"

export interface MetaPixelEventData {
  [key: string]: string | number | boolean | string[] | number[]
}

export interface UseMetaPixelReturn {
  trackEvent: (eventName: string, data?: MetaPixelEventData) => void
}

/**
 * Hook to track Meta Pixel events
 * Safely handles cases where fbq is not loaded yet
 *
 * @example
 * const { trackEvent } = useMetaPixel()
 * trackEvent("Contact", { currency: "USD", value: 100 })
 */
export function useMetaPixel(): UseMetaPixelReturn {
  const trackEvent = useCallback((eventName: string, data?: MetaPixelEventData) => {
    // Safely check if fbq is available in the window
    if (typeof window !== "undefined" && window.fbq) {
      try {
        if (data) {
          window.fbq("track", eventName, data)
        } else {
          window.fbq("track", eventName)
        }
      } catch (error) {
        console.error(`Error tracking Meta Pixel event "${eventName}":`, error)
      }
    } else {
      // Silently fail in development if fbq is not loaded
      if (process.env.NODE_ENV === "development") {
        console.warn(`Meta Pixel not loaded, event "${eventName}" not tracked`)
      }
    }
  }, [])

  return { trackEvent }
}
