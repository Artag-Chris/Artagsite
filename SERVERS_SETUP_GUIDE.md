# 📖 Private Servers - Adding Your Real Servers

## 📍 File Location

```
src/data/serverAndResources/serverAndResourcesData.tsx
```

This file contains the JSON-like structure for all your server data. It's organized in TypeScript interfaces and arrays.

---

## 🔧 Server Object Structure

Each server in the `serverCards` array should have this structure:

```typescript
{
  id: number,                          // Unique identifier (1, 2, 3...)
  title: string,                       // Display name (e.g., "File Browser")
  description: string,                 // Brief description
  status: "live" | "development" | "planning" | "maintenance",
  category: string,                    // Type (e.g., "File Management")
  icon: React.ReactNode,              // Icon from lucide-react
  imageUrl: string,                   // Thumbnail image URL (Cloudinary, etc)
  specs: string[],                    // Hardware specs ["2 CPU Cores", "4GB RAM", etc]
  technologies: string[],             // Tech stack ["Node.js", "React", etc]
  url?: string,                       // (Optional) Direct access URL - only for "live" servers
  features?: string[],                // (Optional) Key features list
}
```

---

## ✅ Your Real Servers Template

Here's the exact structure ready for your 3 servers:

### **1. File Browser** (file_browser.artagdev.com.co)

```typescript
{
  id: 1,
  title: "File Browser",
  description: "Web-based file management system for browsing, uploading, and managing files on your server.",
  status: "live",
  category: "File Management",
  icon: <FileText className="h-6 w-6" />,
  imageUrl: "YOUR_IMAGE_URL_HERE",  // Add your screenshot
  specs: ["2 CPU Cores", "2GB RAM", "Storage Varies"],
  technologies: ["Node.js", "Web UI", "REST API"],
  url: "https://file_browser.artagdev.com.co",
  features: [
    "Browse directories",
    "Upload/Download files",
    "File preview",
    "Directory management"
  ],
}
```

### **2. Navidrome** (navidrome.artagdev.com.co)

```typescript
{
  id: 2,
  title: "Navidrome",
  description: "Personal music streaming server. Listen to your music collection from anywhere with a modern web interface.",
  status: "live",
  category: "Music Streaming",
  icon: <Music className="h-6 w-6" />,  // or use <Audio />
  imageUrl: "YOUR_IMAGE_URL_HERE",  // Add your screenshot
  specs: ["2 CPU Cores", "3GB RAM", "Music Library Storage"],
  technologies: ["Go", "SQLite", "Subsonic API"],
  url: "https://navidrome.artagdev.com.co",
  features: [
    "Stream your music collection",
    "Playlists & favorites",
    "Mobile app compatible",
    "Transcoding support"
  ],
}
```

### **3. N8N** (n8n.artagdev.com.co)

```typescript
{
  id: 3,
  title: "N8N Automation",
  description: "Visual workflow automation platform for creating integrations and automating repetitive tasks.",
  status: "live",
  category: "Automation",
  icon: <Zap className="h-6 w-6" />,  // or use <Workflow />
  imageUrl: "YOUR_IMAGE_URL_HERE",  // Add your screenshot
  specs: ["4 CPU Cores", "4GB RAM", "50GB SSD"],
  technologies: ["Node.js", "N8N", "Docker", "PostgreSQL"],
  url: "https://n8n.artagdev.com.co",
  features: [
    "Visual workflow builder",
    "200+ integrations",
    "Error handling & retry",
    "Scheduled workflows",
    "Webhook support"
  ],
}
```

---

## 🎨 Adding the Icons

You need to import the icons at the top of the file. Add these to the existing imports:

```typescript
import { 
  Code, Palette, FileText, Globe, Monitor, Cpu, HardDrive, Server,
  Music,    // ← ADD THIS
  Zap,      // ← ADD THIS  
  Workflow, // ← ADD THIS (optional - alternative to Zap)
  Audio,    // ← ADD THIS (optional - alternative to Music)
} from "lucide-react"
```

---

## 📸 Image URLs

For the `imageUrl`, you have options:

### **Option 1: Use Cloudinary (Current Method)**
```
imageUrl: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1749090002/YOUR_IMAGE_NAME.jpg"
```

### **Option 2: Use Local Images**
```
1. Save screenshot to: public/servers/filename.png
2. Use: imageUrl: "/servers/filename.png"
```

### **Option 3: Use Public URLs**
```
imageUrl: "https://example.com/image.png"
```

---

## 🔄 How to Update - Step by Step

### **Step 1: Open the file**
```
src/data/serverAndResources/serverAndResourcesData.tsx
```

