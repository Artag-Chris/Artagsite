import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function ImageFrame({ setIsHovered, isHovered }: { setIsHovered: any; isHovered: any }) {
  return (
    <motion.div
      className="relative w-full max-w-xs sm:max-w-sm aspect-square"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 w-full h-full group transition-all duration-200 hover:border-white/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src="https://res.cloudinary.com/dfg2xrsqz/image/upload/v1747582652/aefuflson0wfblt5szrk.jpg"
          alt="Christian's portrait"
          fill
          sizes="(max-width: 640px) 320px, 384px"
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.p
            className="text-white text-base sm:text-lg font-semibold tracking-wide"
            initial={{ y: 15 }}
            animate={{ y: isHovered ? 0 : 15 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Hello, I&apos;m Christian
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ImageFrame;
