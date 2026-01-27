"use client"

import { useEffect } from "react"
import { analyticsConfig } from "@/config/analytics.config"

// Extend Window interface for TikTok Pixel
declare global {
  interface Window {
    ttq?: any
    TiktokAnalyticsObject?: string
  }
}

/**
 * TikTok Pixel Component
 * 
 * Initializes TikTok Analytics Pixel for tracking user events
 * automatically loads on client side and tracks initial page view.
 * 
 * @example
 * // In layout.tsx or root component
 * <TikTokPixel />
 */
export function TikTokPixel() {
  useEffect(() => {
    const pixelId = analyticsConfig.tiktok.pixelId

    if (!pixelId) {
      console.warn('⚠️ TikTok Pixel ID not configured')
      return
    }

    // Initialize TikTok Pixel
    ;(function (w: any, d: Document, t: string) {
      w.TiktokAnalyticsObject = t
      const ttq = (w[t] = w[t] || []) as any

      ttq.methods = [
        "page",
        "track",
        "identify",
        "instances",
        "debug",
        "on",
        "off",
        "once",
        "ready",
        "alias",
        "group",
        "enableCookie",
        "disableCookie",
        "holdConsent",
        "revokeConsent",
        "grantConsent",
      ]

      ttq.setAndDefer = function (t: any, e: string) {
        t[e] = function () {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
        }
      }

      for (let i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i])
      }

      ttq.instance = function (t: string) {
        const e = ttq._i[t] || []
        for (let n = 0; n < ttq.methods.length; n++) {
          ttq.setAndDefer(e, ttq.methods[n])
        }
        return e
      }

      ttq.load = function (e: string, n?: any) {
        const r = "https://analytics.tiktok.com/i18n/pixel/events.js"
        const o = n && n.partner
        ttq._i = ttq._i || {}
        ttq._i[e] = []
        ttq._i[e]._u = r
        ttq._t = ttq._t || {}
        ttq._t[e] = +new Date()
        ttq._o = ttq._o || {}
        ttq._o[e] = n || {}

        const script = document.createElement("script")
        script.type = "text/javascript"
        script.async = true
        script.src = r + "?sdkid=" + e + "&lib=" + t

        const firstScript = document.getElementsByTagName("script")[0]
        firstScript.parentNode?.insertBefore(script, firstScript)
      }

      // Load and track initial page view
      ttq.load(pixelId)
      ttq.page()
    })(window, document, "ttq")

    console.log("✓ TikTok Pixel initialized with ID:", pixelId)
  }, [])

  return null
}
