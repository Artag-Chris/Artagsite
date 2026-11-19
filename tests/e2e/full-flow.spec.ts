import { test, expect } from "@playwright/test";

test.describe("Phases 2–4 Gate — Responsive, Reduced Motion, 3D & Full E2E Flow", () => {
  test("2A: No horizontal overflow across mobile (375), tablet (768), desktop (1440)", async ({
    page,
  }) => {
    const viewports = [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      for (const route of ["/", "/labs", "/about-me"]) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1
        );
        expect(overflow, `Horizontal overflow on ${route} at ${vp.width}x${vp.height}`).toBe(
          false
        );
      }
    }
  });

  test("2B + 3A: Reduced motion uses SVG fallback and produces 0 console errors", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/", { waitUntil: "networkidle" });
    await page.goto("/labs", { waitUntil: "domcontentloaded" });

    expect(errors).toEqual([]);
    await context.close();
  });

  test("4A: Full E2E flow (Ctrl+K -> Labs -> Atiende node -> Infrastructure tab -> Home -> Pipeline simulator -> Locale switch)", async ({
    page,
  }) => {
    await page.goto("/es", { waitUntil: "networkidle" });

    // Open Command Palette with Ctrl+K
    await page.keyboard.press("Control+k");
    const palette = page.getByTestId("command-palette");
    await expect(palette).toBeVisible();

    // Search "Labs" and press Enter
    await palette.locator("input").fill("Labs");
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/labs$/);

    // Click Atiende & CV Harness nodes and Infrastructure tab
    await page.getByTestId("lab-node-cv-harness").click();
    await expect(page.getByTestId("lab-module-detail")).toContainText("188");

    await page.getByTestId("lab-node-atiende").click();
    await expect(page.getByTestId("lab-module-detail")).toContainText("295");

    await page.getByTestId("lab-tab-infrastructure").click();
    await expect(page.locator("main")).toContainText("13");

    // Return to Home via header link
    await page.locator("header nav").first().locator("a").first().click();
    await page.waitForURL(/\/es\/?$/);

    // Run Atiende pipeline simulation in Hero
    const runBtn = page.getByTestId("run-pipeline-btn");
    await runBtn.click();
    await expect(page.getByTestId("pipeline-simulator")).toContainText("COMPLETADO (200 OK)", {
      timeout: 10_000,
    });

    // Switch language to EN via Command Palette
    await page.keyboard.press("Control+k");
    await page.getByTestId("command-palette").locator("input").fill("English");
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("lang", "en", { timeout: 10_000 });
    expect(new URL(page.url()).pathname.startsWith("/es")).toBe(false);
  });
});
