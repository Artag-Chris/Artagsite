'use client'

import { useViewMode } from '@/contexts/ViewModeContext'
import { useTranslations } from 'next-intl'
import { personalData } from '@/data/personal'

export function PersonalExperience() {
  const { viewMode } = useViewMode()
  const t = useTranslations('personal')

  if (viewMode !== 'personal') return null

  return (
    <section className="relative w-screen -mx-[calc((100vw-100%)/2)] bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a] py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber-400/70">
            {t('badge')}
          </span>
          <h2 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('title')}
            <span className="text-amber-400">{t('titleAccent')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">{t('description')}</p>
        </header>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Hardware */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 lg:col-span-2">
            <h3 className="mb-3 text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('hardwareTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {personalData.hardware.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Readings */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('readingsTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {personalData.readings.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hobbies */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('hobbiesTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {personalData.hobbies.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Log */}
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 md:col-span-2 lg:col-span-2">
            <h3 className="mb-3 text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('logTitle')}
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {personalData.log.map((entry, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-amber-400/80">{entry.date}</span>
                  <span>{entry.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
