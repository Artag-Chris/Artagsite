import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Clock, List, Terminal } from "lucide-react"
import { getArticleWordCount, type EngineeringArticle } from "@/data/articles"
import { OFFICIAL_NAP, SITE_URL } from "@/lib/seo/routes"

interface EngineeringNoteDetailViewProps {
  article: EngineeringArticle
}

export function EngineeringNoteDetailView({ article }: EngineeringNoteDetailViewProps) {
  const isEs = article.locale === "es"
  const indexPath = isEs ? "/es/notas-ingenieria" : "/engineering-notes"
  const articlePath = `${indexPath}/${article.slug}`
  const canonicalUrl = `${SITE_URL}${articlePath}`
  const wordCount = getArticleWordCount(article)

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    wordCount,
    inLanguage: isEs ? "es" : "en",
    keywords: article.tags.join(", "),
    image: `${SITE_URL}/og-home.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@id": `${SITE_URL}/#founder`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
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
        name: isEs ? "Notas de Ingeniería" : "Engineering Notes",
        item: `${SITE_URL}${indexPath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label={isEs ? "Ruta de navegación" : "Breadcrumb"} className="mb-8 font-mono text-xs text-[var(--text-secondary)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={isEs ? "/es" : "/"} className="hover:text-[var(--accent-signal)] transition-colors">
                {isEs ? "Inicio" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={indexPath} className="hover:text-[var(--accent-signal)] transition-colors">
                {isEs ? "Notas de Ingeniería" : "Engineering Notes"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--text-primary)]" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-6 sm:p-10 mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-secondary)]">
            <span className="border border-[var(--border-hairline)] bg-[var(--bg-tertiary)] px-2.5 py-1 text-[var(--accent-signal)]">
              {article.category}
            </span>
            <span>
              {isEs ? "Publicado:" : "Published:"} {article.datePublished}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {isEs ? "Actualizado:" : "Updated:"} {article.dateModified}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {isEs ? `${article.readingTime} min de lectura` : `${article.readingTime} min read`}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-[var(--text-primary)] max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {article.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--border-hairline)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-[var(--border-hairline)] pt-0">
            {article.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-r border-b border-[var(--border-hairline)] bg-[var(--bg-primary)] p-4"
              >
                <div className="font-mono text-2xl font-semibold text-[var(--accent-signal)]">
                  {metric.value}
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)] mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Main 2-column layout: Sticky Table of Contents + Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <nav
              aria-label={isEs ? "Tabla de contenidos" : "Table of contents"}
              className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] p-5 space-y-4"
            >
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
                <List className="h-4 w-4" aria-hidden="true" />
                <span>{isEs ? "Tabla de contenidos" : "Table of contents"}</span>
              </div>
              <ol className="space-y-2.5 text-sm">
                {article.sections.map((section, idx) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-colors flex items-start gap-2 leading-snug"
                    >
                      <span className="font-mono text-xs text-[var(--accent-signal)]">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Mandatory Pillar Service Internal Link Card */}
            <div className="border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-5 space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent-signal)]">
                {isEs ? "Vertical Relacionada" : "Related Pillar Service"}
              </p>
              <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                {article.pillarLabel}
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isEs
                  ? "Implementamos esta arquitectura en producción con pruebas automatizadas y propiedad 100% del código."
                  : "We architect and ship these systems in production with automated tests and 100% client IP ownership."}
              </p>
              <Link
                href={article.pillarPath}
                className="inline-flex items-center gap-1.5 bg-[var(--accent-signal)] text-[#0B0C0E] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>{isEs ? "Ver servicio técnico" : "Explore service"}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </aside>

          {/* Article Content */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-5 text-base sm:text-lg leading-8 text-[var(--text-primary)]/90">
              {article.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4 border-t border-[var(--border-hairline)] pt-8">
                <h2
                  className="text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.heading}
                </h2>

                {section.paragraphs.map((para, i) => (
                  <p key={i} className="text-base leading-8 text-[var(--text-secondary)]">
                    {para}
                  </p>
                ))}

                {section.list && section.list.length > 0 && (
                  <ul className="space-y-2.5 pt-1">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm sm:text-base leading-7 text-[var(--text-secondary)]">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-signal)]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.code && (
                  <div className="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] overflow-hidden my-4">
                    <div className="flex items-center justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-tertiary)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)]">
                      <span className="inline-flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-[var(--accent-signal)]" aria-hidden="true" />
                        <span>{section.code.filename ?? section.code.language}</span>
                      </span>
                      <span className="uppercase text-[10px] text-[var(--accent-signal)]">
                        {section.code.language}
                      </span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-6 text-[var(--text-primary)] bg-[var(--bg-primary)]">
                      <code>{section.code.snippet}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            {/* Bottom Pillar Service CTA */}
            <section className="border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-6 sm:p-8 space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
                {isEs ? "Siguiente paso de arquitectura" : "Next architectural step"}
              </p>
              <h2
                className="text-2xl text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {article.pillarLabel}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {isEs
                  ? `¿Quieres aplicar esta arquitectura en tu empresa? Escríbenos a ${OFFICIAL_NAP.email} o revisa los entregables completos de nuestra vertical.`
                  : `Want to apply this architecture in your stack? Reach out at ${OFFICIAL_NAP.email} or review the full deliverables of our dedicated service.`}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href={article.pillarPath}
                  className="inline-flex items-center gap-2 bg-[var(--accent-signal)] text-[#0B0C0E] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <span>{article.pillarLabel}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={indexPath}
                  className="inline-flex items-center gap-2 border border-[var(--border-hairline)] bg-[var(--bg-primary)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{isEs ? "Volver a Notas de Ingeniería" : "Back to Engineering Notes"}</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}