### **Step 2: Find the serverCards array**
Look for:
```typescript
export const serverCards: ServerCard[] = [
  // Existing servers here
]
```

### **Step 3: Replace the mock data**

**Remove:**
```typescript
  {
    id: 1,
    title: "Personal Portfolio API",
    description: "...",
    // ... rest of mock server
  },
```

**Add your real server:**
```typescript
  {
    id: 1,
    title: "File Browser",
    description: "Web-based file management system...",
    status: "live",
    category: "File Management",
    icon: <FileText className="h-6 w-6" />,
    imageUrl: "https://your-image-url.com/file-browser.png",
    specs: ["2 CPU Cores", "2GB RAM", "Storage Varies"],
    technologies: ["Node.js", "Web UI"],
    url: "https://file_browser.artagdev.com.co",
    features: ["Browse directories", "Upload files", "File preview"],
  },
```

### **Step 4: Repeat for all 3 servers**

The order doesn't matter, but keep the IDs unique (1, 2, 3 or any numbers).

### **Step 5: Save and test**

Your servers will automatically appear on `/private-servers` page!

---

## 🚀 Adding More Servers Later

Once you have the 3 servers set up, adding more is easy:

```typescript
// Just add a new object to the array:
export const serverCards: ServerCard[] = [
  { /* Server 1 */ },
  { /* Server 2 */ },
  { /* Server 3 */ },
  // Add Server 4 here:
  {
    id: 4,
    title: "New Server Name",
    description: "...",
    status: "live",
    // ... rest of fields
  },
]
```

---

## 📋 Full File Structure Reference

```typescript
// imports...
export interface WebsiteCard {
  // ... website card interface
}

export interface ServerCard {
  id: number
  title: string
  description: string
  status: "planning" | "development" | "live" | "maintenance"
  category: string
  icon: React.ReactNode
  imageUrl: string
  specs: string[]
  technologies: string[]
  url?: string        // ← For live servers
  features?: string[] // ← Optional
}

export const websiteCards: WebsiteCard[] = [
  // Website cards (GitHub, Figma, etc)
]

export const serverCards: ServerCard[] = [
  // YOUR SERVERS GO HERE ← Update this section
]

export const getStatusColor = (status: string) => {
  // Returns color classes based on status
}
```

---

## 🎯 Status Options & Colors

| Status | Color | Used For |
|--------|-------|----------|
| `"live"` | Green/Emerald | Servers currently running and accessible |
| `"development"` | Blue | Servers in active development |
| `"planning"` | Purple | Servers planned but not started |
| `"maintenance"` | Amber/Yellow | Servers temporarily offline |

**Example:**
```typescript
status: "live",  // Green badge, "Access Server" button visible
status: "development", // Blue badge, no access button
status: "planning",    // Purple badge, no access button
```

---

## 💡 Pro Tips

1. **Icon Selection**: Use lucide-react icons. Browse at https://lucide.dev
   
2. **Short Descriptions**: Keep descriptions under 150 characters

3. **Specs Format**: Use consistent format:
   ```
   ["2 CPU Cores", "4GB RAM", "50GB SSD"]
   ```

4. **Technologies**: List main tech stack (max 4-5 items)

5. **Features**: List 3-4 key features, short and catchy

6. **Images**: Screenshots of the interface work best (1200x630px recommended)

---

## 🔐 URL Security

- URLs are only visible & clickable when `status: "live"`
- If `status: "development"` or `"planning"`, the URL field is ignored
- Use full URLs including `https://` or `http://`

---

## ❓ Example: Complete Server Entry

```typescript
{
  id: 1,
  title: "File Browser",
  description: "Web-based file management system for browsing, uploading, and organizing files on your server.",
  status: "live",
  category: "File Management",
  icon: <FileText className="h-6 w-6" />,
  imageUrl: "https://res.cloudinary.com/example/file-browser.png",
  specs: ["2 CPU Cores", "2GB RAM", "Dynamic Storage"],
  technologies: ["Node.js", "Express", "SQLite"],
  url: "https://file_browser.artagdev.com.co",
  features: ["Browse & organize", "Upload files", "Share links"],
}
```

---

## 🎁 Next Steps

1. **Update the 3 servers** with your real data
2. **Add screenshot URLs** (use Cloudinary or local `/public` folder)
3. **Test on `/private-servers` page**
4. **Add more servers** whenever you deploy new ones

That's it! The page will automatically display and style your servers correctly. 🚀

---

**Last Updated:** Jan 22, 2025  
**Servers Structure Version:** 2.0 (with URL and features support)
