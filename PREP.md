# STAKING — PERSIAPAN AGAR BENERAN JALAN

Page staking (UI) udah jadi di `/staking`. Buat staking beneran FUNGSIONAL
(bukan cuma tampilan), ini yang harus disiapkan. Gue breakdown jadi 2 bagian:
[1] yang WAJIB ada di on-chain, [2] yang WAJIB di frontend.

---

## [1] ON-CHAIN (smart contract) — WAJIB, tanpa ini staking cuma pajangan

### 1.1. Tentukan CHAIN (belum jelas — perlu konfirmasi)
- `layout.tsx` meta nulis "on Solana".
- Tapi kontrak token di `page.tsx` = `0xc5e49382e59f956763580a71e08df3b34e8603a3`
  (format alamat EVM, 42 hex chars) → ini indikasi rantai EVM (ARC?).
- Staking di Solana pakai program Rust/Anchor + wallet Phantom.
- Staking di EVM (ARC/etc) pakai Solidity + wallet Metamask/RainbowKit.
→ KONFIRMASI DULU: chain mana?

### 1.2. Kontrak staking (di chain yang dipilih)
Fungsi minimal yang harus ada:
- `stake(uint256 amount)`      — lock token user
- `unstake(uint256 amount)`    — tarik token kembali
- `claimRewards()`             — tarik reward
- `getRewardRate()` / `getApr()` — baca APR saat ini
- `getStakedAmount(address)`   — baca saldo user yang di-stake
- `getPendingRewards(address)` — baca reward yang belum di-claim
- `emergencyWithdraw()`        — (opsional) keluarin token kalau darurat

Belum ada kontrak → gue bisa bikin dari nol (Solidity buat EVM, atau
Anchor/Rust buat Solana). Tinggal bilang chain-nya + rules staking.

### 1.3. Alokasi reward (funding pool)
Kontrak staking butuh supply token reward yang di-funding ke dalam kontrak.
Kalau reward token = STONKS itu sendiri, perlu alokasi STONKS buat reward.
Tentukan:
- Total token reward yang dialokasikan berapa.
- Durasi distribusi (misal 12 bulan).
- Kesimpulan: ini nentuin APR sebenarnya.

### 1.4. Parameter staking — tentukan angka-angkanya
- **APR/APY target**: berapa %? (placeholder sekarang "69%")
- **Lock period**: flexible / fixed (7/30/90 hari)?
- **Early unstake penalty**: ada ga?
- **Reward token**: STONKS itu sendiri, atau token lain?
- **Minimum stake**: ada batas minimum buat stake?

### 1.5. Deploy + audit
- Deploy kontrak ke chain target → dapet address kontrak staking.
- (Opsional tapi disarankan) audit buat trust holder.

---

## [2] FRONTEND (integrasi wallet + kontrak) — WAJIB buat tombol jalan

### 2.1. Wallet connection
Sekarang UI stake/unstake/claim cuma tombol mati (belum nyambung).
Perlu integrasi:
- EVM: `wagmi` + `viem` + `@rainbowkit` (Metamask, WalletConnect, dll).
- Solana: `@solana/wallet-adapter` + `@solana/web3.js` (Phantom, dll).

### 2.2. ABI kontrak + address
- Simpan ABI staking + token.
- Simpan address kontrak staking + token.

### 2.3. RPC endpoint
- EVM: RPC node buat chain (ARC/other).
- Solana: default mainnet RPC atau QuickNode/Helius.

### 2.4. Baca data live (ngganti placeholder statis)
- Total staked → baca dari kontrak.
- APR → baca dari kontrak.
- Saldo user → baca dari wallet + kontrak.
- Reward pending → baca dari kontrak.

### 2.5. Interaksi transaksi
- `approve` token dulu, baru `stake`.
- `unstake`, `claim` kirim tx on-chain.
- Loading state + feedback sukses/gagal.

---

## [3] DEPLOY
- Build & deploy `usdc-stonks-staking` (folder copy ini) ke Cloudflare Pages.
- Ini copy terpisah dari `usdc-stonks-cf` (asli), jadi aman di-eksekusi.

---

## RINGKASAN LANGKAH (urutan)
1. Konfirmasi chain (Solana vs EVM/ARC) ← PALING PENTING, menghalangi sisanya
2. Tentukan parameter staking (APR, lock, reward token, dll)
3. Bikin + deploy kontrak staking
4. Integrasi wallet + ABI + RPC di frontend
5. Ganti placeholder statis dengan data live
6. Deploy final

**Yang gue butuh dari lo sekarang (jawab 3 ini, gue langsung gas):**
- Chain-nya apa? (Solana / EVM-ARC / lainnya)
- Kontrak staking udah ada belum? (kalau belum, gue bikinin)
- APR + lock period maunya berapa?
