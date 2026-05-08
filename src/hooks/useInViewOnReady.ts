'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { usePageReady } from '@/contexts/PageReadyContext'

interface Options {
  amount?: number | 'some' | 'all'
  once?: boolean
}

// Returns isReady=true only when (a) the element has entered the viewport at the
// configured amount AND (b) the page-level loader has finished. Use as a drop-in
// replacement for `whileInView` to prevent reveal animations from being spent
// while the user is still looking at the loader.
//
// Usage:
//   const { ref, isReady } = useInViewOnReady<HTMLDivElement>({ amount: 0.3 })
//   <motion.div ref={ref} initial="hidden" animate={isReady ? 'visible' : 'hidden'} />
export function useInViewOnReady<T extends HTMLElement = HTMLElement>(
  options?: Options,
) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.3,
  })
  const pageReady = usePageReady()
  return { ref, isReady: inView && pageReady }
}
