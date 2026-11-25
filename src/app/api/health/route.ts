import { NextResponse } from "next/server"
import { isEmailServiceConfigured } from "@/lib/email/emailConfig"

const N8N_HEALTH_URL = "https://n8n.artagdev.com.co/health"
const TIMEOUT_MS = 1_500
const CACHE_TTL_MS = 60_000

interface HealthPayload {
  ok: boolean
  status: "online" | "degraded"
  email: "ready" | "unconfigured"
  n8n: "online" | "offline" | "optional"
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
  const emailReady = isEmailServiceConfigured()
  const shouldCheckN8n =
    process.env.NEXT_PUBLIC_N8N_ENABLED === "true" ||
    Boolean((process.env.N8N_CONTACT_WEBHOOK_URL || "").trim())

  let n8nStatus: HealthPayload["n8n"] = "optional"
  if (shouldCheckN8n) {
    try {
      const res = await fetch(N8N_HEALTH_URL, {
        method: "GET",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      })
      n8nStatus = res.ok ? "online" : "offline"
    } catch {
      n8nStatus = "offline"
    }
  }

  // In Vercel deployments, require RESEND_API_KEY for full "online" status;
  // n8n is strictly optional and never degrades site health.
  const ok = process.env.VERCEL ? emailReady : true

  const payload: HealthPayload = {
    ok,
    status: ok ? "online" : "degraded",
    email: emailReady ? "ready" : "unconfigured",
    n8n: n8nStatus,
    latencyMs: Math.max(1, Date.now() - startedAt),
    checkedAt: new Date().toISOString(),
    target: "artagdev.com.co/api/contact",
  }

  cached = { payload, expiresAt: now + CACHE_TTL_MS }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  })
}
