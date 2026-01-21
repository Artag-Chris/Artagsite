# PRINTABLE: Meta/Open Graph Audit - Action Checklist
**Print this and check off as you complete each task**

---

## 🔴 CRITICAL (Week 1 - Must Do)

### Day 1: Create Social Images
- [ ] Open https://canva.com
- [ ] Create 1200x630 design (Facebook)
  - [ ] Add Artag logo
  - [ ] Add text: "Full-Stack Developer | Web Animations | Pereira"
  - [ ] Add gradient: Emerald → Cyan → Indigo
  - [ ] Export as JPG
  - [ ] Compress at https://tinypng.com
  - [ ] Save as: `social-og-image-1200x630.jpg`
  
- [ ] Create 1200x675 design (Twitter)
  - [ ] Similar design, different dimensions
  - [ ] Export as JPG
  - [ ] Compress at https://tinypng.com
  - [ ] Save as: `twitter-card-1200x675.jpg`

- [ ] Upload to `/public/` folder
  - [ ] Copy files to project
  - [ ] Verify files exist

**Time: 1 hour | Status: ___/3 complete**

---

### Day 2: Update Code
- [ ] Open: `src/app/layout.tsx`
- [ ] Find: `openGraph` section
- [ ] Replace image URL with:
  - [ ] `https://www.artagdev.com.co/social-og-image-1200x630.jpg`

- [ ] Find: `twitter` section  
- [ ] Update image with:
  - [ ] `https://www.artagdev.com.co/twitter-card-1200x675.jpg`

- [ ] Save changes
- [ ] Verify syntax (no errors)

**Time: 20 minutes | Status: ___/3 complete**

---

### Day 3: Install Meta Pixel
- [ ] Go to: https://business.facebook.com
- [ ] Login to account
- [ ] Navigate: Events Manager
- [ ] Copy: Your Pixel ID (looks like: 123456789)
- [ ] Save to safe location

- [ ] Create: `src/components/google/MetaPixel.tsx`
- [ ] Copy code from: META_QUICK_IMPLEMENTATION.md
- [ ] Replace: `'YOUR_PIXEL_ID_HERE'` with actual ID
- [ ] Save file

- [ ] Update: `src/app/layout.tsx`
- [ ] Add import: `import { MetaPixel } from '@/components/google/MetaPixel'`
- [ ] Add to body: `<MetaPixel />`
- [ ] Save changes

**Time: 30 minutes | Status: ___/3 complete**

---

### Day 4: Test Everything
- [ ] Run locally: `npm run build && npm run start`
- [ ] Test Facebook sharing:
  - [ ] Visit: https://developers.facebook.com/tools/debug/sharing
  - [ ] Paste: https://www.artagdev.com.co
  - [ ] Click: "Scrape Again"
  - [ ] Verify: Image loads, title shows, description visible
  - [ ] Screenshot: Save for records

- [ ] Test Twitter card:
  - [ ] Visit: https://cards-dev.twitter.com/validator
  - [ ] Paste: https://www.artagdev.com.co
  - [ ] Verify: Image displays, dimensions correct
  - [ ] Screenshot: Save for records

- [ ] Test Meta Pixel:
  - [ ] Open browser DevTools (F12)
  - [ ] Refresh page
  - [ ] Look for: Meta Pixel firing (check Console)
  - [ ] Or use: https://developers.facebook.com/docs/facebook-pixel/guides/pixel-debugger

**Time: 20 minutes | Status: ___/3 complete**

---

### Day 5: Deploy
- [ ] Commit changes: `git add . && git commit -m "feat: optimize meta tags and pixel"`
- [ ] Push to production: `git push`
- [ ] Verify deployment successful
- [ ] Final check: All tests passing
- [ ] Monitor for 24 hours

**Time: 15 minutes | Status: ___/1 complete**

---

## 🟠 HIGH PRIORITY (Week 2 - Should Do)

### Convert Instagram to Business Account
- [ ] Open Instagram app
- [ ] Settings → Account Type
- [ ] Switch to: Business Account
- [ ] Select category: Technology
- [ ] Connect Facebook page

**Time: 10 minutes | Status: ✓ / 1 complete**

---

