'use client'

import { useLocale } from 'next-intl'
import { trackEvent } from '@/lib/analytics'

interface OutboundLinkProps {
  href: string
  projectSlug: string
  linkType: 'repository' | 'demo'
  className?: string
  children: React.ReactNode
}

export function OutboundLink({
  href,
  projectSlug,
  linkType,
  className,
  children,
}: OutboundLinkProps) {
  const locale = useLocale()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent('project_outbound_click', {
          project_slug: projectSlug,
          link_type: linkType,
          location: 'case_study',
          locale,
        })
      }
    >
      {children}
    </a>
  )
}
