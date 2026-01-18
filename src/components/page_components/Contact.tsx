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

function Contact() {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    handleChange,
    handleSelectChange,
    handleSubmit,
  } = useContactForm()

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)

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
              Let's <span className="text-indigo-500">Connect</span>
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
                            <Label htmlFor="name" className="text-zinc-300 mb-1 block">
                              Your Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                              className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500"
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
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="info@gmail.com"
                              required
                              className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <Label htmlFor="projectType" className="text-zinc-300 mb-1 block">
                              Project Type
                            </Label>
                            <Select value={formData.projectType} onValueChange={handleSelectChange}>
                              <SelectTrigger className="mt-1 bg-zinc-800 border-zinc-700 text-white focus:border-indigo-500 focus:ring-indigo-500">
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
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell me what you have in mind..."
                              required
                              className="mt-1 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-sm"
                            />
                          </div>

                          {/* Honeypot field - hidden from users */}
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

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                            {isSubmitting ? "Sending..." : (
                              <>
                                <span className="hidden sm:inline">
                                  Send me your inquiry and I'll get back to you soon!
                                </span>
                                <spa
