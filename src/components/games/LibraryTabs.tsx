"use client"

import { useTranslations } from "next-intl"
import type { PlatformFilter, SourceCounts } from "@/lib/games/types"

interface LibraryTabsProps {
  active: PlatformFilter
  counts: SourceCounts
  onChange: (platform: PlatformFilter) => void
}

const TABS: { id: PlatformFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "steam", label: "Steam" },
  { id: "epic", label: "Epic" },
  { id: "gog", label: "GOG" },
]

export function LibraryTabs({ active, counts, onChange }: LibraryTabsProps) {
  const t = useTranslations("games.library")

  const countFor = (tab: (typeof TABS)[number]) => {
    switch (tab.id) {
      case "steam":
        return counts.steam
      case "epic":
        return counts.epic
      case "gog":
        return counts.gog
      default:
        return counts.steam + counts.epic + counts.gog
    }
  }

  return (
    <div
      role="tablist"
      aria-label={t("all")}
      className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1.5 backdrop-blur-sm"
    >
      {TABS.filter((tab) => tab.id === "all" || countFor(tab) > 0).map((tab) => {
        const isActive = active === tab.id
        const count = countFor(tab)
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80"
            }`}
          >
            <span>{tab.id === "all" ? t("all") : tab.label}</span>
            {count > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}