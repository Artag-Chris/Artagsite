"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { navLinks, services, socialLinksFooter } from "@/data/footerData"


function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true)
      setEmail("")
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 500)
  }
  
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AD</span>
              </div>
              <h3 className="text-xl font-bold text-white">Artag Dev</h3>
            </div>

            <p className="text-zinc-400 text-sm">
              Creating exceptional digital experiences through innovative solutions and clean, efficient code.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinksFooter.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-md bg-zinc-800 border border-zinc-700 transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-indigo-500"></span>
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-indigo-500 mr-2 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-indigo-500"></span>
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#contact"
                    className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-indigo-500 mr-2 transition-colors"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-indigo-500"></span>
            </h3>
            <p className="text-zinc-400 text-sm mb-4">
              Subscribe to receive updates on new projects and tech articles.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 pr-10 focus:border-indigo-500"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1 h-8 bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-zinc-500 text-xs">I respect your privacy. Unsubscribe at any time.</p>
              </form>
            ) : (
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-md p-3 text-indigo-400 text-sm">
                Thanks for subscribing!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-zinc-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-500 text-sm mb-4 md:mb-0">© {currentYear} Artag Dev. Todos los.</div>

            <div className="flex items-center gap-4">
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <span className="text-zinc-700">•</span>
              <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                Terms of Service
              </Link>
              <span className="text-zinc-700">•</span>
              <div className="text-zinc-500 text-sm flex items-center">
                hecho con <Heart className="h-3 w-3 text-indigo-500 mx-1" /> en Pereira
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
