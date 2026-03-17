import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function ImageFrame({ setIsHovered, isHovered }: { setIsHovered: any; isHovered: any }) {
  return (
    <>
      <motion.div
        className="w-full lg:w-1/3 flex justify-center lg:justify-start"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="relative w-full max-w-xs sm:max-w-sm aspect-square"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Multi-layer glow effect - Enhanced */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-cyan-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              scale: [0.95, 1.05, 0.95],
              opacity: isHovered ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>

          {/* Inner glow accent */}
          <motion.div
            className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.3,
            }}
          ></motion.div>

          {/* Photo container with enhanced border and effects */}
          <div
            className="relative overflow-hidden rounded-2xl border-2 border-[#262626] w-full h-full group transition-all duration-300 hover:border-cyan-500/60 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1), transparent 50%)`
            }}
          >
            {/* Grid overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
                backgroundSize: '15px 15px'
              }}
            />

            <Image
              src="https://res.cloudinary.com/dfg2xrsqz/image/upload/v1747582652/aefuflson0wfblt5szrk.jpg"
              alt="Christian's portrait"
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />

            {/* Enhanced overlay on hover - More integrated */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center p-6"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                backdropFilter: isHovered ? "blur(8px)" : "blur(0px)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-white text-base sm:text-lg font-semibold tracking-wide"
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Hello, I'm Christian
              </motion.p>
            </motion.div>

            {/* Corner accent lights */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 -ml-12 -mb-12" />
          </div>

          {/* Floating accent particles - Enhanced */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-cyan-400/60 shadow-lg shadow-cyan-500/50"
            style={{ top: "10%", right: "-5%" }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              x: [-10, 0, -10]
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-indigo-400/60 shadow-lg shadow-indigo-500/50"
            style={{ bottom: "15%", left: "-5%" }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.8, 0],
              x: [10, 0, 10]
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.2,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default ImageFrame;
