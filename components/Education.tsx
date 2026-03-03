"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Background</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-10 max-w-3xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--cyan)] flex items-center justify-center">
                <GraduationCap size={28} className="text-white" />
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--fg)]">{edu.institution}</h3>
                    <p className="text-[var(--accent)] font-medium mt-1">{edu.degree} in {edu.field}</p>
                  </div>
                  <span className="text-[var(--fg-muted)] text-sm">{edu.period}</span>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-3 py-1.5 text-sm font-medium bg-[var(--accent-15)] text-[var(--accent)] rounded-lg">
                    {edu.grade}
                  </span>
                  <span className="px-3 py-1.5 text-sm font-medium bg-[var(--cyan-15)] text-[var(--cyan)] rounded-lg">
                    {edu.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
