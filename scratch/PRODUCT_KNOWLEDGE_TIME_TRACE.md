# PRODUCT KNOWLEDGE & TECHNICAL SPECIFICATION
## "Time Trace: Street View Time Traveler"

---

## 1. EXECUTIVE SUMMARY & PRODUCT VISION
**Time Trace (Misteri Kronologis & Penjelajah Waktu)** adalah game web deduksi visual interaktif berbasis geografi dan sejarah (mirip gabungan antara *GeoGuessr* dan *TimeGuessr*). 

Pemain "dilempar" ke dalam arsip rekaman masa lalu **Google Street View 360°** (rentang tahun 2007 hingga 2024), lalu bertindak sebagai detektif forensik waktu untuk memecahkan dua misteri dalam setiap kasus:
1. **Menebak TAHUN rekaman arsip** (melalui visual timeline slider 2007–2024).
2. **Menebak LOKASI geografis rekaman** (dengan menancapkan pin koordinat di Google Maps interaktif).

---

## 2. INTI GAMEPLAY & MEKANISME DEDUKSI (CORE GAME LOOP)

```
[Mulai Ronde]
      │
      ▼
[Eksplorasi Panorama Street View 360°]
      │
      ├── Analisis Petunjuk Kendaraan (Model mobil, angkot lawas, taksi, plat nomor)
      ├── Analisis Arsitektur (Proyek LRT/MRT, gedung belum jadi, renovasi fasad)
      └── Analisis Budaya/Teknologi (Iklan billboard, HP lipat vs smartphone, tren busana)
      │
      ▼
[Pemain Menentukan Tebakan]
      ├── Geser Timeline Tahun (Misal: 2014)
      └── Pasang Pin di Peta Interaktif (Lat, Lng)
      │
      ▼
[Konfirmasi Tebakan & Perhitungan Skor]
      ├── Skor Lokasi (0 - 5.000 pts, Haversine Distance Formula)
      └── Skor Tahun (0 - 5.000 pts, Nilai Penalti per Tahun Selisih)
      │
      ▼
[Layar Hasil Forensik & Evaluasi]
      ├── Total Skor Ronde (Maksimal 10.000 pts)
      ├── Grade Nilai: S (≥9.000), A (≥7.500), B (≥5.500), C (≥3.000), D (<3.000)
      ├── Syarat Lolos (Minimum Pass Score): ≥ 3.000 pts
      │     ├── Lolos: Membuka level berikutnya + Dapat Koin Chrono
      │     └── Gagal: Kehilangan 1 Nyawa / Kesempatan Harian
      └── Lanjut ke Kasus Berikutnya
```

### 3 Kategori Petunjuk Forensik Visual:
1. **Otomotif & Kendaraan (Cars & Transports):** Generasi taksi (misal Blue Bird Toyota Limo 2014, Crown Comfort Jepang 2009), angkot klasik berstiker, model busway, ketiadaan mobil listrik.
2. **Arsitektur & Infrastruktur:** Pagar seng proyek konstruksi MRT Fase 1 Jakarta 2014, Marina Bay Sands tanpa perahu SkyPark 2009, gedung Scramble Square Shibuya belum ada, renovasi cagar budaya.
3. **Budaya & Budaya Populer (Culture, Tech & Fashion):** Iklan billboard produk/album/film lama, orang memegang ponsel lipat (*flip phone/keitai*) vs smartphone layar penuh, masker era pandemi, gerobak kuliner tradisional.

---

## 3. MODE PERMAINAN (GAME MODES)

Aplikasi memiliki 4 mode permainan yang terpisah:

### A. Petualangan 100 Kasus Dunia (Campaign Mode - 100 Levels)
* **Konten:** 100 kasus kota dan landmark bersejarah di seluruh dunia yang terbagi ke dalam 10 Bab (masing-masing 10 level):
  * Bab 1–2: Fajar Street View & Metropolis Dunia (New York 2008, Tokyo 2009, Paris, London).
  * Bab 3–4: Jejak Nusantara, Jawa & Bali.
  * Bab 5–6: Eropa Klasik & Benua Amerika.
  * Bab 7–8: Asia, Timur Tengah & Pasifik.
  * Bab 9–10: Grandmaster Finale & Kota-kota Transformasi.
* **Progresi:** Progresif level 1 s.d. 100 dengan Level Selector Modal untuk mengulang level yang sudah terbuka.

### B. Mode Khusus: Jelajah Indonesia (50 Kasus Nusantara)
* **Konten:** 50 kasus arsip sejarah terlengkap dari Sabang sampai Merauke (Aceh, Danau Toba, Jakarta, Bandung, Borobudur, Bromo, Toraja, Ambon, hingga Danau Sentani Papua).
* **Fitur Level Selector Khusus:** Pemain dapat melihat daftar 50 kasus dan bebas memilih level mana saja yang sudah pernah dibuka tanpa harus mengulang dari Kasus 1.
* **Peta Otomatis:** Peta tebakan langsung terpusat (*auto-center*) di kepulauan Indonesia.

### C. Teka-Teki Arsip Harian (Daily Archive Mystery)
* **Konten:** 1 kasus universal per hari menggunakan seed hash berbasis tanggal `YYYY-MM-DD` (semua pemain di seluruh dunia memainkan kasus yang sama setiap hari).
* **Reset:** Berganti otomatis setiap pukul 00:00 dengan countdown timer di dashboard.
* **Insentif:** Memberikan **2x Multiplier Bonus Koin** dan menjaga rentetan **Daily Streak (🔥)** hari berturut-turut.

