"use client";

import { motion } from "framer-motion";
import { stats, aboutParagraphs } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <p className="section-subtitle">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Who Am <span className="gradient-text">I</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="glass-card p-6 text-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-[var(--fg-muted)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            {aboutParagraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={itemVariants}
                className="text-[var(--fg-muted)] leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
