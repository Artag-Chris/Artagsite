import { motion } from "framer-motion";
import { Code2, Zap, Users, Award } from "lucide-react";

const stats = [
  {
    label: "Years Experience",
    value: "2+",
    icon: Zap,
    color: "from-cyan-500 to-cyan-400",
  },
  {
    label: "Projects Built",
    value: "15+",
    icon: Code2,
    color: "from-indigo-500 to-indigo-400",
  },
  {
    label: "Happy Clients",
    value: "10+",
    icon: Users,
    color: "from-cyan-500 to-cyan-400",
  },
  {
    label: "Workflows Automated",
    value: "50+",
    icon: Award,
    color: "from-indigo-500 to-indigo-400",
  },
];

function ProfileStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-xs sm:max-w-sm mt-8 sm:mt-12"
    >
      {/* Card background with glow */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative bg-gradient-to-br from-[#141414]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-[#262626] rounded-2xl p-6 sm:p-8">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] rounded-2xl pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>

          {/* Stats grid */}
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group/stat relative"
                >
                  {/* Stat card glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl opacity-0 group-hover/stat:opacity-20 transition-opacity duration-300 blur`}></div>
                  
                  <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#262626] group-hover/stat:border-cyan-500/40 rounded-xl p-4 transition-all duration-300">
                    {/* Icon with glow */}
                    <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 mb-3 group-hover/stat:bg-opacity-20 transition-all duration-300`}>
                      <Icon className={`w-5 h-5 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`} />
                    </div>

                    {/* Stat value */}
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>

                    {/* Stat label */}
                    <div className="text-xs text-gray-400 font-medium tracking-wide">
                      {stat.label}
                    </div>

                    {/* Animated border on hover */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover/stat:opacity-100"
                      layoutId={`stat-border-${index}`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "center" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-6"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
}

export default ProfileStats;
