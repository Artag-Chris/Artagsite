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
            Full-stack software architect with expertise in scalable systems, zero-downtime migrations, and enterprise automation. I architect technical foundations for companies that need to move fast without breaking things. Specialized in microservices, real-time systems, and process automation with <strong>n8n and enterprise tools</strong>.
          </p>

          <p className="text-sm sm:text-base leading-relaxed font-body">
            <strong>Core expertise:</strong> I design and build systems that handle <strong>100K+ concurrent users</strong>, manage <strong>$2M+ daily payment volumes</strong>, and maintain <strong>99.99% uptime</strong>. I've led database migrations for <strong>32,000+ users with 0.004% error rate</strong> and built real-time features with <strong>&lt;100ms latency</strong>. I work across multiple technology domains: cloud infrastructure (AWS), containerization (Docker), system architecture, DevOps automation, and enterprise integrations.
          </p>

          <p className={`${showMoreBio ? "block" : "hidden"} text-sm sm:text-base leading-relaxed font-body`}>
            <strong>Working approach:</strong> I believe exceptional systems combine technical depth with business clarity. Whether architecting microservices, automating complex workflows, optimizing system performance (achieving 40-60% improvements), or designing payment integrations, I focus on maintainable, scalable solutions that align with business goals. I've successfully automated 50+ business workflows with &lt;0.1% error rates and designed infrastructure for high-frequency trading and financial systems.
          </p>

          <p className={`${showMoreBio ? "block" : "hidden"} text-sm sm:text-base leading-relaxed font-body`}>
            <strong>Engagement formats:</strong> Full-time roles, consulting engagements, strategic technical advisory, and nearshore partnerships. I work with startups building their first backend, mid-market companies scaling systems, and enterprises optimizing critical infrastructure. When I'm not architecting systems, I contribute to open-source projects, explore emerging technologies, and share technical insights with the developer community.
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
