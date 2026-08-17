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

// Token STONKS (ERC-20) on ARC
export const CONTRACT =
  "0xc5e49382e59f956763580a71e08df3b34e8603a3" as const;

// StakeVault contract — stake into vault, unstake to withdraw back,
// rewards executed manually by the team (owner sends directly to stakers).
// Fee: stake 0.1 USDC native, unstake 0.05 USDC native.
export const VAULT_CONTRACT =
  "0x6415A41a735669b87Df97a9C731f83CE86B0aaC2" as string;

export const STAKE_FEE_USDC = "0.1";
export const UNSTAKE_FEE_USDC = "0.05";
