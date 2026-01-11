"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface YouTubePlayerProps {
  videoId: string
  title?: string
}

export function YouTubePlayer({ videoId, title = "YouTube video player" }: YouTubePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset loading state when video ID changes
    setIsLoading(true)
  }, [videoId])

  return (
    <div className="relative w-full aspect-video">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        </div>
      )}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  )
}
