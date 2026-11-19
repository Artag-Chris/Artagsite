import { test, expect } from "@playwright/test";

test.describe("Phase 3B Gate — Core Web Vitals (Mobile 4G Throttle)", () => {
  test("3B: Mobile LCP < 2.5s, CLS < 0.05, TBT < 150ms on /", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // Emulate Slow/Fast 4G & 4x CPU throttle via Chrome DevTools Protocol
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });

    // Inject PerformanceObservers before any page script executes
    await page.addInitScript(() => {
      const w = window as unknown as {
        __cwv: { lcp: number; cls: number; tbt: number };
      };
      w.__cwv = { lcp: 0, cls: 0, tbt: 0 };

      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) w.__cwv.lcp = last.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as unknown as Array<{
            value: number;
            hadRecentInput: boolean;
          }>) {
            if (!entry.hadRecentInput) w.__cwv.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      } catch {}

      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              w.__cwv.tbt += entry.duration - 50;
            }
          }
        }).observe({ type: "longtask", buffered: true });
      } catch {}
    });

    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(1500);

    const metrics = await page.evaluate(() => {
      const w = window as unknown as {
        __cwv: { lcp: number; cls: number; tbt: number };
      };
      return w.__cwv;
    });

    console.log("Mobile 4G CWV metrics:", {
      lcpMs: Math.round(metrics.lcp),
      cls: Number(metrics.cls.toFixed(4)),
      tbtMs: Math.round(metrics.tbt),
    });

    expect(metrics.lcp, "LCP should be < 2500ms").toBeLessThan(2500);
    expect(metrics.cls, "CLS should be < 0.05").toBeLessThan(0.05);
    expect(metrics.tbt, "TBT should be < 150ms").toBeLessThan(150);

    await context.close();
  });
});
