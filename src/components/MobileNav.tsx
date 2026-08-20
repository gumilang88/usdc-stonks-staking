"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export type MobileNavItem = { label: string; href: string };

export default function MobileNav({ items }: { items: MobileNavItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="lg:hidden relative">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="px-btn bg-[#3c1154] text-[#3ddad8] p-2 flex items-center justify-center"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-48 px-card bg-[#4a1768]">
          <div className="flex flex-col p-2">
            {items.map((n) => (
              <a
                key={n.href + n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-heading text-[11px] text-white/90 hover:text-[#3ddad8] px-3 py-3 transition-colors border-b border-black/40 last:border-b-0"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
