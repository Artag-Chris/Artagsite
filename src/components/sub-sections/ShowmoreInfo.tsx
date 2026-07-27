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
          Hey, I&apos;m Christian — I connect things that don&apos;t talk to each other, automate the stuff you do manually, and build tools that save real time. Based in Pereira, Colombia 🇨🇴. I&apos;ve spent 5+ years figuring out how to make services work together — WhatsApp, Discord, Slack, databases, payment systems, you name it.
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
                I work with <strong>Node.js, React, TypeScript, and n8n</strong> to build microservices, automate workflows, and create custom tools. I&apos;ve connected <strong>12+ services</strong> into seamless pipelines and automated <strong>50+ business processes</strong>. Not because I got lucky, but because I care about the details most people skip.
              </p>

              <p className="text-sm sm:text-base leading-relaxed font-body">
                <strong>How I work:</strong> You tell me what&apos;s broken or what&apos;s slowing you down, and I figure out the best way to fix it. No jargon, no over-engineering. I communicate clearly — in English or Spanish — and I don&apos;t disappear after the first deliverable.
              </p>

              <p className="text-sm sm:text-base leading-relaxed font-body">
                I care about the craft — the edge cases nobody thinks about, the integrations that actually work at 3am, the automation that saves you 10 hours a week. That&apos;s what keeps me building.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20 mt-3">
        <button
          onClick={() => setShowMoreBio(!showMoreBio)}
          className="text-blue-400 text-sm flex items-center hover:text-blue-300 transition-colors font-medium"
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
