"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Gamepad2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function GamePlatformsSection() {
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

  const platforms = [
    {
      name: "Steam",
      icon: "🎮",
      color: "from-blue-600 to-blue-500",
      borderColor: "border-blue-500/30",
      hoverBorderColor: "hover:border-blue-500/70",
      bgColor: "bg-blue-500/5",
      hoverBgColor: "hover:bg-blue-500/10",
      stats: [
        { label: "100+", value: "Achievements" },
        { label: "1000+", value: "Total Hours" },
        { label: "Level 60", value: "Steam Level" },
      ],
      link: "https://steamcommunity.com/id/Artag-chris/",
      description: "Connect with me on my Steam profile to see all my games, achievements, and gaming activity.",
    },
    {
      name: "Epic Games",
      icon: "⚔️",
      color: "from-purple-600 to-purple-500",
      borderColor: "border-purple-500/30",
      hoverBorderColor: "hover:border-purple-500/70",
      bgColor: "bg-purple-500/5",
      hoverBgColor: "hover:bg-purple-500/10",
      stats: [
        { label: "20+", value: "Games" },
        { label: "Epic Member", value: "Since 2018" },
        { label: "Active", value: "Player" },
      ],
      link: "https://store.epicgames.com/en-US/u/f38fecb99ad44927ae569ec6b9549220",
      description: "Follow me on Epic Games Store to see my library and connect on the Epic ecosystem.",
    },
  ]

  return (
    <div ref={containerRef} className="my-20">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Connect with Me on Gaming Platforms</h2>
        <p className="text-zinc-300 max-w-2xl mx-auto">
          Find me on Steam and Epic Games to see my gaming activity, achievements, and join me for some gaming!
        </p>
      </div>

      {/* Platform Cards - Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className={`platform-card ${platform.bgColor} ${platform.hoverBgColor} border ${platform.borderColor} ${platform.hoverBorderColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-${platform.name === "Steam" ? "blue" : "purple"}-500/20`}
          >
            {/* Platform Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`text-4xl`}>{platform.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                <p className="text-sm text-zinc-400">Gaming Platform</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">{platform.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {platform.stats.map((stat, statIndex) => (
                <div
                  key={statIndex}
                  className={`platform-stat text-center ${platform.bgColor} border ${platform.borderColor} rounded-lg p-4 transition-all duration-300`}
                >
                  <p className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${platform.color} text-transparent bg-clip-text`}>
                    {stat.label}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Visit Profile Button */}
            <a
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`visit-profile-btn w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${platform.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              Visit {platform.name} Profile
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
