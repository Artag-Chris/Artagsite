"use client"

import { Gamepad2, ExternalLink, Users, Trophy, Flame } from "lucide-react"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { favoriteGames, GameCard } from "@/data/games/gamesData"

gsap.registerPlugin(ScrollTrigger)

export default function FavoriteGamesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Subtle entrance animation for cards
      gsap.utils.toArray(".game-card").forEach((card, index) => {

        // Subtle entrance animation - cards fade in from top
        gsap.from(card as Element, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 85%",
          },
          delay: index * 0.08,
        })

        // Subtle hover effect - scale and shadow only
        const cardElement = card as HTMLElement
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(card as Element, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(card as Element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Animate achievement bars
      gsap.utils.toArray(".achievement-bar").forEach((bar) => {
        gsap.from(bar as Element, {
          width: "0%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar as Element,
            start: "top 80%",
          },
        })
      })

      // Title animation
      gsap.from(".page-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })

      // Stagger animation for stats
      gsap.from(".game-stat", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      })

      // Animate platform links
      gsap.from(".platform-link", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      })

      // Animate Steam section
      gsap.from(".steam-section", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: ".steam-section",
          start: "top 85%",
        },
      })

      // Animate Steam stats with stagger
      gsap.from(".steam-stat", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: ".steam-section",
          start: "top 85%",
        },
      })

      // Animate Steam profile link
      gsap.from(".steam-profile-link", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: ".steam-section",
          start: "top 85%",
        },
      })
    },
    { scope: containerRef },
  )

  const totalHours = favoriteGames.reduce((acc, game) => {
    const hours = Number.parseInt(game.hours.replace("+", ""))
    return acc + hours
  }, 0)

  const averageRating = (favoriteGames.reduce((acc, game) => acc + game.rating, 0) / favoriteGames.length).toFixed(1)

  return (
    <main ref={containerRef} className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-10">
         {/* Navigation */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
           {/* Platform links */}
           <div className="flex gap-4">
            <a
              href="https://steamcommunity.com/id/Artag-chris/"
              target="_blank"
              rel="noopener noreferrer"
              className="platform-link group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 text-blue-400 hover:from-blue-600/30 hover:to-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
            >
              {/* Steam Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.979 0C5.678 0 0.511 4.86 0.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.624 0 11.979-5.354 11.979-11.979C23.958 5.354 18.603.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.456-.397.957-1.497 1.41-2.454 1.01z" />
              </svg>
              <span className="text-sm font-medium">Steam</span>
              <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://store.epicgames.com/en-US/u/f38fecb99ad44927ae569ec6b9549220"
              target="_blank"
              rel="noopener noreferrer"
              className="platform-link group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-500/20 border border-purple-500/30 text-purple-400 hover:from-purple-600/30 hover:to-pink-500/30 hover:border-purple-400/50 transition-all duration-300"
            >
              {/* Epic Games Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 2L24 7v10l-11.5 5L1 17V7l11.5-5zm0 2.311L3.5 8.5v7l9 3.689 9-3.689v-7l-9-4.189zM12.5 6.5L20 10v4l-7.5 3L5 14v-4l7.5-3.5zm0 1.811L7.5 11v2l5 2 5-2v-2l-5-2.689z" />
              </svg>
              <span className="text-sm font-medium">Epic Games</span>
              <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="page-title text-4xl md:text-6xl font-bold mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Favorite Games
            </span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            A curated collection of the games that have shaped my gaming journey and provided countless hours of
            entertainment.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="game-stat text-center">
              <div className="text-3xl font-bold text-pink-400">{favoriteGames.length}</div>
              <div className="text-sm text-zinc-400">Games</div>
            </div>
            <div className="game-stat text-center">
              <div className="text-3xl font-bold text-pink-400">{totalHours}+</div>
              <div className="text-sm text-zinc-400">Hours Played</div>
            </div>
            <div className="game-stat text-center">
              <div className="text-3xl font-bold text-pink-400">{averageRating}</div>
              <div className="text-sm text-zinc-400">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Follow Me on Steam Section */}
        <div className="mb-16 steam-section">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent border border-blue-500/30 backdrop-blur-sm p-8 md:p-12">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Left side - Steam profile info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                      <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.979 0C5.678 0 0.511 4.86 0.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.624 0 11.979-5.354 11.979-11.979C23.958 5.354 18.603.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.456-.397.957-1.497 1.41-2.454 1.01z" />
                      </svg>
                      <h2 className="text-2xl md:text-3xl font-bold text-blue-300">Follow Me on Steam</h2>
                    </div>

                    <p className="text-zinc-300 mb-6 max-w-md mx-auto md:mx-0">
                      Connect with me on my Steam profile to see all my games, achievements, and gaming activity. Let's play together!
                    </p>

                    <a
                      href="https://steamcommunity.com/id/Artag-chris/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="steam-profile-link inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                    >
                      View My Profile
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Right side - Stats */}
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="steam-stat text-center bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                      <div className="flex justify-center mb-2">
                        <Gamepad2 className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-300">{favoriteGames.length}</div>
                      <div className="text-xs text-zinc-400">Favorite Games</div>
                    </div>

                    <div className="steam-stat text-center bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                      <div className="flex justify-center mb-2">
                        <Trophy className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-300">100+</div>
                      <div className="text-xs text-zinc-400">Achievements</div>
                    </div>

                    <div className="steam-stat text-center bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                      <div className="flex justify-center mb-2">
                        <Flame className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-300">{totalHours}+</div>
                      <div className="text-xs text-zinc-400">Hours Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {favoriteGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <Gamepad2 className="h-8 w-8 text-pink-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Gaming Never Stops</h3>
          <p className="text-zinc-300 max-w-md mx-auto">
            Always on the lookout for the next great adventure. What game should I play next?
          </p>
        </div>
      </div>
    </main>
  )
}
