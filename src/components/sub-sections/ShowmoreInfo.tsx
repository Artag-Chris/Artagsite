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
            I architect systems and engineer automation solutions that help teams scale intelligently. As a Software Architect and Automation Specialist, I design technical foundations for startups, optimize workflows for enterprises, and build infrastructure that anticipates tomorrow's challenges.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            My focus spans multiple domains: enterprise system design, cloud-native architecture, DevOps automation, business process workflows, and code generation. I work across formats—full-time roles, consulting engagements, or strategic advisory—bringing the same rigor and vision to each.
          </p>

          <p className={`${showMoreBio ? "block" : "hidden"} text-sm sm:text-base leading-relaxed`}>
            I believe exceptional systems combine technical depth with clarity of thought. Whether architecting microservices, automating complex workflows, or guiding technical decisions, I focus on solutions that are maintainable, scalable, and aligned with business goals. When I'm not architecting systems, you'll find me exploring emerging technologies, contributing to open-source projects, or sharing technical insights.
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
