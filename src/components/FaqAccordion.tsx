"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "When was USDC STONKS launched?",
    a: "USDC STONKS launched on January 13, 2024, making it the first AI meme token on ARC.",
  },
  {
    q: "What makes USDC STONKS special?",
    a: "USDC STONKS is the first AI meme token on ARC, launched January 13, 2024. We pioneered the category by combining AI innovation with meme culture on the fastest blockchain in crypto, making USDC STONKS a piece of ARC history. What sets USDC STONKS apart is that it's built on real fundamentals. USDC STONKS is tied to the builder success of its team. As the team builds products and grows revenue, they reinvest in the token. Products like Burn & Claim already process thousands of transactions monthly while more products are launching soon.",
  },
  {
    q: "What is Aerosol?",
    a: "Aerosol is a software company that builds consumer-facing products for the ARC ecosystem. It focuses on creating practical tools that solve real problems for users while aligning incentives with the communities and projects they support. They've already launched Burn & Claim, a production-grade application that helps users reclaim ARC by cleaning up their wallets. The product is actively used by thousands of wallets and has processed hundreds of thousands of transactions to date.",
  },
  {
    q: "Is USDC STONKS listed on centralized exchanges?",
    a: "We used to be listed on MEXC but not anymore. Listing on centralized exchanges often requires paying thousands of dollars in listing fees and ongoing monthly costs just to keep the token listed, which hampers our ability to grow. We believe the future is on-chain and have no interest in paying any more listing fees. USDC STONKS is available on decentralized exchanges on ARC.",
  },
  {
    q: "How secure is USDC STONKS?",
    a: "USDC STONKS is highly secure. It was created and is maintained by one of the most reputable teams in ARC. The liquidity pool is locked for 30 years, and it has a risk level of 0 according to Rugcheck.",
  },
  {
    q: "Where can I find USDC STONKS?",
    a: "USDC STONKS is listed on major crypto tracking platforms like CoinMarketCap and CoinGecko, categorized under the AI MEME section.",
  },
  {
    q: "Is USDC STONKS verified?",
    a: "Yes, USDC STONKS is verified on all major platforms including CoinMarketCap, CoinGecko, and leading ARC aggregators.",
  },
  {
    q: "How many holders does USDC STONKS have?",
    a: "USDC STONKS is well distributed and has thousands of holders. View the current holder count on the ARC explorer.",
  },
  {
    q: "Who is behind USDC STONKS?",
    a: "USDC STONKS is backed by Aerosol, one of the most reputable teams in ARC. Aerosol is a software company building consumer-facing products for the ARC ecosystem, focusing on creating practical tools that solve real problems for users while aligning incentives with the communities and projects they support.",
  },
  {
    q: "How does the deflationary mechanism work?",
    a: "USDC STONKS is powered by a token incinerator which automatically burns USDC STONKS tokens. As the supply decreases over time, it boosts scarcity and long-term value.",
  },
  {
    q: "What is the token supply?",
    a: "USDC STONKS has a fixed supply of 69.42 trillion tokens with no mint authority, meaning no new tokens can be created. The liquidity pool is locked for 30 years. Since USDC STONKS tokens can be burned through the incinerator, the total supply decreases over time.",
  },
  {
    q: "How did I not know about this gem!?",
    a: "You're still early! We've been here since January 13, 2024, but honestly? Most people are still discovering USDC STONKS. You finding us now is perfect timing. You get to say you were here before it went mainstream AGAIN. Welcome aboard! Join our community on Telegram.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-4">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.q}
            className={`px-card ${
              isOpen ? "bg-[#3c1154]" : "hover:bg-[#46145f]"
            } transition-colors`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 text-left p-5"
            >
              <span className="px-heading text-[12px] md:text-[13px] leading-relaxed">
                {faq.q}
              </span>
              <span
                className={`faq-chevron shrink-0 text-[#3ddad8] text-2xl font-bold ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                {">"}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-[#e9e2ef] text-lg leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}