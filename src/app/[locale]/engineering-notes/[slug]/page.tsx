import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getNoteBySlug, notesByLocale } from '@/data/notes'
import { Link } from '@/i18n/navigation'

const baseUrl = 'https://www.artagdev.com.co'

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of routing.locales) {
    for (const note of notesByLocale[locale as 'en' | 'es']) {
      params.push({ locale, slug: note.slug })
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
  const note = getNoteBySlug(slug, locale as 'en' | 'es')
  if (!note) return {}
  const isEs = locale === 'es'
  const title = `${note.title} | Artag`
  const description = note.description
  const url = isEs
    ? `${baseUrl}/es/engineering-notes/${note.slug}`
    : `${baseUrl}/engineering-notes/${note.slug}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/engineering-notes/${note.slug}`,
        es: `${baseUrl}/es/engineering-notes/${note.slug}`,
        'x-default': `${baseUrl}/engineering-notes/${note.slug}`,
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

export default async function EngineeringNoteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const isEs = locale === 'es'
  const note = getNoteBySlug(slug, locale as 'en' | 'es')
  if (!note) notFound()

  const t = await getTranslations({ locale, namespace: 'engineeringNotes' })

  const url = isEs
    ? `${baseUrl}/es/engineering-notes/${note.slug}`
    : `${baseUrl}/engineering-notes/${note.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.description,
    datePublished: note.datePublished,
    dateModified: note.dateModified,
    author: { '@type': 'Person', name: 'Christian Henao', url: baseUrl },
    publisher: { '@type': 'Organization', name: 'Artag', url: baseUrl },
    image: `${baseUrl}/og-home.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: isEs ? 'es' : 'en',
    keywords: note.tags.join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: isEs ? `${baseUrl}/es` : baseUrl },
      { '@type': 'ListItem', position: 2, name: isEs ? 'Notas de ingeniería' : 'Engineering notes', item: isEs ? `${baseUrl}/es/engineering-notes` : `${baseUrl}/engineering-notes` },
      { '@type': 'ListItem', position: 3, name: note.title, item: url },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">{isEs ? 'Inicio' : 'Home'}</Link>
          <span className="mx-2">/</span>
          <Link href="/engineering-notes" className="hover:text-zinc-300">{isEs ? 'Notas' : 'Notes'}</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{note.title}</span>
        </nav>

        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span>{t('publishedOn')}: {note.datePublished}</span>
            <span>·</span>
            <span>{t('updatedOn')}: {note.dateModified}</span>
            <span>·</span>
            <span>{t('readingTime', { minutes: note.readingTime })}</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            {note.title}
          </h1>
          <p className="mb-6 text-base leading-7 text-zinc-400 sm:text-lg">{note.description}</p>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-white/[0.06] bg-[#111111] px-2.5 py-1 font-mono text-[11px] text-zinc-500">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <p className="mb-10 text-base leading-8 text-zinc-300 sm:text-lg">{note.intro}</p>

        {note.sections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {section.heading}
            </h2>
            <p className="mb-4 leading-7 text-zinc-400">{section.body}</p>
            {section.list && section.list.length > 0 && (
              <ul className="mb-4 space-y-2">
                {section.list.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-7 text-zinc-400">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.code && (
              <pre className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0d0d0d] p-4 text-xs leading-6 text-zinc-300 sm:text-sm">
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}

        {note.relatedProject && (
          <section className="mt-12 border-t border-white/5 pt-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">{t('relatedProject')}</p>
            <Link
              href={`/projects/${note.relatedProject}`}
              className="group block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-500/30"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200">
                {note.relatedProject}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                {isEs ? 'Ver el caso de estudio completo.' : 'View the full case study.'}
              </p>
            </Link>
          </section>
        )}

        <div className="mt-8">
          <Link href="/engineering-notes" className="text-sm text-zinc-500 hover:text-zinc-300">
            ← {t('backToNotes')}
          </Link>
        </div>
      </div>
    </main>
  )
}
