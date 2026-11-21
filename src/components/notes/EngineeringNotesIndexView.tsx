import Link from "next/link"
import { ArrowUpRight, BookOpen, Clock } from "lucide-react"
import type { EngineeringArticle } from "@/data/articles"
import { getAllPillarsForLocale } from "@/data/pillars"
import { SITE_URL } from "@/lib/seo/routes"

interface EngineeringNotesIndexViewProps {
  locale: "en" | "es"
  articles: EngineeringArticle[]
}

export function EngineeringNotesIndexView({
  locale,
  articles,
}: EngineeringNotesIndexViewProps) {
  const isEs = locale === "es"
  const basePath = isEs ? "/es/notas-ingenieria" : "/engineering-notes"
  const pillars = getAllPillarsForLocale(locale)

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEs ? "Notas de Ingeniería | Artag Dev" : "Engineering Notes | Artag Dev",
    description: isEs
      ? "Artículos técnicos de producción sobre ingeniería de IA, caché semántico con pgvector, RAG multi-tenant, microservicios con BullMQ/Redis y ciberseguridad de aplicaciones."
      : "Production engineering notes on AI systems, pgvector semantic caching, multi-tenant RAG with PostgreSQL RLS, microservices with Redis/BullMQ, and application security.",
    url: `${SITE_URL}${basePath}`,
    inLanguage: isEs ? "es" : "en",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((art, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${basePath}/${art.slug}`,
        name: art.title,
      })),
    },
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-14">
        <header className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-tertiary)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)] mb-5">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isEs ? "HUB TÉCNICO // ARTAG DEV" : "TECHNICAL HUB // ARTAG DEV"}</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-[var(--text-primary)] max-w-4xl mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isEs ? "Notas de Ingeniería en Producción" : "Production Engineering Notes"}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {isEs
              ? "Documentación técnica basada en sistemas reales: arquitectura RAG multi-tenant, reducción de costos de LLM con caché semántico, microservicios con Redis/BullMQ y ciberseguridad de APIs."
              : "Architecture notes grounded in production systems: multi-tenant RAG pipelines, LLM cost engineering with semantic caching, distributed microservices with Redis/BullMQ, and API security."}
          </p>
        </header>

        {/* Articles Grid */}
        <section aria-label={isEs ? "Artículos publicados" : "Published articles"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-7 flex flex-col justify-between gap-6 hover:border-[var(--accent-signal)] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-secondary)]">
                    <span className="border border-[var(--border-hairline)] bg-[var(--bg-tertiary)] px-2.5 py-0.5 text-[var(--accent-signal)]">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        {isEs
                          ? `${article.readingTime} min de lectura`
                          : `${article.readingTime} min read`}
                      </span>
                    </span>
                  </div>

                  <h2
                    className="text-2xl text-[var(--text-primary)] leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <Link
                      href={`${basePath}/${article.slug}`}
                      className="group-hover:text-[var(--accent-signal)] transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[var(--border-hairline)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--border-hairline)] pt-4 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`${basePath}/${article.slug}`}
                    className="font-mono text-xs uppercase tracking-wider text-[var(--accent-signal)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isEs ? "Leer artículo técnico" : "Read technical note"}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={article.pillarPath}
                    className="font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {isEs ? "Servicio relacionado →" : "Related service →"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pillar Services Hub Strip */}
        <section className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-8 space-y-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              {isEs ? "Servicios Especializados" : "Specialized Services"}
            </p>
            <h2
              className="text-2xl sm:text-3xl text-[var(--text-primary)] mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {isEs ? "Explora nuestras verticales de ingeniería" : "Explore our engineering verticals"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.id}
                href={pillar.path}
                className="border border-[var(--border-hairline)] bg-[var(--bg-primary)] p-4 hover:border-[var(--accent-signal)] transition-colors block space-y-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-signal)] block">
                  {pillar.badge}
                </span>
                <span className="text-xs font-medium text-[var(--text-primary)] block leading-snug">
                  {pillar.h1}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
