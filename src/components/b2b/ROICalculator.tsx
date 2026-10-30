'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const WEEKS_PER_MONTH = 4.33

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  return value
}

export function computeRoi(hoursPerWeek: number, costPerHour: number) {
  const h = clampNonNegative(hoursPerWeek)
  const c = clampNonNegative(costPerHour)
  const monthlyHours = h * WEEKS_PER_MONTH
  const monthlySavings = monthlyHours * c
  const annualSavings = monthlySavings * 12
  return { monthlyHours, monthlySavings, annualSavings }
}

export function ROICalculator() {
  const t = useTranslations('b2b')
  const [hours, setHours] = useState<string>('')
  const [cost, setCost] = useState<string>('')

  const { monthlyHours, monthlySavings, annualSavings } = useMemo(
    () => computeRoi(parseFloat(hours), parseFloat(cost)),
    [hours, cost]
  )

  const format = (n: number) =>
    n.toLocaleString('en-US', { maximumFractionDigits: 0 })

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 sm:p-8">
      <h3 className="mb-2 text-xl font-semibold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
        {t('roiTitle')}
      </h3>
      <p className="mb-6 text-sm text-zinc-400 sm:text-base">{t('roiDescription')}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-zinc-300">{t('hoursLabel')}</span>
          <input
            type="number"
            min={0}
            step={1}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder={t('hoursPlaceholder')}
            className="w-full rounded-lg border border-white/10 bg-[#0a0a0a]/50 px-3 py-2.5 text-white placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-zinc-300">{t('costLabel')}</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder={t('costPlaceholder')}
            className="w-full rounded-lg border border-white/10 bg-[#0a0a0a]/50 px-3 py-2.5 text-white placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
          />
        </label>
      </div>

      <motion.div
        key={`${monthlySavings}-${annualSavings}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 grid gap-3 sm:grid-cols-3"
      >
        <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4 text-center">
          <div className="text-2xl font-semibold text-cyan-300">{format(monthlyHours)}</div>
          <div className="text-xs text-zinc-500">{t('hoursSaved')}</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4 text-center">
          <div className="text-2xl font-semibold text-cyan-300">${format(monthlySavings)}</div>
          <div className="text-xs text-zinc-500">{t('monthlySavings')}</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4 text-center">
          <div className="text-2xl font-semibold text-cyan-300">${format(annualSavings)}</div>
          <div className="text-xs text-zinc-500">{t('annualSavings')}</div>
        </div>
      </motion.div>

      <p className="mt-4 text-xs text-zinc-500">{t('assumption')}</p>
    </div>
  )
}
