"use client"

import { Gamepad2 } from "lucide-react"
import { useTranslations } from "next-intl"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GameLibrary from "@/components/games/GameLibrary"
import GamePlatformsSection from "./GamePlatformsSection"

gsap.registerPlugin(ScrollTrigger)

export default function FavoriteGamesPage() {
  const t = useTranslations("games")
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Title entrance
      gsap.from(".page-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })

      // Section titles as they scroll in
      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title as Element, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title as Element,
            start: "top 90%",
          },
        })
      })
    },
    { scope: containerRef },
  )

  return (
    <main ref={containerRef} className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-10 pt-32 md:pt-40">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="page-title mb-6 text-4xl font-bold md:text-6xl">
            {t("title")}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {t("titleAccent")}
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-zinc-300">
            {t("intro")}
          </p>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("game-library")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30"
          >
            <Gamepad2 className="h-4 w-4" />
            {t("exploreLibrary")}
          </button>
        </div>

        {/* Unified library — Steam live + curated Epic/GOG via RAWG */}
        <GameLibrary />

        {/* Gaming Platforms Section */}
        <GamePlatformsSection />

        {/* Footer */}
        <div className="mt-16 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20">
            <Gamepad2 className="h-8 w-8 text-cyan-400" />
          </div>
          <h3 className="section-title mb-4 text-2xl font-bold text-white">
            {t("gamingNeverStops")}
          </h3>
          <p className="mx-auto max-w-md text-zinc-300">
            {t("gamingClosing")}
          </p>
        </div>
      </div>
    </main>
  )
}