"use client";

import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="py-8 overflow-hidden border-y border-[var(--border-color)]" style={{ backgroundColor: "var(--bg)" }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-6 py-2 text-sm font-medium text-[var(--fg-muted)] whitespace-nowrap"
          >
            <span className="text-[var(--accent)] mr-2">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
