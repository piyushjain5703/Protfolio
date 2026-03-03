import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xl font-bold gradient-text">{siteConfig.initials}</span>
        <p className="text-sm text-[var(--fg-muted)]">
          Built by <strong className="text-[var(--fg)]">{siteConfig.name}</strong> · {siteConfig.role}
        </p>
      </div>
    </footer>
  );
}
