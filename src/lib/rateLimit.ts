import { RateLimitState } from '@/types/contact'

// Store rate limit data in memory
const rateLimitMap = new Map<string, RateLimitState>()

const DEFAULT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 3
const DEFAULT_WINDOW_MS = (Number(process.env.RATE_LIMIT_MINUTES) || 5) * 60_000

/**
 * Check if IP has exceeded rate limit
 * Default: 3 requests per 5 minutes (configurable via RATE_LIMIT_MAX_REQUESTS / RATE_LIMIT_MINUTES)
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = DEFAULT_MAX_REQUESTS,
  windowMs: number = DEFAULT_WINDOW_MS
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const state = rateLimitMap.get(ip)

  // Initialize or reset if window has passed
  if (!state || now - state.lastReset > windowMs) {
    rateLimitMap.set(ip, {
      count: 1,
      lastReset: now,
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    }
  }

  // Increment request count
  state.count++

  const allowed = state.count <= maxRequests
  const remaining = Math.max(0, maxRequests - state.count)
  const resetTime = state.lastReset + windowMs

  return {
    allowed,
    remaining,
    resetTime,
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIp(request: Request): string {
  // Try to get from x-forwarded-for header (proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  // Fallback to x-real-ip
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback to localhost if running locally
  return '127.0.0.1'
}

/**
 * Clean up old entries from rate limit map (optional)
 * Call this periodically to prevent memory leaks
 */
export function cleanupRateLimitMap(windowMs: number = 300000): void {
  const now = Date.now()
  const entriesToDelete: string[] = []

  for (const [ip, state] of rateLimitMap.entries()) {
    if (now - state.lastReset > windowMs * 2) {
      entriesToDelete.push(ip)
    }
  }

  entriesToDelete.forEach((ip) => rateLimitMap.delete(ip))
}
