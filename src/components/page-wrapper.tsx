'use client'

import { ReactNode, useEffect } from 'react'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { PageReadyContext } from '@/contexts/PageReadyContext'

interface PageWrapperProps {
  children: ReactNode
}

/**
 * Immediate-LCP wrapper (Master Spec §3.2): renders children without a
 * blocking fullscreen splash loader so the Hero H1 paints immediately.
 */
export default function PageWrapper({ children }: PageWrapperProps) {
  const { restoreScroll } = useScrollRestoration()

  useEffect(() => {
    restoreScroll()
  }, [restoreScroll])

  return (
    <PageReadyContext.Provider value={true}>
      {children}
    </PageReadyContext.Provider>
  )
}
