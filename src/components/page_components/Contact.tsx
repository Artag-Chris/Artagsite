"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
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
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-black via-black to-[#0a0a0a] relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-1/3 right-0 w-2/5 h-2/5 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

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
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                I'm Available — Let's Talk
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Got a Project? <span className="text-cyan-400 drop-shadow-lg" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>Write to Me.</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              No sales pitch, no agency overhead. Just a direct line to a developer who will actually read your message, think about your problem, and give you a real answer — usually within 24 hours.
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
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-[#141414]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-[#262626] group-hover:border-cyan-500/30 overflow-hidden rounded-2xl w-full transition-all duration-300">
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.02] rounded-2xl pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>

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
                              Your Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                              className="mt-1 bg-[#0a0a0a]/50 border-[#262626] text-white placeholder:text-gray-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg transition-all duration-300"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-gray-300 mb-1 block text-sm font-medium">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              required
                              className="mt-1 bg-[#0a0a0a]/50 border-[#262626] text-white placeholder:text-gray-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg transition-all duration-300"
                            />
                          </div>

                          <div>
                            <Label htmlFor="projectType" className="text-gray-300 mb-1 block text-sm font-medium">
                              What can I help with?
                            </Label>
                            <Select value={formData.projectType} onValueChange={handleSelectChange}>
                              <SelectTrigger className="mt-1 bg-[#0a0a0a]/50 border-[#262626] text-white focus:border-cyan-500 focus:ring-cyan-500 rounded-lg transition-all duration-300">
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#141414] border-[#262626] text-white">
                                <SelectItem value="system-architecture">System Architecture Design</SelectItem>
                                <SelectItem value="automation-solutions">Automation Solutions</SelectItem>
                                <SelectItem value="devops-infrastructure">DevOps & Infrastructure</SelectItem>
                                <SelectItem value="consulting">Technical Consulting</SelectItem>
                                <SelectItem value="full-time">Full-time Role</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="message" className="text-gray-300 mb-1 block text-sm sm:text-base font-medium">
                              Your Message
                            </Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell me what you're building, what's broken, or what you need. The more detail, the better I can help."
                              required
                              className="mt-1 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base bg-[#0a0a0a]/50 border-[#262626] text-white placeholder:text-gray-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg transition-all duration-300"
                            />
                            <input
                              type="text"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                              style={{ display: 'none' }}
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
                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                               {isSubmitting ? "Sending..." : (
                                 <>
                                   <span className="hidden sm:inline">
                                     Send my inquiry
                                   </span>
                                   <span className="sm:hidden">Send</span>
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
                        <CheckCircle2 className="h-16 w-16 text-cyan-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Message sent successfully!</h3>
                        <p className="text-gray-300">
                          Thank you for contacting me. I'll get back to you as soon as possible.
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="md:col-span-2 w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="group relative">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-[#141414]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-[#262626] group-hover:border-cyan-500/30 rounded-2xl w-full transition-all duration-300">
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.02] rounded-2xl pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>

                  <div className="p-6 sm:p-8 relative">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white" style={{ fontFamily: 'var(--font-display)' }}>Contact Information</h3>

                    <div className="space-y-5 sm:space-y-6">
                      {[
                        { Icon: Mail, label: "Email", value: "artagdev@gmail.com", href: "mailto:artagdev@gmail.com" },
                        { Icon: Phone, label: "Phone", value: "+57 320 571 1428", href: "tel:+57320571142" },
                        { Icon: MapPin, label: "Location", value: "Pereira, Risaralda, Colombia", href: null }
                      ].map((item, index) => {
                        const Icon = item.Icon;
                        return (
                          <motion.div
                            key={item.label}
                            className="group/item flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 border border-[#262626] group-hover/item:border-cyan-500/30 transition-all duration-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:from-cyan-500/30 group-hover/item:to-indigo-500/20 transition-all duration-300">
                              <Icon className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-400 font-medium text-sm">{item.label}</p>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  className="text-cyan-300 hover:text-cyan-200 transition-colors text-base font-medium"
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
                       transition={{ duration: 0.5, delay: 0.8 }}
                     >
                       <p className="text-gray-300 font-semibold mb-4 text-sm tracking-wide">Connect on Social Media</p>
                       <div className="flex gap-3 flex-wrap">
                         {socialLinksContact.map((social, index) => {
                           const Icon = social.icon
                           return (
                             <motion.a
                               key={social.name}
                               href={social.url}
                               target="_blank"
                               rel="noopener noreferrer"
                               whileHover={{ scale: 1.2, y: -5 }}
                               whileTap={{ scale: 0.95 }}
                               onClick={() => handleSocialClick(social.name)}
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                               className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] hover:border-cyan-500/60 transition-all duration-300 hover:from-cyan-500/10 hover:to-indigo-500/10 group/social"
                               aria-label={social.name}
                             >
                               <Icon className="h-5 w-5 text-gray-400 group-hover/social:text-cyan-400 transition-colors" />
                             </motion.a>
                           )
                         })}
                       </div>
                     </motion.div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>
                </div>
              </div>
            </motion.div>
          </div>

           {/* Final CTA */}
           <motion.div
             className="text-center mt-20"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
           >
             <div className="inline-block mb-6">
               <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                 Seriously, I Don't Bite
               </span>
             </div>
             <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
               Not Sure If I'm the Right Fit?{" "}
               <span className="text-cyan-400">Ask Anyway.</span>
             </h3>
             <p className="text-gray-300 max-w-2xl mx-auto text-lg">
               The worst that happens is I point you in the right direction. The best? We build something you're proud of.
               Send a message — no commitment, no pressure, just a conversation.
             </p>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
