"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import TypingAnimation from "../animations/typingAnimation"
import RandomLoader from "../loading/random-loader"
import CTAButton from "../compontents/CTABottom"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import HeroTerminal from "../sub-sections/HeroTerminal"

function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobileRef = useRef(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showCityLoader, setShowCityLoader] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [h1Done, setH1Done] = useState(false)
  const [bioDone, setBioDone] = useState(false)

  // Handle mobile detection after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)

    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      isMobileRef.current = mobile
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Parallax via direct ref mutation + rAF — no React state, no re-render per scroll.
  useEffect(() => {
    let ticking = false
    const update = () => {
      if (videoContainerRef.current) {
        const offset = window.scrollY * (isMobileRef.current ? 0.2 : 0.4)
        videoContainerRef.current.style.transform = `translate3d(0, ${offset}px, 0)`
      }
      ticking = false
    }
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sequence: loader → H1 (1.8s) → bio chunks (~3s) → CTA + flash.
  // Each stage gates the next so neither bio nor CTA reserves space before its turn.
  useEffect(() => {
    if (showCityLoader) {
      setH1Done(false)
      setBioDone(false)
      return
    }
    const tH1 = setTimeout(() => setH1Done(true), 1800)
    return () => clearTimeout(tH1)
  }, [showCityLoader])

  useEffect(() => {
    if (!h1Done) {
      setBioDone(false)
      return
    }
    // Bio finishes ~3s after mount: delayChildren 0.5 + 5*staggerChildren 0.35 + duration 0.7
    const tBio = setTimeout(() => setBioDone(true), 3000)
    return () => clearTimeout(tBio)
  }, [h1Done])

  const bioChunks: { text: string; bold: boolean }[] = [
    { text: "I'm Christian — a full-stack developer from Colombia who has moved ", bold: false },
    { text: "32,000+ users", bold: true },
    { text: " between databases without losing a single one, built payment flows handling ", bold: false },
    { text: "$2M+ daily", bold: true },
    { text: ", and wired up automations that run 24/7 while people sleep. ", bold: false },
    { text: "If your system needs to scale, I'm the person you want on your team.", bold: false },
  ]

  // Handle video load and play
  useEffect(() => {
    if (isMounted && videoRef.current) {
      const video = videoRef.current

      const handleCanPlay = () => {
        setVideoLoaded(true)
        video.play().catch(console.error)
      }

      const handleLoadedData = () => setVideoLoaded(true)
      const handleError = () => {
        console.warn("Video failed to load, using fallback image")
        setVideoLoaded(false)
      }

      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("error", handleError)

      if (video.readyState >= 3) handleCanPlay()

      return () => {
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("error", handleError)
      }
    }
  }, [isMounted])

  return (
    <div className="relative overflow-hidden h-screen w-full bg-black">
      {/* City Loader Overlay */}
      {showCityLoader && (
        <RandomLoader
          onLoadingComplete={() => setShowCityLoader(false)}
          minDisplayTime={3000}
        />
      )}

      {/* Background Container with Parallax Effect (transform mutated via ref in scroll handler) */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          transform: "translate3d(0, 0, 0)",
          height: "calc(100% + 200px)",
          willChange: "transform",
        }}
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/tech4k.mp4" type="video/mp4" />
        </video>

        {/* Fallback image for desktop if video fails to load */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${!videoLoaded ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src="/technology.png"
            alt="Technology background"
            fill
            priority
            className="object-cover"
            onLoad={() => {
              // Image loaded, but don't hide loader yet - let the effect handle it
            }}
          />
        </div>

        {/* Dark overlay - deeper for Techonic Precision */}
        <div
          className={`absolute inset-0 z-10 transition-all duration-500 ${isMobile ? "bg-black/75" : "bg-black/60"}`}
        />

        {/* Grid Reveal Overlay - Signature Element */}
        <div className="absolute inset-0 z-12 grid-reveal"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(0deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: videoLoaded ? 0.3 : 0,
            transition: 'opacity 0.6s ease-out',
            pointerEvents: 'none',
          }}
        />

        {/* Smooth fade-out gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black z-15 pointer-events-none" />
      </div>

      {/* Hero Section Content */}
      <section className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
           {/* Left Content - with stagger animation */}
           <div className="max-w-2xl" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}>
             <Badge className="mb-4 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 transition-all border border-indigo-500/40 backdrop-blur-sm">
               <TypingAnimation
                 phrases={["Available for New Projects", "Open to Full-Time Roles", "Let's Build Something"]}
                 typeSpeed={80}
                 eraseSpeed={40}
                 delayBetweenPhrases={1500}
                 loop={true}
               />
             </Badge>
             <motion.h1
               className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight"
               style={{
                 fontFamily: 'var(--font-display)',
                 background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 50%, #6366f1 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
               }}
               initial={{ opacity: 0.2 }}
               animate={showCityLoader ? { opacity: 0.2 } : { opacity: 1 }}
               transition={{ duration: 1.8, delay: 0, ease: "linear" }}
             >
               <span className="block">I Build Systems</span>
               <span className="block">
                 <span
                   className="relative inline-block"
                   style={{
                     background: 'linear-gradient(135deg, #06b6d4 0%, #06b6d4 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                     textShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
                     filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4))',
                   }}
                 >
                   That Don't Break.
                 </span>
               </span>
               <span className="block">Or Slow Down.</span>
             </motion.h1>
             <AnimatePresence>
               {h1Done && (
                 <motion.div
                   key="bio-wrap"
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: "auto" }}
                   transition={{
                     height: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                     opacity: { duration: 0.6, ease: "easeOut" },
                   }}
                   style={{ overflow: "hidden" }}
                 >
                   <motion.p
                     className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl leading-relaxed"
                     initial="hidden"
                     animate="visible"
                     variants={{
                       hidden: {},
                       visible: {
                         transition: {
                           delayChildren: 0.5,
                           staggerChildren: 0.35,
                         },
                       },
                     }}
                   >
                     {bioChunks.map((chunk, i) => (
                       <motion.span
                         key={i}
                         variants={{
                           hidden: { opacity: 0 },
                           visible: { opacity: 1, transition: { duration: 0.7, ease: "linear" } },
                         }}
                       >
                         {chunk.bold ? <strong>{chunk.text}</strong> : chunk.text}
                       </motion.span>
                     ))}
                   </motion.p>
                 </motion.div>
               )}
             </AnimatePresence>

             <AnimatePresence>
               {bioDone && (
                 <motion.div
                   key="cta-wrap"
                   className="flex flex-col sm:flex-row gap-4"
                   initial={{ opacity: 0, filter: "drop-shadow(0 0 0px rgba(99, 102, 241, 0))" }}
                   animate={{
                     opacity: 1,
                     filter: [
                       "drop-shadow(0 0 0px rgba(99, 102, 241, 0))",
                       "drop-shadow(0 0 0px rgba(99, 102, 241, 0))",
                       "drop-shadow(0 0 18px rgba(99, 102, 241, 0.75))",
                       "drop-shadow(0 0 0px rgba(99, 102, 241, 0))",
                     ],
                   }}
                   transition={{
                     opacity: { duration: 0.6, ease: "easeOut" },
                     filter: {
                       duration: 1.4,
                       times: [0, 0.4, 0.55, 1],
                       ease: "easeInOut",
                     },
                   }}
                 >
                   <CTAButton text={"Let's Talk — I'm Available Now"} icon={<Sparkles />} />
                 </motion.div>
               )}
             </AnimatePresence>
           </div>

          {/* Right column — animated terminal */}
          <div className="hidden lg:flex items-center justify-center w-full">
            <HeroTerminal />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
