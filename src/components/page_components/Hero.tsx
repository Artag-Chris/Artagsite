"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import TypingAnimation from "../animations/typingAnimation"
import RandomLoader from "../loading/random-loader"
import CTAButton from "../compontents/CTABottom"

import { Sparkles } from "lucide-react"

function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showCityLoader, setShowCityLoader] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const loaderStartTimeRef = useRef<number | null>(null)
  const hasHiddenLoaderRef = useRef(false)

  // Handle mobile detection after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
    loaderStartTimeRef.current = Date.now()

    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle video load and play
  useEffect(() => {
    if (isMounted && videoRef.current) {
      const video = videoRef.current

      const handleCanPlay = () => {
        setVideoLoaded(true)
        video.play().catch(console.error)
      }

      const handleLoadedData = () => {
        setVideoLoaded(true)
      }

      const handleError = () => {
        console.warn("Video failed to load, using fallback image")
        setVideoLoaded(false)
      }

      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("error", handleError)

      // Force load if video is ready
      if (video.readyState >= 3) {
        handleCanPlay()
      }

      return () => {
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("error", handleError)
      }
    }
  }, [isMounted])

  // Handle loader visibility with minimum display time - single effect
  useEffect(() => {
    if (!isMounted || hasHiddenLoaderRef.current) return

    const MIN_LOADER_TIME = 2500 // Minimum time to show loader (ms)
    const MAX_LOADER_TIME = 4000 // Maximum time to show loader (ms)

    const hideLoader = () => {
      if (!hasHiddenLoaderRef.current) {
        hasHiddenLoaderRef.current = true
        setShowCityLoader(false)
      }
    }

    // Set timer for minimum display time
    const minTimer = setTimeout(() => {
      // After minimum time, check if video is loaded
      if (videoLoaded) {
        hideLoader()
      }
    }, MIN_LOADER_TIME)

    // Set timer for maximum display time (fallback)
    const maxTimer = setTimeout(() => {
      hideLoader()
    }, MAX_LOADER_TIME)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
  }, [isMounted, videoLoaded])

  // Parallax effect - reduced on mobile
  const parallaxOffset = scrollY * (isMobile ? 0.2 : 0.4)

  return (
    <div className="relative overflow-hidden h-screen w-full">
      {/* City Loader Overlay */}
      {showCityLoader && (
        <RandomLoader
          onLoadingComplete={() => {
            // This callback is called when the loader animation completes
            // But we control the actual hiding via the useEffect above
          }}
          minDisplayTime={1500}
        />
      )}

      {/* Background Container with Parallax Effect */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          height: "calc(100% + 200px)",
        }}
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
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
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            !videoLoaded ? "opacity-100" : "opacity-0"
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

        {/* Overlay - darker on mobile for better text contrast */}
        <div
          className={`absolute inset-0 z-10 transition-all duration-500 ${isMobile ? "bg-black/70" : "bg-black/50"}`}
        />

        {/* Smooth fade-out gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black z-15 pointer-events-none" />
      </div>

      {/* Hero Section Content */}
      <section className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors border border-amber-500/30">
              <TypingAnimation
                phrases={["Fullstack Developer", "UI/UX Designer", "Problem Solver"]}
                typeSpeed={80}
                eraseSpeed={40}
                delayBetweenPhrases={1500}
                loop={true}
              />
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">
              Where Innovation Clicks: <span className="text-amber-400">Experiences </span> Designed to Captivate
            </h1>
            <p className="text-zinc-200 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl">
              I transform visions into beating-heart realities: crafting emotion-driven web experiences, AI-powered
              applications, and seamless APIs that make your digital dreams breathe.
            </p> 

            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton text={"Contac me"} icon={<Sparkles />} />
            </div>
          </div>

          {/* Right 3D Element - Hidden on mobile */}
          {/* <div className="hidden lg:flex items-center justify-center h-96 w-full">
            <div className="w-full h-full flex items-center justify-center">
              <GLTFViewer modelPath="/procedural-animated-energy-beam-material.glb" autoRotate />
            </div>
          </div> */}
        </div>
      </section> 
    </div>
  )
}

export default Hero
