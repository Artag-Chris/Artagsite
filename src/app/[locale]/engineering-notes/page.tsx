import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notesByLocale } from '@/data/notes'
import { Link } from '@/i18n/navigation'

const baseUrl = 'https://www.artagdev.com.co'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'engineeringNotes' })
  const isEs = locale === 'es'
  const title = isEs ? 'Notas de ingeniería | Artag' : 'Engineering notes | Artag'
  const description = t('indexDescription')
  const url = isEs ? `${baseUrl}/es/engineering-notes` : `${baseUrl}/engineering-notes`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/engineering-notes`,
        es: `${baseUrl}/es/engineering-notes`,
        'x-default': `${baseUrl}/engineering-notes`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
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

export default async function EngineeringNotesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'engineeringNotes' })
  const notes = notesByLocale[locale as 'en' | 'es'] ?? notesByLocale.en

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 sm:mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-indigo-400/70">
            {t('badge')}
          </span>
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('indexTitle')}
            <span className="text-cyan-400">{t('indexTitleAccent')}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
            {t('indexDescription')}
          </p>
        </header>

        <div className="space-y-6">
          {notes.map((note) => (
            <article key={note.slug} className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 transition-colors hover:border-cyan-500/25 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                <span>{t('publishedOn')}: {note.datePublished}</span>
                <span>·</span>
                <span>{t('readingTime', { minutes: note.readingTime })}</span>
              </div>
              <h2 className="mb-2 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                <Link href={`/engineering-notes/${note.slug}`} className="hover:text-cyan-200">
                  {note.title}
                </Link>
              </h2>
              <p className="mb-4 text-sm leading-7 text-zinc-400 sm:text-base">{note.description}</p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-white/[0.06] bg-[#111111] px-2.5 py-1 font-mono text-[11px] text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
