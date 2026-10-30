'use client'

import { useViewMode } from '@/contexts/ViewModeContext'
import type { ViewMode } from '@/lib/viewMode'

const MODES: { key: ViewMode; label: string }[] = [
  { key: 'b2b', label: 'B2B' },
  { key: 'dev', label: 'Dev' },
  { key: 'personal', label: 'Personal' },
]

export function ViewModeSwitcher() {
  const { viewMode, setViewMode } = useViewMode()

  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1"
    >
      {MODES.map((mode) => {
        const active = viewMode === mode.key
        return (
          <button
            key={mode.key}
            role="tab"
            aria-selected={active}
            onClick={() => setViewMode(mode.key)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30'
                : 'text-zinc-500 hover:text-zinc-200 border border-transparent'
            }`}
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