### Optimize Instagram Profile
- [ ] Go to: Profile settings
- [ ] Update Bio to:
  ```
  💻 Full-Stack Developer | Web Animations | React & Next.js
  → Link in bio for portfolio & free consultation
  ```
- [ ] Add Website: https://www.artagdev.com.co or Linktree
- [ ] Add Business Email: your-email@artagdev.com.co
- [ ] Add Phone: (optional)

**Time: 10 minutes | Status: ___/5 complete**

---

### Add CTA Button
- [ ] Settings → Professional Dashboard
- [ ] Contact Options
- [ ] Choose action: "Get a Quote" or "Email"
- [ ] Set destination: your email or contact form
- [ ] Verify: Button appears on profile

**Time: 5 minutes | Status: ___/2 complete**

---

### Create Link-in-Bio Landing Page
- [ ] Go to: https://linktree.com
- [ ] Sign up (free)
- [ ] Add links in order:
  - [ ] Portfolio: https://www.artagdev.com.co
  - [ ] Contact: https://www.artagdev.com.co/#contact
  - [ ] LinkedIn: (if applicable)
  - [ ] GitHub: (if applicable)
- [ ] Customize design (use Artag colors)
- [ ] Copy Linktree link
- [ ] Add to Instagram bio

**Time: 15 minutes | Status: ___/7 complete**

---

### Track Form Conversions
- [ ] Create: `src/lib/analytics/track.ts`
- [ ] Copy code from: META_QUICK_IMPLEMENTATION.md
- [ ] Update: Contact form component
- [ ] Add: `trackContactSubmission()` on successful submission
- [ ] Test: Submit form, check GA4 Realtime
- [ ] Verify: Event appears in analytics

**Time: 30 minutes | Status: ___/4 complete**

---

### Add Metadata to Inner Pages
- [ ] Edit: `src/app/about-me/page.tsx`
  - [ ] Add metadata export (use template from audit)
  - [ ] Update title & description
  - [ ] Add og:image
  
- [ ] Edit: `src/app/favorites/page.tsx`
  - [ ] Add metadata
  
- [ ] Edit: `src/app/my-faith/page.tsx`
  - [ ] Add metadata

**Time: 30 minutes | Status: ___/3 complete**

---

## 🟡 MEDIUM PRIORITY (Week 3 - Nice to Have)

### Content Planning
- [ ] Read: INSTAGRAM_STRATEGY.md (30 min)
- [ ] Review: 5 Content Pillars
- [ ] Review: 30 Post Ideas
- [ ] Create calendar for Week 1-2
- [ ] Prepare hashtag templates
- [ ] Draft first 3 posts

**Time: 60 minutes | Status: ___/6 complete**

---

### Start Posting (Ongoing)
- [ ] Monday: Post Animation Breakdown Reel
  - [ ] Record video (15 min)
  - [ ] Edit (15 min)
  - [ ] Write caption (5 min)
  - [ ] Schedule/Post (5 min)
  - [ ] Engage (10 min)

- [ ] Wednesday: Post Carousel/Carousel
  - [ ] Design slides (20 min)
  - [ ] Write copy (10 min)
  - [ ] Schedule/Post (5 min)
  - [ ] Engage (10 min)

- [ ] Friday: Post Code Transformation Reel
  - [ ] Record/edit (25 min)
  - [ ] Write caption (5 min)
  - [ ] Schedule/Post (5 min)
  - [ ] Engage (10 min)

**Time: ~1.5-2 hours per week | Status: Week ___**

---

### Track Analytics
- [ ] Weekly: Check Instagram Insights
  - [ ] Reach: ___
  - [ ] Engagement: ___%
  - [ ] Saves: ___
  - [ ] Profile Visits: ___

- [ ] Weekly: Check GA4
  - [ ] Form Conversions: ___
  - [ ] Instagram Traffic: ___
  - [ ] Top Pages: ___

- [ ] Monthly: Analyze trends
  - [ ] Which content performed best?
  - [ ] What should we repeat?
  - [ ] What should we change?

**Time: 15 minutes/week | Status: Week ___**

---

## COMPLETION TRACKER

### Week 1: Critical Fixes
```
Day 1: [ ] [ ] [ ] (Images)
Day 2: [ ] [ ] [ ] (Code)
Day 3: [ ] [ ] [ ] (Pixel)
Day 4: [ ] [ ] [ ] (Testing)
Day 5: [ ] [ ] [ ] (Deploy)

Score: ___/5 days complete
```