### D. Ekspedisi Acak Regional (Quick Play - 5 Rounds)
* **Konten:** Maraton cepat 5 ronde acak sesuai benua/wilayah yang dipilih: Global, Indonesia, Asia, Eropa, atau Amerika.

---

## 4. SISTEM GAMIFIKASI & EKONOMI PEMAIN

1. **Sistem Energi / Kesempatan Harian (Daily Chances / Lives):**
   * Pemain memiliki kuota nyawa harian (standar: 3–5 kesempatan).
   * **Nyawa TIDAK berkurang jika pemain berhasil lolos (Skor ≥ 3.000 pts).**
   * Nyawa hanya berkurang 1 jika tebakan salah/skor buruk (< 3.000 pts).
   * Nyawa ter-reset penuh setiap pukul 00:00.
2. **Koin Chrono (Mata Uang Game):**
   * Didapat dari keberhasilan investigasi (Skor / 20 + Bonus Grade S/A + Bonus Tebakan Tahun Tepat + Bonus Harian).
3. **Toko Detektif (Chrono Gear Panel):**
   * **Filter Lensa Vintage:** Sepia 1970-an, VHS Retro 1990-an dengan scanline.
   * **Tema Peta Interaktif:** Midnight Navy, Cyberpunk Neon, Vintage Parchment Emas.
   * **Perk Time Shift (Alat Pemangkas Waktu):** Mempersempit slider tahun menjadi jendela ±2 tahun untuk mempermudah deduksi.
4. **Paspor Waktu & Rekam Karier (Time Passport):**
   * Mencatat riwayat semua investigasi, persentase akurasi, koleksi bintang, dan gelar pangkat detektif (mulai dari *Detektif Pemula* hingga *Grandmaster Penjelajah Waktu*).

---

## 5. SPESIFIKASI TEKNIS & ARSITEKTUR PERANGKAT LUNAK

* **Frontend:** React 19, TypeScript, Vite 8, TailwindCSS v4, Lucide React, Framer Motion (`motion`).
* **Penyedia Peta & Panorama:**
  * **Google Maps JavaScript API:**
    * `google.maps.StreetViewPanorama`: Penampil 360 derajat interaktif dengan multi-pass searching (Pass 0: Direct `panoId`, Pass 1-3: Google Collections, Pass 4: Outdoor Photospheres).
    * `google.maps.Map`: Peta interaktif untuk penancapan pin tebakan, perhitungan jarak Haversine, dan penggambaran garis lintasan polyline dari tebakan ke lokasi asli.
* **Mesin Cadangan Gambar (Archival Fallback Engine):**
  * Jika API Street View 3D gagal memuat di suatu daerah pedalaman atau koneksi offline, sistem secara otomatis beralih menampilkan aset foto arsip sejarah beresolusi tinggi tanpa merusak gameplay (*graceful degradation*).
* **Penyimpanan Data (Persistence):**
  * Client-side `localStorage` untuk menyimpan progres kampanye dunia, progres 50 kasus nusantara, histori tebakan, saldo koin, dan inventaris item.
* **Infrastruktur Hosting:**
  * Static Web App (Single Page Application). Dapat di-deploy di Cloudflare Pages, Vercel, atau Netlify dengan biaya server **Rp 0 (Gratis)**.

---

## 6. KENDALA BIAYA & STRUKTUR UNIT ECONOMICS

| Komponen Biaya | Biaya Satuan | Keterangan |
|---|---|---|
| **Hosting & Bandwidth** | **Rp 0 / bulan** | Menggunakan Cloudflare Pages (Gratis unlimited). |
| **Domain Kustom** | **Rp 150.000 - Rp 220.000 / tahun** | Domain `.com` atau `.id`. |
| **Google Maps Dynamic Street View** | **$14.00 per 1.000 requests** | ~$0.014 (~Rp 225) per ronde jika berbayar. |
| **Google Maps Dynamic Maps** | **$7.00 per 1.000 requests** | ~$0.007 (~Rp 110) per load peta. |
| **Kredit Gratis Google Cloud** | **$200 / bulan (Rp 3,2 Juta)** | **Gratis ~14.200 Street View loads per bulan.** |
| **Payment Gateway QRIS** | **0,7% per transaksi** | Tanpa biaya langganan bulanan (Midtrans/Tripay). |

### Tantangan Finansial:
* **Disparitas Iklan vs Biaya API:** CPM iklan di Indonesia (Adsterra / AdSense) hanya sekitar **$0.5 – $1.5 per 1.000 tayangan** (~Rp 15.000), sedangkan biaya resmi 1.000 Street View adalah **$14.00** (~Rp 225.000).
* **Kesimpulan:** Game ini **TIDAK BISA** hanya mengandalkan iklan banner konvensional jika sudah memiliki ribuan pemain aktif harian. Monetisasi **HARUS** ditopang oleh pembelian akun Premium (Lifetime Pass / Langganan) serta pembatasan kuota kasus harian untuk pemain gratis.

---

## 7. MODEL MONETISASI YANG DIRENCANAKAN

1. **Freemium Tier (Gratis):**
   * Jatah 4–5 kasus gratis per hari (cukup di dalam kuota gratis $200 Google).
   * Disertai iklan non-intrusif dan **Rewarded Video Ads** (nonton video 15 detik = dapat +2 kasus tambahan).
2. **Premium Tier (Berbayar / VIP Pass):**
   * **Beli Putus Sekali Bayar (Lifetime Pass):** Rp 29.000 – Rp 49.000 via QRIS.
   * **Keuntungan:** Akses 100% tanpa batas (*Unlimited Cases*), bebas iklan selamanya (*Ad-Free*), bebas memilih seluruh 50 kasus Indonesia dan 100 kasus dunia, serta lencana VIP di paspor.
