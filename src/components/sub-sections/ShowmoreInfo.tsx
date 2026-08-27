import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

function ShowmoreInfo({
  showMoreBio,
  setShowMoreBio,
}: {
  showMoreBio: boolean;
  setShowMoreBio: (v: boolean) => void;
}) {
  const t = useTranslations("about.bio");
  return (
    <div className="relative">
      {/* Always visible: first two paragraphs */}
      <div className="text-gray-300 space-y-3 sm:space-y-4">
        <p className="text-sm sm:text-base leading-relaxed font-body">
          {t("p1")}
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
                {t("p2Start")}<strong>{t("p2Strong")}</strong>{t("p2Mid")}<strong>{t("p2Strong2")}</strong>{t("p2Mid2")}<strong>{t("p2Strong3")}</strong>{t("p2End")}
              </p>

              <p className="text-sm sm:text-base leading-relaxed font-body">
                <strong>{t("p3Start")}</strong>{t("p3Strong")}
              </p>

              <p className="text-sm sm:text-base leading-relaxed font-body">
                {t("p4")}
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
          <span>{showMoreBio ? t("readLess") : t("readMore")}</span>
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
