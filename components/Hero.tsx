"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-float"
          style={{ backgroundColor: "var(--orb-1)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-float"
          style={{ backgroundColor: "var(--orb-2)", animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-[var(--accent)] font-mono text-sm mb-4 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I&apos;m
          </motion.p>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">{siteConfig.name}</span>
          </h1>

          <motion.h2
            className="text-xl md:text-2xl font-medium text-[var(--fg-muted)] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {siteConfig.role}
          </motion.h2>

          <motion.p
            className="text-[var(--fg-muted)] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                color: "#fff",
                padding: "14px 36px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(124, 58, 237, 0.1)",
                display: "inline-block",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Contact Me
            </motion.a>

            <motion.a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                border: "2px solid #7c3aed",
                color: "var(--fg)",
                padding: "14px 36px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.15)",
                background: "transparent",
              }}
            >
              <FileText size={18} />
              Download My Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-[var(--accent)] opacity-50" size={24} />
        </motion.div>
      </div>
    </section>
  );
}
