"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Certifications() {
  return (
    <section className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <p className="section-subtitle">Recognition</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-[var(--fg-muted)] mb-12">Continuous learning and professional development.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="glass-card p-6 flex gap-4 items-start group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-20)] to-[var(--cyan-20)] flex items-center justify-center border border-[var(--accent-20)]">
                  <span className="text-[var(--accent)] font-bold text-lg font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[var(--fg)] font-semibold">{cert.title}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Award size={14} className="text-[var(--cyan)]" />
                        <span className="text-[var(--cyan)] text-sm">{cert.issuer}</span>
                      </div>
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
