import { Mail } from "lucide-react"
import { Github, Linkedin, Twitter, Instagram, Youtube, Dribbble, Codepen, Figma } from '@styled-icons/simple-icons'

export const socialLinksFooter = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Artag-Chris",
      color: "hover:text-[#6e5494] hover:border-[#6e5494]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/artag/",
      color: "hover:text-[#0077b5] hover:border-[#0077b5]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/yourusername",
      color: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/artagdev/",
      color: "hover:text-[#E1306C] hover:border-[#E1306C]",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@Artag888",
      color: "hover:text-[#ff0000] hover:border-[#ff0000]",
    },
    {
      name: "Dribbble",
      icon: Dribbble,
      url: "https://dribbble.com/yourusername",
      color: "hover:text-[#ea4c89] hover:border-[#ea4c89]",
    },
    {
      name: "CodePen",
      icon: Codepen,
      url: "https://codepen.io/yourusername",
      color: "hover:text-[#47cf73] hover:border-[#47cf73]",
    },
    {
      name: "Figma",
      icon: Figma,
      url: "https://figma.com/@yourusername",
      color: "hover:text-[#f24e1e] hover:border-[#f24e1e]",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:info@artagdev.com.co",
      color: "hover:text-[#D44638] hover:border-[#D44638]",
    },
  ]
  
  // Navigation links (keys resolved via footer.nav translations)
  export const navLinks = [
    { id: "home", name: "Home", href: "#home" },
    { id: "about", name: "About", href: "#about" },
    { id: "skills", name: "Skills", href: "#skills" },
    { id: "projects", name: "Projects", href: "#projects" },
    { id: "contact", name: "Contact", href: "#contact" },
  ]
  
  // Specialties (keys resolved via footer.services translations)
  export const services = [
    "fullstack",
    "architecture",
    "automation",
    "api",
    "performance",
    "cloud",
  ]