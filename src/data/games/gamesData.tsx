/**
 * Game data used across the /favorites page.
 * Plain data lives in `gamesDataCore` (server-safe); this file keeps the client-only `GameCard` component.
 */

"use client"

import { Trophy, Gamepad2, Heart, Star, Calendar, Zap } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { Game } from "./gamesDataCore";

export { favoriteGames } from "./gamesDataCore";

export const GameCard = ({ game, index }: { game: Game; index: number }) => {
  const t = useTranslations("games.card");
  const cardRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "playing":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "favorite":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Trophy className="h-4 w-4" />;
      case "playing":
        return <Gamepad2 className="h-4 w-4" />;
      case "favorite":
        return <Heart className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div
      ref={cardRef}
      className="game-card group relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-cyan-500/50 transition-all duration-500"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent z-10"></div>
        <Image
          src={game.imageUrl || "/placeholder.svg"}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Status badge */}
        <div
          className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            game.status
          )} backdrop-blur-sm flex items-center gap-1`}
        >
          {getStatusIcon(game.status)}
          {t(game.status)}
        </div>

        {/* Rating */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-zinc-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < game.rating
                  ? "text-cyan-400 fill-cyan-400"
                  : "text-zinc-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {game.year}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              {game.hours}
            </span>
          </div>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">{t("genre")}</div>
            <div className="text-sm font-medium text-cyan-300">
              {game.genre}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-xs text-zinc-500">{t("platform")}</div>
            <div className="text-sm font-medium text-cyan-300">
              {game.platform}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>{t("achievements")}</span>
            <span>{game.achievements}%</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 achievement-bar"
              style={{ width: `${game.achievements}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};