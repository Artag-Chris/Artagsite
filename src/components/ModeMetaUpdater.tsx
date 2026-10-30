'use client'

import { useEffect, useRef } from 'react'
import { useViewMode } from '@/contexts/ViewModeContext'
import { trackEvent } from '@/lib/analytics'

const MODE_META: Record<
  'b2b' | 'dev' | 'personal',
  { title: string; description: string }
> = {
  b2b: {
    title: 'Artag | Automatización de procesos y bots de WhatsApp',
    description:
      'Automatización de procesos, bots de WhatsApp y conectores ERP. Sistemas reales, ROI medido, límites honestos.',
  },
  dev: {
    title: 'Artag | Full-Stack Developer & AI Engineer',
    description:
      'Full-stack developer and AI engineer. Multi-channel agents, RAG pipelines, event-driven backends. Case studies with architecture and trade-offs.',
  },
  personal: {
    title: 'Artag | El lado humano detrás del código',
    description:
      'Hardware, lecturas, hobbies y una bitácora personal. El lado cálido del portafolio.',
  },
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function ModeMetaUpdater() {
  const { viewMode } = useViewMode()
  const previous = useRef<string | null>(null)

  useEffect(() => {
    const meta = MODE_META[viewMode]
    document.title = meta.title
    setMeta('description', meta.description)
    setMeta('og:title', meta.title, 'property')
    setMeta('og:description', meta.description, 'property')

    if (previous.current !== null && previous.current !== viewMode) {
      trackEvent('view_mode_changed', { mode: viewMode, location: 'client' })
    }
    previous.current = viewMode
  }, [viewMode])

  // Track the initial mode once on mount.
  useEffect(() => {
    trackEvent('view_mode_changed', { mode: viewMode, location: 'initial' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
