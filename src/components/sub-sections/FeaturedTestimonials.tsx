"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import TestimonialCard from "./TestimonialCard"
import { testimonials } from "@/data/contactData"

function FeaturedTestimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Filter featured testimonials
  const featured = testimonials.filter((t) => t.featured)

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

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="w-full"
    >
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featured.map((testimonial, index) => (
          <div key={testimonial.id} className="group relative">
            <TestimonialCard
              testimonial={testimonial}
              isHovered={hoveredId === testimonial.id}
              onHover={() => setHoveredId(testimonial.id)}
              onHoverEnd={() => setHoveredId(null)}
              delay={index * 0.1}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default FeaturedTestimonials
