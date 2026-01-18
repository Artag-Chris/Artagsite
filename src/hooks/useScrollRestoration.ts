'use client'

import { useEffect, useRef, useCallback } from 'react'

export function useScrollRestoration() {
  const scrollPositionRef = useRef<number>(0)

  // Save current scroll position on mount and updates
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to restore scroll position with smooth animation
  const restoreScroll = useCallback(() => {
    if (typeof window === 'undefined') return

    // Use requestAnimationFrame to ensure smooth scrolling
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: 'smooth',
      })
    })
  }, [])

  return {
    savedPosition: scrollPositionRef.current,
    restoreScroll,
  }
}
