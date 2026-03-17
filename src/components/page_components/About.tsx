"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";
import { socialLinks } from "@/data/socialLinks";
import { skills } from "@/data/skillsData";
import MoreAboutmeButton from "../compontents/MoreAboutmeButton";
import { handleResumeDownload } from "@/functions/handleResumenDownload";
import ImageFrame from "../sub-sections/ImageFrame";
import ShowmoreInfo from "../sub-sections/ShowmoreInfo";
import ExperEduAchiComponent from "../sub-sections/ExperEduAchiComponent";
import ProfileStats from "../sub-sections/ProfileStats";

function About() {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("experience");
  const [showMoreBio, setShowMoreBio] = useState(false);

  const bioRef = useRef(null);
  const isInView = useInView(bioRef, { once: true });
  const controls = useAnimation();
 
  // Rotate through skills
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate elements when they come into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div>
      {/* About Section */}
      <section
        id="about"
        className="bg-gradient-to-b from-black via-black to-[#0a0a0a] py-16 sm:py-32 relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]"
      >
        {/* Enhanced background elements with animation */}
        <div className="absolute top-0 right-1/3 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-0 w-2/5 h-2/5 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center lg:items-start justify-center">
            {/* Image Frame with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full sm:w-80 lg:w-1/3 flex justify-center flex-shrink-0"
            >
              <div className="flex flex-col items-center w-full">
                <ImageFrame setIsHovered={setIsHovered} isHovered={isHovered} />
                <ProfileStats />
              </div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-2/3" 
              ref={bioRef}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full space-y-6 sm:space-y-8"
              >
                {/* Title with enhanced styling */}
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 w-full text-left leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    About <span className="text-cyan-400 drop-shadow-lg" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}>Me</span>
                  </h2>
                  
                  {/* Subtitle badge */}
                  <div className="inline-block mt-3">
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                      Software Architect & Automation Specialist
                    </span>
                  </div>
                </div>

                {/* Animated skills display - Enhanced */}
                <div className="h-12 sm:h-14">
                  <motion.div
                    key={currentSkill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-cyan-400 font-bold text-lg sm:text-xl tracking-wide"
                  >
                    {skills[currentSkill]}
                  </motion.div>
                </div>

                {/* Bio with enhanced styling */}
                <div className="relative">
                  <ShowmoreInfo
                    showMoreBio={showMoreBio}
                    setShowMoreBio={setShowMoreBio}
                  />
                </div>

                {/* Social Media Icons - Enhanced */}
                <motion.div 
                  className="flex flex-wrap gap-3 sm:gap-4 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          y: -6, 
                          scale: 1.15,
                          boxShadow: `0 0 24px ${social.color === 'text-cyan-400' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(99, 102, 241, 0.5)'}`
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        className={`inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] ${social.color} transition-all duration-300 hover:border-cyan-500/60 hover:from-[#0f0f0f] hover:to-[#1a1a1a] backdrop-blur-sm`}
                        aria-label={social.name}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </motion.a>
                    );
                  })}
                </motion.div>

                {/* Tabs for experience, education, achievements - Enhanced */}
                <div className="border-t border-[#262626] pt-6 sm:pt-8">
                  <ExperEduAchiComponent
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <MoreAboutmeButton />
                </div>

              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
