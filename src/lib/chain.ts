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

// Wallet tujuan token pas user stake
export const RECIPIENT_WALLET =
  "0x7048a22587CfB9669362384af4e3E4AA76C1bC1E" as const;
