"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { socialLinksContact, testimonials } from "@/data/contactData"
import { useContactForm } from "@/hooks/useContactForm"
import { useMetaPixel } from "@/hooks/useMetaPixel"

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
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)

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
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="contact" className="py-12 sm:py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-indigo-500/3 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Let's <span className="text-cyan-400">Build Something Scalable</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Whether you need system architecture, automation solutions, or strategic technical guidance—let's explore how we can work together to solve your toughest challenges.
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
              <div className="bg-black border border-gray-700 overflow-hidden rounded-lg w-full">
                <div className="p-4 sm:p-6">
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
                            className="mt-1 bg-black border-gray-700 text-white placeholder:text-gray-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md"
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
                            className="mt-1 bg-black border-gray-700 text-white placeholder:text-gray-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md"
                          />
                        </div>

                        <div>
                          <Label htmlFor="projectType" className="text-gray-300 mb-1 block text-sm font-medium">
                            What can I help with?
                          </Label>
                          <Select value={formData.projectType} onValueChange={handleSelectChange}>
                            <SelectTrigger className="mt-1 bg-black border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500 rounded-md">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-gray-700 text-white">
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
                            placeholder="Tell me what you have in mind..."
                            required
                            className="mt-1 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base bg-black border-gray-700 text-white placeholder:text-gray-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md"
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

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                           {isSubmitting ? "Sending..." : (
                             <>
                               <span className="hidden sm:inline">
                                 Send my inquiry
                               </span>
                               <span className="sm:hidden">Send</span>
                             </>
                           )}
                           <Send className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                         </span>
                      </Button>
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
              </div>
            </motion.div>

            {/* Contact Info & Testimonials */}
            <motion.div
              className="md:col-span-2 w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Contact Info */}
              <div className="bg-black border border-gray-700 mb-3 sm:mb-6 w-full rounded-lg">
                <div className="p-3 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold mb-3 sm:mb-6 text-white" style={{ fontFamily: 'var(--font-display)' }}>Contact Information</h3>

                  <div className="space-y-3 sm:space-y-5">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium text-sm sm:text-base">Email</p>
                        <a
                          href="mailto:artagdev@gmail.com"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm sm:text-base"
                        >
                          artagdev@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium text-sm sm:text-base">Phone</p>
                        <a href="tel:+57320571142" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm sm:text-base">
                          +57 320 571 1428
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium text-sm sm:text-base">Location</p>
                        <p className="text-gray-500 text-sm sm:text-base">Pereira, Risaralda, Colombia</p>
                      </div>
                    </div>
                  </div>

                   {/* Social Links */}
                   <div className="mt-6 border-t border-gray-700 pt-6">
                     <p className="text-gray-300 font-medium mb-3 text-sm">Connect with me</p>
                     <div className="flex gap-3">
                       {socialLinksContact.map((social) => {
                         const Icon = social.icon
                         return (
                           <motion.a
                             key={social.name}
                             href={social.url}
                             target="_blank"
                             rel="noopener noreferrer"
                             whileHover={{ y: -5 }}
                             onClick={() => handleSocialClick(social.name)}
                             className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black border border-gray-700 transition-all duration-300 hover:border-cyan-500"
                             aria-label={social.name}
                           >
                             <Icon className="h-5 w-5" />
                           </motion.a>
                         )
                       })}
                     </div>
                   </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-black border border-gray-700 relative overflow-hidden rounded-lg">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full"></div>

                <div className="p-4 sm:p-6 relative">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-4 w-4 text-cyan-500" />
                  </div>

                  <div className="min-h-[160px] flex flex-col justify-between">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-gray-300 italic mb-4 text-sm sm:text-base">"{testimonials[currentTestimonial].text}"</p>
                      <div>
                        <p className="text-white font-medium text-sm">{testimonials[currentTestimonial].name}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{testimonials[currentTestimonial].company}</p>
                      </div>
                    </motion.div>

                    <p className="text-cyan-400 mt-6 text-xs sm:text-sm font-medium">
                      I work with teams and organizations to design scalable systems and build automation that drives growth. Let's talk about your technical challenges.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

           {/* Final CTA */}
           <motion.div
             className="text-center mt-16"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.6 }}
           >
             <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>Ready to Solve Your Technical Challenge?</h3>
             <p className="text-gray-300 max-w-2xl mx-auto">
               Share your project details and let's discuss how we can architect a solution that scales with your ambitions.
             </p>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact