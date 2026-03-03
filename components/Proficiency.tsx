"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { proficiency } from "@/lib/data";
import { useTheme } from "./ThemeProvider";

export default function Proficiency() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  const trackColor = theme === "light" ? "#dfe2ea" : "#2a2a4a";

  return (
    <section className="py-24 px-6 section-alt">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="gradient-text">Proficiency</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {proficiency.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[var(--fg)] font-medium">{item.label}</span>
                <span className="text-[var(--accent)] font-mono text-sm">{item.percent}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 8,
                  borderRadius: 9999,
                  backgroundColor: trackColor,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.percent}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    borderRadius: 9999,
                    background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
