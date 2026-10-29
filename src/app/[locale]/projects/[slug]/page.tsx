import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getProjectBySlug, projectsByLocale } from '@/data/proyectData'
import { Link } from '@/i18n/navigation'
import { OutboundLink } from '@/components/projects/OutboundLink'

const baseUrl = 'https://www.artagdev.com.co'

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of routing.locales) {
    for (const project of projectsByLocale[locale as 'en' | 'es']) {
      params.push({ locale, slug: project.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProjectBySlug(slug, locale as 'en' | 'es')
  if (!project) return {}
  const isEs = locale === 'es'
  const title = `${project.title} | Artag`
  const description = project.description
  const url = isEs
    ? `${baseUrl}/es/projects/${project.slug}`
    : `${baseUrl}/projects/${project.slug}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/projects/${project.slug}`,
        es: `${baseUrl}/es/projects/${project.slug}`,
        'x-default': `${baseUrl}/projects/${project.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Artag',
      locale: isEs ? 'es_CO' : 'en_US',
      images: [{ url: `${baseUrl}/og-home.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-home.png`],
    },
    robots: { index: true, follow: true },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const isEs = locale === 'es'
  const project = getProjectBySlug(slug, locale as 'en' | 'es')
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'projectPages' })
  const projects = projectsByLocale[locale as 'en' | 'es'] ?? projectsByLocale.en
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const url = isEs
    ? `${baseUrl}/es/projects/${project.slug}`
    : `${baseUrl}/projects/${project.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.description,
    datePublished: project.lastUpdated,
    dateModified: project.lastUpdated,
    author: { '@type': 'Person', name: 'Christian Henao', url: baseUrl },
    publisher: { '@type': 'Organization', name: 'Artag', url: baseUrl },
    image: `${baseUrl}/og-home.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: isEs ? 'es' : 'en',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: isEs ? `${baseUrl}/es` : baseUrl },
      { '@type': 'ListItem', position: 2, name: isEs ? 'Proyectos' : 'Projects', item: isEs ? `${baseUrl}/es/projects` : `${baseUrl}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: url },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">{isEs ? 'Inicio' : 'Home'}</Link>
          <span className="mx-2">/</span>
          <Link href="/projects" className="hover:text-zinc-300">{isEs ? 'Proyectos' : 'Projects'}</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{project.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
              {t('featured')}
            </span>
            <span className="text-xs text-zinc-500">
              {t('lastUpdated')}: {project.lastUpdated}
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            {project.title}
          </h1>
          <p className="mb-6 text-base leading-7 text-zinc-400 sm:text-lg">{project.description}</p>

          {project.role && (
            <p className="mb-6 text-sm text-zinc-500">
              <span className="font-medium text-zinc-300">{t('role')}:</span> {project.role}
            </p>
          )}

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.proofPoints.map((pp, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
                <div className="text-xl font-semibold text-cyan-300">{pp.value}</div>
                <div className="text-xs leading-5 text-zinc-500">{pp.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-md border border-white/[0.06] bg-[#111111] px-2.5 py-1 font-mono text-[11px] text-zinc-500">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <OutboundLink
                href={project.githubUrl}
                projectSlug={project.slug}
                linkType="repository"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-500/30 hover:text-cyan-200"
              >
                {t('viewRepository')}
              </OutboundLink>
            )}
            {project.liveUrl && (
              <OutboundLink
                href={project.liveUrl}
                projectSlug={project.slug}
                linkType="demo"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-500/20"
              >
                {t('liveDemo')}
              </OutboundLink>
            )}
            {project.repositoryVisibility === 'private' && !project.githubUrl && (
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-zinc-500">
                {t('privateRepository')}
              </span>
            )}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-indigo-500/30 hover:text-indigo-200"
            >
              {t('contactCta')}
            </Link>
          </div>
        </header>

        {/* Problem */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('problem')}
          </h2>
          <p className="leading-7 text-zinc-400">{project.caseStudy.problem}</p>
        </section>

        {/* Solution */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('solution')}
          </h2>
          <p className="leading-7 text-zinc-400">{project.caseStudy.solution}</p>
        </section>

        {/* Results */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('results')}
          </h2>
          <ul className="space-y-2">
            {project.caseStudy.results.map((r, i) => (
              <li key={i} className="flex gap-3 leading-7 text-zinc-400">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('architecture')}
          </h2>
          <ol className="space-y-2">
            {project.caseStudy.architecture.map((step, i) => (
              <li key={i} className="flex gap-3 leading-7 text-zinc-400">
                <span className="font-mono text-xs text-cyan-400">{String(i + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Decisions */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('decisions')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.caseStudy.decisions.map((d, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-zinc-900/50 p-5">
                <h3 className="mb-2 text-sm font-semibold text-cyan-300">{d.title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{d.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        {project.caseStudy.challenges && project.caseStudy.challenges.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {t('challenges')}
            </h2>
            <ul className="space-y-2">
              {project.caseStudy.challenges.map((c, i) => (
                <li key={i} className="flex gap-3 leading-7 text-zinc-400">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Learnings */}
        {project.caseStudy.keyLearnings && project.caseStudy.keyLearnings.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {t('learnings')}
            </h2>
            <ul className="space-y-2">
              {project.caseStudy.keyLearnings.map((l, i) => (
                <li key={i} className="flex gap-3 leading-7 text-zinc-400">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Limitations */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('limitations')}
          </h2>
          <ul className="space-y-2">
            {project.caseStudy.limitations.map((l, i) => (
              <li key={i} className="flex gap-3 leading-7 text-zinc-400">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Next project */}
        {nextProject && nextProject.slug !== project.slug && (
          <section className="mt-12 border-t border-white/5 pt-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">{t('nextProject')}</p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-500/30"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200">{nextProject.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{nextProject.shortDescription || nextProject.description}</p>
            </Link>
          </section>
        )}

        <div className="mt-8">
          <Link href="/projects" className="text-sm text-zinc-500 hover:text-zinc-300">
            ← {t('backToProjects')}
          </Link>
        </div>
      </div>
    </main>
  )
}
