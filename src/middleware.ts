import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

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
      "https://analytics.google.com",
      "https://www.google.com",
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

  // n8n chat webhook (connect-src for the chat widget)
  n8n: {
    domains: [
      "https://n8n.artagdev.com.co",
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

// next-intl middleware: detects locale from the browser (Accept-Language)
// and rewrites / to /es for Spanish browsers (localePrefix: "as-needed")
const intlMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
  // 1. Let next-intl handle locale detection/redirection first
  const response = intlMiddleware(request)

  // 2. Apply security headers on the response (CSP + security headers)
  response.headers.set("Content-Security-Policy", generateCSPHeader())
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  return response
}

export const config = {
  matcher: [
    // Match all request paths except:
    // - API routes and Next.js internals
    // - Static files with extensions (.webp, .mp4, .png, .ico, etc.)
    //   so next-intl never rewrites them to /es/...
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
}
