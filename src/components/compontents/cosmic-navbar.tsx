"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavLink {
  href: string
  label: string
  shortLabel?: string
  icon: React.ReactNode
}

interface CosmicNavbarProps {
  links: NavLink[]
  currentPath?: string
}

const STAR_COUNT = 8

// Deterministic positions — avoids hydration mismatch and Math.random in render.
function buildStars(count: number) {
  const stars: { top: string; left: string; size: number; delay: string; duration: string }[] = []
  for (let i = 0; i < count; i++) {
    // Pseudo-random-but-stable placement.
    const t = (i * 73) % 100
    const l = (i * 137) % 100
    stars.push({
      top: `${t}%`,
      left: `${l}%`,
      size: i % 5 === 0 ? 2 : 1,
      delay: `${(i * 0.4) % 5}s`,
      duration: `${2 + (i % 3)}s`,
    })
  }
  return stars
}

const CosmicNavbar = ({ links, currentPath = "" }: CosmicNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const topHeaderRef = useRef<HTMLElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const stars = useMemo(() => buildStars(STAR_COUNT), [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [currentPath])

  // Scroll detection — boolean toggle, rAF-batched.
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 100)
        ticking = false
      })
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse glow — direct DOM via CSS variables, no React state, no GSAP.
  // Skip on touch / coarse-pointer devices entirely.
  useEffect(() => {
    if (typeof window === "undefined") return
    const fine = window.matchMedia("(pointer: fine)")
    if (!fine.matches) return

    let raf = 0
    let pendingX = 0
    let pendingY = 0

    const apply = () => {
      raf = 0
      const el = glowRef.current
      if (!el) return
      el.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0) translate(-50%, -50%)`
    }

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX
      pendingY = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* TOP HEADER */}
      <header
        ref={topHeaderRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-[transform,opacity] duration-500 ease-out ${
          isScrolled ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Starfield (CSS only) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {stars.map((star, i) => (
            <span
              key={i}
              className="cosmic-star-css"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                ["--star-delay" as string]: star.delay,
                ["--star-duration" as string]: star.duration,
              }}
            />
          ))}
        </div>

        {/* Glow effect following mouse (top-layer, fixed, CSS-translated via ref) */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="fixed top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none will-change-transform"
        />

        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900/60 to-purple-900/40 backdrop-blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"
        />

        {/* Border and nav content */}
        <div className="relative border-b border-white/10 shadow-2xl shadow-purple-500/10">
          <div className="container mx-auto px-4 py-5">
            {/* Mobile menu button */}
            <div className="md:hidden flex justify-end">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none hover:text-purple-300 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop menu */}
            <ul className="hidden md:flex space-x-6 justify-center items-center py-3">
              {links.map((link) => {
                const isActive = currentPath === link.href
                return (
                  <li
                    key={link.href}
                    className="group relative"
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative text-xs font-medium transition-colors duration-200 ${
                        isActive ? "text-white" : "text-purple-200 hover:text-white"
                      } flex items-center gap-2 px-3 py-2 rounded-lg`}
                    >
                      {!isActive && (
                        <span className="absolute -inset-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}

                      <span className="relative z-10 flex items-center justify-center w-4 h-4">{link.icon}</span>

                      <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap">
                        {link.shortLabel || link.label}
                      </span>

                      {isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400"
                          layoutId="navbar-indicator"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>

                    {hoveredLink === link.href && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-purple-900/90 text-purple-100 text-xs rounded whitespace-nowrap pointer-events-none animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
                        {link.label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-purple-900/90" />
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Mobile menu drawer */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 w-full bg-slate-950/70 backdrop-blur-xl border-b border-white/10 animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div className="container mx-auto px-4 py-4">
                <ul className="space-y-2">
                  {links.map((link) => {
                    const isActive = currentPath === link.href
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? "text-white bg-purple-800/50 border-l-2 border-purple-400"
                              : "text-purple-200 hover:text-white hover:bg-purple-800/30"
                          }`}
                        >
                          <span className="flex items-center justify-center w-5 h-5">{link.icon}</span>
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* BOTTOM FIXED NAVIGATION */}
      <div
        ref={bottomNavRef}
        className={`fixed bottom-0 left-0 right-0 z-50 transition-[transform,opacity] duration-500 ease-out ${
          isScrolled ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900/60 to-purple-900/40 backdrop-blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"
        />

        <div className="relative border-t border-white/10 shadow-2xl shadow-purple-500/10">
          <div className="container mx-auto px-4 py-3">
            <ul className="hidden md:flex space-x-3 justify-center items-center">
              {links.map((link) => {
                const isActive = currentPath === link.href
                return (
                  <li key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={`relative text-xs font-medium transition-colors duration-200 px-3 py-2 rounded-full flex items-center gap-1 ${
                        isActive
                          ? "text-white bg-purple-800/50 shadow-lg shadow-purple-500/20"
                          : "text-purple-200 hover:text-white hover:bg-purple-800/30"
                      }`}
                    >
                      <span className="flex items-center justify-center w-4 h-4">{link.icon}</span>
                      <span className="hidden lg:inline">{link.shortLabel || link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default CosmicNavbar
