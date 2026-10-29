'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Only the production host is measured. Vercel previews, localhost and
// artagdev.com.co redirects never push page_view, which is what produced
// the datacenter-heavy "direct" traffic in GA4.
const PRODUCTION_HOST = 'www.artagdev.com.co';

export default function GTMPageView() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hostname !== PRODUCTION_HOST) return;
    // Idempotent: one page_view per pathname, even if React re-runs the effect.
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
