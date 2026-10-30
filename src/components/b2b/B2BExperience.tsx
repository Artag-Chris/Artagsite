'use client'

import { useViewMode } from '@/contexts/ViewModeContext'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ROICalculator } from './ROICalculator'
import { projectsByLocale } from '@/data/proyectData'

export function B2BExperience() {
  const { viewMode } = useViewMode()
  const locale = useLocale()
  const t = useTranslations('b2b')

  if (viewMode !== 'b2b') return null

  const projects = (projectsByLocale[locale as 'en' | 'es'] ?? projectsByLocale.en).filter(
    (p) => p.category === 'featured'
  )

  return (
    <section className="relative w-screen -mx-[calc((100vw-100%)/2)] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a] py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-indigo-400/70">
            {t('badge')}
          </span>
          <h2 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('title')}
            <span className="text-cyan-400">{t('titleAccent')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">{t('description')}</p>
        </header>

        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('automationTitle')}
            </h3>
            <p className="mb-4 leading-7 text-zinc-400">{t('automationBody')}</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              {t.raw('automationPoints').map((point: string, i: number) => (
                <li key={i} className="flex gap-3 leading-7">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <ROICalculator />
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-center text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            {t('caseStudiesTitle')}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group rounded-xl border border-white/[0.07] bg-zinc-900/50 p-5 transition-colors hover:border-cyan-500/25"
              >
                <h4 className="mb-1 text-lg font-semibold text-white group-hover:text-cyan-200">
                  {project.title}
                </h4>
                <p className="text-sm text-zinc-400">{project.shortDescription || project.description}</p>
                {project.proofPoints[0] && (
                  <div className="mt-3 text-xs text-cyan-300">
                    {project.proofPoints[0].value} {project.proofPoints[0].label}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-500/20 border border-cyan-500/30"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
