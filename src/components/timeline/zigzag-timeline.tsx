"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import {
  Calendar,
  Code,
  Award,
  Briefcase,
  Lightbulb,
  Rocket,
  GraduationCap,
  Heart,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

// Define timeline event interface
interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  icon: React.ReactNode
  imageUrl: string
  imageAlt: string
  category: "education" | "work" | "project" | "achievement"
  section: "horizontal1" | "vertical" | "horizontal2"
  position?: "left" | "right" | "top" | "bottom"
}

// Sample timeline data with section information
const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2012",
    title: "First Steps in Programming",
    description:
      "Discovered my passion for coding through a web development course. Built my first HTML and CSS website, sparking a lifelong journey into the world of programming.",
    icon: <Code className="h-6 w-6 text-indigo-500" />,
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageAlt: "First coding experience",
    category: "education",
    section: "horizontal1",
    position: "top",
  },
  {
    id: 2,
    year: "2014",
    title: "Computer Science Degree",
    description:
      "Enrolled in a Computer Science program where I built a strong foundation in algorithms, data structures, and software engineering principles. Participated in coding competitions and hackathons.",
    icon: <GraduationCap className="h-6 w-6 text-indigo-500" />,
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageAlt: "University graduation",
    category: "education",
    section: "horizontal1",
    position: "bottom",
  },
  {
    id: 3,
    year: "2016",
    title: "First Professional Role",
    description:
      "Joined a startup as a junior developer where I worked on real-world projects. Learned to collaborate with a team and deliver under tight deadlines. Developed skills in React and Node.js.",
    icon: <Briefcase className="h-6 w-6 text-indigo-500" />,
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageAlt: "First job experience",
    category: "work",
    section: "vertical",
    position: "left",
  },
  {
    id: 4,
    year: "2018",
    title: "Major Project Launch",
    description:
      "Led the development of a critical e-commerce platform that significantly increased company revenue. Implemented modern architecture patterns and optimized for performance and scalability.",
    icon: <Rocket className="h-6 w-6 text-indigo-500" />,
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageAlt: "Project launch celebration",
    category: "project",
    section: "vertical",
    position: "right",
  },
  {
    id: 5,
    year: "2020",
    title: "Overcoming Challenges",
    description:
      "Navigated through the pandemic by adapting to remote work and leading digital transformation initiatives. Learned new technologies and methodologies to stay relevant in a changing landscape.",
    icon: <Lightbulb className="h-6 w-6 text-indigo-500" />,
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageAlt: "Remote work setup",
    category: "achievement",
    section: "horizontal2",
    position: "top",
  },
  {
    id: 6,
    year: "2022",
    title: "Industry Recognition",
    description:
      "Received an industry award for innovative solutions in web development. Published technical articles and spoke at conferences, establishing myself as a thought leader in the development community.",
    icon: <Award className="h-6 w-6 text-indigo-500" />,
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageAlt: "Award ceremony",
    category: "achievement",
    section: "horizontal2",
    position: "bottom",
  },
  {
    id: 7,
    year: "2024",
    title: "Current Journey",
    description:
      "Currently focused on exploring emerging technologies like AI and blockchain while mentoring the next generation of developers. Building a personal brand and contributing to open-source projects.",
    icon: <Heart className="h-6 w-6 text-indigo-500" />,
    imageUrl: "/placeholder.svg?height=400&width=600",
    imageAlt: "Current workspace",
    category: "work",
    section: "horizontal2",
    position: "top",
  },
]

