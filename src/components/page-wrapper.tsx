'use client'

import { ReactNode } from 'react'
import RandomLoader from '@/components/loading/random-loader'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { restoreScroll } = useScrollRestoration()

  return (
    <>
      <RandomLoader onLoadingComplete={restoreScroll} />
      {children}
    </>
  )
}
