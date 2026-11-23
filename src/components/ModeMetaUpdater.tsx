'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { useViewMode } from '@/contexts/ViewModeContext'
import { trackEvent } from '@/lib/analytics'

type ViewMode = 'b2b' | 'dev' | 'personal'
type Locale = 'en' | 'es'

const MODE_META: Record<Locale, Record<ViewMode, { title: string; description: string }>> = {
  es: {
    b2b: {
      title: 'Artag | Automatización de procesos y bots de WhatsApp',
      description:
        'Automatización de procesos, bots de WhatsApp y conectores ERP. Sistemas reales, ROI medido y límites honestos.',
    },
    dev: {
      title: 'Christian Henao (Artag) — Desarrollador Full-Stack e IA',
      description:
        'Construyo sistemas de IA aplicados: agentes multicanal, pipelines RAG y backends event-driven con casos de estudio y trade-offs reales.',
    },
    personal: {
      title: 'Artag | El lado humano detrás del código',
      description:
        'Hardware, lecturas, videojuegos, fe y una bitácora personal. El lado humano detrás del portafolio.',
    },
  },
  en: {
    b2b: {
      title: 'Artag | Process Automation & WhatsApp AI Bots',
      description:
        'Process automation, WhatsApp AI bots, and ERP integrations. Production systems with measured ROI and honest limits.',
    },
    dev: {
      title: 'Christian Henao (Artag) — Full-Stack Developer & AI Engineer',
      description:
        'I build applied AI systems: multi-channel agents, RAG pipelines, and event-driven backends. Case studies with architecture and honest limits.',
    },
    personal: {
      title: 'Artag | The Human Side Behind the Code',
      description:
        'Hardware, books, gaming library, faith, and personal notes. The human side behind the engineering portfolio.',
    },
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
  const locale = useLocale() === 'es' ? 'es' : 'en'
  const pathname = usePathname()
  const previous = useRef<string | null>(null)

  useEffect(() => {
    // Only update document metadata on the home page where viewMode changes the visible experience.
    // Subpages own their route-specific metadata from Next.js generateMetadata.
    if (pathname === '/') {
      const meta = MODE_META[locale][viewMode]
      document.title = meta.title
      setMeta('description', meta.description)
      setMeta('og:title', meta.title, 'property')
      setMeta('og:description', meta.description, 'property')
    }

    if (previous.current !== null && previous.current !== viewMode) {
      trackEvent('view_mode_changed', { mode: viewMode, location: 'client' })
    }
    previous.current = viewMode
  }, [viewMode, locale, pathname])

  // Track the initial mode once on mount.
  useEffect(() => {
    trackEvent('view_mode_changed', { mode: viewMode, location: 'initial' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
