"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import Image from "next/image"
import { Loader2 } from "lucide-react" // Import Loader2

interface YouTubeThumbnailProps {
  videoId: string
  alt: string
  onClick: () => void
  isHovered: boolean
}

export function YouTubeThumbnail({ videoId, alt, onClick, isHovered }: YouTubeThumbnailProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("")

  useEffect(() => {
    // Try to get high quality thumbnail first
    const img: HTMLImageElement = new window.Image()
    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    img.onload = () => {
      // Check if we got a valid image (not the default "no thumbnail" image)
      if (img.width !== 120 && img.height !== 90) {
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
      } else {
        // Fallback to standard quality
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/0.jpg`)
      }
    }

    img.onerror = () => {
      // Fallback to standard quality
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/0.jpg`)
    }
  }, [videoId])

  return (
    <div className="relative h-48 w-full overflow-hidden group cursor-pointer" onClick={onClick}>
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "group-hover:scale-105"
          }`}
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60 transition-opacity duration-300 ${
          isHovered ? "opacity-80" : ""
        }`}
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`p-3 rounded-full bg-indigo-500/80 text-white transform transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          <Play className="h-8 w-8 fill-current" />
        </div>
      </div>
    </div>
  )
}
