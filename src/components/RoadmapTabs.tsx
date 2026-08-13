"use client";

import { useState } from "react";

export type Phase = {
  id: string;
  title: string;
  heading: string;
  items: string[];
};

const PHASES: Phase[] = [
  {
    id: "1",
    title: "01",
    heading: "The Beginning",
    items: [
      "USDC landed on Arc.",
      "Then someone had the terrible idea to call it STONKS.",
      "So here we are.",
    ],
  },
  {
    id: "2",
    title: "02",
    heading: "Build Chaos",
    items: [
      "Build memes. Build community. Build questionable ideas.",
      "Turn a perfectly normal coin into something unnecessarily chaotic.",
    ],
  },
  {
    id: "3",
    title: "03",
    heading: "Full Stonks",
    items: [
      "More chaos. More memes. More nonsense.",
      "Nobody knows where this goes. That's the fun part.",
    ],
  },
];

export default function RoadmapTabs() {
  const [active, setActive] = useState("1");

  const phase = PHASES.find((p) => p.id === active) ?? PHASES[0];

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {PHASES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className={`px-btn px-5 py-2 text-[12px] transition-colors ${
              active === p.id
                ? "bg-[#3ddad8] text-[#20102e]"
                : "bg-white text-[#20102e] hover:bg-[#60e7e5]"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="px-card-white p-6 md:p-8">
        <h3 className="px-heading text-[#3c1154] text-lg md:text-xl mb-5">
          {phase.heading}
        </h3>
        <ul className="grid gap-2 md:grid-cols-2">
          {phase.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3 font-mono text-[#20102e]">
              <span className="px-chip bg-[#3ddad8] text-[#20102e] min-w-8 h-8 justify-center text-[13px] shrink-0">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}