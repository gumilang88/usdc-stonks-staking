import Image from "next/image";
import {
  Flame,
  Lock,
  ShieldCheck,
  Star,
  Wallet,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/Reveal";
import RoadmapTabs from "@/components/RoadmapTabs";

const CONTRACT = "0xc5e49382e59f956763580a71e08df3b34e8603a3";
const JUP = "https://radardex.pro/#" + CONTRACT;
const TG = "https://t.me/usdcstonkss";
const X = "https://x.com/usdc_stonks";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Staking", href: "/staking" },
  { label: "How to Buy", href: "#buy" },
];

const FEATURES = [
  {
    icon: Flame,
    title: "WHAT IS USDC STONK?",
    desc: "Nobody knows. Some say it's a stablecoin. Some say it's a stonk. Some say it's a financial accident that escaped from a laboratory and started posting memes on X. USDC STONK was born from a simple question: \"What if a stablecoin forgot it was supposed to be stable?\" The result was confusion. The confusion became a meme. The meme became a movement. And now you're here. Which means it's already too late.",
    badge: "NOBODY KNOWS",
  },
  {
    icon: Star,
    title: "HOW DOES IT WORK?",
    desc: "Nobody has successfully explained it. Experts tried. Charts tried. Even calculators tried. Every time someone attempts to understand USDC STONK, the price chart gains another brain cell and becomes harder to predict. The community follows three simple principles: Buy the confusion. Hold the confusion. Become the confusion. This is not financial advice. This is financial entertainment.",
    badge: "BUY. HOLD. CONFUSE.",
  },
  {
    icon: ShieldCheck,
    title: "WHY USDC STONK?",
    desc: "Because normal is boring. Because markets are irrational. Because memes are stronger than spreadsheets. Because somewhere between \"stable\" and \"stonks\" a beautiful disaster was created. USDC STONK is not here to make sense. USDC STONK is here to make history. Or make absolutely no sense at all. Both outcomes are acceptable.",
    badge: "BEAUTIFUL DISASTER",
  },
];

const STEPS = [
  {
    no: "1",
    icon: Wallet,
    title: "Get Metamask Wallet",
    desc: "Download Metamask wallet app on your device to store and swap USDC.",
    links: [{ label: "Get Metamask", href: "https://metamask.io/" }],
  },
  {
    no: "2",
    icon: MousePointerClick,
    title: "Add USDC to Your Wallet",
    desc: "Purchase USDC from an exchange and send it to your wallet address, or use your wallet on-ramping feature if available.",
    links: [],
  },
  {
    no: "3",
    icon: TrendingUp,
    title: "Swap USDC for STONKS",
    desc: "Use your wallet swap interface to swap USDC for STONKS. You're in — welcome aboard.",
    links: [],
  },
];

