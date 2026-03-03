"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, BookOpen } from "lucide-react";
import { siteConfig } from "@/lib/data";

const links = [
  {
    icon: Mail,
    label: `Email me at ${siteConfig.email}`,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Linkedin,
    label: "Connect on LinkedIn",
    href: siteConfig.linkedin,
  },
  {
    icon: Github,
    label: "Find me on GitHub",
    href: siteConfig.github,
  },
  {
    icon: BookOpen,
    label: "Read my Medium articles",
    href: siteConfig.medium,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 section-alt">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Reach Out To <span className="gradient-text">Me!</span>
          </h2>
          <p className="text-[var(--fg-muted)] mb-12">
            <strong className="text-[var(--fg)]">Thank you</strong> for visiting. Looking forward to
            connecting.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-6 py-4 flex items-center gap-3 hover:border-[var(--accent-40)] transition-all duration-300 group w-full sm:w-auto"
            >
              <link.icon
                size={20}
                className="text-[var(--accent)] group-hover:text-[var(--cyan)] transition-colors"
              />
              <span className="text-sm text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
