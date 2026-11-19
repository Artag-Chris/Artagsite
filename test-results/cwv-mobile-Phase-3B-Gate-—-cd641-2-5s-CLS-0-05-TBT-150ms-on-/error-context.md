# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cwv-mobile.spec.ts >> Phase 3B Gate — Core Web Vitals (Mobile 4G Throttle) >> 3B: Mobile LCP < 2.5s, CLS < 0.05, TBT < 150ms on /
- Location: tests\e2e\cwv-mobile.spec.ts:4:3

# Error details

```
Error: TBT should be < 150ms

expect(received).toBeLessThan(expected)

Expected: < 150
Received:   288
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Artag Dev — home" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e5]: Artag
        - generic [ref=e6]: .dev
      - generic [ref=e7]:
        - button "Open command palette" [ref=e8] [cursor=pointer]
        - button "Open menu" [ref=e11] [cursor=pointer]
  - generic:
    - navigation:
      - link:
        - /url: /labs
      - link:
        - /url: /currentStudies
      - link:
        - /url: /private-servers
      - link:
        - /url: /projects
  - main [ref=e14]:
    - generic [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: Available to collaborate
          - group "Choose your view" [ref=e23]:
            - button "B2B" [ref=e24] [cursor=pointer]
            - button "Dev" [pressed] [ref=e25] [cursor=pointer]
        - heading "I Connect Stuff. I Automate the Boring. Let's Build Something." [level=1] [ref=e26]:
          - generic [ref=e27]: I Connect Stuff.
          - generic [ref=e28]: I Automate the Boring.
          - generic [ref=e29]: Let's Build Something.
        - paragraph [ref=e30]:
          - text: I'm Christian — I connect services, automate workflows, and build tools that save you time. From
          - strong [ref=e31]: WhatsApp to Slack
          - text: ", from"
          - strong [ref=e32]: spreadsheets to full apps
          - text: ", I make things work together so you don't have to. Based in Pereira, Colombia 🇨🇴"
        - generic [ref=e33]:
          - link "View projects" [ref=e34] [cursor=pointer]:
            - /url: /labs
          - link "Download CV" [ref=e41] [cursor=pointer]:
            - /url: /resume.pdf
      - generic [ref=e47]:
        - generic [ref=e48]:
          - generic [ref=e49]: christian@artagdev — pipeline
          - generic [ref=e53]: "n8n: fallback"
        - generic [ref=e56]:
          - button "Atiende RAG ~30% cost saved" [pressed] [ref=e57] [cursor=pointer]:
            - generic [ref=e58]: Atiende RAG
            - generic [ref=e59]: ~30% cost saved
          - button "CV Harness 188 API tests" [ref=e60] [cursor=pointer]:
            - generic [ref=e61]: CV Harness
            - generic [ref=e62]: 188 API tests
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]:
              - heading "Atiende · WhatsApp RAG + Cache Hit" [level=3] [ref=e66]
              - paragraph [ref=e67]: Multi-channel agent with semantic caching & human escalation
            - button "Run flow" [ref=e69] [cursor=pointer]
          - list [ref=e73]:
            - listitem [ref=e74]:
              - generic [ref=e79]:
                - generic [ref=e80]: 01. Webhook Ingress
                - generic [ref=e81]: Meta HMAC-SHA256 verified · payload persisted
              - generic [ref=e82]: —
            - listitem [ref=e83]:
              - generic [ref=e88]:
                - generic [ref=e89]: 02. Deduplication
                - generic [ref=e90]: Idempotent key checked in Redis (0 duplicates)
              - generic [ref=e91]: —
            - listitem [ref=e92]:
              - generic [ref=e97]:
                - generic [ref=e98]: 03. pgvector Search
                - generic [ref=e99]: Tenant-scoped cosine search · top-4 catalog items
              - generic [ref=e100]: —
            - listitem [ref=e101]:
              - generic [ref=e106]:
                - generic [ref=e107]: 04. Semantic Cache Hit
                - generic [ref=e108]: Similarity 0.96 >= 0.92 threshold · LLM skipped (32ms)
              - generic [ref=e109]: —
            - listitem [ref=e110]:
              - generic [ref=e115]:
                - generic [ref=e116]: 05. WhatsApp Delivery
                - generic [ref=e117]: Meta Cloud API 200 OK · dashboard synced
              - generic [ref=e118]: —
          - generic [ref=e119]:
            - generic [ref=e120]: Ready · Available to collaborate
            - generic [ref=e121]: "Total latency: 0ms"
  - contentinfo [ref=e130]:
    - generic [ref=e132]:
      - generic [ref=e133]:
        - generic [ref=e134]:
          - generic [ref=e135]:
            - generic [ref=e137]: AD
            - paragraph [ref=e138]: Artag Dev
          - paragraph [ref=e139]: I connect services, automate workflows, and build tools that save you time. Based in Pereira, Colombia.
        - generic [ref=e140]:
          - paragraph [ref=e141]: Connect
          - list [ref=e142]:
            - listitem [ref=e143]:
              - link "GitHub" [ref=e144] [cursor=pointer]:
                - /url: https://github.com/Artag-Chris
            - listitem [ref=e147]:
              - link "LinkedIn" [ref=e148] [cursor=pointer]:
                - /url: https://www.linkedin.com/in/artag/
            - listitem [ref=e151]:
              - link "Instagram" [ref=e152] [cursor=pointer]:
                - /url: https://www.instagram.com/artagdev/
            - listitem [ref=e155]:
              - link "YouTube" [ref=e156] [cursor=pointer]:
                - /url: https://www.youtube.com/@Artag888
            - listitem [ref=e159]:
              - link "Email" [ref=e160] [cursor=pointer]:
                - /url: mailto:info@artagdev.com.co
      - navigation "Quick Links" [ref=e164]:
        - heading "Quick Links" [level=2] [ref=e165]
        - list [ref=e166]:
          - listitem [ref=e167]:
            - link "Home" [ref=e168] [cursor=pointer]:
              - /url: /
          - listitem [ref=e170]:
            - link "Labs" [ref=e171] [cursor=pointer]:
              - /url: /labs
          - listitem [ref=e173]:
            - link "About" [ref=e174] [cursor=pointer]:
              - /url: /about-me
      - generic [ref=e176]:
        - heading "What I Do" [level=2] [ref=e177]
        - list [ref=e178]:
          - listitem [ref=e179]:
            - link "Full-Stack Development" [ref=e180] [cursor=pointer]:
              - /url: /#contact
          - listitem [ref=e182]:
            - link "System Architecture" [ref=e183] [cursor=pointer]:
              - /url: /#contact
          - listitem [ref=e185]:
            - link "Process Automation" [ref=e186] [cursor=pointer]:
              - /url: /#contact
          - listitem [ref=e188]:
            - link "API Design" [ref=e189] [cursor=pointer]:
              - /url: /#contact
          - listitem [ref=e191]:
            - link "Performance Optimization" [ref=e192] [cursor=pointer]:
              - /url: /#contact
          - listitem [ref=e194]:
            - link "Cloud & DevOps" [ref=e195] [cursor=pointer]:
              - /url: /#contact
      - generic [ref=e197]:
        - heading "Let's Talk" [level=2] [ref=e198]
        - paragraph [ref=e199]: Have something in mind? I'm always open to new collaborations, ideas, and conversations.
        - link "Get in touch" [ref=e200] [cursor=pointer]:
          - /url: /#contact
    - generic [ref=e206]:
      - paragraph [ref=e207]: © 2026 Artag Dev. All rights reserved.
      - button "Switch language to Español" [ref=e208] [cursor=pointer]: es
      - list [ref=e213]:
        - listitem [ref=e214]:
          - button "Privacy Policy" [ref=e215] [cursor=pointer]
        - listitem [ref=e216]:
          - button "Terms of Service" [ref=e217] [cursor=pointer]
        - listitem [ref=e218]: Made with ♥ in Pereira
  - alert [ref=e219]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Phase 3B Gate — Core Web Vitals (Mobile 4G Throttle)", () => {
  4  |   test("3B: Mobile LCP < 2.5s, CLS < 0.05, TBT < 150ms on /", async ({
  5  |     browser,
  6  |   }) => {
  7  |     const context = await browser.newContext({
  8  |       viewport: { width: 390, height: 844 },
  9  |       isMobile: true,
  10 |       hasTouch: true,
  11 |       deviceScaleFactor: 2,
  12 |     });
  13 |     const page = await context.newPage();
  14 | 
  15 |     // Emulate Slow/Fast 4G & 4x CPU throttle via Chrome DevTools Protocol
  16 |     const cdp = await context.newCDPSession(page);
  17 |     await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  18 |     await cdp.send("Network.enable");
  19 |     await cdp.send("Network.emulateNetworkConditions", {
  20 |       offline: false,
  21 |       latency: 150,
  22 |       downloadThroughput: (1.6 * 1024 * 1024) / 8,
  23 |       uploadThroughput: (750 * 1024) / 8,
  24 |     });
  25 | 
  26 |     // Inject PerformanceObservers before any page script executes
  27 |     await page.addInitScript(() => {
  28 |       const w = window as unknown as {
  29 |         __cwv: { lcp: number; cls: number; tbt: number };
  30 |       };
  31 |       w.__cwv = { lcp: 0, cls: 0, tbt: 0 };
  32 | 
  33 |       try {
  34 |         new PerformanceObserver((list) => {
  35 |           const entries = list.getEntries();
  36 |           const last = entries[entries.length - 1];
  37 |           if (last) w.__cwv.lcp = last.startTime;
  38 |         }).observe({ type: "largest-contentful-paint", buffered: true });
  39 |       } catch {}
  40 | 
  41 |       try {
  42 |         new PerformanceObserver((list) => {
  43 |           for (const entry of list.getEntries() as unknown as Array<{
  44 |             value: number;
  45 |             hadRecentInput: boolean;
  46 |           }>) {
  47 |             if (!entry.hadRecentInput) w.__cwv.cls += entry.value;
  48 |           }
  49 |         }).observe({ type: "layout-shift", buffered: true });
  50 |       } catch {}
  51 | 
  52 |       try {
  53 |         new PerformanceObserver((list) => {
  54 |           for (const entry of list.getEntries()) {
  55 |             if (entry.duration > 50) {
  56 |               w.__cwv.tbt += entry.duration - 50;
  57 |             }
  58 |           }
  59 |         }).observe({ type: "longtask", buffered: true });
  60 |       } catch {}
  61 |     });
  62 | 
  63 |     await page.goto("/", { waitUntil: "load" });
  64 |     await page.waitForTimeout(1500);
  65 | 
  66 |     const metrics = await page.evaluate(() => {
  67 |       const w = window as unknown as {
  68 |         __cwv: { lcp: number; cls: number; tbt: number };
  69 |       };
  70 |       return w.__cwv;
  71 |     });
  72 | 
  73 |     console.log("Mobile 4G CWV metrics:", {
  74 |       lcpMs: Math.round(metrics.lcp),
  75 |       cls: Number(metrics.cls.toFixed(4)),
  76 |       tbtMs: Math.round(metrics.tbt),
  77 |     });
  78 | 
  79 |     expect(metrics.lcp, "LCP should be < 2500ms").toBeLessThan(2500);
  80 |     expect(metrics.cls, "CLS should be < 0.05").toBeLessThan(0.05);
> 81 |     expect(metrics.tbt, "TBT should be < 150ms").toBeLessThan(150);
     |                                                  ^ Error: TBT should be < 150ms
  82 | 
  83 |     await context.close();
  84 |   });
  85 | });
  86 | 
```