### Week 2: Instagram Setup
```
Monday: [ ] [ ] [ ] [ ] (Account + Profile + CTA)
Tuesday: [ ] [ ] [ ] (Link-in-Bio + Form Tracking + Metadata)
Wednesday: [ ] [ ] (Final verification)

Score: ___/8 tasks complete
```

### Week 3+: Content
```
Monday Week 3: [ ] (Post #1)
Wednesday Week 3: [ ] (Post #2)
Friday Week 3: [ ] (Post #3)
Daily: [ ] (Engagement)

Score: ___/4 tasks complete
```

---

## 📊 SUCCESS VERIFICATION

### Social Media Sharing Works
- [ ] Facebook preview shows correct image
- [ ] Twitter card displays correctly
- [ ] LinkedIn shows preview (bonus)
- [ ] Instagram story preview works

### Conversion Tracking Active
- [ ] Meta Pixel fires on page load
- [ ] Form submission tracked in GA4
- [ ] Form submission tracked in Pixel
- [ ] Can see leads in analytics

### Instagram Ready
- [ ] Business account enabled
- [ ] Profile optimized
- [ ] CTA button working
- [ ] Linktree link-in-bio active
- [ ] First post scheduled

### Results Visible
- [ ] Website traffic from social: ___%
- [ ] Instagram followers: ___
- [ ] Contact form submissions: ___
- [ ] Tracked conversions: ___

---

## 🎯 30-DAY GOAL

**By February 20, 2026:**

- [ ] All Meta/Open Graph issues fixed
- [ ] Meta Pixel tracking conversions
- [ ] Instagram Business account with 5+ posts
- [ ] 100+ Instagram followers
- [ ] 1-2 inbound inquiries from social
- [ ] Website traffic from Instagram measured
- [ ] Clear understanding of what content works

---

## 📞 HELP & RESOURCES

**Stuck?**
- Email support: support@artagdev.com.co
- Full audit: META_OPENGRAPH_AUDIT.md (search your issue)
- Quick guide: META_QUICK_IMPLEMENTATION.md
- Instagram help: INSTAGRAM_BUSINESS_CHECKLIST.md

**Tools Used:**
- Canva.com (design)
- TinyPNG.com (compression)
- Facebook Debugger (testing)
- Twitter Card Validator (testing)
- Google Analytics (tracking)
- Meta Business Suite (pixel + Instagram)

---

## 📝 NOTES SECTION

**Week 1 Notes:**
```
Day 1 - Image creation:
[blank lines for notes]

Day 2 - Code update:
[blank lines for notes]

Day 3 - Pixel installation:
[blank lines for notes]

Day 4 - Testing:
[blank lines for notes]

Day 5 - Deployment:
[blank lines for notes]
```

**Week 2 Notes:**
```
Instagram setup:
[blank lines for notes]

Content planning:
[blank lines for notes]

First impressions:
[blank lines for notes]
```

**Week 3+ Notes:**
```
Content performance:
[blank lines for notes]

Engagement metrics:
[blank lines for notes]

What's working:
[blank lines for notes]

What to improve:
[blank lines for notes]
```

---

## ✅ FINAL CHECKLIST

**Before considering this complete:**

- [ ] All critical issues fixed (Week 1)
- [ ] Instagram Business account active (Week 2)
- [ ] Conversion tracking working (Week 2)
- [ ] First 3 posts published (Week 3)
- [ ] Analytics visible and being monitored (Week 3)
- [ ] Engagement happening daily (Week 3+)
- [ ] Can see attribution of leads to social (Week 4+)

---

## 🎉 CONGRATULATIONS!

When all boxes are checked, you'll have:

✅ Professional social sharing  
✅ Conversion tracking enabled  
✅ Instagram Business presence  
✅ Content strategy in place  
✅ Measurable growth  
✅ Clear funnel from content → leads  

**That's a complete social media infrastructure!**

---

**Print this checklist and post it near your desk.**  
**Check off each item as you complete it.**  
**Share progress with your team/coach.**

**Estimated Total Time: 4-5 hours over 3 weeks**  
**Expected ROI: 200-300% improvement in social metrics**
