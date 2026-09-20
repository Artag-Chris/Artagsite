"use client"

import { useTranslations } from "next-intl"
import type { PlatformFilter, SourceCounts } from "@/lib/games/types"
import { PLATFORM_LABEL_KEYS, PLATFORM_ORDER } from "@/lib/games/platforms"

interface LibraryTabsProps {
  active: PlatformFilter
  counts: SourceCounts
  onChange: (platform: PlatformFilter) => void
}

export function LibraryTabs({ active, counts, onChange }: LibraryTabsProps) {
  const t = useTranslations("games.library")
  const tp = useTranslations("games.platforms")

  // "All" first, then every registered platform in order
  const tabs: PlatformFilter[] = ["all", ...PLATFORM_ORDER]

  const countFor = (id: PlatformFilter) =>
    id === "all"
      ? counts.steam + counts.epic + counts.gog
      : counts[id]

  return (
    <div
      role="tablist"
      aria-label={t("all")}
      className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1.5 backdrop-blur-sm"
    >
      {tabs
        .filter((tab) => tab === "all" || countFor(tab) > 0)
        .map((tab) => {
          const isActive = active === tab
          const count = countFor(tab)
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80"
              }`}
            >
              <span>
                {tab === "all" ? t("all") : tp(PLATFORM_LABEL_KEYS[tab])}
              </span>
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