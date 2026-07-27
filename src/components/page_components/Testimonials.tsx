"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { testimonials } from "@/data/contactData"
import FeaturedTestimonials from "@/components/sub-sections/FeaturedTestimonials"

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [direction, setDirection] = useState(0)

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
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a] py-20 sm:py-32 relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]"
    >
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-indigo-500/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-indigo-400/70 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full">
              Real Collaborations
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Trusted by <span className='text-cyan-400'>Developers</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Hear directly from developers I&apos;ve collaborated with on real projects. Their insights reflect the impact of clean architecture, thoughtful code, and genuine partnerships.
          </p>
        </motion.div>

        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FeaturedTestimonials />
        </motion.div>

        <div className="relative">
          <motion.div
            className="mb-8 flex items-center justify-between"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-zinc-100">
              All Testimonials
            </h3>
            <p className="text-sm text-zinc-500">
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
                opacity: { duration: 0.3 },
              }}
              className="w-full"
            >
              <motion.div
                className="group relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative bg-[#111111]/80 backdrop-blur-sm border border-white/5 group-hover:border-white/10 rounded-xl p-8 sm:p-10 lg:p-12 transition-all duration-200">
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mb-6"
                    >
                      <div className="inline-flex p-3 rounded-lg bg-white/5 border border-white/5">
                        <Quote className="w-6 h-6 text-zinc-500" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex gap-1 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400/80 text-amber-400/80" />
                      ))}
                    </motion.div>

                    <motion.p
                      className="text-zinc-200 text-lg sm:text-xl leading-relaxed mb-8 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      &ldquo;{testimonials[currentIndex].text}&rdquo;
                    </motion.p>

                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                        <div className="text-xl font-bold text-zinc-400">
                          {testimonials[currentIndex].name.charAt(0)}
                        </div>
                      </div>

                      <div>
                        <p className="text-white font-semibold text-base sm:text-lg">
                          {testimonials[currentIndex].name}
                        </p>
                        <p className="text-zinc-500 text-sm sm:text-base">
                          {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex items-center justify-between mt-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handlePrev}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              className="p-3 rounded-full border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/8 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-zinc-400" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                    setAutoPlay(false)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-6 bg-white/60"
                      : "w-2 bg-white/15 hover:bg-white/25"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="p-3 rounded-full border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/8 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-zinc-400" />
            </motion.button>
          </motion.div>

          <motion.div
            className="text-center mt-8 text-zinc-600 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {autoPlay ? (
              <p>Auto-rotating testimonials &bull; Click to control</p>
            ) : (
              <p>Auto-play paused &bull; Click arrows or dots to navigate</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
