import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Scalable Analytics & Third-Party Services Configuration
 * 
 * Easily add new services by adding them to the respective arrays.
 * All domains will be automatically included in CSP headers.
 */
const ANALYTICS_CONFIG = {
  // Google services
  google: {
    domains: [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://googleads.g.doubleclick.net",
    ],
  },

  // Meta/Facebook services
  meta: {
    domains: [
      "https://connect.facebook.net",
      "https://www.facebook.com",
    ],
  },

  // TikTok services
  tiktok: {
    domains: [
      "https://analytics.tiktok.com",
      "https://ads.tiktok.com",
      "https://t.tiktok.com",
    ],
  },

  // LinkedIn services (for future use)
  linkedin: {
    domains: [
      "https://snap.licdn.com",
      "https://dc.ads.linkedin.com",
    ],
  },

  // Additional tracking/analytics services
  vercel: {
    domains: [
      "https://vitals.vercel-analytics.com",
    ],
  },

  // Add more services here as needed
  // Example for future services:
  // snapchat: {
  //   domains: [
  //     "https://snap.pixels.snapchat.com",
  //   ],
  // },
}

/**
 * Generate CSP header value from analytics config
 * Combines all domains from all services for script-src and connect-src
 */
function generateCSPHeader(): string {
  // Collect all domains from all services
  const allDomains = Object.values(ANALYTICS_CONFIG).flatMap((service) => service.domains)

  // Remove duplicates
  const uniqueDomains = Array.from(new Set(allDomains))

  // Generate CSP header with all domains
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${uniqueDomains.join(" ")};
    connect-src 'self' ${uniqueDomains.join(" ")};
    img-src 'self' data: https: ${uniqueDomains.join(" ")};
    font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    frame-src 'self' https://www.youtube.com;
  `

  // Remove newlines and normalize whitespace
  return cspHeader.replace(/\n/g, "").replace(/\s+/g, " ").trim()
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Set CSP header
  response.headers.set("Content-Security-Policy", generateCSPHeader())

  // Additional security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  return response
}

export const config = {
  matcher: [
    // Match all routes except API and Next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
