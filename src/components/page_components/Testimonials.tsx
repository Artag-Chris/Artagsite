"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { testimonials } from "@/data/contactData"
import FeaturedTestimonials from "@/components/sub-sections/FeaturedTestimonials"

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [direction, setDirection] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [autoPlay])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-[#0a0a0a] via-black to-black py-20 sm:py-32 relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]"
    >
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Real Collaborations
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Trusted by <span className='text-cyan-400 drop-shadow-lg' style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>Developers</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Hear directly from developers I've collaborated with on real projects. Their insights reflect the impact of clean architecture, thoughtful code, and genuine partnerships.
          </p>
        </motion.div>

        {/* Featured Testimonials Grid */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FeaturedTestimonials />
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <motion.div
            className="mb-8 flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-200">
              All Testimonials
            </h3>
            <p className="text-sm text-gray-400">
              Rotate to see more from my collaborators
            </p>
          </motion.div>
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="w-full"
            >
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Testimonial Card */}
                <div className="relative bg-gradient-to-br from-[#141414]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-[#262626] group-hover:border-cyan-500/30 rounded-2xl p-8 sm:p-10 lg:p-12 transition-all duration-300">
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.02] rounded-2xl pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>

                  <div className="relative z-10">
                    {/* Quote Icon */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="mb-6"
                    >
                      <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30">
                        <Quote className="w-6 h-6 text-cyan-400" />
                      </div>
                    </motion.div>

                    {/* Rating */}
                    <motion.div
                      className="flex gap-2 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Testimonial Text */}
                    <motion.p
                      className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 italic"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      "{testimonials[currentIndex].text}"
                    </motion.p>

                    {/* Author Info */}
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      {/* Avatar placeholder */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/20 border border-cyan-500/20 flex items-center justify-center">
                        <div className="text-xl font-bold text-cyan-400">
                          {testimonials[currentIndex].name.charAt(0)}
                        </div>
                      </div>

                      {/* Name and Company */}
                      <div>
                        <p className="text-white font-semibold text-base sm:text-lg">
                          {testimonials[currentIndex].name}
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <motion.div
            className="flex items-center justify-between mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Left Arrow */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 rounded-full border border-[#262626] hover:border-cyan-500/50 bg-[#0a0a0a]/50 hover:bg-cyan-500/10 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                    setAutoPlay(false)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-3 transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-cyan-500 to-cyan-400"
                      : "w-3 bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 rounded-full border border-[#262626] hover:border-cyan-500/50 bg-[#0a0a0a]/50 hover:bg-cyan-500/10 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            </motion.button>
          </motion.div>

          {/* Auto-play indicator */}
          <motion.div
            className="text-center mt-8 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {autoPlay ? (
              <p>Auto-rotating testimonials • Click to control</p>
            ) : (
              <p>Auto-play paused • Click arrows or dots to navigate</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
