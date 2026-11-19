"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { services, socialLinksFooter } from "@/data/footerData"
import { PRIMARY_NAV } from "@/data/navlinks"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { LegalDialog, type LegalDoc } from "./LegalDialog"

function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const currentYear = new Date().getFullYear()
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null)

  return (
    <footer className="relative w-full overflow-hidden bg-[var(--bg-primary)] border-t border-[var(--border-hairline)]">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 border border-[var(--accent-signal)] bg-[var(--accent-signal)]/10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span
                    className="text-[var(--accent-signal)] font-mono font-semibold text-sm"
                  >
                    AD
                  </span>
                </div>
                <p
                  className="text-xl text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Artag Dev
                </p>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{t("tagline")}</p>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                {t("connect")}
              </p>
              <ul className="flex flex-wrap gap-2">
                {socialLinksFooter.map((social) => {
                  const Icon = social.icon
                  const external = !social.url.startsWith("mailto:")
                  return (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex items-center justify-center w-9 h-9 bg-[var(--bg-secondary)] border border-[var(--border-hairline)] hover:border-[var(--accent-signal)] text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-colors duration-200"
                        aria-label={social.name}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <nav aria-label={t("quickLinks")} className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]">
              {t("quickLinks")}
            </h2>
            {/* Same 3 primary routes as the header (Master Spec §2) */}
            <ul className="space-y-2.5">
              {PRIMARY_NAV.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-colors duration-200 flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-px bg-[var(--border-strong)]" aria-hidden="true" />
                    {tNav(link.id)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]">
              {t("whatIDo")}
            </h2>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((service) => (
                <li key={service}>
                  <Link
                    href="/#contact"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-px bg-[var(--border-strong)]" aria-hidden="true" />
                    {t(`services.${service}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]">
              {t("letsTalk")}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{t("paragraph")}</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-wider transition-colors duration-200 border border-[var(--border-strong)] hover:border-[var(--accent-signal)]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("getInTouch")}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-[var(--border-hairline)] py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[var(--text-secondary)] text-xs text-center sm:text-left">
              &copy; {currentYear} Artag Dev. {t("rights")}
            </p>

            <LanguageSwitcher />

            {/* Legal links: separated by 1px dividers, open real modals */}
            <ul className="flex items-center divide-x divide-[var(--border-hairline)] font-mono text-xs">
              <li className="px-3">
                <button
                  type="button"
                  onClick={() => setLegalDoc("privacy")}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 underline-offset-4 hover:underline"
                  aria-haspopup="dialog"
                >
                  {t("privacy")}
                </button>
              </li>
              <li className="px-3">
                <button
                  type="button"
                  onClick={() => setLegalDoc("terms")}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 underline-offset-4 hover:underline"
                  aria-haspopup="dialog"
                >
                  {t("terms")}
                </button>
              </li>
              <li className="px-3 text-[var(--text-secondary)]">{t("madeWith")}</li>
            </ul>
          </div>
        </div>
      </div>

      <LegalDialog doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </footer>
  )
}

export default Footer
