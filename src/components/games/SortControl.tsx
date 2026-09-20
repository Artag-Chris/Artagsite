"use client"

import { useTranslations } from "next-intl"
import { ArrowUpDown } from "lucide-react"
import type { SortOption } from "@/lib/games/types"

interface SortControlProps {
  value: SortOption
  onChange: (sort: SortOption) => void
}

const SORTS: { id: SortOption; label: string }[] = [
  { id: "playtime", label: "sort.playtime" },
  { id: "rating", label: "sort.rating" },
  { id: "title", label: "sort.title" },
]

export function SortControl({ value, onChange }: SortControlProps) {
  const t = useTranslations("games.library")

  return (
    <div className="relative inline-flex items-center">
      <ArrowUpDown className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-400" />
      <select
        aria-label={t("sortLabel")}
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none rounded-xl border border-zinc-800 bg-zinc-900/60 py-2.5 pl-10 pr-10 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:border-zinc-700 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
      >
        {SORTS.map((s) => (
          <option key={s.id} value={s.id} className="bg-zinc-900">
            {t(s.label)}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 h-3 w-3 text-zinc-400"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}