// Horizontal timeline event component
const HorizontalTimelineEvent = ({
  event,
  index,
  isLast,
}: { event: TimelineEvent; index: number; isLast: boolean }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
  const isTop = event.position === "top"

  return (
    <div className="inline-block min-w-[350px] md:min-w-[500px] px-6 relative" ref={ref}>
      {/* Timeline line */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-indigo-500/80"></div>

      {/* Year marker */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-indigo-500 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-indigo-500" />
        </div>
        <span className="mt-1 text-indigo-500 font-bold">{event.year}</span>
      </motion.div>

      {/* Content container with conditional ordering */}
      <div className={`mt-8 mb-8 ${isTop ? "pt-16" : "pb-16"}`}>
        <div className={`flex flex-col ${isTop ? "mt-8" : "mb-8 order-first"}`}>
          {/* Description card */}
          <motion.div
            className="bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 shadow-xl mb-4"
            initial={{ opacity: 0, y: isTop ? -30 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                {event.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{event.title}</h3>
            </div>
            <p className="text-zinc-300">{event.description}</p>

            <div
              className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                event.category === "education"
                  ? "bg-blue-500/20 text-blue-300"
                  : event.category === "work"
                    ? "bg-purple-500/20 text-purple-300"
                    : event.category === "project"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-indigo-500/20 text-indigo-300"
              }`}
            >
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative h-48 overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: isTop ? 30 : -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent z-10 rounded-xl"></div>
            <Image src={event.imageUrl || "/placeholder.svg"} alt={event.imageAlt} fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Vertical timeline event component
const VerticalTimelineEvent = ({ event, index, isLast }: { event: TimelineEvent; index: number; isLast: boolean }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
  const isLeft = event.position === "left"

  return (
    <div className="mb-24 last:mb-0 relative" ref={ref}>
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-500/80"></div>

      {/* Year marker */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 -top-6 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-indigo-500 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-indigo-500" />
        </div>
        <span className="mt-1 text-indigo-500 font-bold">{event.year}</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Description side */}
        <motion.div
          className={`bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 shadow-xl ${
            !isLeft ? "md:col-start-2" : ""
          }`}
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={`flex items-center gap-3 mb-3 ${!isLeft ? "md:flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
              {event.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{event.title}</h3>
          </div>
          <p className="text-zinc-300">{event.description}</p>

          <div
            className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${
              event.category === "education"
                ? "bg-blue-500/20 text-blue-300"
                : event.category === "work"
                  ? "bg-purple-500/20 text-purple-300"
                  : event.category === "project"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-indigo-500/20 text-indigo-300"
            }`}
          >
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </div>
        </motion.div>

        {/* Image side */}
        <motion.div
          className={`relative h-64 md:h-80 overflow-hidden rounded-xl ${!isLeft ? "md:col-start-1" : ""}`}
          initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent z-10 rounded-xl"></div>
          <Image src={event.imageUrl || "/placeholder.svg"} alt={event.imageAlt} fill className="object-cover" />
        </motion.div>
      </div>
    </div>
  )
}

// Direction indicator component
const DirectionIndicator = ({ direction }: { direction: "down" | "right" }) => {
  return (
    <div className="flex justify-center my-8">
      <motion.div
        className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-indigo-500 flex items-center justify-center"
        animate={{
          y: direction === "down" ? [0, 10, 0] : 0,
          x: direction === "right" ? [0, 10, 0] : 0,
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
        }}
      >
        {direction === "down" ? (
          <ChevronDown className="h-6 w-6 text-indigo-500" />
        ) : (
          <ChevronRight className="h-6 w-6 text-indigo-500" />
        )}
      </motion.div>
    </div>
  )
}

// Progress indicator component
const ProgressIndicator = () => {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const width = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-50" style={{ width, originX: 0 }} />
}

// Section connector component
const SectionConnector = ({ from, to }: { from: string; to: string }) => {
  // This would be implemented with SVG paths to create custom connectors between sections
  return (
    <div className="relative h-24">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-500/80"></div>
    </div>
  )
}

// Main timeline component
export default function ZigzagTimeline() {
  const [sections, setSections] = useState<{
    horizontal1: TimelineEvent[]
    vertical: TimelineEvent[]
    horizontal2: TimelineEvent[]
  }>({
    horizontal1: [],
    vertical: [],
    horizontal2: [],
  })

  // Organize events into sections
  useEffect(() => {
    const horizontal1: TimelineEvent[] = []
    const vertical: TimelineEvent[] = []
    const horizontal2: TimelineEvent[] = []

    timelineEvents.forEach((event) => {
      if (event.section === "horizontal1") {
        horizontal1.push(event)
      } else if (event.section === "vertical") {
        vertical.push(event)
      } else if (event.section === "horizontal2") {
        horizontal2.push(event)
      }
    })

    setSections({ horizontal1, vertical, horizontal2 })
  }, [])

  return (
    <div className="relative py-16">
      <ProgressIndicator />

      {/* Timeline intro */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Development Journey</h2>
        <p className="text-zinc-300 max-w-2xl mx-auto">
          Follow the path of my evolution as a developer, from my first lines of code to becoming a professional
          software engineer. Each milestone represents growth, challenges overcome, and skills acquired along the way.
        </p>
      </motion.div>

      {/* First horizontal section */}
      {sections.horizontal1.length > 0 && (
        <>
          <div className="mb-4 text-center">
            <span className="text-indigo-500 font-medium">Scroll horizontally →</span>
          </div>
          <div className="relative overflow-x-auto pb-4 mb-12 timeline-scroll-section">
            <div className="whitespace-nowrap pl-[calc(50vw-250px)] pr-[calc(50vw-250px)]">
              {sections.horizontal1.map((event, index) => (
                <HorizontalTimelineEvent
                  key={event.id}
                  event={event}
                  index={index}
                  isLast={index === sections.horizontal1.length - 1}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Connector between horizontal and vertical */}
      {sections.horizontal1.length > 0 && sections.vertical.length > 0 && (
        <SectionConnector from="horizontal1" to="vertical" />
      )}

      {/* Direction change indicator - to vertical */}
      {sections.vertical.length > 0 && <DirectionIndicator direction="down" />}

      {/* Vertical section */}
      {sections.vertical.length > 0 && (
        <>
          <div className="mb-4 text-center">
            <span className="text-indigo-500 font-medium">Scroll vertically ↓</span>
          </div>
          <div className="max-w-5xl mx-auto px-4 mb-12">
            {sections.vertical.map((event, index) => (
              <VerticalTimelineEvent
                key={event.id}
                event={event}
                index={index}
                isLast={index === sections.vertical.length - 1}
              />
            ))}
          </div>
        </>
      )}

      {/* Connector between vertical and horizontal */}
      {sections.vertical.length > 0 && sections.horizontal2.length > 0 && (
        <SectionConnector from="vertical" to="horizontal2" />
      )}

      {/* Direction change indicator - to horizontal */}
      {sections.horizontal2.length > 0 && <DirectionIndicator direction="right" />}

      {/* Second horizontal section */}
      {sections.horizontal2.length > 0 && (
        <>
          <div className="mb-4 text-center">
            <span className="text-indigo-500 font-medium">Scroll horizontally →</span>
          </div>
          <div className="relative overflow-x-auto pb-4 mb-12 timeline-scroll-section">
            <div className="whitespace-nowrap pl-[calc(50vw-250px)] pr-[calc(50vw-250px)]">
              {sections.horizontal2.map((event, index) => (
                <HorizontalTimelineEvent
                  key={event.id}
                  event={event}
                  index={index}
                  isLast={index === sections.horizontal2.length - 1}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Timeline conclusion */}
      <motion.div
        className="text-center mt-24 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px 0px" }}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <Rocket className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4">The Journey Continues...</h3>
        <p className="text-zinc-300">
          This timeline represents my journey so far, but the story is still being written. I'm constantly learning,
          growing, and seeking new challenges to expand my skills and make a positive impact.
        </p>
      </motion.div>
    </div>
  )
}
