"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { Search, X } from "lucide-react"
import type { Study } from "@/data/currentstudies/currentStudiesData"
import { StudyCard } from "./StudyCard"

type Filter = "active" | "completed" | "all"

export function StudiesFilterableGrid({ studies }: { studies: Study[] }) {
  const t = useTranslations("studies")
  const [activeFilter, setActiveFilter] = useState<Filter>("active")
  const [searchQuery, setSearchQuery] = useState("")
  const deferredQuery = useDeferredValue(searchQuery)

  const TABS: { id: Filter; label: string }[] = [
    { id: "active", label: t("statusActive") },
    { id: "completed", label: t("statusCompleted") },
    { id: "all", label: t("statusAll") },
  ]

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return studies.filter((study) => {
      if (activeFilter !== "all" && study.status !== activeFilter) return false
      if (!q) return true
      return (
        study.title.toLowerCase().includes(q) ||
        study.category.toLowerCase().includes(q) ||
        study.provider.toLowerCase().includes(q) ||
        study.description.toLowerCase().includes(q) ||
        study.skills.some((skill) => skill.toLowerCase().includes(q))
      )
    })
  }, [studies, activeFilter, deferredQuery])

  return (
    <>
      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-8 border-b border-zinc-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
            aria-label={t("searchPlaceholder")}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label={t("clearFilters")}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2" role="tablist" aria-label={t("filterByStatus")}>
          {TABS.map((tab) => {
            const isActive = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                    : "text-zinc-400 bg-zinc-800/30 hover:bg-zinc-700/50"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {filtered.map((study, i) => (
            <StudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 max-w-4xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-zinc-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t("noStudies")}</h3>
          <p className="text-zinc-400 mb-6">
            {t("noStudiesHint")}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("")
              setActiveFilter("all")
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-500 hover:to-cyan-400 transition-colors"
          >
            {t("clearFilters")}
          </button>
        </div>
      )}
    </>
  )
}
