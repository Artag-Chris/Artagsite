import { test, expect } from "@playwright/test"

const SITE_URL = "https://www.artagdev.com.co"

const BILINGUAL_PILLARS = [
  {
    en: "/services/ai-engineering",
    enH1: "Production AI Engineering, RAG Pipelines & Autonomous Agents",
    es: "/es/servicios/ingenieria-ia-agentes",
    esH1: "Ingeniería de IA, Sistemas RAG y Agentes Autónomos en Producción",
  },
  {
    en: "/software-development-colombia",
    enH1: "Custom Software Development & Nearshore Engineering in Colombia",
    es: "/es/desarrollo-de-software-pereira",
    esH1: "Desarrollo de Software a la Medida en Pereira y el Eje Cafetero",
  },
  {
    en: "/services/microservices-architecture",
    enH1: "Microservices Architecture & High-Throughput Distributed APIs",
    es: "/es/servicios/arquitectura-microservicios",
    esH1: "Arquitectura de Microservicios, APIs y Sistemas Distribuidos",
  },
  {
    en: "/services/application-cybersecurity",
    enH1: "Application Security, API Hardening & DevSecOps Engineering",
    es: "/es/servicios/ciberseguridad-aplicaciones",
    esH1: "Ciberseguridad para Aplicaciones, APIs y DevSecOps",
  },
  {
    en: "/services/software-development",
    enH1: "Custom B2B Software Development & Workflow Automation",
    es: "/es/servicios/desarrollo-de-software",
    esH1: "Desarrollo de Software Empresarial y Automatización B2B",
  },
] as const

const BILINGUAL_ARTICLES = [
  {
    en: "/engineering-notes/semantic-caching-pgvector-llm-cost-reduction",
    enPillar: "/services/ai-engineering",
    es: "/es/notas-ingenieria/cache-semantico-pgvector-reduccion-costos-llm",
    esPillar: "/es/servicios/ingenieria-ia-agentes",
  },
  {
    en: "/engineering-notes/secure-multi-tenant-rag-architecture",
    enPillar: "/services/ai-engineering",
    es: "/es/notas-ingenieria/arquitectura-rag-multi-tenant-segura",
    esPillar: "/es/servicios/ingenieria-ia-agentes",
  },
  {
    en: "/engineering-notes/microservices-idempotency-redis-bullmq",
    enPillar: "/services/microservices-architecture",
    es: "/es/notas-ingenieria/microservicios-idempotencia-redis-bullmq",
    esPillar: "/es/servicios/arquitectura-microservicios",
  },
  {
    en: "/engineering-notes/webhook-security-hmac-sha256-anti-replay",
    enPillar: "/services/application-cybersecurity",
    es: "/es/notas-ingenieria/seguridad-webhooks-hmac-sha256",
    esPillar: "/es/servicios/ciberseguridad-aplicaciones",
  },
  {
    en: "/engineering-notes/owasp-llm-top-10-agent-hardening",
    enPillar: "/services/application-cybersecurity",
    es: "/es/notas-ingenieria/owasp-llm-seguridad-agentes-ia",
    esPillar: "/es/servicios/ciberseguridad-aplicaciones",
  },
] as const

const ES_ONLY_ARTICLE = {
  es: "/es/notas-ingenieria/automatizacion-ia-whatsapp-empresas-pereira",
  esPillar: "/es/desarrollo-de-software-pereira",
} as const

