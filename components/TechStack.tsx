"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function TechStack() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <p className="section-subtitle">Technical Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Tech <span className="gradient-text">Stack</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((category) => (
              <motion.div key={category.category} variants={itemVariants} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-[var(--fg)] mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-[var(--accent-10)] text-[var(--fg-muted)] rounded-lg border border-[var(--accent-15)] hover:border-[var(--accent-40)] hover:text-[var(--fg)] transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
