"use client"

import { useCallback, useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Gamepad2, Info, RefreshCw } from "lucide-react"
import type { LibraryResponse, PlatformFilter, SortOption } from "@/lib/games/types"
import { LibraryTabs } from "./LibraryTabs"
import { SortControl } from "./SortControl"
import { GameCard } from "./GameCard"
import { Pagination } from "./Pagination"

export const libraryPerPage = 12

export default function GameLibrary() {
  const t = useTranslations("games.library")
  const [platform, setPlatform] = useState<PlatformFilter>("all")
  const [sort, setSort] = useState<SortOption>("playtime")
  const [page, setPage] = useState(1)
  const [refreshKey, setRefreshKey] = useState(0)
  const [data, setData] = useState<LibraryResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Changing the active tab or sort resets to page 1
  const changePlatform = useCallback((p: PlatformFilter) => {
    setPlatform(p)
    setPage(1)
  }, [])
  const changeSort = useCallback((s: SortOption) => {
    setSort(s)
    setPage(1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(false)

    fetch(`/api/games?platform=${platform}&sort=${sort}&page=${page}&perPage=${libraryPerPage}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("fetch-failed")
        return res.json() as Promise<LibraryResponse>
      })
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") setError(true)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [platform, sort, page, refreshKey])

  const usingFallback = data?.status.usingFallback ?? false

  return (
    <section
      id="game-library"
      aria-label={t("label")}
      className="w-full scroll-mt-28"
    >
      {/* Stats row */}
      {data && (
        <div className="mx-auto mb-12 grid max-w-xl grid-cols-3 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-center backdrop-blur-sm">
            <p className="text-3xl font-bold tabular-nums text-cyan-400">
              {usingFallback
                ? data.totals.games
                : data.sourceCounts.steam +
                  data.sourceCounts.epic +
                  data.sourceCounts.gog}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
              {t("totalGames")}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-center backdrop-blur-sm">
            <p className="text-3xl font-bold tabular-nums text-cyan-400">
              {data.totals.playtimeHours}h
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
              {t("totalHours")}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-center backdrop-blur-sm">
            <p className="text-3xl font-bold tabular-nums text-indigo-400">
              {data.totals.avgRating != null ? data.totals.avgRating : "—"}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
              {t("avgRating")}
            </p>
          </div>
        </div>
      )}

      {/* Source status note */}
      {data && (
        <div className="mb-8 flex justify-center">
          <p
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs backdrop-blur-sm ${
              usingFallback
                ? "border-zinc-700 bg-zinc-900/60 text-zinc-400"
                : "border-cyan-500/20 bg-cyan-500/5 text-cyan-300"
            }`}
          >
            <Info className="h-3.5 w-3.5" />
            {usingFallback
              ? t("fallbackNote")
              : data.sourceCounts.epic + data.sourceCounts.gog > 0
                ? t("liveNote")
                : t("steamOnlyNote")}
          </p>
        </div>
      )}

      {/* Controls */}
      {!usingFallback && data && (
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <LibraryTabs
            active={platform}
            counts={data.sourceCounts}
            onChange={changePlatform}
          />
          <SortControl value={sort} onChange={changeSort} />
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: libraryPerPage }).map((_, i) => (
            <div
              key={i}
              className="h-[380px] animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/40"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 px-8 py-12 text-center">
          <RefreshCw className="h-8 w-8 text-zinc-500" />
          <p className="text-zinc-300">{t("loadError")}</p>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25"
          >
            {t("retry")}
          </button>
        </div>
      ) : data && data.items.length > 0 ? (
        <>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <div className="mt-12">
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onChange={setPage}
            />
          </div>
        </>
      ) : (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 px-8 py-12 text-center">
          <Gamepad2 className="h-8 w-8 text-zinc-500" />
          <p className="text-zinc-300">{t("empty")}</p>
          <p className="text-sm text-zinc-500">{t("emptyHint")}</p>
        </div>
      )}
    </section>
  )
}