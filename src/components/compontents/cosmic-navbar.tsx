"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin()
}

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

const CosmicNavbar = ({ links, currentPath = "" }: CosmicNavbarProps) => {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowDimensions, setWindowDimensions] = useState({ width: 1920, height: 1080 })
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const topHeaderRef = useRef<HTMLElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  // Only generate stars on client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [currentPath])

  // Scroll detection and animations
  useEffect(() => {
    if (!mounted) return

    let lastScrollY = 0
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const shouldBeScrolled = scrollPosition > 100

      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled)

        // Animate top header
        if (topHeaderRef.current) {
          gsap.to(topHeaderRef.current, {
            y: shouldBeScrolled ? -100 : 0,
            opacity: shouldBeScrolled ? 0 : 1,
            duration: 0.6,
            ease: "power3.out",
          })
        }

        // Animate bottom nav
        if (bottomNavRef.current) {
          gsap.to(bottomNavRef.current, {
            y: shouldBeScrolled ? 0 : 100,
            opacity: shouldBeScrolled ? 1 : 0,
            duration: 0.6,
            ease: "power3.out",
            pointerEvents: shouldBeScrolled ? "auto" : "none",
          })
        }
      }

      lastScrollY = scrollPosition
    }

    // Mouse tracking for glow effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / windowDimensions.width) * 100
      const y = (e.clientY / windowDimensions.height) * 100
      setMousePosition({ x, y })

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          left: `${x}%`,
          top: `${y}%`,
          duration: 0.5,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
        })
      }
    }

    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [isScrolled, mounted, windowDimensions])

  // Generate random stars
  const generateStars = (count: number) => {
    if (!mounted) return []

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.8 ? 1 : 2,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }))
  }

  const stars = generateStars(30)

  return (
    <>
      {/* TOP HEADER */}
      <header
        ref={topHeaderRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out"
      >
        {/* Starfield background */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted &&
            stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: parseFloat(star.animationDuration),
                  delay: parseFloat(star.animationDelay),
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
        </div>

        {/* Shooting star */}
        {mounted && (
          <motion.div
            className="absolute h-px bg-white"
            style={{ width: "40px", transform: "rotate(-45deg)" }}
            initial={{ top: "-10%", left: "-10%", opacity: 0 }}
            animate={{
              top: ["0%", "100%"],
              left: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 7,
            }}
          />
        )}

        {/* Glow effect following mouse */}
        <div
          ref={glowRef}
          className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900/60 to-purple-900/40 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />

        {/* Border and nav content */}
        <div className="relative border-b border-white/10 shadow-2xl shadow-purple-500/10">
          <div className="container mx-auto px-4 py-5">
            {/* Mobile menu button */}
            <div className="md:hidden flex justify-end">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none hover:text-purple-300 transition-colors"
                aria-label="Toggle menu"
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
                      className={`relative text-xs font-medium transition-all duration-300 ${
                        isActive ? "text-white" : "text-purple-200 hover:text-white"
                      } flex items-center gap-2 px-3 py-2 rounded-lg`}
                    >
                      {/* Hover background */}
                      {!isActive && (
                        <motion.div
                          className="absolute -inset-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100"
                          layoutId={`hover-bg-${link.href}`}
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}

                      {/* Icon */}
                      <span className="relative z-10 flex items-center justify-center w-4 h-4">
                        {link.icon}
                      </span>

                      {/* Tooltip label (appears on hover) */}
                      <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap">
                        {link.shortLabel || link.label}
                      </span>

                      {/* Active underline */}
                      {isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-violet-400"
                          layoutId="navbar-indicator"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>

                    {/* Tooltip on hover */}
                    {hoveredLink === link.href && (
                      <motion.div
                        className="absolute bottom-full mb-2 px-2 py-1 bg-purple-900/90 text-purple-100 text-xs rounded whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-purple-900/90" />
                      </motion.div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Mobile menu drawer */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 w-full bg-slate-950/70 backdrop-blur-xl border-b border-white/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto px-4 py-4">
                <ul className="space-y-2">
                  {links.map((link) => {
                    const isActive = currentPath === link.href
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? "text-white bg-purple-800/50 border-l-2 border-purple-400"
                              : "text-purple-200 hover:text-white hover:bg-purple-800/30"
                          }`}
                        >
                          <span className="flex items-center justify-center w-5 h-5">{link.icon}</span>
                          <span>{link.label}</span>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* BOTTOM FIXED NAVIGATION */}
      <div
        ref={bottomNavRef}
        className="fixed bottom-0 left-0 right-0 z-50 opacity-0 translate-y-full pointer-events-none transition-all duration-700 ease-out"
        style={{ pointerEvents: "none" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900/60 to-purple-900/40 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />

        <div className="relative border-t border-white/10 shadow-2xl shadow-purple-500/10">
          <div className="container mx-auto px-4 py-3">
            <ul className="hidden md:flex space-x-3 justify-center items-center">
              {links.map((link) => {
                const isActive = currentPath === link.href
                return (
                  <li key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={`relative text-xs font-medium transition-all duration-300 px-3 py-2 rounded-full flex items-center gap-1 ${
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
