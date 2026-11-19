"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { Command, Download, Menu, X } from "lucide-react"
import { handleResumeDownload } from "@/functions/handleResumenDownload"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { ViewModeSwitcher } from "@/components/ViewModeSwitcher"
import { PRIMARY_NAV, isNavActive } from "@/data/navlinks"

function Headermain() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const openCommandPalette = () => {
    window.dispatchEvent(new Event("artag:open-command-palette"))
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
        isScrolled || isMobileMenuOpen
          ? "bg-[var(--bg-primary)]/95 border-[var(--border-hairline)] backdrop-blur-md"
          : "bg-[var(--bg-primary)]/80 border-[var(--border-hairline)]/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-6xl py-3 px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl tracking-tight group shrink-0 flex items-baseline gap-1"
          aria-label="Artag Dev — home"
        >
          <span
            className="text-[var(--text-primary)] text-2xl leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Artag
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
            .dev
          </span>
        </Link>

        {/* Primary navigation (desktop) — identical 3 routes everywhere */}
        <nav aria-label={t("primary")} className="hidden md:block">
          <ul className="flex items-center border border-[var(--border-hairline)] bg-[var(--bg-secondary)]">
            {PRIMARY_NAV.map((item) => {
              const active = isNavActive(pathname, item.href)
              return (
                <li
                  key={item.id}
                  className="border-r last:border-r-0 border-[var(--border-hairline)]"
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-[var(--bg-tertiary)] text-[var(--accent-signal)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50 hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {t(item.id)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Audience + Language + Cmd+K trigger (desktop) */}
        <div className="hidden md:flex items-center gap-2.5">
          <ViewModeSwitcher label={t("audience")} />
          <span className="h-6 w-px bg-[var(--border-hairline)]" aria-hidden="true" />
          <LanguageSwitcher className="inline-flex" />
          <span className="h-6 w-px bg-[var(--border-hairline)]" aria-hidden="true" />
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label={t("commandPalette")}
            data-testid="cmdk-trigger"
            className="inline-flex items-center gap-1.5 border border-[var(--border-hairline)] bg-[var(--bg-secondary)] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span>K</span>
          </button>
        </div>

        {/* Mobile: Cmd+K + menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label={t("commandPalette")}
            className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <Command className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-primary)] px-4 py-4 space-y-4"
        >
          <nav aria-label={t("primary")}>
            <ul className="border-t border-l border-[var(--border-hairline)] bg-[var(--bg-secondary)]">
              {PRIMARY_NAV.map((item) => {
                const active = isNavActive(pathname, item.href)
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block border-r border-b border-[var(--border-hairline)] px-4 py-2.5 font-mono text-xs uppercase tracking-wider ${
                        active
                          ? "bg-[var(--bg-tertiary)] text-[var(--accent-signal)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {t(item.id)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="flex items-center justify-center gap-3 border-t border-[var(--border-hairline)] pt-4">
            <ViewModeSwitcher label={t("audience")} />
            <span className="h-6 w-px bg-[var(--border-hairline)]" aria-hidden="true" />
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={() => {
              handleResumeDownload()
              setIsMobileMenuOpen(false)
            }}
            className="w-full flex items-center justify-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-secondary)] py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{t("downloadResume")}</span>
          </button>
        </div>
      )}
    </header>
  )
}

export default Headermain
