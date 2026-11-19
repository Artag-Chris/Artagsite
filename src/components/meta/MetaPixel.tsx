"use client"

import { useEffect } from "react"
import { analyticsConfig } from "@/config/analytics.config"

// Extend Window interface for Meta Pixel
declare global {
  interface Window {
    _fbq?: unknown
  }
}

export function MetaPixel() {
  useEffect(() => {
    if (window.location.hostname !== "www.artagdev.com.co") return
    const pixelId = analyticsConfig.meta.pixelId
    if (!pixelId) return

    let loaded = false
    const loadPixel = () => {
      if (loaded) return
      loaded = true
      cleanup()
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
    }

    const timer = setTimeout(loadPixel, 3500)
    const cleanup = () => {
      clearTimeout(timer)
      window.removeEventListener("pointerdown", loadPixel)
      window.removeEventListener("scroll", loadPixel)
      window.removeEventListener("keydown", loadPixel)
    }
    window.addEventListener("pointerdown", loadPixel, { passive: true, once: true })
    window.addEventListener("scroll", loadPixel, { passive: true, once: true })
    window.addEventListener("keydown", loadPixel, { passive: true, once: true })
    return cleanup
  }, [])

  return null
}
