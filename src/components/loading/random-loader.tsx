"use client"

import { lazy, Suspense, useMemo, useState, useEffect, useRef, useCallback } from "react"

// Lazy load all loaders for code splitting
const CityLoader = lazy(() => import("./city-loader"))
const MinimalTechLoader = lazy(() => import("./minimal-tech-loader"))
const TerminalLoader = lazy(() => import("./terminal-loader"))
const TypingEmotionalLoader = lazy(() => import("./typing-emotional-loader"))

interface RandomLoaderProps {
  onLoadingComplete?: () => void
  minDisplayTime?: number
}

export default function RandomLoader({ onLoadingComplete, minDisplayTime = 2500 }: RandomLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const loaderStartTimeRef = useRef(Date.now())
  const hasCompletedRef = useRef(false)

  // Select a random loader once on mount
  const SelectedLoader = useMemo(() => {
    const loaders = [CityLoader, MinimalTechLoader, TerminalLoader, TypingEmotionalLoader]
    return loaders[Math.floor(Math.random() * loaders.length)]
  }, [])

  // Memoize the callback to prevent dependency changes
  const handleLoadingComplete = useCallback(() => {
    if (hasCompletedRef.current) return

    hasCompletedRef.current = true
    const elapsedTime = Date.now() - loaderStartTimeRef.current
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime)

    setTimeout(() => {
      setIsVisible(false)
      onLoadingComplete?.()
    }, remainingTime)
  }, [minDisplayTime, onLoadingComplete])

  // Enforce minimum display time - only run once on mount
  useEffect(() => {
    const timer = setTimeout(handleLoadingComplete, minDisplayTime)

    return () => clearTimeout(timer)
  }, []) // Empty dependency array - only run on mount

  if (!isVisible) return null

  return (
    <Suspense fallback={null}>
      <SelectedLoader onLoadingComplete={() => {}} minDisplayTime={minDisplayTime} />
    </Suspense>
  )
}
