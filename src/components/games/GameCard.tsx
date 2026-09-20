"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Clock, Star, Trophy } from "lucide-react"
import type { Game } from "@/lib/games/types"

interface GameCardProps {
  game: Game
  onOpenDetails?: (game: Game) => void
}

const SOURCE_STYLES: Record<Game["source"], string> = {
  steam: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  epic: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  gog: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  fallback: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
}

const SOURCE_LABELS: Record<Game["source"], string> = {
  steam: "Steam",
  epic: "Epic",
  gog: "GOG",
  fallback: "Pick",
}

function formatHours(minutes?: number): string | null {
  if (minutes == null) return null
  const hours = minutes / 60
  return hours >= 100
    ? `${Math.round(hours)}h`
    : `${Math.round(hours * 10) / 10}h`
}

export function GameCard({ game, onOpenDetails }: GameCardProps) {
  const t = useTranslations("games.library")

  const hours = formatHours(game.playtimeMinutes)
  const achievementsProgress = game.achievementsProgress
  const achievementsInfo =
    game.achievementsUnlocked != null && game.achievementsTotal != null
      ? { unlocked: game.achievementsUnlocked, total: game.achievementsTotal }
      : game.achievementsTotal != null
        ? { unlocked: null, total: game.achievementsTotal }
        : null

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10">
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        {game.coverUrl ? (
          <Image
            src={game.coverUrl}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <Trophy className="h-10 w-10 text-zinc-600" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/10 to-transparent" />

        {/* Platform badge */}
        <span
          className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm ${SOURCE_STYLES[game.source]}`}
        >
          {SOURCE_LABELS[game.source]}
        </span>

        {/* Rating */}
        {game.rating != null && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-zinc-950/80 px-2 py-1 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-cyan-400 text-cyan-400" />
            <span className="text-xs font-semibold text-zinc-100 tabular-nums">
              {game.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold text-zinc-50 transition-colors group-hover:text-cyan-300 line-clamp-1">
            {game.title}
          </h3>
          {game.genres.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {game.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-400"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Playtime */}
        {hours && (
          <div className="flex items-center gap-1.5 text-sm text-zinc-300">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold tabular-nums">{hours}</span>
            <span className="text-zinc-500">{t("played")}</span>
          </div>
        )}

        {/* Achievements */}
        {achievementsProgress != null && (
          <div className="mt-auto space-y-1.5">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-indigo-400" />
                {t("achievements")}
              </span>
              <span className="tabular-nums">{achievementsProgress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                style={{ width: `${achievementsProgress}%` }}
              />
            </div>
          </div>
        )}

        {achievementsInfo && (
          <div className="mt-auto">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/25 bg-indigo-500/10 px-2 py-1 text-[11px] font-medium text-indigo-300">
              <Trophy className="h-3.5 w-3.5" />
              {achievementsInfo.unlocked != null
                ? `${achievementsInfo.unlocked}/${achievementsInfo.total} ${t("achievements").toLowerCase()}`
                : `${achievementsInfo.total} ${t("achievements").toLowerCase()}`}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-2 flex items-center gap-2">
          {game.storeUrl && (
            <a
              href={game.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-zinc-700 px-3 py-1.5 text-center text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
            >
              {t("openStore")}
            </a>
          )}
          {game.hasDetails && onOpenDetails && (
            <button
              onClick={() => onOpenDetails(game)}
              className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              {t("viewAchievements")}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}