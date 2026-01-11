"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface TypingAnimationProps {
  phrases: string[] | string
  className?: string
  typeSpeed?: number
  eraseSpeed?: number
  delayBetweenPhrases?: number
  startDelay?: number
  cursor?: boolean
  loop?: boolean
  onComplete?: () => void
}

export default function TypingAnimation({
  phrases,
  className = "",
  typeSpeed = 50,
  eraseSpeed = 30,
  delayBetweenPhrases = 1000,
  startDelay = 0,
  cursor = true,
  loop = false,
  onComplete,
}: TypingAnimationProps) {
  // Convert single string to array for consistent handling
  const phrasesArray = typeof phrases === "string" ? [phrases] : phrases

  const [displayedText, setDisplayedText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isErasing, setIsErasing] = useState(false)
  const [isWaiting, setIsWaiting] = useState(true)
  const controls = useAnimation()

  // Start the animation after initial delay
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isWaiting && startDelay > 0) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsTyping(true)
      }, startDelay)
    } else if (isWaiting) {
      setIsWaiting(false)
      setIsTyping(true)
    }

    return () => clearTimeout(timeout)
  }, [isWaiting, startDelay])

  // Handle typing animation
  useEffect(() => {
    if (!isTyping || isWaiting) return

    const currentPhrase = phrasesArray[currentPhraseIndex]
    let timeout: NodeJS.Timeout

    if (currentCharIndex < currentPhrase.length) {
      // Type the next character
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentPhrase[currentCharIndex])
        setCurrentCharIndex((prev) => prev + 1)
      }, typeSpeed)
    } else {
      // Typing completed for current phrase
      timeout = setTimeout(() => {
        setIsTyping(false)
        setIsErasing(true)
      }, delayBetweenPhrases)
    }

    return () => clearTimeout(timeout)
  }, [isTyping, isWaiting, currentCharIndex, currentPhraseIndex, phrasesArray, typeSpeed, delayBetweenPhrases])

  // Handle erasing animation
  useEffect(() => {
    if (!isErasing) return

    let timeout: NodeJS.Timeout

    if (displayedText.length > 0) {
      // Erase one character
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1))
      }, eraseSpeed)
    } else {
      // Erasing completed, move to next phrase
      setIsErasing(false)

      // Move to next phrase or loop back to first
      const nextPhraseIndex = (currentPhraseIndex + 1) % phrasesArray.length

      // If we've completed all phrases and not looping, call onComplete
      if (nextPhraseIndex === 0 && !loop) {
        if (onComplete) onComplete()
        return
      }

      setCurrentPhraseIndex(nextPhraseIndex)
      setCurrentCharIndex(0)
      setIsTyping(true)
    }

    return () => clearTimeout(timeout)
  }, [isErasing, displayedText, currentPhraseIndex, phrasesArray, eraseSpeed, loop, onComplete])

  return (
    <motion.div className={`inline-block ${className}`} initial={{ opacity: 1 }} animate={controls}>
      <span className="text-indigo-500">{displayedText}</span>
      {cursor && (isTyping || isErasing) && (
        <motion.span
          className="text-indigo-500"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          |
        </motion.span>
      )}
    </motion.div>
  )
}

