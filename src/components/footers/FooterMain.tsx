"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Mail, Heart, Github, Linkedin, ExternalLink } from "lucide-react"
import { navLinks, services, socialLinksFooter } from "@/data/footerData"
import LanguageSwitcher from "@/components/LanguageSwitcher"

function Footer() {
  const t = useTranslations("footer")
  const currentYear = new Date().getFullYear()

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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <footer className="relative w-screen -mx-[calc((100vw-100%)/2)] bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]">
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-blue-500/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>AD</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Artag Dev</h3>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed">
                {t("tagline")}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-zinc-600">{t("connect")}</p>
              <div className="flex flex-wrap gap-3">
                {socialLinksFooter.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5 text-zinc-500 transition-colors" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-white font-semibold mb-4 text-base">
                {t("quickLinks")}
              </h3>
              <ul className="space-y-3 mt-6">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-white mr-2 transition-colors"></span>
                      {t(`nav.${link.id}`)}
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-white font-semibold mb-4 text-base">
                {t("whatIDo")}
              </h3>
              <ul className="space-y-3 mt-6">
                {services.slice(0, 6).map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href="#contact"
                      className="text-zinc-500 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-white mr-2 transition-colors"></span>
                      {t(`services.${service}`)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-white font-semibold mb-4 text-base">
                {t("letsTalk")}
              </h3>

              <p className="text-zinc-500 text-sm mb-6 mt-6 leading-relaxed">
                {t("paragraph")}
              </p>

              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg text-sm transition-all duration-200 border border-white/10"
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="h-4 w-4" />
                {t("getInTouch")}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/5"></div>

      <motion.div
        className="relative z-10 py-8 sm:py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <motion.p className="text-zinc-600 text-xs sm:text-sm text-center sm:text-left">
              &copy; {currentYear} Artag Dev. {t("rights")}
            </motion.p>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>

            <motion.div
              className="flex items-center gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="text-zinc-600 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                variants={itemVariants}
              >
                {t("privacy")}
              </motion.a>
              <span className="text-zinc-800">&bull;</span>
              <motion.a
                href="#"
                className="text-zinc-600 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                variants={itemVariants}
              >
                {t("terms")}
              </motion.a>
              <span className="text-zinc-800">&bull;</span>
              <motion.div
                className="text-zinc-600 text-xs sm:text-sm flex items-center gap-1"
                variants={itemVariants}
              >
                {t("madeWith")}
                <Heart className="h-3 w-3 fill-white/40 text-white/40" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </footer>
  )
}

export default Footer
