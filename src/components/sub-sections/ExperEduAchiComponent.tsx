import { tabs } from "@/data/aboutInfo";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

function ExperEduAchiComponent({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: any;
  activeTab: any;
}) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex border-b border-zinc-800 mb-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-indigo-500"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-[200px] sm:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm sm:text-base"
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ExperEduAchiComponent;
