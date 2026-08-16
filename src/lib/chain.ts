// ARC Mainnet chain config (plain object, tanpa dependency)
export const ARC_CHAIN = {
  id: 5042,
  chainIdHex: "0x13b2",
  name: "ARC Mainnet",
  network: "arc-mainnet",
  nativeCurrency: {
    name: "ARC",
    symbol: "ARC",
    decimals: 18,
  },
  rpcUrls: ["https://arc-mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8"],
  blockExplorerUrls: ["https://arc.exploreme.pro"],
} as const;

export const ARC_RPC_URL =
  "https://arc-mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8";

// Token STONKS (ERC-20) di ARC
export const CONTRACT =
  "0xc5e49382e59f956763580a71e08df3b34e8603a3" as const;

// StakeVault contract — stake masuk ke vault, unstake narik balik,
// reward di-eksekusi manual oleh team (owner kirim langsung ke staker).
export const VAULT_CONTRACT =
  "0xa289cB8De15461D6ed20fe143DA52868b6375a4d" as string;
