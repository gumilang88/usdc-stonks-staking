# STAKE / UNSTAKE / CLAIM — APA YANG HARUS DISIAPIN

## Hasil analisis on-chain (udah gue cek langsung, bukan nebak)

1. Kontrak token `0xc5e49382e59f956763580a71e08df3b34e8603a3` di ARC (chain 5042) = **ERC-20 standar**.
   Fungsi yang ada: name, symbol, decimals, totalSupply, balanceOf, transfer,
   approve, transferFrom, allowance.
   **TIDAK ADA fungsi stake/unstake/claim** — token ini ga bisa di-stake secara
   native. Buat staking butuh KONTRAK STAKING TERPISAH.

2. RPC Infura lo (`arc-mainnet.infura.io/v3/b6bf7...`) kena **quota habis** pada
   `eth_call` (error "project ID exceeded quota"). blockNumber masih jalan, tapi
   baca kontrak (balanceOf dsb) + transaksi bakal ke-block.

3. Chain 5042 (ARC) di chainlist ga punya public RPC gratis — cuma Infura
   (berbayar) atau node sendiri.

---

## [A] RPC — PALING URGENT, ini ngeblokir semuanya

Lo butuh RPC yang beneran bisa jalan. Pilih salah satu:
- Upgrade Infura (bayar / naikin quota project ARC-mainnet lo), ATAU
- RPC berbayar lain buat ARC (Blockdaemon, QuickNode, Alchemy kalau support ARC), ATAU
- Node ARC sendiri (full node / archive).

Tanpa RPC yang layak → tombol Stake/Unstake/Claim di frontend cuma pajangan
(karena baca balance & kirim tx semuanya lewat RPC).

## [B] KONTRAK STAKING — wajib, belum ada

Token ERC-20 polos ga bisa stake. Harus deploy kontrak staking terpisah yang:
- `stake(uint256 amount)`        → tarik token user (lewat transferFrom setelah approve)
- `unstake(uint256 amount)`      → balikin token ke user
- `claimRewards()`                → kasih reward
- `getStaked(address)`            → baca jumlah user yang di-stake
- `getPendingRewards(address)`    → baca reward yang bisa di-claim
- `getApr()` / `getRewardRate()`  → baca APR

Kontrak ini yang megang token reward + logic perhitungan APR.

## [C] PARAMETER STAKING — angka yang lo tentuin

- APR berapa (placeholder UI sekarang 620%)
- Reward token: STONKS itu sendiri, atau token lain?
- Lock period: flexible / fixed?
- Minimum & maximum stake (kalau ada)
- Apakah ada early-unstake penalty?

## [D] ALOKASI REWARD (funding pool)

Kontrak staking butuh supply token reward yang di-funding. Tentukan:
- Total token buat reward berapa
- Durasi distribusi (misal 12 bulan)

## [E] FRONTEND (setelah A–D beres)

- ABI kontrak staking + address
- Baca balance user (butuh RPC [A])
- approve dulu sebelum stake
- Tombol stake/unstake/claim → kirim tx on-chain
- Tampil data live (total staked, APR, pending reward) dari kontrak

---

## URUTAN KERJA (rekomendasi gue)
1. Beresin RPC dulu [A] — ini yang paling menghalangi.
2. Tentukan parameter staking [C] + [D].
3. Gue bikinin + deploy kontrak staking [B].
4. Integrasi frontend [E].

**Jawab 3 ini, gue langsung gas:**
1. RPC penggantinya apa? (atau gue bantu cari alternatif)
2. Reward token & APR & lock period maunya apa?
3. Kontrak staking mau gue bikinin dari nol (Solidity) + bantu deploy?
