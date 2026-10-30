'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  DEFAULT_VIEW_MODE,
  loadViewMode,
  saveViewMode,
  type ViewMode,
} from '@/lib/viewMode'

interface ViewModeContextValue {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null)

export function ViewModeProvider({
  children,
  initialMode,
}: {
  children: ReactNode
  initialMode?: ViewMode
}) {
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    if (initialMode) return initialMode
    if (typeof window === 'undefined') return DEFAULT_VIEW_MODE
    return loadViewMode(window.localStorage)
  })

  // Keep state in sync when an initialMode is provided (direct routes) and persist it.
  useEffect(() => {
    if (initialMode) {
      setViewModeState(initialMode)
      saveViewMode(
        typeof window !== 'undefined' ? window.localStorage : null,
        initialMode
      )
    }
  }, [initialMode])

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode)
    saveViewMode(typeof window !== 'undefined' ? window.localStorage : null, mode)
  }, [])

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  )
}

export function useViewMode(): ViewModeContextValue {
  const ctx = useContext(ViewModeContext)
  if (!ctx) {
    throw new Error('useViewMode must be used within a ViewModeProvider')
  }
  return ctx
}
