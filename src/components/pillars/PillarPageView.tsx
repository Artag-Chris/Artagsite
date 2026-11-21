import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react"
import type { PillarContent } from "@/data/pillars"
import { getAllPillarsForLocale } from "@/data/pillars"
import { OFFICIAL_NAP, SITE_URL } from "@/lib/seo/routes"

interface PillarPageViewProps {
  pillar: PillarContent
}

export function PillarPageView({ pillar }: PillarPageViewProps) {
  const isEs = pillar.locale === "es"
  const canonicalUrl = `${SITE_URL}${pillar.path}`
  const notesBase = isEs ? "/es/notas-ingenieria" : "/engineering-notes"
  const otherPillars = getAllPillarsForLocale(pillar.locale).filter((p) => p.id !== pillar.id)

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: pillar.h1,
    description: pillar.metaDescription,
    url: canonicalUrl,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: isEs
      ? ["Pereira", "Dosquebradas", "Risaralda", "Eje Cafetero", "Colombia"]
      : ["Colombia", "United States", "Canada", "Europe", "Latin America"],
    availableLanguage: isEs ? ["es", "en"] : ["en", "es"],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEs ? "Inicio" : "Home",
        item: isEs ? `${SITE_URL}/es` : SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pillar.h1,
        item: canonicalUrl,
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pillar.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav aria-label={isEs ? "Ruta de navegación" : "Breadcrumb"} className="font-mono text-xs text-[var(--text-secondary)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={isEs ? "/es" : "/"} className="hover:text-[var(--accent-signal)] transition-colors">
                {isEs ? "Inicio" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--text-primary)]" aria-current="page">
              {pillar.h1}
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-10 lg:p-12">
          <div className="inline-flex items-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-tertiary)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)] mb-6">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-signal)]" aria-hidden="true" />
            <span>{pillar.badge}</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-[var(--text-primary)] max-w-4xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pillar.h1}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8">
            {pillar.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${OFFICIAL_NAP.phoneE164.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--accent-signal)] text-[#0B0C0E] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>{isEs ? "Hablar por WhatsApp" : "Chat on WhatsApp"}</span>
            </a>
            <a
              href={`mailto:${OFFICIAL_NAP.email}`}
              className="inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] px-5 py-3 font-mono text-xs uppercase tracking-wider hover:border-[var(--accent-signal)] transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{OFFICIAL_NAP.email}</span>
            </a>
            <Link
              href={notesBase}
              className="inline-flex items-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-primary)] text-[var(--text-secondary)] px-5 py-3 font-mono text-xs uppercase tracking-wider hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>{isEs ? "Notas de Ingeniería" : "Engineering Notes"}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* Metrics Strip */}
        <section aria-label={isEs ? "Métricas clave" : "Key metrics"}>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--border-hairline)]">
            {pillar.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-r border-b border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6"
              >
                <div className="font-mono text-3xl sm:text-4xl font-semibold text-[var(--accent-signal)]">
                  {metric.value}
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-wider text-[var(--text-primary)]">
                  {metric.label}
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Proof & Architecture */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>{isEs ? "Evidencia de Producción" : "Production Evidence"}</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pillar.proofTitle}
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {pillar.proofSummary}
            </p>
            <ul className="space-y-3 pt-2">
              {pillar.proofHighlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent-signal)] mt-1 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 border border-[var(--border-hairline)] bg-[var(--bg-tertiary)] p-6 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              {isEs ? "Esquema de Arquitectura" : "Reference Architecture"}
            </div>
            <pre className="overflow-x-auto border border-[var(--border-hairline)] bg-[var(--bg-primary)] p-4 font-mono text-xs leading-6 text-[var(--accent-signal)]">
              <code>{pillar.architectureDiagram}</code>
            </pre>
            <div className="pt-2">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-3">
                {isEs ? "Stack Técnico" : "Core Stack"}
              </div>
              <div className="flex flex-wrap gap-2">
                {pillar.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-[var(--border-hairline)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono text-xs text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)] mb-2">
              {isEs ? "Alcance Técnico" : "Technical Scope"}
            </p>
            <h2
              className="text-2xl sm:text-4xl text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pillar.capabilitiesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillar.capabilities.map((cap) => (
              <article
                key={cap.code}
                className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs text-[var(--accent-signal)]">{cap.code}</span>
                  <h3
                    className="text-xl text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
                <ul className="space-y-2 border-t border-[var(--border-hairline)] pt-4">
                  {cap.deliverables.map((deliv, i) => (
                    <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--accent-signal)] font-mono">→</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Optional Local Coverage Matrix (Pereira / Nearshore Colombia) */}
        {pillar.coverageZones && pillar.coverageZones.length > 0 && (
          <section className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{isEs ? "Cobertura Operativa" : "Operational Coverage"}</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pillar.coverageTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--border-hairline)]">
              {pillar.coverageZones.map((zone) => (
                <div
                  key={zone.city}
                  className="border-r border-b border-[var(--border-hairline)] bg-[var(--bg-primary)] p-5 space-y-2"
                >
                  <div className="font-semibold text-base text-[var(--text-primary)]">{zone.city}</div>
                  <div className="font-mono text-xs text-[var(--accent-signal)]">{zone.region}</div>
                  <p className="text-xs text-[var(--text-secondary)]">{zone.mode}</p>
                  <p className="font-mono text-[11px] text-[var(--text-secondary)] pt-1">
                    {isEs ? "Respuesta:" : "Response:"} {zone.responseSla}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Engineering Notes */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)] mb-2">
                {isEs ? "Profundización Técnica" : "Technical Deep Dives"}
              </p>
              <h2
                className="text-2xl sm:text-3xl text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isEs ? "Notas de Ingeniería Relacionadas" : "Related Engineering Notes"}
              </h2>
            </div>
            <Link
              href={notesBase}
              className="font-mono text-xs uppercase tracking-wider text-[var(--accent-signal)] hover:underline inline-flex items-center gap-1"
            >
              <span>{isEs ? "Ver todas las notas" : "View all notes"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillar.relatedNotes.map((note) => (
              <Link
                key={note.slug}
                href={`${notesBase}/${note.slug}`}
                className="group border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 hover:border-[var(--accent-signal)] transition-colors block space-y-2"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-signal)] transition-colors">
                  {note.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{note.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)] mb-2">
              {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </p>
            <h2
              className="text-2xl sm:text-3xl text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {isEs ? "Respuestas Directas" : "Direct Answers"}
            </h2>
          </div>

          <div className="divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] bg-[var(--bg-secondary)]">
            {pillar.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 space-y-2">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{faq.question}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-linking to other Pillar Services */}
        <section className="space-y-5">
          <h2
            className="text-xl sm:text-2xl text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isEs ? "Otras Verticales de Ingeniería" : "Other Engineering Verticals"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherPillars.map((other) => (
              <Link
                key={other.id}
                href={other.path}
                className="group border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-4 hover:border-[var(--accent-signal)] transition-colors flex flex-col justify-between gap-3"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
                  {other.badge}
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-signal)] transition-colors">
                  {other.h1}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Direct CTA & Official NAP */}
        <section className="border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-3">
            <h2
              className="text-2xl sm:text-3xl text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pillar.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {pillar.ctaBody}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`mailto:${OFFICIAL_NAP.email}`}
              className="inline-flex items-center gap-2 bg-[var(--accent-signal)] text-[#0B0C0E] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{OFFICIAL_NAP.email}</span>
            </a>
            <a
              href={`tel:${OFFICIAL_NAP.phoneE164}`}
              className="inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] px-5 py-3 font-mono text-xs uppercase tracking-wider hover:border-[var(--accent-signal)] transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{OFFICIAL_NAP.phoneDisplay}</span>
            </a>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
              <MapPin className="h-4 w-4 text-[var(--accent-signal)]" aria-hidden="true" />
              <span>
                {OFFICIAL_NAP.name} · {OFFICIAL_NAP.location}
              </span>
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}
