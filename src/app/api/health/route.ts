import { NextResponse } from "next/server"

const HEALTH_URL = "https://n8n.artagdev.com.co/health"
const TIMEOUT_MS = 2000
const CACHE_TTL_MS = 60_000

interface HealthPayload {
  ok: boolean
  status: "online" | "degraded"
  latencyMs: number
  checkedAt: string
  target: string
}

let cached: { payload: HealthPayload; expiresAt: number } | null = null

export async function GET() {
  const now = Date.now()
  if (cached && now < cached.expiresAt) {
    return NextResponse.json(cached.payload, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    })
  }

  const startedAt = Date.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  let ok = false
  try {
    const res = await fetch(HEALTH_URL, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    })
    ok = res.ok
  } catch {
    ok = false
  } finally {
    clearTimeout(timer)
  }

  const payload: HealthPayload = {
    ok,
    status: ok ? "online" : "degraded",
    latencyMs: Date.now() - startedAt,
    checkedAt: new Date().toISOString(),
    target: "n8n.artagdev.com.co/health",
  }

  cached = { payload, expiresAt: now + CACHE_TTL_MS }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  })
}
