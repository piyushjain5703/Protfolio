"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { articles } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Articles() {
  return (
    <section id="articles" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <p className="section-subtitle">Writing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              <span className="gradient-text">Articles</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {articles.map((article) => (
              <motion.a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 group block cursor-pointer"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent-20)] to-[var(--cyan-20)] flex items-center justify-center border border-[var(--accent-20)] group-hover:border-[var(--accent-40)] transition-colors">
                  <BookOpen size={24} className="text-[var(--accent)]" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {article.title}
                    </h3>
                    <ExternalLink
                      size={18}
                      className="flex-shrink-0 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors mt-1"
                    />
                  </div>

                  <p className="text-[var(--fg-muted)] text-sm leading-relaxed mb-4">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-[var(--fg-muted)] font-mono">{article.date}</span>
                    <span className="text-[var(--dot-separator)]">·</span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-[var(--accent-10)] text-[var(--accent)] rounded-full border border-[var(--accent-20)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
