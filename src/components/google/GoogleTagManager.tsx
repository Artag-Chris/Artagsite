// components/GoogleTagManager.tsx
// Single source of truth for Google tags:
// - If a GTM container is configured, GTM is the only loader (GA4 lives inside the container).
// - If there is no GTM container but a GA4 id exists, a direct gtag.js fallback is used.
// Loading GTM + gtag.js at the same time duplicates page_view and every event, so never both.
import Script from 'next/script'
import { analyticsConfig } from '@/config/analytics.config'

const GTM_ID = analyticsConfig.google.gtmId
const GA_ID = analyticsConfig.google.gaId

export function GoogleTagManager() {
  const hasGtm = Boolean(GTM_ID)

  return (
    <>
      {hasGtm && (
        <Script id="gtm-js" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {!hasGtm && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}
    </>
  );
}