test.describe("SEO Blueprint QA Gate — Pereira Local, AI Engineer & Bilingual Hub", () => {
  test("Test 01: Zero #contact links in nav/services/footer + HTTP 200 & exact H1 on all 10 pillar pages", async ({
    page,
  }) => {
    for (const route of ["/", "/es"]) {
      const res = await page.goto(route, { waitUntil: "domcontentloaded" })
      expect(res?.status(), `${route} must return 200`).toBe(200)

      const headerContactLinks = await page.locator('header a[href*="#contact"]').count()
      expect(headerContactLinks, `${route} header must have 0 #contact links`).toBe(0)

      const footerContactLinks = await page.locator('footer a[href*="#contact"]').count()
      expect(footerContactLinks, `${route} footer must have 0 #contact links`).toBe(0)
    }

    for (const pair of BILINGUAL_PILLARS) {
      for (const [route, expectedH1] of [
        [pair.en, pair.enH1],
        [pair.es, pair.esH1],
      ] as const) {
        const res = await page.goto(route, { waitUntil: "domcontentloaded" })
        expect(res?.status(), `Pillar ${route} must return 200`).toBe(200)

        const h1 = await page.locator("main h1").first().innerText()
        expect(h1.trim(), `Exact H1 on ${route}`).toBe(expectedH1)

        const footerContactLinks = await page.locator('footer a[href*="#contact"]').count()
        expect(footerContactLinks, `${route} footer must have 0 #contact links`).toBe(0)
      }
    }
  })

  test("Test 02: Reciprocal hreflang & self-referencing canonical across home, 10 pillars, and engineering notes", async ({
    page,
  }) => {
    const pairsToVerify: Array<{ en: string; es: string }> = [
      { en: "/", es: "/es" },
      ...BILINGUAL_PILLARS.map((p) => ({ en: p.en, es: p.es })),
      { en: "/engineering-notes", es: "/es/notas-ingenieria" },
      ...BILINGUAL_ARTICLES.map((a) => ({ en: a.en, es: a.es })),
    ]

    for (const pair of pairsToVerify) {
      const expectedEn = pair.en === "/" ? SITE_URL : `${SITE_URL}${pair.en}`
      const expectedEs = `${SITE_URL}${pair.es}`

      for (const [route, expectedCanonical] of [
        [pair.en, expectedEn],
        [pair.es, expectedEs],
      ] as const) {
        const res = await page.goto(route, { waitUntil: "domcontentloaded" })
        expect(res?.status(), `${route} must return 200`).toBe(200)

        const canonical = await page.locator('head link[rel="canonical"]').getAttribute("href")
        expect(canonical, `Self-referencing canonical on ${route}`).toBe(expectedCanonical)

        const hrefEn = await page
          .locator('head link[rel="alternate"][hreflang="en"]')
          .getAttribute("href")
        const hrefEs = await page
          .locator('head link[rel="alternate"][hreflang="es"]')
          .getAttribute("href")
        const hrefDefault = await page
          .locator('head link[rel="alternate"][hreflang="x-default"]')
          .getAttribute("href")

        expect(hrefEn, `hreflang=en on ${route}`).toBe(expectedEn)
        expect(hrefEs, `hreflang=es on ${route}`).toBe(expectedEs)
        expect(hrefDefault, `hreflang=x-default on ${route}`).toBe(expectedEn)
      }
    }

    // Single-locale ES Pereira article
    const res = await page.goto(ES_ONLY_ARTICLE.es, { waitUntil: "domcontentloaded" })
    expect(res?.status()).toBe(200)
    const canonicalEsOnly = await page.locator('head link[rel="canonical"]').getAttribute("href")
    expect(canonicalEsOnly).toBe(`${SITE_URL}${ES_ONLY_ARTICLE.es}`)
  })

  test("Test 03: Linguistic purity per route (100% ES on /es/*, 100% EN on English routes)", async ({
    page,
  }) => {
    for (const esRoute of [
      "/es",
      "/es/servicios/ingenieria-ia-agentes",
      "/es/desarrollo-de-software-pereira",
      "/es/notas-ingenieria",
      ES_ONLY_ARTICLE.es,
    ]) {
      await page.goto(esRoute, { waitUntil: "domcontentloaded" })
      const lang = await page.locator("html").getAttribute("lang")
      expect(lang, `${esRoute} must declare lang="es"`).toBe("es")

      const footerText = await page.locator("footer").innerText()
      expect(footerText).toMatch(/Enlaces Rápidos/i)
      expect(footerText).toContain("Todos los derechos reservados")
      expect(footerText).not.toMatch(/Quick Links/i)
      expect(footerText).not.toContain("All rights reserved")
    }

    for (const enRoute of [
      "/",
      "/services/ai-engineering",
      "/software-development-colombia",
      "/engineering-notes",
      BILINGUAL_ARTICLES[0].en,
    ]) {
      await page.goto(enRoute, { waitUntil: "domcontentloaded" })
      const lang = await page.locator("html").getAttribute("lang")
      expect(lang, `${enRoute} must declare lang="en"`).toBe("en")

      const footerText = await page.locator("footer").innerText()
      expect(footerText).toMatch(/Quick Links/i)
      expect(footerText).toContain("All rights reserved")
      expect(footerText).not.toMatch(/Enlaces Rápidos/i)
      expect(footerText).not.toContain("Todos los derechos reservados")
    }
  })

  test("Test 04: JSON-LD syntactic validity, LocalBusiness + AI Engineer Person, TechArticle, NAP & 1000+ word articles", async ({
    page,
  }) => {
    // 1. Validate Global JSON-LD & NAP on /es and /
    for (const route of ["/", "/es", "/es/desarrollo-de-software-pereira"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" })
      const bodyText = await page.evaluate(() => document.body.innerText)

      expect(bodyText).not.toContain("artagdev@gmail.com")
      expect(bodyText).not.toContain("christian@artagdev")
      expect(bodyText).toContain("Artag Dev")
      expect(bodyText).toContain("Pereira, Risaralda, Colombia")
      expect(bodyText).toContain("+57 320 571 1428")
      expect(bodyText).toContain("info@artagdev.com.co")

      const scripts = await page.locator('script[type="application/ld+json"]').allInnerTexts()
      expect(scripts.length).toBeGreaterThan(0)

      const parsedBlocks = scripts.map((raw) => JSON.parse(raw))
      const graphBlock = parsedBlocks.find((b) => Array.isArray(b["@graph"]))
      expect(graphBlock, `Global @graph JSON-LD must exist on ${route}`).toBeTruthy()

      const orgNode = graphBlock["@graph"].find(
        (n: { "@id"?: string }) => n["@id"] === `${SITE_URL}/#organization`
      )
      const personNode = graphBlock["@graph"].find(
        (n: { "@id"?: string }) => n["@id"] === `${SITE_URL}/#founder`
      )

      expect(orgNode["@type"]).toEqual(["ProfessionalService", "LocalBusiness"])
      expect(orgNode.telephone).toBe("+573205711428")
      expect(orgNode.email).toBe("info@artagdev.com.co")
      expect(orgNode.address.addressLocality).toBe("Pereira")
      expect(personNode["@type"]).toBe("Person")
      expect(personNode.jobTitle).toBe("AI Engineer & Distributed Systems Architect")
    }

    // 2. Validate all 11 engineering articles: TechArticle JSON-LD, ToC, >=1000 words, mandatory internal link
    const allArticlesToCheck = [
      ...BILINGUAL_ARTICLES.flatMap((a) => [
        { route: a.en, pillar: a.enPillar },
        { route: a.es, pillar: a.esPillar },
      ]),
      { route: ES_ONLY_ARTICLE.es, pillar: ES_ONLY_ARTICLE.esPillar },
    ]

    for (const item of allArticlesToCheck) {
      const res = await page.goto(item.route, { waitUntil: "domcontentloaded" })
      expect(res?.status(), `Article ${item.route} must return 200`).toBe(200)

      // TechArticle JSON-LD
      const scripts = await page.locator('script[type="application/ld+json"]').allInnerTexts()
      const parsed = scripts.map((raw) => JSON.parse(raw))
      const techArticle = parsed.find((b) => b["@type"] === "TechArticle")
      expect(techArticle, `${item.route} must include TechArticle JSON-LD`).toBeTruthy()
      expect(techArticle.wordCount, `${item.route} TechArticle wordCount >= 1000`).toBeGreaterThanOrEqual(
        1000
      )

      // Table of contents present
      const tocLinks = await page.locator("article aside nav a[href^='#']").count()
      expect(tocLinks, `${item.route} must have Table of Contents links`).toBeGreaterThanOrEqual(4)

      // Mandatory internal link to pillar service
      const pillarLinkCount = await page.locator(`article a[href="${item.pillar}"]`).count()
      expect(
        pillarLinkCount,
        `${item.route} must link internally to ${item.pillar}`
      ).toBeGreaterThanOrEqual(1)
    }
  })

  test("Test 05: /robots.txt and /sitemap.xml include all 10 pillars and all 6 engineering articles", async ({
    request,
  }) => {
    const robotsRes = await request.get("/robots.txt")
    expect(robotsRes.status()).toBe(200)
    const robotsTxt = await robotsRes.text()
    expect(robotsTxt).toContain("Allow: /")
    expect(robotsTxt).toContain("Disallow: /api/")
    expect(robotsTxt).toContain("Disallow: /admin/")
    expect(robotsTxt).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)

    const sitemapRes = await request.get("/sitemap.xml")
    expect(sitemapRes.status()).toBe(200)
    const sitemapXml = await sitemapRes.text()

    const expectedPaths = [
      ...BILINGUAL_PILLARS.flatMap((p) => [p.en, p.es]),
      "/engineering-notes",
      "/es/notas-ingenieria",
      ...BILINGUAL_ARTICLES.flatMap((a) => [a.en, a.es]),
      ES_ONLY_ARTICLE.es,
    ]

    for (const p of expectedPaths) {
      expect(sitemapXml, `/sitemap.xml must include ${p}`).toContain(`${SITE_URL}${p}`)
    }
  })
})
