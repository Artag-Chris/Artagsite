"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { N8N_CHAT_CONFIG } from "@/config/n8n-chat.config"

const N8nChat = dynamic(() => import("@/components/chat/N8nChat"), { ssr: false })

/**
 * Defers loading the third-party n8n chat widget until the browser is idle
 * so it never blocks initial hydration or inflates mobile TBT.
 */
export function DeferredN8nChat() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!N8N_CHAT_CONFIG.enabled) return
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback
    if (idle) {
      const id = idle(() => setReady(true), { timeout: 2500 })
      return () => {
        const cancel = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback
        cancel?.(id)
      }
    }
    const timer = setTimeout(() => setReady(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!ready || !N8N_CHAT_CONFIG.enabled) return null
  return <N8nChat {...N8N_CHAT_CONFIG} />
}