export default function Home() {
  return (
    <main className="w-full">
      {/* ---- NAV ---- */}
      <header className="sticky top-0 z-50 bg-[#2b0d3e] border-b-4 border-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <span className="px-btn bg-[#3ddad8] px-3 py-2 text-[11px] text-[#20102e]">
              STONKS
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-heading text-[11px] text-white/90 hover:text-[#3ddad8] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#buy" className="hidden md:inline">
              <span className="px-btn bg-[#f06943] text-white px-4 py-2 text-[11px] inline-block">
                Join
              </span>
            </a>
            <a href={JUP} target="_blank" rel="noreferrer">
              <span className="px-btn bg-[#3ddad8] text-[#20102e] px-4 py-2 text-[11px] inline-block">
                Buy Now
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <section
        id="top"
        className="relative overflow-hidden bg-[#3c1154] border-b-4 border-black px-grid-bg"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20 flex flex-col items-center text-center">
          <p className="px-chip bg-[#2b0d3e] text-[#3ddad8] text-[10px] mb-6">
            ★ The Meme Token of the Pixel Age
          </p>
          <h1 className="px-heading text-white text-4xl md:text-6xl text-outline leading-tight">
            USDC&nbsp;STONKS
          </h1>
          <p className="px-heading text-[#3ddad8] text-sm md:text-lg mt-4 text-outline">
            THE FIRST AI MEME TOKEN ON ARC
          </p>

          <div className="px-float my-8">
            <Image
              src="/images/px/hero_char_stonks.png"
              alt="USDC STONKS Itself"
              width={350}
              height={400}
              className="mx-auto drop-shadow-[8px_8px_0_#000]"
              unoptimized
            />
          </div>

          {/* contract */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <span className="px-chip bg-[#2b0d3e] text-[#3ddad8] px-4 py-2 text-sm max-w-full break-all">
              {CONTRACT}
            </span>
            <CopyButton value={CONTRACT} />
          </div>

          {/* ctas */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={JUP} target="_blank" rel="noreferrer">
              <span className="px-btn bg-[#3ddad8] text-[#20102e] px-6 py-3 text-[13px] inline-block">
                BUY NOW
              </span>
            </a>
            <a href={TG} target="_blank" rel="noreferrer">
              <span className="px-btn bg-[#f06943] text-white px-6 py-3 text-[13px] inline-block">
                JOIN COMMUNITY
              </span>
            </a>
            <a href={JUP} target="_blank" rel="noreferrer">
              <span className="px-btn bg-white text-[#20102e] px-6 py-3 text-[13px] inline-block">
                CHART
              </span>
            </a>
          </div>

          <div className="mt-8 text-center">
            <p className="px-heading text-xs text-white mb-4">FOLLOW US!</p>
            <div className="flex items-center justify-center gap-4">
              {[
                { src: "/images/px/tele.png", href: TG, alt: "telegram" },
                { src: "/images/px/x.png", href: X, alt: "x" },
              ].map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-border bg-[#20102e] p-3 hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <Image src={s.src} alt={s.alt} width={40} height={40} className="h-10 w-10" unoptimized />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- WHAT'S USDC STONKS ---- */}
      <section id="about" className="bg-[#60e7e5] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#3c1154] text-white px-4 py-2 text-[11px]">About</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              WHAT&apos;S&nbsp;USDC&nbsp;STONKS?
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="px-card-white h-full flex flex-col p-6">
                  <div className="px-card-orange w-fit p-3">
                    <f.icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="px-heading text-[#3c1154] text-[13px] mt-4 leading-relaxed">
                    {f.title}
                  </h3>
                  <p className="text-[#20102e] text-lg mt-3 flex-1">{f.desc}</p>
                  <span className="px-chip bg-[#3ddad8] text-[#20102e] px-3 py-1 text-[10px] mt-4 w-fit">
                    {f.badge}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="px-card-yellow mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-6">
              <div>
                <h3 className="px-heading text-[#20102e] text-[13px]">
                  READY&nbsp;TO&nbsp;GET&nbsp;STARTED?
                </h3>
                <p className="text-[#20102e] text-lg mt-1">
                  Join thousands of holders who got in early. Back the team and buy STONKS now.
                </p>
              </div>
              <a href={JUP} target="_blank" rel="noreferrer">
                <span className="px-btn bg-white text-[#20102e] px-5 py-3 text-[12px] inline-block">
                  BUY USDC STONKS NOW
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- TOKEN DETAILS ---- */}
      <section id="details" className="bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#f06943] text-white px-4 py-2 text-[11px]">Details</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              TOKEN&nbsp;DETAILS
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3 mb-8">
            {[
              { icon: Lock, t: "Fixed Supply", d: "No runaway inflation." },
              { icon: Lock, t: "Liquidity Locked", d: "Pool locked for 30 years." },
              { icon: ShieldCheck, t: "No Mint Authority", d: "Supply can't be inflated." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <div className="px-card-cyan text-[#20102e] p-5 flex flex-col items-center text-center h-full">
                  <c.icon className="h-7 w-7 mb-3" strokeWidth={2} />
                  <div className="px-heading text-[12px]">{c.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- TOKENOMICS ---- */}
      <section id="tokenomics" className="bg-[#60e7e5] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#3c1154] text-white px-4 py-2 text-[11px]">Supply</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              TOKENOMICS
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start max-w-3xl mx-auto">
            <Reveal delay={100}>
              <div className="flex flex-col gap-5">
                <div className="px-card-cyan p-6">
                  <div className="px-heading text-[12px] text-[#20102e]">EVERY 24 HOURS - TOKEN BURNED</div>
                </div>
                <a
                  href="https://arc.exploreme.pro/address/0xC5e49382e59f956763580a71E08Df3b34e8603A3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="px-btn bg-white text-[#20102e] px-4 py-2 text-[12px] inline-block">
                    CHECK CURRENT SUPPLY
                  </span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="px-card-yellow p-6 h-full flex flex-col justify-center">
                <div className="px-heading text-[12px] text-[#20102e]">MAX SUPPLY</div>
                <div className="px-heading text-[#3c1154] text-2xl mt-2">1 BILLION</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- ROADMAP ---- */}
      <section id="roadmap" className="bg-[#3c1154] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#3ddad8] text-[#20102e] px-4 py-2 text-[11px]">Plan</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              ROADMAP
            </h2>
            <p className="text-[#e9e2ef] mt-4 text-xl mx-auto max-w-2xl">
              Four phases of pure pixel chaos. Tap a phase to see the checklist.
            </p>
          </div>
          <RoadmapTabs />
        </div>
      </section>

      {/* ---- HOW TO BUY ---- */}
      <section id="buy" className="bg-[#60e7e5] border-b-4 border-black px-grid-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="px-chip bg-[#20102e] text-white px-4 py-2 text-[11px]">Buy</span>
            <h2 className="px-heading text-white text-3xl md:text-5xl mt-4 text-outline">
              HOW&nbsp;TO&nbsp;BUY
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="px-card-white p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-chip bg-[#3c1154] text-white px-3 py-1 text-[12px]">{s.no}</span>
                    <s.icon className="h-6 w-6 text-[#f06943]" strokeWidth={2} />
                  </div>
                  <h3 className="px-heading text-[#3c1154] text-[13px] mb-3">{s.title}</h3>
                  <p className="text-[#20102e] text-lg flex-1">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        <span className="px-chip bg-black text-white px-3 py-1 text-[10px]">
                          {l.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>


        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="bg-[#3c1154] border-t-4 border-black">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="px-btn bg-[#3ddad8] px-3 py-2 text-[11px] text-[#20102e]">$STK</span>
              <span className="px-heading text-white text-[12px]">USDC STONKS</span>
            </a>
            <p className="mt-4 text-[#c9b8d8] text-lg">
              The First AI Meme Token on ARC. The official meme token of the pixel age.
            </p>

          </div>

          <div>
            <h3 className="px-heading text-white text-[11px] mb-4">NAVIGATION</h3>
            <nav className="flex flex-col gap-2">
              {NAV.slice(0, 5).map((n) => (
                <a key={n.href} href={n.href} className="text-[#c9b8d8] text-lg hover:text-white">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="px-heading text-white text-[11px] mb-4">CONNECT</h3>
            <nav className="flex flex-col gap-2">
              <a href={TG} target="_blank" rel="noreferrer" className="text-[#c9b8d8] text-lg hover:text-white">Telegram</a>
              <a href={X} target="_blank" rel="noreferrer" className="text-[#c9b8d8] text-lg hover:text-white">X / Twitter</a>
            </nav>
            <div className="mt-5 flex gap-3">
              {[
                { src: "/images/px/tele.png", href: TG },
                { src: "/images/px/x.png", href: X },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="px-border bg-[#20102e] p-2 hover:translate-x-1 hover:translate-y-1 transition-transform">
                  <Image src={s.src} alt="social" width={32} height={32} loading="eager" className="h-8 w-8" unoptimized />
                </a>
              ))}
            </div>
          </div>
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