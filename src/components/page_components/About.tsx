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
        className="bg-zinc-900 py-12 sm:py-20 relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 w-full">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-12 items-center">
            <ImageFrame setIsHovered={setIsHovered} isHovered={isHovered} />

            <div className="w-full md:w-2/3" ref={bioRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 w-full text-left">
                  About <span className="text-indigo-500">Me</span>
                </h2>

                {/* Animated skills display */}
                <div className="h-8 mb-4">
                  <motion.p
                    key={currentSkill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-indigo-400 font-medium"
                  >
                    {skills[currentSkill]}
                  </motion.p>
                </div>

                <ShowmoreInfo
                  showMoreBio={showMoreBio}
                  setShowMoreBio={setShowMoreBio}
                />

                {/* Social Media Icons */}
                <div className="flex flex-wrap gap-3 my-6">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 ${social.color} transition-all duration-300 hover:border-zinc-500 hover:shadow-lg hover:shadow-indigo-500/10`}
                        aria-label={social.name}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>

                {/* Tabs for experience, education, achievements */}
                <ExperEduAchiComponent
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                
                <MoreAboutmeButton />
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
