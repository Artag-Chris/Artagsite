"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Award } from "lucide-react";
import {
  tabs,
  type AchievementEntry,
  type TimelineEntry,
} from "@/data/aboutInfo";

function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={`${entry.org}-${entry.period}`}
          className="relative pl-6 border-l-2 border-indigo-500/30"
        >
          <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1" />
          <h4 className="text-white font-medium">{entry.role}</h4>
          <p className="text-indigo-400 text-sm">
            {entry.org} <span aria-hidden="true">•</span> {entry.period}
          </p>
          <p className="text-zinc-400 text-sm mt-2">{entry.description}</p>
        </div>
      ))}
    </div>
  );
}

function AchievementList({ entries }: { entries: AchievementEntry[] }) {
  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div key={entry.title} className="flex items-start gap-3">
          <div className="p-1.5 bg-indigo-500/10 rounded-full text-indigo-500">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-white text-sm font-medium">{entry.title}</h4>
            <p className="text-zinc-400 text-xs">{entry.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperEduAchiComponent({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: (id: string) => void;
  activeTab: string;
}) {
  const tTabs = useTranslations("about.tabs");
  const tTimeline = useTranslations("about.timeline");

  const content =
    activeTab === "achievements" ? (
      <AchievementList
        entries={tTimeline.raw("achievements") as AchievementEntry[]}
      />
    ) : (
      <TimelineList
        entries={
          tTimeline.raw(
            activeTab === "education" ? "education" : "experience"
          ) as TimelineEntry[]
        }
      />
    );

  return (
    <div className="mb-4 sm:mb-6">
      <div
        role="tablist"
        className="flex border-b border-zinc-800 mb-4 overflow-x-auto scrollbar-hide"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                selected ? "text-cyan-400" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {tTabs(tab.id)}
              {selected && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="min-h-[200px] sm:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm sm:text-base"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ExperEduAchiComponent;
