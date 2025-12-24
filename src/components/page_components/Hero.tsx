"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import TypingAnimation from "../animations/typingAnimation"
import RandomLoader from "../loading/random-loader"
import CTAButton from "../compontents/CTABottom"
import TechCube3D from "../animations/tech-cube-3d"
import { Sparkles } from "lucide-react"

function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showCityLoader, setShowCityLoader] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle mobile detection after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)

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
        // Hide loader even if video fails
        setTimeout(() => setShowCityLoader(false), 1000)
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

  // Handle city loader visibility with minimum display time
  useEffect(() => {
    if (!isMounted) return

    let timer: NodeJS.Timeout
    const MIN_LOADER_TIME = 2500 // Minimum time to show loader (ms)
    const loaderStartTime = Date.now()

    const hideLoader = () => {
      setShowCityLoader(false)
    }

    if (videoLoaded) {
      // Calculate remaining time to meet minimum display time
      const elapsedTime = Date.now() - loaderStartTime
      const remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime)
      timer = setTimeout(hideLoader, remainingTime)
    } else {
      // Fallback: hide loader after maximum time even if video hasn't loaded
      timer = setTimeout(hideLoader, 4000) // Maximum 4 seconds
    }

    return () => {
      if (timer) clearTimeout(timer)
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
              // Ensure loader hides when fallback image loads
              if (!videoLoaded) {
                setTimeout(() => setShowCityLoader(false), 500)
              }
            }}
          />
        </div>

        {/* Overlay - darker on mobile for better text contrast */}
        <div
          className={`absolute inset-0 z-10 transition-all duration-500 ${isMobile ? "bg-black/70" : "bg-black/50"}`}
        />
      </div>

      {/* Hero Section Content */}
      <section className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors border border-cyan-500/30">
              <TypingAnimation
                phrases={["Fullstack Developer", "UI/UX Designer", "Problem Solver"]}
                typeSpeed={80}
                eraseSpeed={40}
                delayBetweenPhrases={1500}
                loop={true}
              />
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">
              Where Innovation Clicks: <span className="text-cyan-400">Experiences </span> Designed to Captivate
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
          <div className="hidden lg:flex items-center justify-center h-96">
            <div className="w-full h-full rounded-lg overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 bg-black/20 backdrop-blur-sm">
              <TechCube3D />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
