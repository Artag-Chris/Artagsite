"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Menu, X, User, Code2, Rocket, Mail, BookOpen } from "lucide-react"
import { handleResumeDownload } from "@/functions/handleResumenDownload"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function HeaderMain() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scrollTicking = false

    const handleScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 100
        setIsScrolled((prev) => {
          if (prev === shouldBeScrolled) return prev
          if (headerRef.current) {
            gsap.to(headerRef.current, {
              y: shouldBeScrolled ? -100 : 0,
              opacity: shouldBeScrolled ? 0 : 1,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            })
          }
          if (bottomNavRef.current) {
            gsap.to(bottomNavRef.current, {
              y: shouldBeScrolled ? 0 : 100,
              opacity: shouldBeScrolled ? 1 : 0,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            })
          }
          return shouldBeScrolled
        })
        scrollTicking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: "About", icon: User },
    { href: "#skills", label: "What I Do", icon: Code2 },
    { href: "#projects", label: "Projects", icon: Rocket },
    { href: "#contact", label: "Let's Talk", icon: Mail },
  ]

  const externalNavLinks = [
    { href: "/currentStudies", label: "Studies", icon: BookOpen },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "transform -translate-y-full opacity-0" : "transform translate-y-0 opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
        <div className="relative border-b border-white/5">
          <div className="container mx-auto py-4 px-6 relative">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold tracking-tight group">
                <span className="text-white font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Artag
                </span>
                <span className="text-zinc-500 font-medium ml-1 group-hover:text-zinc-300 transition-colors duration-300">
                  Dev
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                   const IconComponent = link.icon
                   return (
                     <Link
                       key={link.href}
                       href={link.href}
                       className="group relative flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-white/5"
                     >
                       <IconComponent className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                       <span className="text-sm font-medium">{link.label}</span>
                     </Link>
                   )
                 })}
                 {externalNavLinks.map((link) => {
                   const IconComponent = link.icon
                   return (
                     <Link
                       key={link.href}
                       href={link.href}
                       className="group relative flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-white/5"
                     >
                       <IconComponent className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                       <span className="text-sm font-medium">{link.label}</span>
                     </Link>
                   )
                 })}
              </div>

              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg text-sm border border-transparent hover:border-white/10 hover:bg-white/5"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-zinc-500 hover:text-white hover:bg-white/10 transition-colors duration-200 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/5 shadow-2xl transform transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
           <div className="p-6 pt-20">
             <div className="flex flex-col gap-2">
               {navLinks.map((link) => {
                 const IconComponent = link.icon
                 return (
                   <Link
                     key={link.href}
                     href={link.href}
                     className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                     onClick={() => setIsMobileMenuOpen(false)}
                   >
                     <IconComponent className="w-5 h-5" />
                     <span className="font-medium">{link.label}</span>
                   </Link>
                 )
               })}
               {externalNavLinks.map((link) => {
                 const IconComponent = link.icon
                 return (
                   <Link
                     key={link.href}
                     href={link.href}
                     className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                     onClick={() => setIsMobileMenuOpen(false)}
                   >
                     <IconComponent className="w-5 h-5" />
                     <span className="font-medium">{link.label}</span>
                   </Link>
                 )
               })}
               <Button
                 variant="outline"
                 className="flex items-center justify-center gap-2 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors duration-200 mt-4 py-3"
                 onClick={() => {
                   handleResumeDownload()
                   setIsMobileMenuOpen(false)
                 }}
               >
                 <Download className="w-4 h-4" />
                 <span className="font-medium">Download Resume</span>
               </Button>
             </div>
           </div>
        </div>
      </div>

      {/* Bottom Nav (on scroll) */}
      <div
        ref={bottomNavRef}
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
        }`}
      >
        <div className="relative border-t border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-3">
            <nav className="flex items-center justify-between">
              <div className="text-lg font-bold cursor-pointer">
                <span className="text-white font-bold" style={{ fontFamily: 'var(--font-display)' }}>A</span>
                <span className="text-zinc-600 ml-1 font-medium">D</span>
              </div>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm py-2 px-3 rounded-lg hover:bg-white/5 font-medium"
                    >
                      {link.label}
                    </Link>
                    {index < navLinks.length - 1 && (
                      <div className="h-4 w-px bg-white/10 mx-1"></div>
                    )}
                  </div>
                ))}
                {externalNavLinks.map((link) => (
                  <div key={link.href} className="flex items-center">
                    <div className="h-4 w-px bg-white/10 mx-1"></div>
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm py-2 px-3 rounded-lg hover:bg-white/5 font-medium"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex md:hidden items-center gap-2">
                {navLinks.map((link) => {
                   const IconComponent = link.icon
                   return (
                     <Link
                       key={link.href}
                       href={link.href}
                       className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs flex flex-col items-center gap-1 py-1 px-2"
                     >
                       <IconComponent className="w-4 h-4" />
                       <span className="font-medium">{link.label}</span>
                     </Link>
                   )
                 })}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg text-sm border border-transparent hover:border-white/10 hover:bg-white/5"
                onClick={handleResumeDownload}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resume</span>
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  )
}

export default HeaderMain
