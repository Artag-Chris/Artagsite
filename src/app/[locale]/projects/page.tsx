import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { projectsByLocale } from '@/data/proyectData'
import { ProjectCard } from '@/components/projects/ProjectCard'

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
  const t = await getTranslations({ locale, namespace: 'projectPages' })
  const isEs = locale === 'es'
  const title = isEs ? 'Proyectos y casos de estudio | Artag' : 'Projects & case studies | Artag'
  const description = t('indexDescription')
  const url = isEs ? `${baseUrl}/es/projects` : `${baseUrl}/projects`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/projects`,
        es: `${baseUrl}/es/projects`,
        'x-default': `${baseUrl}/projects`,
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

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'projectPages' })
  const projects = projectsByLocale[locale as 'en' | 'es'] ?? projectsByLocale.en

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
