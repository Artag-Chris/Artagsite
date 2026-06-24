"use client"

import { useEffect } from "react"
import { analyticsConfig } from "@/config/analytics.config"

// Extend Window interface for Meta Pixel
declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}

export function MetaPixel() {
  useEffect(() => {
    const pixelId = analyticsConfig.meta.pixelId
    if (!pixelId) return

    const idle = window.requestIdleCallback || ((fn: Function) => setTimeout(fn, 2000))
    idle(() => {
      // Initialize Meta Pixel function
      if (!window.fbq) {
        window.fbq = function () {
          ;(window.fbq as any).q = (window.fbq as any).q || []
          ;((window.fbq as any).q as any[]).push(arguments)
        }

        ;(window.fbq as any).push = window.fbq
        ;(window.fbq as any).loaded = true
        ;(window.fbq as any).version = "2.0"
        ;(window.fbq as any).queue = []
      }

      const fbq = window.fbq

      if (!window._fbq) {
        window._fbq = fbq
      }

      // Load Facebook SDK
      const script = document.createElement("script")
      script.async = true
      script.src = "https://connect.facebook.net/en_US/fbevents.js"
      script.onload = () => {
        fbq("init", pixelId)
        fbq("track", "PageView")
        console.log('✓ Meta Pixel initialized with ID:', pixelId)
      }
      script.onerror = () => {
        console.warn('⚠️ Meta Pixel SDK blocked (ad blocker or CSP issue). Pixel initialization queued but requests may be blocked.')
      }
      document.head.appendChild(script)
    })
  }, [])

  return null
}
