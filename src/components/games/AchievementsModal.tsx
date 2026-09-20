"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Award, Loader2, X } from "lucide-react"
import type { Game, SteamAchievementsResult } from "@/lib/games/types"

interface AchievementsModalProps {
  game: Game | null
  onClose: () => void
}

export function AchievementsModal({ game, onClose }: AchievementsModalProps) {
  const t = useTranslations("games.achievements")
  const locale = useLocale()

  const [data, setData] = useState<SteamAchievementsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Reset state + fetch whenever a new game opens the modal
  useEffect(() => {
    if (!game) return

    setData(null)
    setError(false)
    setLoading(true)

    const controller = new AbortController()
    fetch(`/api/games/achievements?appid=${game.sourceId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("fetch-failed")
        return res.json() as Promise<{ success: boolean; data: SteamAchievementsResult }>
      })
      .then((json) => setData(json.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [game])

  // Scroll lock + Escape to close
  useEffect(() => {
    if (!game) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [game, onClose])

  if (!game) return null

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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t("title")} — ${game.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-cyan-400">
              {t("title")} · Steam
            </p>
            <h3 className="mt-1 text-xl font-bold text-zinc-50 line-clamp-2">
              {game.title}
            </h3>
            {!loading && !error && total > 0 && (
              <p className="mt-1 text-sm text-zinc-400">
                {t("unlocked", { unlocked, total })} ·{" "}
                <span className="font-semibold text-cyan-300 tabular-nums">{percent}%</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        {!loading && !error && total > 0 && (
          <div className="h-1.5 w-full bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-16 text-zinc-400">
              <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
              <span>{t("loading")}</span>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-10 text-center text-zinc-400">
              {t("error")}
            </div>
          )}

          {!loading && !error && (total === 0 || data?.achievements.length === 0) && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Award className="h-10 w-10 text-zinc-600" />
              <p className="text-zinc-400">{t("none")}</p>
            </div>
          )}

          {!loading && !error && data && data.achievements.length > 0 && (
            <ul className="space-y-3">
              {data.achievements
                .slice()
                .sort((a, b) => Number(b.achieved) - Number(a.achieved))
                .map((achievement) => (
                  <li
                    key={achievement.apiname}
                    className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
                      achievement.achieved
                        ? "border-cyan-500/20 bg-cyan-500/5"
                        : "border-zinc-800 bg-zinc-900/40 opacity-60"
                    }`}
                  >
                    {achievement.icon ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={achievement.achieved ? achievement.icon : (achievement.icongray ?? achievement.icon)}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                        <Award className={`h-6 w-6 ${achievement.achieved ? "text-cyan-400" : "text-zinc-600"}`} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className={`font-semibold ${achievement.achieved ? "text-zinc-50" : "text-zinc-400"}`}>
                        {achievement.name}
                      </p>
                      {achievement.description && (
                        <p className="mt-0.5 text-sm text-zinc-400">
                          {achievement.description}
                        </p>
                      )}
                      {achievement.achieved && achievement.unlocktime != null && (
                        <p className="mt-1 text-xs font-medium text-cyan-400">
                          {t("unlockedOn", { date: formatDate(achievement.unlocktime) })}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}