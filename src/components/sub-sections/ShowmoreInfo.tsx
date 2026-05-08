import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

function ShowmoreInfo({
  showMoreBio,
  setShowMoreBio,
}: {
  showMoreBio: boolean;
  setShowMoreBio: (v: boolean) => void;
}) {
  return (
    <div className="relative">
      {/* Always visible: first two paragraphs */}
      <div className="text-gray-300 space-y-3 sm:space-y-4">
        <p className="text-sm sm:text-base leading-relaxed font-body">
          Hey, I'm Christian — a full-stack developer based in Pereira, Colombia. I obsess over one thing: building software that works exactly when it needs to, at the scale it needs to, without drama. I've migrated <strong>32,000+ users</strong> between databases without a single incident, and I'm genuinely proud of that.
        </p>

        {/* Expandable: paragraphs 2-4 fade and slide in/out together */}
        <AnimatePresence initial={false}>
          {showMoreBio && (
            <motion.div
              key="more-bio"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4, ease: "easeOut" },
              }}
              style={{ overflow: "hidden" }}
              className="space-y-3 sm:space-y-4"
            >
              <p className="text-sm sm:text-base leading-relaxed font-body">
                My day-to-day lives in <strong>Node.js, React, TypeScript, and Docker</strong> — wiring up backends, designing architecture, automating workflows with <strong>n8n</strong>, and making sure payment systems don't fall over at 2am. I've handled <strong>$2M+ in daily payment volume</strong> and kept systems at <strong>99.99% uptime</strong>. Not because I got lucky, but because I care about the details most people skip.
              </p>

              <p className="text-sm sm:text-base leading-relaxed font-body">
                <strong>How I work:</strong> I'm not the type who disappears after the first PR. I ask questions before I write code, I push back when something doesn't make sense, and I communicate clearly — in English or Spanish. I've worked with startups who needed their first backend up yesterday, and with teams scaling systems that already had real users depending on them. Both scenarios suit me just fine.
              </p>

              <p className="text-sm sm:text-base leading-relaxed font-body">
                I'm currently open to <strong>full-time roles, freelance projects, and nearshore collaborations</strong>. If you've got a technical challenge that needs a developer who actually gives a damn — I'd love to hear about it. Worst case: we have a good conversation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20 mt-3">
        <button
          onClick={() => setShowMoreBio(!showMoreBio)}
          className="text-cyan-400 text-sm flex items-center hover:text-cyan-300 transition-colors font-medium"
        >
          <span>{showMoreBio ? "Read less" : "Read more about my experience"}</span>
          <motion.span
            animate={{ rotate: showMoreBio ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="ml-1 inline-flex"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
      </div>
    </div>
  );
}

export default ShowmoreInfo;
