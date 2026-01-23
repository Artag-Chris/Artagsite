"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Server, Globe, Code, Palette, FileText, Monitor, Cpu, HardDrive, Network } from "lucide-react"
import { getStatusColor, serverCards, websiteCards } from "@/data/serverAndResources/serverAndResourcesData"

gsap.registerPlugin(ScrollTrigger)



export default function ResourcesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Animate website cards
      gsap.utils.toArray(".website-card").forEach((card, index) => {
        gsap.from(card as Element, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card as Element,
            start: "top 85%",
          },
        })
      })

      // Animate server cards
      gsap.utils.toArray(".server-card").forEach((card, index) => {
        gsap.from(card as Element, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card as Element,
            start: "top 85%",
          },
        })
      })

      // Animate section headers
      gsap.utils.toArray(".section-header").forEach((header) => {
        gsap.from(header as Element, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header as Element,
            start: "top 90%",
          },
        })
      })

      // Progress bar animation
      gsap.to(".progress-bar", {
        scaleX: 1,
        transformOrigin: "left left",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })
    },
    { scope: containerRef },
  )


  return (
    <main ref={containerRef} className="bg-zinc-900 min-h-screen">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-40">
        <div className="progress-bar h-full bg-purple-500 scale-x-0"></div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-7xl mx-auto space-y-20">
        {/* Page intro */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Resources & Infrastructure</h1>
          <p className="text-zinc-300 max-w-3xl mx-auto text-base">
            A curated collection of useful websites and tools, plus my personal server infrastructure projects. Everything
            I use to build, deploy, and maintain modern applications.
          </p>
        </div>

        {/* Private Servers Section - NOW FIRST */}
        <section>
          <div className="section-header text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Server className="h-7 w-7 text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Personal Infrastructure</h2>
            </div>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
              My personal infrastructure projects and self-hosted services
            </p>
          </div>

          {/* Live Servers Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {serverCards
              .filter((server) => server.status === "live")
              .map((server) => (
                <div
                  key={server.id}
                  className="server-card group bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-sm rounded-lg border border-emerald-500/30 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent z-10"></div>
                    <Image
                      src={server.imageUrl || "/placeholder.svg"}
                      alt={server.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-medium rounded-full">
                        🟢 Live
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        {server.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                          {server.title}
                        </h3>
                        <span className="text-xs text-emerald-400">{server.category}</span>
                      </div>
                    </div>

                    <p className="text-zinc-300 text-xs mb-3">{server.description}</p>

                    <div className="space-y-2 mb-4">
                      <div>
                        <h4 className="text-xs font-medium text-emerald-400 mb-1">Tech</h4>
                        <div className="flex flex-wrap gap-1">
                          {server.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {server.url ? (
                      <a
                        href={server.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 hover:from-emerald-500/30 hover:to-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                      >
                        Access Server <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <button className="w-full px-3 py-2 bg-zinc-700/50 text-zinc-400 rounded-lg text-xs font-medium cursor-default">
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Other Status Servers */}
          {serverCards.some((s) => s.status !== "live") && (
            <div>
              <h3 className="text-lg font-bold text-zinc-300 mb-4 ml-1">Other Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {serverCards
                  .filter((server) => server.status !== "live")
                  .map((server) => (
                    <div
                      key={server.id}
                      className="server-card group bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10"></div>
                        <Image
                          src={server.imageUrl || "/placeholder.svg"}
                          alt={server.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 z-20">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${
                              server.status === "development"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                            }`}
                          >
                            {server.status === "development" ? "🔨 Dev" : "📋 Planning"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                            {server.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                              {server.title}
                            </h3>
                            <span className="text-xs text-purple-400">{server.category}</span>
                          </div>
                        </div>

                        <p className="text-zinc-300 text-xs mb-3">{server.description}</p>

                        <div className="space-y-2">
                          <div>
                            <h4 className="text-xs font-medium text-purple-400 mb-1">Tech</h4>
                            <div className="flex flex-wrap gap-1">
                              {server.technologies.slice(0, 3).map((tech) => (
                                <span key={tech} className="px-2 py-0.5 bg-purple-500/10 text-purple-300 text-xs rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>

        {/* Useful Websites Section - NOW SECOND */}
        <section>
          <div className="section-header text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Globe className="h-7 w-7 text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Useful Websites</h2>
            </div>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm">
              Essential tools and platforms that power my development workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {websiteCards.map((website) => (
              <div
                key={website.id}
                className="website-card group bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10"></div>
                  <Image
                    src={website.imageUrl || "/placeholder.svg"}
                    alt={website.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                      {website.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                        {website.title}
                      </h3>
                      <span className="text-xs text-purple-400">{website.category}</span>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-xs mb-3 line-clamp-2">{website.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {website.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-purple-500/10 text-purple-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors text-xs font-medium"
                  >
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA section */}
        <div className="text-center max-w-2xl mx-auto px-4 py-6 bg-gradient-to-br from-purple-500/5 to-emerald-500/5 border border-purple-500/10 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <Network className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-white">Infrastructure in Growth</h3>
          <p className="text-zinc-300 text-sm">
            These resources and infrastructure projects represent my commitment to continuous learning and building robust, scalable
            solutions. Always exploring new technologies and expanding my infrastructure.
          </p>
        </div>
      </div>
      </div>
    </main>
  )
}