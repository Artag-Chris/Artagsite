"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Heart, Mail, Github, Linkedin, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { navLinks, services, socialLinksFooter } from "@/data/footerData"

function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setTimeout(() => {
      setIsSubscribed(true)
      setEmail("")
      setIsLoading(false)
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 600)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="relative w-screen -mx-[calc((100vw-100%)/2)] bg-gradient-to-b from-[#0a0a0a] via-black to-black">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-1/3 right-0 w-2/5 h-2/5 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Column 1: Logo & About */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>AD</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Artag Dev</h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                Software architect and automation specialist. Building scalable systems and elegant digital experiences with modern technologies.
              </p>
            </div>

            {/* Social Links with glow */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-cyan-500/70">Connect</p>
              <div className="flex flex-wrap gap-3">
                {socialLinksFooter.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] hover:border-cyan-500/50 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-white font-semibold mb-4 text-base relative inline-block">
                Quick Links
                <motion.span
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h3>
              <ul className="space-y-3 mt-6">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group text-sm"
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-500 mr-2 transition-colors"
                        whileHover={{ scale: 1.3 }}
                      ></motion.span>
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-white font-semibold mb-4 text-base relative inline-block">
                Specialties
                <motion.span
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h3>
              <ul className="space-y-3 mt-6">
                {services.slice(0, 6).map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href="#contact"
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center group text-sm"
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-indigo-500 mr-2 transition-colors"
                        whileHover={{ scale: 1.3 }}
                      ></motion.span>
                      {service}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-white font-semibold mb-4 text-base relative inline-block">
                Stay Updated
                <motion.span
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h3>

              <p className="text-gray-400 text-sm mb-6 mt-6 leading-relaxed">
                Subscribe to get updates on new projects, tech insights, and automation tips.
              </p>

              {!isSubscribed ? (
                <motion.form
                  onSubmit={handleSubscribe}
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur"></div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-500/50" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-[#0a0a0a] border border-[#262626] text-white placeholder:text-gray-600 pl-10 pr-12 focus:border-cyan-500/50 focus:ring-0 focus:outline-none text-sm transition-all duration-300"
                      />
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white disabled:opacity-50 transition-all"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs">
                    ✓ No spam, unsubscribe anytime
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 rounded-lg p-4 text-cyan-300 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Heart className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                    </motion.div>
                    <span>Thanks for subscribing!</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="relative z-10 border-t border-[#262626]"></div>

      {/* Bottom Footer */}
      <motion.div
        className="relative z-10 py-8 sm:py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <motion.p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Artag Dev. All rights reserved.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="text-gray-600 hover:text-cyan-400 text-xs sm:text-sm transition-colors duration-300"
                variants={itemVariants}
              >
                Privacy Policy
              </motion.a>
              <span className="text-gray-800">•</span>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-cyan-400 text-xs sm:text-sm transition-colors duration-300"
                variants={itemVariants}
              >
                Terms of Service
              </motion.a>
              <span className="text-gray-800">•</span>
              <motion.div
                className="text-gray-600 text-xs sm:text-sm flex items-center gap-1"
                variants={itemVariants}
              >
                Made with
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="h-3 w-3 fill-cyan-500 text-cyan-500" />
                </motion.div>
                in Pereira
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decorative line at bottom */}
      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
    </footer>
  )
}

export default Footer
