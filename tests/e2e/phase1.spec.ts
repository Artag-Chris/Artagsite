import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PRIMARY_ROUTES = [
  "/",
  "/es",
  "/labs",
  "/es/labs",
  "/about-me",
  "/es/about-me",
] as const;

test.describe("Phase 1 Gate — Links, i18n, Hygiene & Axe A11y", () => {
  test("1B: Primary routes load, internal links return 200, no concatenated strings, /es experience translated", async ({
    page,
    request,
  }) => {
    const checkedInternalUrls = new Set<string>();

    for (const route of PRIMARY_ROUTES) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `Route ${route} should return 200`).toBe(200);

      // Ensure /technology.webp is never in the DOM
      const techWebpCount = await page
        .locator('[src*="technology.webp"], [poster*="technology.webp"]')
        .count();
      expect(techWebpCount, `${route} must not reference technology.webp`).toBe(0);

      // Ensure no dead href="#" links in footer or elsewhere
      const deadHashLinks = await page.locator('a[href="#"]').count();
      expect(deadHashLinks, `${route} must not contain href="#"`).toBe(0);

      // Verify global header has exactly the 3 primary links
      const navLinks = page.locator("header nav").first().locator("a");
      expect(await navLinks.count(), `${route} header should have 3 primary links`).toBe(3);

      // Check body text for concatenated strings from the audit
      const bodyText = await page.evaluate(() => document.body.innerText);
      expect(bodyText).not.toContain("no habla.Automatizo");
      expect(bodyText).not.toContain("B2BDev");

      // Collect and check all internal <a href> links on this page
      const hrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a[href]"))
          .map((a) => a.getAttribute("href") || "")
          .filter(
            (h) =>
              h.startsWith("/") &&
              !h.startsWith("//") &&
              !h.endsWith(".pdf")
          )
      );

      for (const rawHref of hrefs) {
        const cleanHref = rawHref.split("#")[0] || "/";
        if (checkedInternalUrls.has(cleanHref)) continue;
        checkedInternalUrls.add(cleanHref);
        const res = await request.get(cleanHref);
        expect(
          res.status(),
          `Internal link ${cleanHref} (found on ${route}) should resolve to HTTP 200`
        ).toBe(200);
      }
    }

    // Verify 301/308 redirects for consolidated aliases
    for (const alias of ["/privateservers", "/es/privateservers", "/current-studies"]) {
      const res = await request.get(alias, { maxRedirects: 0 });
      expect([301, 308]).toContain(res.status());
    }

    // Verify /es has translated Hero & Experience (Finova) and no untranslated English experience cards
    await page.goto("/es", { waitUntil: "networkidle" });
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const esText = await page.evaluate(() => document.body.innerText);
    expect(esText).toContain("Conecto lo que no habla.");
    expect(esText).toContain("Automatizo lo aburrido.");
    expect(esText).not.toContain("Full Stack Developer & Software Architect");
    expect(esText).not.toContain("Various Projects");
    expect(esText).not.toContain("Dec 2024 - Present");

    // Verify Testimonials pause/resume button (WCAG 2.2.2)
    await page.locator("#testimonials").scrollIntoViewIfNeeded();
    const pauseBtn = page.locator('#testimonials button[aria-pressed]');
    await expect(pauseBtn).toBeVisible({ timeout: 10_000 });
    await expect(pauseBtn).toHaveAttribute("aria-pressed", "false");
    await pauseBtn.click();
    await expect(pauseBtn).toHaveAttribute("aria-pressed", "true");

    // Verify Footer legal modal opens cleanly
    const privacyBtn = page.locator("footer button", { hasText: /Privacidad|Privacy/i }).first();
    await privacyBtn.click();
    await expect(page.locator("dialog[open]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog[open]")).toHaveCount(0);

    // Verify /labs shows 13 private microservices
    await page.goto("/labs", { waitUntil: "domcontentloaded" });
    const labsText = await page.evaluate(() => document.body.innerText);
    expect(labsText).toContain("13");
  });

  for (const route of PRIMARY_ROUTES) {
    test(`1C: Axe Accessibility Audit on ${route} (0 critical/serious violations)`, async ({
      page,
    }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      // Wait briefly for initial transitions
      await page.waitForTimeout(500);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );

      if (blocking.length > 0) {
        console.log(
          `Axe violations on ${route}:`,
          JSON.stringify(
            blocking.map((v) => ({
              id: v.id,
              impact: v.impact,
              help: v.help,
              nodes: v.nodes.slice(0, 3).map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            })),
            null,
            2
          )
        );
      }

      expect(
        blocking,
        `Expected 0 critical/serious Axe violations on ${route}`
      ).toEqual([]);
    });
  }
});
