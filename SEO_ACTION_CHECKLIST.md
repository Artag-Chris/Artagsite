# Artag Portfolio - SEO Implementation Action Checklist

**Start Date:** ___________  
**Target Completion:** Within 2 weeks  
**Owner:** ___________  

---

## Phase 1: Critical Files (Week 1)
**Time Estimate:** 2-3 hours | **Impact:** 40-50% improvement

### [ ] 1. Create robots.txt
- **File:** `/public/robots.txt`
- **Time:** 15 minutes
- **Impact:** High - Crawler control
- **Steps:**
  - [ ] Copy content from SEO_IMPLEMENTATION_GUIDE.md section 1
  - [ ] Create file at `/public/robots.txt`
  - [ ] Verify file exists: `https://www.artagdev.com.co/robots.txt`
  - [ ] Test with Google Search Console
- **Verification:**
  ```bash
  curl https://www.artagdev.com.co/robots.txt
  # Should return robots.txt content
  ```

### [ ] 2. Create sitemap.ts
- **File:** `/src/app/sitemap.ts`
- **Time:** 30 minutes
- **Impact:** High - Page indexing
- **Steps:**
  - [ ] Copy content from SEO_IMPLEMENTATION_GUIDE.md section 2
  - [ ] Create new file at `/src/app/sitemap.ts`
  - [ ] Verify file builds: `npm run build`
  - [ ] Check output: `https://www.artagdev.com.co/sitemap.xml`
- **Verification:**
  ```bash
  npm run build
  curl https://www.artagdev.com.co/sitemap.xml
  # Should return XML with all routes
  ```

### [ ] 3. Create Organization Schema
- **File:** `/src/lib/schema/organizationSchema.ts`
- **Time:** 15 minutes
- **Impact:** Medium - Schema markup
- **Steps:**
  - [ ] Create directory: `/src/lib/schema/`
  - [ ] Copy content from SEO_IMPLEMENTATION_GUIDE.md section 3
  - [ ] Create file at `/src/lib/schema/organizationSchema.ts`
  - [ ] Update placeholder values:
    - [ ] Phone number: +57-300-XXXXXXX
    - [ ] Email: contact@artagdev.com.co
    - [ ] Social media URLs
- **Review Points:**
  - [ ] All URLs use HTTPS
  - [ ] Contact info is correct
  - [ ] Social media links are valid

### [ ] 4. Create Person Schema
- **File:** `/src/lib/schema/personSchema.ts`
- **Time:** 15 minutes
- **Impact:** Medium - Schema markup
- **Steps:**
  - [ ] Copy content from SEO_IMPLEMENTATION_GUIDE.md section 4
  - [ ] Create file at `/src/lib/schema/personSchema.ts`
  - [ ] Update skills list
  - [ ] Add social media URLs

### [ ] 5. Create LocalBusiness Schema
- **File:** `/src/lib/schema/localBusinessSchema.ts`
- **Time:** 15 minutes
- **Impact:** Medium - Local SEO
- **Steps:**
  - [ ] Copy content from SEO_IMPLEMENTATION_GUIDE.md section 5
  - [ ] Create file at `/src/lib/schema/localBusinessSchema.ts`
  - [ ] Update business hours (if applicable)
  - [ ] Update service types

### [ ] 6. Update Root Layout
- **File:** `/src/app/layout.tsx`
- **Time:** 20 minutes
- **Impact:** High - Schema integration
- **Steps:**
  - [ ] Import Script from 'next/script'
  - [ ] Import getOrganizationSchema
  - [ ] Add Schema Script component
  - [ ] Update locale in OpenGraph (en → es_CO)
  - [ ] Update Google verification code
  - [ ] Test build: `npm run build`
- **Verification:**
  - [ ] No TypeScript errors
  - [ ] Build completes successfully
  - [ ] Schema visible in page source

### [ ] 7. Update Middleware
- **File:** `/middleware.ts`
- **Time:** 15 minutes
- **Impact:** Medium - Security headers
- **Steps:**
  - [ ] Add HSTS header
  - [ ] Add Permissions-Policy header
  - [ ] Test: `npm run dev`
  - [ ] Check headers in DevTools
- **Verification:**
  - [ ] HSTS header present in response
  - [ ] Permissions-Policy header present
  - [ ] No errors in console

### [ ] 8. Initial Testing
- **Time:** 30 minutes
- **Steps:**
  - [ ] Build project: `npm run build`
  - [ ] Run locally: `npm run dev`
  - [ ] Verify robots.txt accessible
  - [ ] Verify sitemap.xml accessible
  - [ ] Check schema in page source
  - [ ] Run PageSpeed Insights
  - [ ] No console errors

---

## Phase 2: Per-Page Metadata (Week 2)
**Time Estimate:** 2-3 hours | **Impact:** 30-40% improvement

### [ ] 9. Update Home Page
- **File:** `/src/app/page.tsx`
- **Time:** 15 minutes
- **Steps:**
  - [ ] Add Metadata export (already has good defaults)
  - [ ] Verify title is unique and descriptive
  - [ ] Check description accuracy
  - [ ] Build and test

