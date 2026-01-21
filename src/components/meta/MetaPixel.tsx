"use client"

import { useEffect } from "react"

// Extend Window interface for Meta Pixel
declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}

export function MetaPixel() {
  useEffect(() => {
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
      // Initialize Pixel with your Pixel ID
      fbq("init", "1285478826745478")
      // Track initial page view
      fbq("track", "PageView")
    }
    document.head.appendChild(script)
  }, [])

  // Noscript fallback for users without JavaScript
  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=1285478826745478&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  )
}
