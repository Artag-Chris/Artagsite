"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

import MoreAboutmeButton from "../compontents/MoreAboutmeButton"
import TypingAnimation from "../animations/typingAnimation"
import CityLoader from "../loading/city-loader"


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
    if (isMounted && !isMobile && videoRef.current) {
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
  }, [isMounted, isMobile])

  // Handle city loader visibility
  useEffect(() => {
    if (!isMounted) return

    let timer: NodeJS.Timeout

    if (isMobile) {
      // On mobile, hide loader after minimum time since we don't need to wait for video
      timer = setTimeout(() => {
        setShowCityLoader(false)
      }, 1500)
    } else {
      // On desktop, hide loader when video is loaded OR after maximum time
      if (videoLoaded) {
        timer = setTimeout(() => {
          setShowCityLoader(false)
        }, 500)
      } else {
        // Fallback: hide loader after maximum time even if video hasn't loaded
        timer = setTimeout(() => {
          setShowCityLoader(false)
        }, 4000) // Maximum 4 seconds
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isMounted, isMobile, videoLoaded])

  // Parallax effect - reduced on mobile
  const parallaxOffset = scrollY * (isMobile ? 0.2 : 0.4)

  return (
    <div className="relative overflow-hidden h-screen w-full">
      {/* City Loader Overlay */}
      {showCityLoader && (
        <CityLoader
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
        {/* Mobile Image Background */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            isMobile ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src="/technology.png"
            alt="Technology background"
            fill
            priority={isMobile}
            className="object-cover"
            onLoad={() => {
              // Ensure loader hides when image loads on mobile
              if (isMobile) {
                setTimeout(() => setShowCityLoader(false), 500)
              }
            }}
          />
        </div>

        {/* Desktop Video Background */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            !isMobile ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded && !isMobile ? "opacity-100" : "opacity-0"
            }`}
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/tech4k.webm" type="video/webm" />
            <source src="/tech4k.mp4" type="video/mp4" />
          </video>

          {/* Fallback image for desktop if video fails to load */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              !videoLoaded && !isMobile ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src="/technology.png" alt="Technology background fallback" fill className="object-cover" />
          </div>
        </div>

        {/* Overlay - darker on mobile for better text contrast */}
        <div
          className={`absolute inset-0 z-10 transition-all duration-500 ${isMobile ? "bg-black/70" : "bg-black/50"}`}
        />
      </div>

      {/* Hero Section Content */}
      <section className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors">
            <TypingAnimation
              phrases={["Fullstack Developer", "UI/UX Designer", "Problem Solver"]}
              typeSpeed={80}
              eraseSpeed={40}
              delayBetweenPhrases={1500}
              loop={true}
            />
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">
            Where Innovation Clicks: <span className="text-emerald-500">Experiences </span>  Designed to Captivate
          </h1>
          <p className="text-zinc-200 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl">
            I transform visions into beating-heart realities: crafting emotion-driven web experiences, AI-powered applications, and seamless APIs that make your digital dreams breathe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <MoreAboutmeButton />
          </div>
        </div>
      </section>
    </div> 
  )
}

export default Hero
