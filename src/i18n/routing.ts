import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed", // English in /, Spanish in /es
  localeDetection: false, // Deterministic URL-based locale routing for SEO & hreflang integrity
});
