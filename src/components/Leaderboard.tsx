"use client";

import { useEffect, useState } from "react";
import { Trophy, Crown, User } from "lucide-react";

// Ranked staker list (order as specified). Addresses with stakes under 10k
// are excluded from the leaderboard.
const STAKERS = [
  "0xE935c6E46706361410Ae246902811fEc48238C5d",
  "0xb5a84bfd780645d7341b77302f608ecb7b49f99f",
  "0x327e2a0d83dcd4cbad89b35cf9f768eec81687a8",
  "0x25c118e4818bed82d24601e34c71d8675c5061bf",
  "0x2436B8A21c109D584c7d49690b92AdbAc44490c8",
  "0x18d20f1FEd31A1EA3A40437141DdB919f23665BA",
];

const SHORT = (a: string) => (a.length > 10 ? a.slice(0, 6) + "..." + a.slice(-4) : a);

export default function Leaderboard() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      ethereum?: {
        request: (a: { method: string }) => Promise<string[]>;
        on?: (e: string, cb: () => void) => void;
        removeListener?: (e: string, cb: () => void) => void;
      };
    };
    const load = async () => {
      try {
        const accounts = (await w.ethereum?.request({ method: "eth_accounts" })) ?? [];
        if (accounts.length) setAccount(accounts[0]);
      } catch {
        /* ignore */
      }
    };
    load();
    w.ethereum?.on?.("accountsChanged", load);
    return () => w.ethereum?.removeListener?.("accountsChanged", load);
  }, []);

  const accLow = account?.toLowerCase();
  const rows = STAKERS;

  return (
    <div className="px-card bg-[#4a1768] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-5 w-5 text-[#ffbe39]" />
        <h3 className="px-heading text-white text-[14px]">TOP STAKERS</h3>
        <span className="px-chip bg-[#3ddad8] text-[#20102e] px-2 py-0.5 text-[9px]">ON-CHAIN</span>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((a, i) => {
          const isConnected = accLow && a.toLowerCase() === accLow;
          return (
            <div
              key={a + i}
              className={`flex items-center gap-3 px-3 py-2 border-2 border-black ${
                isConnected ? "bg-[#3ddad8] text-[#20102e]" : "bg-[#2a1440]"
              }`}
            >
              <div className="w-7 shrink-0 text-center">
                {!isConnected && i === 0 ? (
                  <Crown className="h-5 w-5 mx-auto text-[#ffbe39]" strokeWidth={2} />
                ) : !isConnected && (
                  <span className={`px-heading text-[11px] ${isConnected ? "text-[#20102e]" : "text-white/60"}`}>
                    #{i + 1}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <User className="h-4 w-4 shrink-0 opacity-70" strokeWidth={2} />
                <span className={`px-heading text-[11px] truncate ${isConnected ? "text-[#20102e]" : "text-white"}`}>
                  {SHORT(a)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[#c9b8d8] text-sm mt-4">
        Ranked by staked position in the pool. Top stakers earn the biggest airdrop cut.
      </p>
    </div>
  );
}
