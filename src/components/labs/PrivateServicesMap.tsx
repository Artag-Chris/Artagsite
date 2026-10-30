'use client'

import { useState } from 'react'
import { ChevronRight, Lock } from 'lucide-react'

const GROUPS = [
  {
    id: 'identity',
    label: 'Identity & access',
    detail: 'Auth, sessions, roles, permissions',
    services: ['auth-service', 'session-service', 'rbac-service'],
  },
  {
    id: 'billing',
    label: 'Billing & payments',
    detail: 'Invoices, subscriptions, payment webhooks',
    services: ['billing-service', 'invoice-service', 'payment-webhook'],
  },
  {
    id: 'messaging',
    label: 'Messaging & notifications',
    detail: 'Email, push, in-app, WhatsApp',
    services: ['notification-service', 'email-worker', 'whatsapp-adapter'],
  },
  {
    id: 'jobs',
    label: 'Jobs & queues',
    detail: 'Background workers, schedulers, retries',
    services: ['job-scheduler', 'worker-pool', 'retry-handler'],
  },
  {
    id: 'data',
    label: 'Data & storage',
    detail: 'Shared DB access, caching, file storage',
    services: ['data-access', 'cache-layer'],
  },
]

export function PrivateServicesMap({ title, note }: { title: string; note: string }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 sm:p-8">
      <div className="mb-4 flex items-center gap-2">
        <Lock className="h-4 w-4 text-zinc-500" />
        <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
      </div>
      <p className="mb-4 text-xs text-zinc-500">{note}</p>
      <ul className="space-y-2">
        {GROUPS.map((group) => {
          const isOpen = expanded.has(group.id)
          return (
            <li key={group.id} className="rounded-lg border border-white/[0.06] bg-black/20">
              <button
                type="button"
                onClick={() => toggle(group.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left"
              >
                <ChevronRight className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                <span className="text-sm font-medium text-zinc-200">{group.label}</span>
                <span className="ml-auto text-xs text-zinc-500">{group.services.length} services</span>
              </button>
              {isOpen && (
                <div className="border-t border-white/[0.06] px-3 py-2">
                  <p className="mb-2 text-xs text-zinc-500">{group.detail}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.services.map((s) => (
                      <span key={s} className="rounded-md border border-white/[0.06] bg-[#111111] px-2 py-0.5 font-mono text-[11px] text-zinc-500">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
