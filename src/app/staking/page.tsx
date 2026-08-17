import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Timer,
  Coins,
  PiggyBank,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import StakePanel from "@/components/StakePanel";

const TG = "https://t.me/usdcstonkss";
const X = "https://x.com/usdc_stonks";

// TODO: replace with real value once the staking contract is deployed
const STAKE = {
  apr: "620%",
  totalStaked: "56,717,931",
  totalValueLocked: "$STK 420M",
  rewardToken: "STONKS",
  lockPeriod: "Flexible",
};

const STATS = [
  { icon: TrendingUp, label: "APR", value: STAKE.apr, sub: "dynamic reward rate" },
  { icon: PiggyBank, label: "TOTAL STAKED", value: STAKE.totalStaked, sub: "STONKS locked" },
  { icon: Timer, label: "LOCK PERIOD", value: STAKE.lockPeriod, sub: "unstake anytime" },
  { icon: Sparkles, label: "REWARDS", value: STAKE.rewardToken, sub: "paid every block" },
];

const FAQ = [
  {
    q: "WHAT IS STAKING?",
    a: "Lock your STONKS in the staking pool and earn rewards just for holding. Your tokens generate yield while they sit. When you unstake, you get your tokens back plus whatever rewards you've earned.",
  },
  {
    q: "HOW DO I STAKE?",
    a: "Connect your wallet, enter the amount of STONKS you want to stake, approve the transaction, and confirm. That's it — you start earning rewards immediately.",
  },
  {
    q: "WHEN DO I GET REWARDS?",
    a: "Rewards accrue every block and can be claimed at any time. There's no minimum lock period, so you can unstake whenever you want.",
  },
  {
    q: "IS IT SAFE?",
    a: "The staking contract is non-custodial — your tokens stay under your control until you stake them, and only you can unstake. Always verify the contract address and do your own research.",
  },
];

export default function StakingPage() {
  return (
    <main className="w-full">
      {/* ---- NAV ---- */}
      <header className="sticky top-0 z-50 bg-[#2b0d3e] border-b-4 border-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="px-btn bg-[#3ddad8] px-3 py-2 text-[11px] text-[#20102e]">
              STONKS
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5">
            <Link href="/#about" className="px-heading text-[11px] text-white/90 hover:text-[#3ddad8] transition-colors">About</Link>
            <Link href="/#tokenomics" className="px-heading text-[11px] text-white/90 hover:text-[#3ddad8] transition-colors">Tokenomics</Link>
            <Link href="/#roadmap" className="px-heading text-[11px] text-white/90 hover:text-[#3ddad8] transition-colors">Roadmap</Link>
            <Link href="/staking" className="px-heading text-[11px] text-[#3ddad8] transition-colors">Staking</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/#buy" className="px-btn bg-[#f06943] text-white px-4 py-2 text-[11px] inline-block hidden md:inline">
              Join
            </Link>
            <ConnectWalletButton />
          </div>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <section className="relative overflow-hidden bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 flex flex-col items-center text-center">
          <p className="px-chip bg-[#2b0d3e] text-[#3ddad8] text-[10px] mb-6">
            ★ Earn while you hold
          </p>
          <h1 className="px-heading text-white text-4xl md:text-6xl text-outline leading-tight">
            STAKE&nbsp;STONKS
          </h1>
          <p className="px-heading text-[#3ddad8] text-sm md:text-lg mt-4 text-outline">
            LOCK IT. EARN IT. STAY CONFUSED.
          </p>
        </div>
      </section>

      {/* ---- STATS ---- */}
      <section className="bg-[#60e7e5] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-5 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="px-card-cyan text-[#20102e] p-5 flex flex-col items-center justify-center text-center h-full">
                  <s.icon className="h-7 w-7 mb-3" strokeWidth={2} />
                  <div className="px-heading text-[10px] opacity-70 whitespace-nowrap">{s.label}</div>
                  <div className="px-heading text-lg md:text-xl mt-1 break-all leading-tight max-w-full">{s.value}</div>
                  <div className="text-[#20102e] text-sm mt-1 opacity-70">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- STAKING PANEL ---- */}
      <section id="stake" className="bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#3ddad8] text-[#20102e] px-4 py-2 text-[11px]">Pool</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              STAKING&nbsp;POOL
            </h2>
          </div>

          <Reveal>
            <StakePanel apr={STAKE.apr} />
          </Reveal>
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section className="bg-[#60e7e5] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#3c1154] text-white px-4 py-2 text-[11px]">Guide</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              HOW&nbsp;STAKING&nbsp;WORKS
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Wallet, no: "1", t: "CONNECT WALLET", d: "Link your wallet that holds STONKS. Nothing leaves your custody until you stake." },
              { icon: PiggyBank, no: "2", t: "STAKE TOKENS", d: "Choose how many STONKS to lock. Confirm the transaction on-chain." },
              { icon: Coins, no: "3", t: "EARN REWARDS", d: "Watch rewards accrue every block. Claim anytime, unstake whenever." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="px-card-white p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-chip bg-[#3c1154] text-white px-3 py-1 text-[12px]">{s.no}</span>
                    <s.icon className="h-6 w-6 text-[#f06943]" strokeWidth={2} />
                  </div>
                  <h3 className="px-heading text-[#3c1154] text-[13px] mb-3">{s.t}</h3>
                  <p className="text-[#20102e] text-lg flex-1">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#f06943] text-white px-4 py-2 text-[11px]">FAQ</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              QUESTIONS
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {FAQ.map((f) => (
              <Reveal key={f.q}>
                <details className="px-card bg-[#4a1768]">
                  <summary className="flex items-center justify-between p-5">
                    <span className="px-heading text-white text-[12px]">{f.q}</span>
                    <span className="faq-chevron text-[#3ddad8] text-xl">›</span>
                  </summary>
                  <p className="text-[#c9b8d8] text-lg px-5 pb-5">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="bg-[#2b0d3e] border-t-4 border-black">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="px-btn bg-[#3ddad8] px-3 py-2 text-[11px] text-[#20102e]">$STK</span>
            <span className="px-heading text-white text-[12px]">USDC STONKS</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-5 justify-center">
            <Link href="/#about" className="text-[#c9b8d8] text-lg hover:text-white">About</Link>
            <Link href="/#tokenomics" className="text-[#c9b8d8] text-lg hover:text-white">Tokenomics</Link>
            <Link href="/staking" className="text-[#3ddad8] text-lg">Staking</Link>
            <a href={TG} target="_blank" rel="noreferrer" className="text-[#c9b8d8] text-lg hover:text-white">Telegram</a>
            <a href={X} target="_blank" rel="noreferrer" className="text-[#c9b8d8] text-lg hover:text-white">X</a>
          </nav>
        </div>
        <div className="border-t-2 border-black py-5 text-center">
          <p className="text-[#c9b8d8] text-lg">
            Copyright © 2026 USDC STONKS. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
