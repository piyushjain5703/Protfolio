"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <p className="section-subtitle">Career</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Work <span className="gradient-text">Experience</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] to-[var(--cyan)] opacity-30" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div key={i} variants={itemVariants} className="relative pl-12 md:pl-20">
                  <div
                    className="absolute left-2 md:left-6 top-1 w-5 h-5 rounded-full border-2 border-[var(--accent)] flex items-center justify-center"
                    style={{ backgroundColor: "var(--bg-alt)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  </div>

                  <div className="glass-card p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[var(--fg)]">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase size={14} className="text-[var(--accent)]" />
                          <span className="text-[var(--accent)] font-medium">{exp.company}</span>
                          <span className="text-[var(--fg-muted)] text-sm">· {exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {exp.current && (
                          <span className="px-3 py-1 text-xs font-medium bg-[var(--accent-20)] text-[var(--accent)] rounded-full">
                            Current
                          </span>
                        )}
                        <span className="text-sm text-[var(--fg-muted)]">{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-4">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="text-[var(--fg-muted)] text-sm leading-relaxed flex gap-2">
                          <span className="text-[var(--accent)] mt-1.5 flex-shrink-0">▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-[var(--accent-10)] text-[var(--accent)] rounded-full border border-[var(--accent-20)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
