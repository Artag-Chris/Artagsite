"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { HTMLMotionProps } from "framer-motion"

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  href?: string
  variant?: "default" | "outline" | "glow"
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

const AnimatedButton = ({ href, variant = "default", children, icon, className, ...props }: AnimatedButtonProps) => {
  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
      {variant === "glow" && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-400 opacity-70"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.05, 1], opacity: [0, 0.8, 0.7] }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <motion.span
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-300 opacity-0"
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.05, 1.1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
          <motion.span
            className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-300 opacity-0"
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.05, 1.2],
            }}
            transition={{
              duration: 2,
              delay: 0.3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </>
      )}
    </>
  )

  const baseClasses = cn(
    "relative overflow-hidden font-medium transition-all duration-300 flex items-center justify-center",
    variant === "default" &&
      "bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-indigo-500/20",
    variant === "outline" &&
      "bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 px-6 py-3 rounded-lg",
    variant === "glow" &&
      "bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40",
    className,
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <motion.button className={baseClasses} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} {...props}>
      {buttonContent}
    </motion.button>
  )
}

export default AnimatedButton
