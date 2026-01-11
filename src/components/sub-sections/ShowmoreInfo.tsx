import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

function ShowmoreInfo({
  showMoreBio,
  setShowMoreBio,
}: {
  showMoreBio: any;
  setShowMoreBio: any;
}) {
  return (
    <>
      {/* Bio with expandable content */}
      <div className="relative">
        <motion.div
          className={`text-zinc-300 space-y-3 sm:space-y-4 overflow-hidden transition-all duration-500 ${
            showMoreBio ? "max-h-[500px]" : "max-h-[120px] sm:max-h-[100px]"
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed">
            I transform digital challenges into human connections — a passionate
            fullstack developer crafting solutions where technology breathes
            with emotion. For over 5 years, I've engineered web applications
            that solve real-world problems while creating meaningful digital
            relationships.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            My journey began with childhood curiosity about the web's magic.
            Today, I architect hybrid server infrastructures (on-site & cloud)
            and build WhatsApp Business ecosystems using official APIs, helping
            startups and enterprises bring conversational experiences to life.
          </p>

          <p className={`${showMoreBio ? "block" : "hidden"} text-sm sm:text-base leading-relaxed`}>
            I believe in clean code with emotional intelligence — whether
            creating chatbots that understand intentions or scalable systems
            that anticipate needs. Beyond coding, I explore how automation
            fosters genuine connections and share discoveries through
            open-source contributions. Because the future isn't just built; it's
            felt.
          </p>
        </motion.div>

        {/* Read more/less toggle */}
        {!showMoreBio && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-900 to-transparent z-10"></div>
        )}
        <div className="relative z-20 mt-2">
          <button
            onClick={() => setShowMoreBio(!showMoreBio)}
            className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors"
          >
            {showMoreBio ? "Read less" : "Read more"}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                showMoreBio ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default ShowmoreInfo;
