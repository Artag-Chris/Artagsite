'use client'

import { createContext, useContext } from 'react'

// True once the page-level loader is done and the user is looking at real content.
// Provided by PageWrapper. Consumed by useInViewOnReady to gate scroll-triggered
// animations so they don't fire and burn out while the loader is still on top.
export const PageReadyContext = createContext(false)

export function usePageReady(): boolean {
  return useContext(PageReadyContext)
}
