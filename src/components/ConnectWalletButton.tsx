"use client";

import { useEffect, useState, useCallback } from "react";
import { type Eip1193Provider } from "ethers";
import { ARC_CHAIN } from "@/lib/chain";

type EthereumProvider = Eip1193Provider & {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

function getProvider(): EthereumProvider | null {
  if (typeof window === "undefined") return null;
  // MetaMask / Rabby / wallet ter-inject sebagai window.ethereum
  const w = window as unknown as { ethereum?: EthereumProvider };
  return w.ethereum ?? null;
}

export default function ConnectWalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainOk, setChainOk] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const short = (a: string) =>
    a.length > 12 ? `${a.slice(0, 6)}...${a.slice(-4)}` : a;

  const syncState = useCallback(async () => {
    const p = getProvider();
    if (!p) return;
    try {
      const accounts = (await p.request({
        method: "eth_accounts",
      })) as string[];
      if (accounts.length) setAccount(accounts[0]);
      const chainId = (await p.request({
        method: "eth_chainId",
      })) as string;
      setChainOk(parseInt(chainId, 16) === ARC_CHAIN.id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    syncState();
    const p = getProvider();
    if (!p) return;
    const onAccounts = () => syncState();
    const onChain = () => syncState();
    try {
      p.request({ method: "eth_accounts" });
      // ethereum menyediakan event; cast longgar buat lint
      const ep = p as unknown as {
        on?: (e: string, cb: () => void) => void;
        removeListener?: (e: string, cb: () => void) => void;
      };
      ep.on?.("accountsChanged", onAccounts);
      ep.on?.("chainChanged", onChain);
      return () => {
        ep.removeListener?.("accountsChanged", onAccounts);
        ep.removeListener?.("chainChanged", onChain);
      };
    } catch {
      /* ignore */
    }
  }, [syncState]);

  const connect = async () => {
    const p = getProvider();
    if (!p) {
      alert(
        "Wallet tidak terdeteksi. Install MetaMask atau Rabby dulu, lalu refresh."
      );
      return;
    }
    setConnecting(true);
    try {
      // minta akun
      const accounts = (await p.request({
        method: "eth_requestAccounts",
      })) as string[];
      setAccount(accounts[0] ?? null);

      // pastikan chain ARC (5042). kalau belum, switch; kalau belum ada, add.
      try {
        await p.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ARC_CHAIN.chainIdHex }],
        });
      } catch (e) {
        const code = (e as { code?: number }).code;
        if (code === 4902) {
          await p.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: ARC_CHAIN.chainIdHex,
                chainName: ARC_CHAIN.name,
                nativeCurrency: ARC_CHAIN.nativeCurrency,
                rpcUrls: ARC_CHAIN.rpcUrls,
                blockExplorerUrls: ARC_CHAIN.blockExplorerUrls,
              },
            ],
          });
        } else {
          throw e;
        }
      }
      setChainOk(true);
    } catch (err) {
      console.error(err);
      alert("Gagal connect wallet: " + (err as Error).message);
    } finally {
      setConnecting(false);
    }
  };

  if (!account) {
    return (
      <button
        type="button"
        onClick={connect}
        disabled={connecting}
        className="px-btn bg-[#3ddad8] text-[#20102e] px-4 py-2 text-[11px] inline-block"
      >
        {connecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="max-w-[200px]">
      <div
        className="px-btn bg-[#3ddad8] text-[#20102e] px-3 py-2 text-[11px] inline-block max-w-full truncate"
        title={account}
      >
        {short(account)}
      </div>
      {!chainOk && (
        <div className="px-chip bg-[#f06943] text-white px-2 py-1 text-[9px] mt-1">
          Switch to ARC
        </div>
      )}
    </div>
  );
}
