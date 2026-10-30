"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Link as LocaleLink } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Download, Menu, X } from "lucide-react"
import { handleResumeDownload } from "@/functions/handleResumenDownload"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { ViewModeSwitcher } from "@/components/ViewModeSwitcher"
import { trackEvent } from "@/lib/analytics"

function Headermain() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto py-3 px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Brand */}
          <Link href="/" className="text-xl font-bold tracking-tight group shrink-0">
            <span className="text-white font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Artag
            </span>
            <span className="text-zinc-500 font-medium ml-1 group-hover:text-zinc-300 transition-colors duration-300">
              Dev
            </span>
          </Link>

          {/* Switcher + Language (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <ViewModeSwitcher />
            <LanguageSwitcher className="inline-flex" />
          </div>

          {/* Mobile: switcher + menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ViewModeSwitcher />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="p-2 text-zinc-400 hover:text-white"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu: language + resume */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl px-4 py-4 space-y-3">
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              onClick={() => {
                handleResumeDownload()
                setIsMobileMenuOpen(false)
              }}
              className="w-full flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 py-2 rounded-lg text-sm border border-white/10 hover:border-white/20"
            >
              <Download className="w-4 h-4" />
              <span>{t("downloadResume")}</span>
            </button>
          </div>
        )}
      </header>
    </>
  )
}

export default Headermain
