"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <p className="section-subtitle">Work</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              <span className="gradient-text">Projects</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="glass-card p-6 md:p-8 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--fg)]">{project.title}</h3>
                  <span className="flex-shrink-0 px-3 py-1 text-xs font-medium bg-[var(--cyan-15)] text-[var(--cyan)] rounded-full border border-[var(--cyan-20)]">
                    {project.badge}
                  </span>
                </div>

                <p className="text-[var(--fg-muted)] text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-[var(--accent-10)] text-[var(--accent)] rounded-full border border-[var(--accent-20)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex items-center gap-4 pt-2 border-t border-[var(--border-color)]">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-[var(--cyan)] hover:opacity-80 transition-opacity"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                      >
                        <Github size={14} />
                        Source Code
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
