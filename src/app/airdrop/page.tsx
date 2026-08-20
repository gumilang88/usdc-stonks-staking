import Link from "next/link";
import {
  Gift,
  Sparkles,
  Users,
  Timer,
  Coins,
  ShieldCheck,
  Wallet,
  Rocket,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import Leaderboard from "@/components/Leaderboard";

const TG = "https://t.me/usdcstonkss";
const X = "https://x.com/usdc_stonks";

// TODO: replace once the airdrop contract/snapshot is live
const AIRDROP = {
  totalPool: "50,000,000",
  rewardToken: "STONKS",
  snapshotNote: "Your share is measured by your total staked position.",
  stakersBoost: "5x",
};

const STATS = [
  { icon: Gift, label: "TOTAL POOL", value: AIRDROP.totalPool, sub: "STONKS for stakers" },
  { icon: Users, label: "WHITELIST", value: "STAKER", sub: "holders actively staking STONKS" },
  { icon: Timer, label: "SNAPSHOT", value: "LIVE", sub: "recalculated every block" },
  { icon: Sparkles, label: "STAKER BOOST", value: AIRDROP.stakersBoost, sub: "multiplier on your share" },
];

const STEPS = [
  {
    icon: Wallet,
    no: "1",
    t: "STAKE STONKS",
    d: "Lock your STONKS into the Staking Pool. The more you stake and the longer you hold, the bigger your airdrop allocation.",
  },
  {
    icon: Coins,
    no: "2",
    t: "CALCULATED AUTOMATICALLY",
    d: "The airdrop is computed automatically from the staking snapshot. No registration needed — if you are a staker, you are in.",
  },
  {
    icon: Rocket,
    no: "3",
    t: "CLAIM WHEN IT DROPS",
    d: "When the airdrop goes live, rewards are distributed directly to your staking wallet. Keep staking so you never miss out.",
  },
];

const FAQ = [
  {
    q: "WHO IS ELIGIBLE FOR THE AIRDROP?",
    a: "All STONKS holders actively staking in the staking pool. This airdrop is exclusively for STAKERS — no stake, no allocation.",
  },
  {
    q: "HOW IS THE AIRDROP CALCULATED?",
    a: "Your allocation is proportional to the total STONKS you have staked relative to the whole pool, and loyal stakers receive a 5x boost.",
  },
  {
    q: "DO I NEED TO REGISTER OR CLAIM MANUALLY?",
    a: "No. If your wallet is connected and you are staking, you are automatically included in the calculation. Just keep staking until the snapshot.",
  },
  {
    q: "WHEN DOES THE AIRDROP GO LIVE?",
    a: "The release date is announced through the official USDC STONKS Telegram and X channels. Stay tuned so you don't miss the drop.",
  },
];

export default function AirdropPage() {
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
            <Link href="/staking" className="px-heading text-[11px] text-white/90 hover:text-[#3ddad8] transition-colors">Staking</Link>
            <Link href="/airdrop" className="px-heading text-[11px] text-[#3ddad8] transition-colors">Airdrop</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/staking" className="px-btn bg-[#f06943] text-white px-4 py-2 text-[11px] inline-block hidden md:inline">
              Stake
            </Link>
            <ConnectWalletButton />
          </div>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <section className="relative overflow-hidden bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 flex flex-col items-center text-center">
          <p className="px-chip bg-[#2b0d3e] text-[#3ddad8] text-[10px] mb-6">
            ★ Made exclusively for stakers
          </p>
          <h1 className="px-heading text-white text-4xl md:text-6xl text-outline leading-tight">
            STAKER&nbsp;AIRDROP
          </h1>
          <p className="px-heading text-[#3ddad8] text-sm md:text-lg mt-4 text-outline">
            STAKE. HOLD. CLAIM THE DROP.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Link href="/staking" className="px-btn bg-[#3ddad8] text-[#20102e] px-6 py-3 text-[13px] inline-block">
              STAKE NOW
            </Link>
            <a href={TG} target="_blank" rel="noreferrer" className="px-btn bg-[#f06943] text-white px-6 py-3 text-[13px] inline-block">
              JOIN TELEGRAM
            </a>
          </div>
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

      {/* ---- AIRDROP POOL INFO ---- */}
      <section className="bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#3ddad8] text-[#20102e] px-4 py-2 text-[11px]">Pool</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              AIRDROP&nbsp;POOL
            </h2>
          </div>

          <Reveal>
            <div className="px-card bg-[#4a1768] p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="px-heading text-white/70 text-[11px]">TOTAL AIRDROP ALLOCATION</span>
                <span className="px-heading text-[#3ddad8] text-xl md:text-2xl break-all text-right">
                  {AIRDROP.totalPool} {AIRDROP.rewardToken}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap border-t-2 border-black pt-4">
                <span className="px-heading text-white/70 text-[11px]">ELIGIBILITY</span>
                <span className="px-heading text-white text-[12px] text-right">
                  Actively staking STONKS in the Staking Pool
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap border-t-2 border-black pt-4">
                <span className="px-heading text-white/70 text-[11px]">STAKER BOOST</span>
                <span className="px-heading text-[#f06943] text-lg">5x&nbsp;ALLOCATION</span>
              </div>
              <div className="text-[#c9b8d8] text-lg leading-relaxed">
                {AIRDROP.snapshotNote} The bigger your staking position in the pool,
                the larger the airdrop share you receive.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section className="bg-[#60e7e5] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#3c1154] text-white px-4 py-2 text-[11px]">Guide</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              HOW&nbsp;TO&nbsp;JOIN
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
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

      {/* ---- LEADERBOARD ---- */}
      <section className="bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#ffbe39] text-[#20102e] px-4 py-2 text-[11px]">Rank</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              STAKER&nbsp;LEADERBOARD
            </h2>
            <p className="text-[#c9b8d8] text-lg mt-4 mx-auto max-w-xl">
              Top stakers by staked position. Climb the ranks — the bigger your stake, the bigger your airdrop cut.
            </p>
          </div>

          <Reveal>
            <Leaderboard />
          </Reveal>
        </div>
      </section>

      {/* ---- WHY STAKE ---- */}
      <section className="bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#f06943] text-white px-4 py-2 text-[11px]">Benefits</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              WHY&nbsp;STAKE?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Coins, t: "STAKING REWARDS", d: "Earn yield every block from the staking pool." },
              { icon: Gift, t: "AIRDROP ALLOCATION", d: "Stakers get exclusive airdrop allocation plus a 5x boost." },
              { icon: ShieldCheck, t: "NON-CUSTODIAL", d: "Your tokens stay under your control. Unstake anytime." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="px-card-cyan text-[#20102e] p-5 flex flex-col items-center text-center h-full">
                  <s.icon className="h-7 w-7 mb-3" strokeWidth={2} />
                  <div className="px-heading text-[#3c1154] text-[12px] mb-2">{s.t}</div>
                  <p className="text-[#20102e] text-lg">{s.d}</p>
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

      {/* ---- CTA ---- */}
      <section className="bg-[#3c1154] px-grid-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20 text-center">
          <Reveal>
            <div className="px-card-yellow px-6 py-8 md:px-10">
              <h3 className="px-heading text-[#20102e] text-[13px] mb-3">
                READY TO SECURE YOUR AIRDROP SHARE?
              </h3>
              <p className="text-[#20102e] text-xl mb-6">
                Head to the staking pool now, lock your STONKS, and get on the staker list.
              </p>
              <Link href="/staking" className="px-btn bg-white text-[#20102e] px-6 py-3 text-[13px] inline-block">
                STAKE STONKS NOW
              </Link>
            </div>
          </Reveal>
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
            <Link href="/" className="text-[#c9b8d8] text-lg hover:text-white">Home</Link>
            <Link href="/staking" className="text-[#c9b8d8] text-lg hover:text-white">Staking</Link>
            <Link href="/airdrop" className="text-[#3ddad8] text-lg">Airdrop</Link>
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
