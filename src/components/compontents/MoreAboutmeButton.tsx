import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import React from 'react'
import AnimatedButton from '../ui/animated-button'

function MoreAboutmeButton() {
    return (
        <div>
            {/* Special "More About Me" Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-2"
            >
                <div className="relative inline-block">
                    <AnimatedButton
                        href="/about-me"
                        variant="glow"
                        icon={<Sparkles className="h-5 w-5" />}
                        className="font-medium text-base"
                    >
                        Discover My Journey
                    </AnimatedButton>

                    {/* Floating particles */}
                    <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400"
                        animate={{
                            y: [0, -15, -5],
                            x: [0, 5, 10],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-cyan-300"
                        animate={{
                            y: [0, -10, -20],
                            x: [0, -5, -10],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            delay: 0.3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default MoreAboutmeButton