'use client'

import { useViewMode } from '@/contexts/ViewModeContext'
import type { ViewMode } from '@/lib/viewMode'

// Global audience toggle: B2B | Dev. The "personal" mode still exists for the
// /personal route, but it is no longer offered in the global menu.
const MODES: { key: ViewMode; label: string }[] = [
  { key: 'b2b', label: 'B2B' },
  { key: 'dev', label: 'Dev' },
]

export function ViewModeSwitcher({ label = 'Audience' }: { label?: string }) {
  const { viewMode, setViewMode } = useViewMode()

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1"
    >
      {MODES.map((mode) => {
        const active = viewMode === mode.key
        return (
          <button
            key={mode.key}
            type="button"
            aria-pressed={active}
            onClick={() => setViewMode(mode.key)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors border ${
              active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200 border-transparent'
            }`}
            style={
              active
                ? { backgroundColor: 'var(--mode-accent-soft)', borderColor: 'var(--mode-accent)', color: 'var(--mode-accent)' }
                : undefined
            }
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
