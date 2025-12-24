"use client"

import { lazy, Suspense, useMemo } from "react"

// Lazy load all loaders for code splitting
const CityLoader = lazy(() => import("./city-loader"))
const MinimalTechLoader = lazy(() => import("./minimal-tech-loader"))
const TerminalLoader = lazy(() => import("./terminal-loader"))
const TypingEmotionalLoader = lazy(() => import("./typing-emotional-loader"))

interface RandomLoaderProps {
  onLoadingComplete?: () => void
  minDisplayTime?: number
}

export default function RandomLoader({ onLoadingComplete, minDisplayTime = 1500 }: RandomLoaderProps) {
  // Select a random loader once on mount
  const SelectedLoader = useMemo(() => {
    const loaders = [CityLoader, MinimalTechLoader, TerminalLoader, TypingEmotionalLoader]
    return loaders[Math.floor(Math.random() * loaders.length)]
  }, [])

  return (
    <Suspense fallback={null}>
      <SelectedLoader onLoadingComplete={onLoadingComplete} minDisplayTime={minDisplayTime} />
    </Suspense>
  )
}
