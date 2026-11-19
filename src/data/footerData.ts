import { Mail } from "lucide-react"
import { Github, Linkedin, Instagram, Youtube } from "@styled-icons/simple-icons"

// Only real, verified profiles. Placeholder entries (twitter/dribbble/codepen/
// figma pointing at "yourusername") were removed: they were dead links.
export const socialLinksFooter = [
  { name: "GitHub", icon: Github, url: "https://github.com/Artag-Chris" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/artag/" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/artagdev/" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@Artag888" },
  { name: "Email", icon: Mail, url: "mailto:info@artagdev.com.co" },
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
