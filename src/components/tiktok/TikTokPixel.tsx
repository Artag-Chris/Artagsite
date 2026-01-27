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
 * Initializes TikTok Analytics Pixel for tracking user events.
 * Uses TikTok's official base code format for compatibility with TikTok Pixel Helper extension.
 * Automatically tracks initial page view.
 *
 * @example
 * // In layout.tsx or root component
 * <TikTokPixel />
 */
export function TikTokPixel() {
  useEffect(() => {
    const pixelId = analyticsConfig.tiktok.pixelId

    if (!pixelId) {
      console.warn("⚠️ TikTok Pixel ID not configured")
      return
    }

    // TikTok Pixel official base code
    // Using IIFE pattern for proper recognition by TikTok's tools
    ;(function (w: any, d: any, t: string) {
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
        ttq._i = ttq._i || {}
        ttq._i[e] = []
        ttq._i[e]._u = r
        ttq._t = ttq._t || {}
        ttq._t[e] = +new Date()
        ttq._o = ttq._o || {}
        ttq._o[e] = n || {}

        const s = d.createElement("script")
        s.type = "text/javascript"
        s.async = true
        s.src = r + "?sdkid=" + e + "&lib=" + t

        // Add error handling for blocked requests (ad blocker or CSP)
        s.onerror = () => {
          console.warn("⚠️ TikTok Pixel SDK blocked (ad blocker or CSP issue). Pixel initialization queued but requests may be blocked.")
        }

        const f = d.getElementsByTagName("script")[0]
        f.parentNode?.insertBefore(s, f)
      }

      ttq.load(pixelId)
      ttq.page()
    })(window, document, "ttq")

    console.log("✓ TikTok Pixel initialized with ID:", pixelId)
  }, [])

  return null
}
