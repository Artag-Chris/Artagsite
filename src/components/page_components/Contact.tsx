"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { socialLinksContact, testimonials } from "@/data/contactData"

type FormState = {
  [key: string]: string; // Or a more specific mapping of object keys to their types
};

function Contact() {
  const [formState, setFormState] = useState<FormState>({});

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Ensure name is defined and matches FormState keys
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, projectType: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Success state
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({
        name: "",
        email: "",
        projectType: "",
        message: "",
      })
    }, 3000)
  }

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="contact" className="py-12 sm:py-20 bg-black">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's <span className="text-emerald-500">Connect</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
              Do you need an efficient web solution? Let's talk and make it happen!
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
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden w-full">
                <CardContent className="p-4 sm:p-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-zinc-300 mb-1 block">
                            Your Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-zinc-300 mb-1 block">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="info@gmail.com"
                            required
                            className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <Label htmlFor="projectType" className="text-zinc-300 mb-1 block">
                            Project Type
                          </Label>
                          <Select value={formState.projectType} onValueChange={handleSelectChange}>
                            <SelectTrigger className="mt-1 bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500 focus:ring-emerald-500">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                              <SelectItem value="web-development">Web Development</SelectItem>
                              <SelectItem value="mobile-app">Mobile App</SelectItem>
                              <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                              <SelectItem value="consulting">Consulting</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="message" className="text-zinc-300 mb-1 block text-sm sm:text-base">
                            Your Message
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            placeholder="Tell me what you have in mind..."
                            required
                            className="mt-1 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500 placeholder:text-sm"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                          {isSubmitting ? "Sending..." : (
                            <>
                              <span className="hidden sm:inline">
                                Send me your inquiry and I'll get back to you soon!
                              </span>
                              <span className="sm:hidden">Send Message</span>
                            </>
                          )}
                          <Send className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-12 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Message sent successfully!</h3>
                      <p className="text-zinc-300">
                        Thank you for contacting me. I'll get back to you as soon as possible.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Testimonials */}
            <motion.div
              className="md:col-span-2 w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Contact Info */}
              <Card className="bg-zinc-900 border-zinc-800 mb-3 sm:mb-6 w-full">
                <CardContent className="p-3 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold mb-3 sm:mb-6 text-white">Contact Information</h3>

                  <div className="space-y-3 sm:space-y-5">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-zinc-300 font-medium text-sm sm:text-base">Email</p>
                        <a
                          href="mailto:contact@johndoe.com"
                          className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm sm:text-base"
                        >
                          artagdev@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-zinc-300 font-medium">Phone</p>
                        <a href="tel:+1234567890" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                          +57 3205711428
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-zinc-300 font-medium">Location</p>
                        <p className="text-zinc-400">Pereira Risaralda Colombia</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-6">
                    <p className="text-zinc-300 font-medium mb-3">Connect with me</p>
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
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 transition-colors duration-300 hover:border-zinc-500"
                            aria-label={social.name}
                          >
                            <Icon className="h-5 w-5" />
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="bg-zinc-900 border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full"></div>

                <CardContent className="p-6 relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-4 w-4 text-emerald-500" />
                  </div>

                  <div className="min-h-[160px] flex flex-col justify-between">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-zinc-300 italic mb-4">"{testimonials[currentTestimonial].text}"</p>
                      <div>
                        <p className="text-white font-medium">{testimonials[currentTestimonial].name}</p>
                        <p className="text-zinc-400 text-sm">{testimonials[currentTestimonial].company}</p>
                      </div>
                    </motion.div>

                    <p className="text-emerald-400 mt-6 text-sm font-medium">
                      Over 50 clients have trusted my digital solutions. I'll help make your project successful!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Final CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">I'm ready to help you</h3>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Tell me your idea and let's build something amazing together. Whether it's a website, an app, or consulting, I'm here to turn your vision into reality.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact