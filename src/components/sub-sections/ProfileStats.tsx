import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2, Zap, Users, Award } from "lucide-react";

function ProfileStats() {
  const t = useTranslations("about.stats");

  const stats = [
    {
      label: t("years"),
      value: "5+",
      icon: Zap,
      color: "from-blue-500 to-blue-400",
    },
    {
      label: t("projects"),
      value: "15+",
      icon: Code2,
      color: "from-amber-500 to-amber-400",
    },
    {
      label: t("services"),
      value: "12+",
      icon: Users,
      color: "from-blue-500 to-blue-400",
    },
    {
      label: t("workflows"),
      value: "50+",
      icon: Award,
      color: "from-amber-500 to-amber-400",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-xs sm:max-w-sm mt-8 sm:mt-12"
    >
      <div className="relative group">
        <div className="relative bg-[#111111]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 sm:p-8">

          <div className="relative z-10 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group/stat relative"
                >
                  <div className="relative bg-white/5 border border-white/5 rounded-xl p-4 transition-all duration-200 hover:border-white/10">
                    <div className={`inline-flex p-2.5 rounded-lg bg-white/5 mb-3`}>
                      <Icon className={`w-5 h-5 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`} />
                    </div>

                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>

                    <div className="text-xs text-zinc-500 font-medium tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-6"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
}

export default ProfileStats;
