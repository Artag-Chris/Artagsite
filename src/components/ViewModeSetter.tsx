'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useViewMode } from '@/contexts/ViewModeContext'
import type { ViewMode } from '@/lib/viewMode'

export function ViewModeSetter({ mode }: { mode: ViewMode }) {
  const { setViewMode } = useViewMode()
  const router = useRouter()

  useEffect(() => {
    setViewMode(mode)
    router.replace('/')
  }, [mode, setViewMode, router])

  return null
}
