'use client'

import { useEffect } from 'react'
import { useViewMode } from '@/contexts/ViewModeContext'

export function ModeThemeApplier() {
  const { viewMode } = useViewMode()

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', viewMode)
  }, [viewMode])

  return null
}
