"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface PlatformStat {
  key: string
  labelKey: string
}

interface Platform {
  name: string
  icon: "🎮" | "⚔️" | "🕹️"
  gradient: string
  borderColor: string
  hoverBorderColor: string
  bgColor: string
  hoverBgColor: string
  hoverShadow: string
  stats: PlatformStat[]
  /** Empty string hides the "Visit profile" button (e.g. profile not linked yet) */
  link: string
  description: string
}

export default function GamePlatformsSection() {
  const t = useTranslations("games.platforms")
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Animate platform cards
      gsap.utils.toArray(".platform-card").forEach((card, index) => {
        gsap.from(card as Element, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 80%",
          },
          delay: index * 0.2,
        })
      })

      // Animate stats
      gsap.utils.toArray(".platform-stat").forEach((stat) => {
        gsap.from(stat as Element, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: stat as Element,
            start: "top 85%",
          },
        })
      })

      // Animate visit profile buttons
      gsap.utils.toArray(".visit-profile-btn").forEach((btn, index) => {
        gsap.from(btn as Element, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: btn as Element,
            start: "top 80%",
          },
          delay: index * 0.1,
        })
      })
    },
    { scope: containerRef },
  )

  const platforms: Platform[] = [
    {
      name: "Steam",
      icon: "🎮",
      gradient: "from-cyan-500 to-cyan-400",
      borderColor: "border-cyan-500/30",
      hoverBorderColor: "hover:border-cyan-500/70",
      bgColor: "bg-cyan-500/5",
      hoverBgColor: "hover:bg-cyan-500/10",
      hoverShadow: "hover:shadow-cyan-500/20",
      stats: [
        { key: "Live", labelKey: "steamLive" },
        { key: "Real", labelKey: "steamPlaytime" },
        { key: "100%", labelKey: "steamAchieve" },
      ],
      link: "https://steamcommunity.com/id/Artag-chris/",
      description:
        "My real PC library, automatically synced with my Steam profile — hours played, achievements, and all the games I own.",
    },
    {
      name: "Epic Games",
      icon: "⚔️",
      gradient: "from-indigo-500 to-indigo-400",
      borderColor: "border-indigo-500/30",
      hoverBorderColor: "hover:border-indigo-500/70",
      bgColor: "bg-indigo-500/5",
      hoverBgColor: "hover:bg-indigo-500/10",
      hoverShadow: "hover:shadow-indigo-500/20",
      stats: [
        { key: "2018", labelKey: "epicMember" },
        { key: "Soon", labelKey: "epicPending" },
        { key: "—", labelKey: "epicRawg" },
      ],
      link: "https://store.epicgames.com/en-US/u/f38fecb99ad44927ae569ec6b9549220",
      description:
        "My Epic Games profile. Epic has no public library API, so my picks need a hand-maintained list — I'll bring them into the library once I can access the account.",
    },
    {
      name: "GOG",
      icon: "🕹️",
      gradient: "from-zinc-500 to-zinc-400",
      borderColor: "border-zinc-500/30",
      hoverBorderColor: "hover:border-zinc-500/70",
      bgColor: "bg-zinc-500/5",
      hoverBgColor: "hover:bg-zinc-500/10",
      hoverShadow: "hover:shadow-zinc-500/20",
      stats: [
        { key: "Soon", labelKey: "gogPending" },
        { key: "DRM", labelKey: "gogClassics" },
        { key: "—", labelKey: "gogRawg" },
      ],
      // ⚠️ Add your GOG profile URL here (https://www.gog.com/u/<username>) to show the button
      link: "",
      description:
        "My GOG selection — DRM-free classics and indies. Same as Epic: no public library API, so it's a hand-maintained list I'll fill in as soon as I recover my account.",
    },
  ]

  return (
    <div ref={containerRef} className="my-20">
      {/* Section Title */}
      <div className="mb-16 text-center">
        <h2 className="section-title mb-4 text-3xl font-bold text-white md:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl text-zinc-300">
          {t("subtitle")}
        </p>
      </div>

      {/* Platform Cards - Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className={`platform-card ${platform.bgColor} ${platform.hoverBgColor} border ${platform.borderColor} ${platform.hoverBorderColor} ${platform.hoverShadow} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg`}
          >
            {/* Platform Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="text-4xl">{platform.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                <p className="text-sm text-zinc-400">{t("gamingPlatform")}</p>
              </div>
            </div>

            {/* Description */}
            <p className="mb-6 text-sm leading-relaxed text-zinc-300 md:text-base">
              {platform.description}
            </p>

            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              {platform.stats.map((stat, statIndex) => (
                <div
                  key={statIndex}
                  className={`platform-stat ${platform.bgColor} border ${platform.borderColor} rounded-lg p-4 text-center transition-all duration-300`}
                >
                  <p
                    className={`bg-gradient-to-r ${platform.gradient} bg-clip-text text-sm font-bold text-transparent md:text-base`}
                  >
                    {stat.key}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-400">
                    {t(stat.labelKey)}
                  </p>
                </div>
              ))}
            </div>

            {/* Visit Profile Button */}
            {platform.link && (
              <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`visit-profile-btn inline-flex w-full transform items-center justify-center gap-2 bg-gradient-to-r ${platform.gradient} rounded-lg px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                {t("profile", { name: platform.name })}
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}