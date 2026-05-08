'use client'

import { ReactNode, useState } from 'react'
import RandomLoader from '@/components/loading/random-loader'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { PageReadyContext } from '@/contexts/PageReadyContext'

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const { restoreScroll } = useScrollRestoration()
  const [isPageReady, setIsPageReady] = useState(false)

  const handleLoaderDone = () => {
    restoreScroll()
    setIsPageReady(true)
  }

  return (
    <PageReadyContext.Provider value={isPageReady}>
      <RandomLoader onLoadingComplete={handleLoaderDone} />
      {children}
    </PageReadyContext.Provider>
  )
}
