"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Menu, X, Sparkles, Zap, User, Code2, Rocket, Mail } from "lucide-react"
import { handleResumeDownload } from "@/functions/handleResumenDownload"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function HeaderMain() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowDimensions, setWindowDimensions] = useState({ width: 1920, height: 1080 })

  const headerRef = useRef<HTMLElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    let lastScrollY = 0
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const shouldBeScrolled = scrollPosition > 100

      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled)

        // Animación suave con GSAP
        if (headerRef.current) {
          gsap.to(headerRef.current, {
            y: shouldBeScrolled ? -100 : 0,
            opacity: shouldBeScrolled ? 0 : 1,
            duration: 0.6,
            ease: "power3.out",
          })
        }

        if (bottomNavRef.current) {
          gsap.to(bottomNavRef.current, {
            y: shouldBeScrolled ? 0 : 100,
            opacity: shouldBeScrolled ? 1 : 0,
            duration: 0.6,
            ease: "power3.out",
          })
        }
      }

      lastScrollY = scrollPosition
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
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
  }, [isScrolled])

  const navLinks = [
    { href: "#about", label: "About", icon: User },
    { href: "#skills", label: "Skills", icon: Code2 },
    { href: "#projects", label: "Projects", icon: Rocket },
    { href: "#contact", label: "Contact", icon: Mail },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled ? "transform -translate-y-full opacity-0" : "transform translate-y-0 opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-950/60 to-violet-950/40 backdrop-blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent"></div>

        <div className="relative border-b border-white/10 shadow-2xl shadow-indigo-500/10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-3 h-3 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-full animate-pulse blur-sm"
              style={{
                left: `${(mousePosition.x / windowDimensions.width) * 100}%`,
                top: `${(mousePosition.y / windowDimensions.height) * 100}%`,
                transform: `translate(-50%, -50%)`,
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
            <Sparkles
              className="absolute top-6 right-32 w-5 h-5 text-indigo-400/50 animate-pulse"
              style={{ animationDelay: "1s", animationDuration: "3s" }}
            />
            <Zap
              className="absolute top-8 left-1/3 w-4 h-4 text-violet-400/40 animate-pulse"
              style={{ animationDelay: "2s", animationDuration: "2.5s" }}
            />
            <div className="absolute top-4 left-1/4 w-2 h-2 bg-indigo-500/30 rounded-full animate-pulse blur-sm"></div>
            <div className="absolute bottom-4 right-1/4 w-2 h-2 bg-violet-500/30 rounded-full animate-pulse blur-sm"></div>
          </div>

          <div className="container mx-auto py-5 px-6 relative">
            <nav className="flex items-center justify-between">
              <div className="text-2xl font-bold group cursor-pointer relative">
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-extrabold tracking-tight transition-all duration-500 group-hover:scale-110 inline-block">
                  Artag
                </span>
                <span className="text-slate-200 ml-2 transition-all duration-500 group-hover:text-indigo-300 font-semibold">
                  Dev
                </span>
                <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 transition-all duration-700 ease-out group-hover:w-full rounded-full shadow-lg shadow-indigo-500/50"></div>
              </div>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <div key={link.href} className="flex items-center">
                      <Link
                        href={link.href}
                        className="group relative flex items-center gap-2.5 text-slate-300 hover:text-white transition-all duration-500 hover:scale-105 py-2.5 px-5 rounded-full hover:bg-gradient-to-br hover:from-indigo-500/10 hover:to-violet-500/10 backdrop-blur-sm"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <IconComponent className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12 group-hover:text-indigo-400" />
                        <span className="font-medium tracking-wide">{link.label}</span>
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 transition-all duration-500 group-hover:w-4/5 group-hover:left-[10%] rounded-full shadow-lg shadow-indigo-500/50"></span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/0 to-violet-500/0 opacity-0 group-hover:from-indigo-500/10 group-hover:to-violet-500/10 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
                      </Link>
                      {index < navLinks.length - 1 && (
                        <div className="h-6 w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent mx-1"></div>
                      )}
                    </div>
                  )
                })}
              </div>

              <Button
                variant="outline"
                className="hidden md:flex items-center gap-3 border border-indigo-500/50 text-indigo-300 hover:text-white hover:border-indigo-400 transition-all duration-500 hover:scale-105 backdrop-blur-xl bg-gradient-to-br from-indigo-950/50 to-violet-950/50 hover:from-indigo-500/20 hover:to-violet-500/20 group relative overflow-hidden px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                onClick={handleResumeDownload}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Download className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500 relative z-10" />
                <span className="relative z-10">Resume</span>
                <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-500 relative z-10 text-indigo-400" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-300 hover:text-white hover:bg-indigo-500/20 transition-all duration-300 hover:scale-110 rounded-full border border-transparent hover:border-indigo-500/30"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-gradient-to-br from-indigo-950/95 via-slate-950/95 to-violet-950/95 backdrop-blur-2xl border-l border-indigo-500/20 shadow-2xl shadow-indigo-500/20 transform transition-all duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-8 pt-24">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-4 text-slate-300 hover:text-white transition-all duration-300 text-lg py-4 px-5 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 hover:from-indigo-500/20 hover:to-violet-500/20 group border border-indigo-500/10 hover:border-indigo-500/30 shadow-lg hover:shadow-indigo-500/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12 text-indigo-400" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                )
              })}
              <Button
                variant="outline"
                className="flex items-center justify-center gap-3 border-indigo-500/50 text-indigo-300 hover:text-white hover:border-indigo-400 transition-all duration-300 mt-4 bg-gradient-to-br from-indigo-950/50 to-violet-950/50 hover:from-indigo-500/20 hover:to-violet-500/20 rounded-2xl py-4 group shadow-lg shadow-indigo-500/20"
                onClick={() => {
                  handleResumeDownload()
                  setIsMobileMenuOpen(false)
                }}
              >
                <Download className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-semibold">Download Resume</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomNavRef}
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
        }`}
      >
        <div className="relative border-t border-white/10 bg-gradient-to-br from-indigo-950/40 via-slate-950/60 to-violet-950/40 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent"></div>

          <div className="container mx-auto px-6 py-3.5 relative">
            <nav className="flex items-center justify-between">
              <div className="text-xl font-bold group cursor-pointer">
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-extrabold">
                  A
                </span>
                <span className="text-slate-300 ml-1.5 group-hover:text-indigo-300 transition-colors duration-300 font-semibold">
                  D
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-all duration-300 text-sm hover:scale-105 py-2 px-4 rounded-full hover:bg-gradient-to-br hover:from-indigo-500/10 hover:to-violet-500/10 font-medium tracking-wide"
                    >
                      {link.label}
                    </Link>
                    {index < navLinks.length - 1 && (
                      <div className="h-4 w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent mx-0.5"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex md:hidden items-center gap-3">
                {navLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <div key={link.href} className="flex items-center">
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-all duration-300 text-xs hover:scale-110 flex flex-col items-center gap-1.5 py-1"
                      >
                        <IconComponent className="w-4 h-4 text-indigo-400" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                      {index < navLinks.length - 1 && (
                        <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent mx-2"></div>
                      )}
                    </div>
                  )
                })}
              </div>

              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white border-0 transition-all duration-500 hover:scale-105 flex items-center gap-2.5 px-5 py-2 rounded-full font-semibold group relative overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                onClick={handleResumeDownload}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Download className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="hidden sm:inline relative z-10">Resume</span>
                <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10" />
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>
    </>
  )
}

export default HeaderMain
