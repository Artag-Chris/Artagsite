'use client'

import { ReactNode } from 'react'
import LoadingScreen from '@/components/loading/loading-screen'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { restoreScroll } = useScrollRestoration()

  return (
    <>
      <LoadingScreen onLoadingComplete={restoreScroll} />
      {children}
    </>
  )
}
