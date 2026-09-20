"use client"

import { useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Award, ChevronDown, Loader2, Trophy } from "lucide-react"
import type { Game, SteamAchievementsResult } from "@/lib/games/types"

interface AchievementsExpandProps {
  game: Game
}

/**
 * Inline achievements accordion — the list unfolds inside the game card
 * (fetched on-demand from `/api/games/achievements?appid=X`, cached 30 min).
 */
export function AchievementsExpand({ game }: AchievementsExpandProps) {
  const t = useTranslations("games.achievements")
  const locale = useLocale()

  const [open, setOpen] = useState(false)
  const [data, setData] = useState<SteamAchievementsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const toggle = () => {
    const next = !open
    setOpen(next)
    // Fetch only the first time the panel opens
    if (next && !data && !loading && !error) {
      setLoading(true)
      setError(false)
      fetch(`/api/games/achievements?appid=${game.sourceId}`)
        .then((res) => {
          if (!res.ok) throw new Error("fetch-failed")
          return res.json() as Promise<{
            success: boolean
            data: SteamAchievementsResult
          }>
        })
        .then((json) => setData(json.data))
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }
  }

  const unlocked = data?.unlocked ?? 0
  const total = data?.total ?? 0
  const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0

  const formatDate = (timestamp: number) =>
    new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(timestamp * 1000))

  return (
    <div className="min-w-0 flex-1">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow transition-all hover:shadow-lg hover:shadow-cyan-500/25"
      >
        <Trophy className="h-3.5 w-3.5" />
        {open ? t("hide") : t("show")}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60">
          {!loading && !error && total > 0 && (
            <div className="border-b border-zinc-800 px-4 py-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-medium text-indigo-300">
                  {t("unlocked", { unlocked, total })}
                </span>
                <span className="tabular-nums font-semibold text-cyan-300">
                  {percent}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}

          <div className="max-h-80 overflow-y-auto p-3">
            {loading && (
              <div className="flex items-center justify-center gap-2 py-8 text-xs text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                {t("loading")}
              </div>
            )}

            {error && (
              <div className="py-8 text-center text-xs text-zinc-400">
                {t("error")}
              </div>
            )}

            {!loading &&
              !error &&
              data &&
              data.achievements.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-8 text-center text-xs text-zinc-400">
                  <Award className="h-6 w-6 text-zinc-600" />
                  {t("none")}
                </div>
              )}

            {!loading && !error && data && data.achievements.length > 0 && (
              <ul className="space-y-2">
                {data.achievements
                  .slice()
                  .sort((a, b) => Number(b.achieved) - Number(a.achieved))
                  .map((achievement) => (
                    <li
                      key={achievement.apiname}
                      className={`flex items-start gap-3 rounded-lg border p-2.5 ${
                        achievement.achieved
                          ? "border-cyan-500/20 bg-cyan-500/5"
                          : "border-zinc-800 bg-zinc-900/40 opacity-60"
                      }`}
                    >
                      {achievement.icon ? (
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={
                              achievement.achieved
                                ? achievement.icon
                                : (achievement.icongray ?? achievement.icon)
                            }
                            alt=""
                            fill
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-zinc-800">
                          <Award
                            className={`h-5 w-5 ${
                              achievement.achieved
                                ? "text-cyan-400"
                                : "text-zinc-600"
                            }`}
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-semibold ${
                            achievement.achieved
                              ? "text-zinc-50"
                              : "text-zinc-400"
                          }`}
                        >
                          {achievement.name}
                        </p>
                        {achievement.description && (
                          <p className="mt-0.5 text-[11px] leading-snug text-zinc-400 line-clamp-2">
                            {achievement.description}
                          </p>
                        )}
                        {achievement.achieved &&
                          achievement.unlocktime != null && (
                            <p className="mt-1 text-[11px] font-medium text-cyan-400">
                              {t("unlockedOn", {
                                date: formatDate(achievement.unlocktime),
                              })}
                            </p>
                          )}
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}