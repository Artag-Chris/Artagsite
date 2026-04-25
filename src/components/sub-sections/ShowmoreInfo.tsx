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
          className={`text-gray-300 space-y-3 sm:space-y-4 overflow-hidden transition-all duration-500 ${
            showMoreBio ? "max-h-[800px]" : "max-h-[120px] sm:max-h-[100px]"
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed font-body">
            Hey, I'm Christian — a full-stack developer based in Pereira, Colombia. I obsess over one thing: building software that works exactly when it needs to, at the scale it needs to, without drama. I've migrated <strong>32,000+ users</strong> between databases without a single incident, and I'm genuinely proud of that.
          </p>

          <p className="text-sm sm:text-base leading-relaxed font-body">
            My day-to-day lives in <strong>Node.js, React, TypeScript, and Docker</strong> — wiring up backends, designing architecture, automating workflows with <strong>n8n</strong>, and making sure payment systems don't fall over at 2am. I've handled <strong>$2M+ in daily payment volume</strong> and kept systems at <strong>99.99% uptime</strong>. Not because I got lucky, but because I care about the details most people skip.
          </p>

          <p className={`${showMoreBio ? "block" : "hidden"} text-sm sm:text-base leading-relaxed font-body`}>
            <strong>How I work:</strong> I'm not the type who disappears after the first PR. I ask questions before I write code, I push back when something doesn't make sense, and I communicate clearly — in English or Spanish. I've worked with startups who needed their first backend up yesterday, and with teams scaling systems that already had real users depending on them. Both scenarios suit me just fine.
          </p>

          <p className={`${showMoreBio ? "block" : "hidden"} text-sm sm:text-base leading-relaxed font-body`}>
            I'm currently open to <strong>full-time roles, freelance projects, and nearshore collaborations</strong>. If you've got a technical challenge that needs a developer who actually gives a damn — I'd love to hear about it. Worst case: we have a good conversation.
          </p>
        </motion.div>

        {/* Read more/less toggle */}
        {!showMoreBio && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent z-10"></div>
        )}
        <div className="relative z-20 mt-2">
          <button
            onClick={() => setShowMoreBio(!showMoreBio)}
            className="text-cyan-400 text-sm flex items-center hover:text-cyan-300 transition-colors font-medium"
          >
            {showMoreBio ? "Read less" : "Read more about my experience"}
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
