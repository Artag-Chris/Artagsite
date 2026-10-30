'use client'

import { useEffect, useState } from 'react'
import { useViewMode } from '@/contexts/ViewModeContext'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  Calculator,
  MessageCircle,
  Rocket,
  FlaskConical,
  Server,
  Code2,
  User,
  Gamepad2,
  Heart,
  Settings,
  BookOpen,
} from 'lucide-react'

type LinkItem = {
  href: string
  label: string
  icon: React.ReactNode
  external?: boolean
}

export function CosmicBar() {
  const { viewMode } = useViewMode()
  const locale = useLocale()
  const isEs = locale === 'es'
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 180)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links: LinkItem[] =
    viewMode === 'b2b'
      ? [
          { href: '/#roi-calculator', label: isEs ? 'Calculadora ROI' : 'ROI calculator', icon: <Calculator className="h-4 w-4" /> },
          { href: '/projects', label: isEs ? 'Soluciones' : 'Solutions', icon: <Rocket className="h-4 w-4" /> },
          { href: 'https://wa.me/573205711428', label: isEs ? 'Contacto WhatsApp' : 'WhatsApp contact', icon: <MessageCircle className="h-4 w-4" />, external: true },
        ]
      : viewMode === 'dev'
      ? [
          { href: '/labs', label: isEs ? 'Laboratorio' : 'Labs', icon: <FlaskConical className="h-4 w-4" /> },
          { href: '/privateservers', label: isEs ? 'Servidores' : 'Servers', icon: <Server className="h-4 w-4" /> },
          { href: '/projects', label: isEs ? 'Ecosistema' : 'Ecosystem', icon: <Code2 className="h-4 w-4" /> },
        ]
      : [
          { href: '/about-me', label: isEs ? 'Mi historia' : 'My story', icon: <User className="h-4 w-4" /> },
          { href: '/favorites', label: isEs ? 'Juegos' : 'Games', icon: <Gamepad2 className="h-4 w-4" /> },
          { href: '/my-faith', label: isEs ? 'Mi fe' : 'My faith', icon: <Heart className="h-4 w-4" /> },
          { href: '/personal', label: isEs ? 'Setup' : 'Setup', icon: <Settings className="h-4 w-4" /> },
          { href: '/engineering-notes', label: isEs ? 'Bitácora' : 'Log', icon: <BookOpen className="h-4 w-4" /> },
        ]

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
    >
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-black/80 px-2 py-1.5 backdrop-blur-xl shadow-2xl">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
