import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

function ImageFrame({ setIsHovered, isHovered }: { setIsHovered: any; isHovered: any }) {
  return (
    <>
      <div className="md:w-1/3">
        <motion.div
          className="relative w-64 h-64 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 blur-lg opacity-50"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.6, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>

          {/* Photo container with interactive effects */}
          <div
            className="relative overflow-hidden rounded-full border-4 border-zinc-800 w-full h-full group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src="https://res.cloudinary.com/dfg2xrsqz/image/upload/v1747582652/aefuflson0wfblt5szrk.jpg"
              alt="Christian's portrait"
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />

            {/* Animated overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-white text-sm font-medium"
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.3 }}
              >
                Hello, I'm Christian
              </motion.p>
            </motion.div>
          </div>

          {/* Floating particles */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-indigo-400"
            style={{ top: "10%", right: "5%" }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
            style={{ bottom: "15%", left: "10%" }}
            animate={{
              y: [0, -10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.2,
            }}
          />
        </motion.div>
      </div>
    </>
  );
}

export default ImageFrame;
