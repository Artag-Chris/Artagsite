"use client"

import { useTranslations } from "next-intl"
import { Search, X } from "lucide-react"

interface SearchControlProps {
  value: string
  onChange: (value: string) => void
  /** Total results for the current query (null when not searching). */
  resultCount: number | null
}

export function SearchControl({
  value,
  onChange,
  resultCount,
}: SearchControlProps) {
  const t = useTranslations("games.library")

  return (
    <div className="mx-auto flex max-w-xl items-center gap-3">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchLabel")}
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-2.5 pl-10 pr-10 text-sm font-medium text-zinc-100 backdrop-blur-sm transition-colors placeholder:text-zinc-500 hover:border-zinc-700 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={t("searchClear")}
            className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {resultCount != null && value.trim() && (
        <span className="shrink-0 text-sm text-zinc-500 tabular-nums">
          {t("results", { count: resultCount })}
        </span>
      )}
    </div>
  )
}