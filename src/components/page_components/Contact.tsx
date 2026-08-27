"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { socialLinksContact } from "@/data/contactData"
import { useContactForm } from "@/hooks/useContactForm"
import { useMetaPixel } from "@/hooks/useMetaPixel"
import { useInViewOnReady } from "@/hooks/useInViewOnReady"

function Contact() {
  const t = useTranslations("contact")
  const {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    handleChange,
    handleSelectChange,
    handleSubmit: originalHandleSubmit,
  } = useContactForm()

  const { trackEvent } = useMetaPixel()
  const { ref: headerInViewRef, isReady: headerReady } = useInViewOnReady<HTMLDivElement>({ amount: 0.3 })

  // Wrap the original handleSubmit with Meta Pixel tracking
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Track form submission
    trackEvent("Contact", {
      value: 1,
      currency: "USD",
      content_name: "Contact Form",
      content_type: "lead",
    })

    // Call the original handler
    await originalHandleSubmit(e)
  }

  // Track when social links are clicked
  const handleSocialClick = (socialName: string) => {
    trackEvent("ViewContent", {
      content_type: "social_link",
      content_name: socialName,
    })
  }

  useEffect(() => {
    // Meta Pixel tracking on mount
    trackEvent("ViewContent", {
      content_name: "Contact Section",
    })
  }, [])

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#080808] relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]">
      {/* Subtle background glows */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-2/5 h-2/5 bg-amber-500/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div
            ref={headerInViewRef}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={headerReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {t("title")}<span className="text-blue-400">{t("titleAccent")}</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t("description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4 sm:gap-8">
            {/* Contact Form */}
            <motion.div
              className="md:col-span-3 w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="group relative">
                <div className="relative bg-[#111111]/80 backdrop-blur-sm border border-white/5 overflow-hidden rounded-xl w-full transition-all duration-200 hover:border-white/10">
                  <div className="p-4 sm:p-6 relative">
                    {!isSubmitted ? (
                      <>
                        {error && (
                          <motion.div
                            className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                          </motion.div>
                        )}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-gray-300 mb-1 block text-sm font-medium">
                              {t("name")}
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder={t("namePlaceholder")}
                              required
                              className="mt-1 bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 focus:ring-white/20 rounded-lg transition-all duration-200"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-gray-300 mb-1 block text-sm font-medium">
                              {t("email")}
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder={t("emailPlaceholder")}
                              required
                              className="mt-1 bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 focus:ring-white/20 rounded-lg transition-all duration-200"
                            />
                          </div>

                          <div>
                            <Label htmlFor="projectType" className="text-gray-300 mb-1 block text-sm font-medium">
                              {t("topic")}
                            </Label>
                            <Select value={formData.projectType} onValueChange={handleSelectChange}>
                              <SelectTrigger className="mt-1 bg-[#0a0a0a]/50 border-white/10 text-white focus:border-white/20 focus:ring-white/20 rounded-lg transition-all duration-200">
                                <SelectValue placeholder={t("selectPlaceholder")} />
                              </SelectTrigger>
                              <SelectContent className="bg-[#111111] border-white/10 text-white">
                                <SelectItem value="collaboration">{t("topics.collaboration")}</SelectItem>
                                <SelectItem value="question">{t("topics.question")}</SelectItem>
                                <SelectItem value="feedback">{t("topics.feedback")}</SelectItem>
                                <SelectItem value="just-saying-hi">{t("topics.hi")}</SelectItem>
                                <SelectItem value="other">{t("topics.other")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="message" className="text-gray-300 mb-1 block text-sm sm:text-base font-medium">
                              {t("message")}
                            </Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder={t("messagePlaceholder")}
                              required
                              className="mt-1 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base bg-[#0a0a0a]/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/20 focus:ring-white/20 rounded-lg transition-all duration-200"
                            />
                            <input
                              type="text"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                              tabIndex={-1}
                              autoComplete="off"
                              aria-hidden="true"
                            />
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3 sm:py-4 text-sm sm:text-base transition-all duration-200 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-white/10 hover:border-white/20"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                               {isSubmitting ? t("sending") : (
                                 <>
                                    <span className="hidden sm:inline">
                                      {t("send")}
                                    </span>
                                   <span className="sm:hidden">{t("commonSend")}</span>
                                 </>
                               )}
                               <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                             </span>
                          </Button>
                        </motion.div>
                      </form>
                      </>
                    ) : (
                      <motion.div
                        className="flex flex-col items-center justify-center py-12 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle2 className="h-16 w-16 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">{t("success")}</h3>
                        <p className="text-gray-300">
                          {t("successSub")}
                        </p>
                      </motion.div>
                    )}
                  </div>

                   {/* Decorative elements */}
                   <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/3 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info */}
             <motion.div
               className="md:col-span-2 w-full"
               initial={{ opacity: 0, x: 15 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4, delay: 0.4 }}
             >
               <div className="group relative">
                 <div className="relative bg-[#111111]/80 backdrop-blur-sm border border-white/5 group-hover:border-white/10 rounded-xl w-full transition-all duration-200">
                  {/* Grid overlay */}
                  <div className="p-6 sm:p-8 relative">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white" style={{ fontFamily: 'var(--font-display)' }}>{t("info")}</h3>

                    <div className="space-y-5 sm:space-y-6">
                      {[
                        { Icon: Mail, label: t("emailLabel"), value: t("emailValue"), href: "mailto:info@artagdev.com.co" },
                        { Icon: Phone, label: t("phone"), value: t("phoneValue"), href: "tel:+573205711428" },
                        { Icon: MapPin, label: t("location"), value: t("locationValue"), href: null }
                      ].map((item, index) => {
                        const Icon = item.Icon;
                        return (
                          <motion.div
                            key={item.label}
                            className="group/item flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                          >
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-zinc-500 font-medium text-sm">{item.label}</p>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  className="text-blue-300 hover:text-blue-200 transition-colors text-base font-medium"
                                >
                                  {item.value}
                                </a>
                              ) : (
                                <p className="text-gray-300 text-base font-medium">{item.value}</p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                     {/* Social Links */}
                     <motion.div
                       className="mt-8 pt-8 border-t border-[#262626]"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                               transition={{ duration: 0.3, delay: 0.8 }}
                             >
                                <p className="text-zinc-400 font-semibold mb-4 text-sm tracking-wide">{t("social")}</p>
                               <div className="flex gap-3 flex-wrap">
                                 {socialLinksContact.map((social, index) => {
                                   const Icon = social.icon
                                   return (
                                     <motion.a
                                       key={social.name}
                                       href={social.url}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       whileHover={{ y: -2 }}
                                       whileTap={{ scale: 0.97 }}
                                       onClick={() => handleSocialClick(social.name)}
                                       initial={{ opacity: 0, y: 8 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                                       className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/8 transition-all duration-200"
                                       aria-label={social.name}
                                     >
                                       <Icon className="h-5 w-5 text-zinc-400 transition-colors" />
                                     </motion.a>
                                   )
                                 })}
                               </div>
                             </motion.div>
                  </div>

                   {/* Decorative elements */}
                   <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/3 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Final CTA */}
            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-6">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
                  {t("finalBadge")}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                {t("finalTitle")}
                <span className="text-blue-400">{t("finalAccent")}</span>
              </h3>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                {t("finalDescription")}
              </p>
            </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
