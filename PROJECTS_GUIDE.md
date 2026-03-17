# 📋 Projects Section Guide

## Overview

The projects section now features a professional showcase with filtering, modals, and comprehensive project details. Perfect for displaying both personal projects and client work while maintaining privacy.

## Adding New Projects

### Step 1: Update `src/data/proyectData.ts`

Add a new project object to the `projectsData` array:

```typescript
{
  id: "unique-id", // Used for key and modal reference
  title: "Project Name",
  description: "Full detailed description of your project...",
  shortDescription: "Brief one-line summary", // Shows in card
  category: "personal", // Options: "personal" | "client" | "featured"
  status: "live", // Options: "live" | "in-progress" | "archived"
  
  // Media & Links
  youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  youtubeEmbedId: "YOUR_VIDEO_ID", // Extract from URL
  
  // Technologies
  tech: ["React", "Node.js", "MongoDB", "TypeScript"],
  
  // Features list
  features: [
    "Feature 1",
    "Feature 2",
    "Real-time collaboration",
  ],
  
  // Live site (optional, hide for client projects)
  liveUrl: "https://yourproject.com",
  
  // Repository
  githubUrl: "https://github.com/username/repo",
  repositoryVisibility: "public", // Options: "public" | "private"
  
  // For client projects
  companyName: "Client Company Name",
  role: "Lead Developer", // Your role
  
  // Achievements
  achievements: [
    "Reduced load time by 40%",
    "Scaled to 10K+ users",
    "Implemented CI/CD pipeline",
  ],
  
  // Timeline
  startDate: "2024-01", // Format: YYYY-MM
  endDate: "2024-03", // Leave null if ongoing
}
```

## Project Categories

### 1. **Personal Projects** (`category: "personal"`)
- Your own projects and portfolios
- Can show live links and public repos
- Shows in "Personal" filter

### 2. **Client Projects** (`category: "client"`)
- Work done for companies/clients
- Can hide repository and live URL
- Shows company name
- Use `repositoryVisibility: "private"` to indicate private repos
- Great for showing expertise without exposing client code

### 3. **Featured** (`category: "featured"`)
- Highlight your best work
- Gets special treatment in the UI

## Project Status

- **live** - Project is deployed and working
- **in-progress** - Currently being developed
- **archived** - Old/retired project

## Features to Show/Hide

### For Public Projects
- ✅ Live URL
- ✅ GitHub repository
- ✅ All features and achievements
- ✅ Short description

### For Client Projects
```typescript
{
  // Show general info
  title: "Enterprise Automation Solution",
  description: "A comprehensive automation platform...",
  category: "client",
  companyName: "Client Name", // Instead of showing live URL
  
  // Hide or minimize:
  // - Don't include liveUrl or set to undefined
  // - Use repositoryVisibility: "private" on modal
  // - Use generic descriptions (no specifics that break NDA)
  
  // Show achievements (generic ones)
  achievements: [
    "Reduced manual processes by 80%",
    "Improved system efficiency",
    "Implemented CI/CD pipeline",
  ],
}
```

## YouTube Video Integration

1. Get your YouTube video ID from the URL:
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID: `dQw4w9WgXcQ`

2. Add both URLs to your project:
```typescript
youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
youtubeEmbedId: "dQw4w9WgXcQ",
```

3. The video will:
   - Show a "Demo" button in the card
   - Auto-play in the modal
   - Be fully responsive

## Tips for Project Descriptions

### Good Examples
- ✅ "Enterprise automation platform that reduced manual processes by 80%"
- ✅ "Real-time collaboration tool built with Next.js and Socket.io"
- ✅ "Full-stack e-commerce solution with Stripe integration"

### What NOT to do (Client Work)
- ❌ Don't mention client name in description
- ❌ Don't reveal internal systems or architecture details
- ❌ Don't show actual URLs or specific metrics that break NDA
- ❌ Don't include proprietary information

## Filtering System

Users can filter by:
- **All** - Show all projects
- **Personal** - Personal projects only
- **Client** - Client work only
- **Featured** - Top projects

The page also shows statistics:
- Total projects
- Live projects
- Personal projects
- Client projects

## Modal Features

When users click a project card:

1. **Video Tab**
   - Embedded YouTube video
   - Auto-plays (if enabled)
   - Full-screen compatible

2. **Overview Tab**
   - Project description
   - Key achievements
   - Client/company info
   - Timeline

3. **Features Tab**
   - All features with checkmarks
   - Grid layout on desktop, stacked on mobile

4. **Tech Stack Tab**
   - All technologies used
   - Gradient styling
   - Easy to scan

## Example: Adding a Client Project

```typescript
{
  id: "enterprise-client-2024",
  title: "Financial Data Processing System",
  description: "A sophisticated data processing platform handling real-time market analysis and automated reporting for financial institutions.",
  shortDescription: "Financial data automation platform",
  category: "client",
  status: "live",
  companyName: "Confidential Financial Client",
  youtubeUrl: "https://www.youtube.com/watch?v=DEMO_VIDEO_ID",
  youtubeEmbedId: "DEMO_VIDEO_ID",
  tech: ["Node.js", "PostgreSQL", "Redis", "AWS Lambda"],
  features: [
    "Real-time data processing",
    "Automated reporting",
    "Scalable architecture",
    "Error handling & recovery",
  ],
  // NO liveUrl - it's internal
  githubUrl: "https://github.com/private-repo", // Optional
  repositoryVisibility: "private",
  role: "Lead Backend Developer",
  achievements: [
    "Processed 1M+ transactions daily",
    "99.99% uptime SLA",
    "Reduced processing time by 60%",
  ],
  startDate: "2023-06",
  endDate: "2024-02",
}
```

## Customization

### Colors & Styling
- Edit `EnhancedProjectCard.tsx` for card styling
- Edit `ProjectModal.tsx` for modal styling
- Colors follow Techonic Precision: Cyan & Indigo

### Animations
- Adjust `transition` values for faster/slower animations
- Modify `whileHover` scale values for stronger/weaker effects

## Performance Tips

- Keep descriptions under 150 characters for `shortDescription`
- Use max 5-6 main technologies (rest go in "+X more")
- Limit achievements to 3-4 most impactful ones
- Compress images if adding thumbnails later

## Future Enhancements

Potential additions:
- [ ] Project images/screenshots
- [ ] Case study deep dives
- [ ] Live code demos
- [ ] Team member attribution
- [ ] Awards/recognition badges
- [ ] Client testimonials

---

**Last Updated**: March 2024
**Maintainer**: Artag Dev