### [ ] 10. Update About Me Page
- **File:** `/src/app/about-me/page.tsx`
- **Time:** 15 minutes
- **Steps:**
  - [ ] Copy Metadata from SEO_IMPLEMENTATION_GUIDE.md section 7.1
  - [ ] Update with specific content about this page
  - [ ] Remove "use client" conflicts if any
  - [ ] Build and test

### [ ] 11. Update Current Studies Page
- **File:** `/src/app/currentStudies/page.tsx`
- **Time:** 15 minutes
- **Steps:**
  - [ ] Copy Metadata from SEO_IMPLEMENTATION_GUIDE.md section 7.2
  - [ ] Update title and description
  - [ ] Add relevant keywords
  - [ ] Build and test

### [ ] 12. Update Favorites Page
- **File:** `/src/app/favorites/page.tsx`
- **Time:** 15 minutes
- **Steps:**
  - [ ] Copy Metadata from SEO_IMPLEMENTATION_GUIDE.md section 7.3
  - [ ] Update content-specific descriptions
  - [ ] Build and test

### [ ] 13. Update My Faith Page
- **File:** `/src/app/my-faith/page.tsx`
- **Time:** 15 minutes
- **Steps:**
  - [ ] Copy Metadata from SEO_IMPLEMENTATION_GUIDE.md section 7.4
  - [ ] Maintain appropriate tone and keywords
  - [ ] Build and test

### [ ] 14. Comprehensive Testing
- **Time:** 1 hour
- **Steps:**
  - [ ] Full build: `npm run build`
  - [ ] Check for errors
  - [ ] Test all pages locally
  - [ ] Verify metadata on each page:
    ```bash
    # Check page source in browser DevTools
    # Verify: <title>, <meta name="description">
    #         og:title, og:description, og:image
    #         twitter:card, twitter:image
    ```

---

## Phase 3: SEO Verification (Week 2-3)
**Time Estimate:** 2-3 hours | **Impact:** Monitoring

### [ ] 15. Google Search Console Setup
- **Time:** 30 minutes
- **Steps:**
  - [ ] Go to: https://search.google.com/search-console
  - [ ] Add property: https://www.artagdev.com.co
  - [ ] Verify ownership (select one method)
  - [ ] Wait for verification (can take 24-48 hours)

### [ ] 16. Submit robots.txt
- **Time:** 5 minutes
- **Steps:**
  - [ ] In GSC, go to Settings
  - [ ] Check robots.txt is accessible
  - [ ] Note any issues

### [ ] 17. Submit Sitemap
- **Time:** 5 minutes
- **Steps:**
  - [ ] In GSC, go to Sitemaps
  - [ ] Click "Add sitemap"
  - [ ] Enter: `sitemap.xml`
  - [ ] Click Submit
  - [ ] Check for errors

### [ ] 18. Validate Schema Markup
- **Time:** 30 minutes
- **Steps:**
  - [ ] Go to: https://schema.org/validate/
  - [ ] Enter each page URL:
    - [ ] https://www.artagdev.com.co
    - [ ] https://www.artagdev.com.co/about-me
    - [ ] https://www.artagdev.com.co/currentStudies
    - [ ] https://www.artagsite.com.co/favorites
    - [ ] https://www.artagdev.com.co/my-faith
  - [ ] Verify Organization schema found
  - [ ] No validation errors

### [ ] 19. Google Rich Results Test
- **Time:** 15 minutes
- **Steps:**
  - [ ] Go to: https://search.google.com/test/rich-results
  - [ ] Test each page URL
  - [ ] Check for warnings/errors
  - [ ] Note any rich result types found

### [ ] 20. Meta Open Graph Test
- **Time:** 15 minutes
- **Steps:**
  - [ ] Go to: https://developers.facebook.com/tools/debug/
  - [ ] Test each page
  - [ ] Verify images display correctly
  - [ ] Check titles and descriptions

### [ ] 21. Twitter Card Validation
- **Time:** 10 minutes
- **Steps:**
  - [ ] Go to: https://cards-dev.twitter.com/validator
  - [ ] Test home page
  - [ ] Verify card displays correctly
  - [ ] Check image dimensions

### [ ] 22. PageSpeed Insights
- **Time:** 30 minutes
- **Steps:**
  - [ ] Go to: https://pagespeed.web.dev/
  - [ ] Test each page (mobile & desktop)
  - [ ] Note scores:
    - [ ] Desktop score: ___/100
    - [ ] Mobile score: ___/100
  - [ ] Screenshot results for comparison

### [ ] 23. Lighthouse Audit
- **Time:** 30 minutes
- **Steps:**
  - [ ] Open each page in Chrome
  - [ ] DevTools → Lighthouse
  - [ ] Run audit (all categories)
  - [ ] Note scores:
    - [ ] Performance: ___/100
    - [ ] Accessibility: ___/100
    - [ ] Best Practices: ___/100
    - [ ] SEO: ___/100

---

## Phase 4: Ongoing Monitoring (Week 3+)
**Time Estimate:** 30 min/week

##
