"use client"

import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowUpRight, FlaskConical, Home, User } from "lucide-react"

export default function NotFound() {
  const t = useTranslations("notFound")
  const locale = useLocale()
  const isEs = locale === "es"

  const routes = [
    {
      href: "/" as const,
      icon: Home,
      label: isEs ? "Inicio" : "Home",
      detail: isEs ? "Propuesta de valor y simulador de pipelines" : "Value proposition & pipeline simulator",
    },
    {
      href: "/labs" as const,
      icon: FlaskConical,
      label: isEs ? "Laboratorio" : "Engineering Lab",
      detail: isEs ? "Arquitectura, harnesses y microservicios" : "Architecture, harnesses & microservices",
    },
    {
      href: "/about-me" as const,
      icon: User,
      label: isEs ? "Sobre mí" : "About me",
      detail: isEs ? "The Architect's Ledger (2006–2024)" : "The Architect's Ledger (2006–2024)",
    },
  ]

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-28 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-8 sm:p-12">
          <div className="mb-6 inline-flex items-center gap-2 border border-[var(--accent-error)]/40 bg-[var(--accent-error)]/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[var(--accent-error)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-error)]" aria-hidden="true" />
            <span>HTTP 404 · ROUTE_NOT_FOUND</span>
          </div>

          <h1
            className="text-[clamp(3rem,8vw,6rem)] leading-none text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            404 — <span className="italic text-[var(--accent-signal)]">{t("title")}</span>
          </h1>

          <p className="max-w-xl text-base text-[var(--text-secondary)] mb-10">
            {t("description")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-[var(--border-hairline)] bg-[var(--bg-primary)]">
            {routes.map(({ href, icon: Icon, label, detail }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col justify-between border-r border-b border-[var(--border-hairline)] p-5 transition-colors hover:bg-[var(--bg-tertiary)]"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between text-[var(--accent-signal)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-signal)] transition-colors" aria-hidden="true" />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    {label}
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--text-secondary)]">{detail}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
