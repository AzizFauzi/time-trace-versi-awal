import React, { useState } from 'react';
import { Language } from '../utils/i18n';
import {
  HelpCircle,
  X,
  Compass,
  Calendar,
  MapPin,
  Camera,
  Heart,
  Flame,
  Coins,
  Trophy,
  Award,
  Sparkles,
  ShoppingBag,
  Car,
  Building2,
  Smartphone,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
} from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'forensics' | 'rules' | 'scoring'>('flow');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Time Trace" className="w-10 h-10 object-contain drop-shadow-md shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{lang === 'en' ? 'How to Play & Detective Guide' : 'Panduan Lengkap Cara Bermain'}</span>
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                {lang === 'en'
                  ? 'Master forensic visual deduction, city searching, and daily chances rules.'
                  : 'Kuasai teknik deduksi visual arsip masa lalu, pencarian kota, dan aturan 5 kesempatan harian.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title={lang === 'en' ? 'Close' : 'Tutup'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Interactive Navigation Tabs */}
        <div className="bg-slate-950/70 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'flow'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '1. Core Gameplay' : '1. Alur Permainan'}</span>
          </button>

          <button
            onClick={() => setActiveTab('forensics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'forensics'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '2. Forensics Year Guide' : '2. Petunjuk Forensik Tahun'}</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'rules'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{lang === 'en' ? '3. 100 Levels & 5 Chances' : '3. Aturan 100 Level & 5 Nyawa'}</span>
          </button>

          <button
            onClick={() => setActiveTab('scoring')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'scoring'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'en' ? '4. Scores & Chrono Shop' : '4. Skor & Toko Retro'}</span>
          </button>
        </div>

        {/* Tab 1: Core Gameplay Flow */}
        {activeTab === 'flow' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-indigo-400 block mb-1">
                {lang === 'en' ? '🎯 The Time Detective Objective:' : '🎯 Misi Utama Detektif Waktu:'}
              </strong>
              {lang === 'en'
                ? 'You are presented with authentic historical archival street photographs. Street names and specific location texts are obscured. Your mission is to deduce WHERE the scene took place and in WHAT YEAR the photograph was captured!'
                : 'Kamu dihadapkan pada foto arsip bersejarah masa lalu berkualitas tinggi. Plang nama jalan dan petunjuk lokasi utama disamarkan. Tugasmu adalah menganalisis dan mengungkap di mana LOKASI kota tersebut serta pada TAHUN BERAPA foto direkam!'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono font-bold text-xs flex items-center justify-center mb-3">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'en' ? 'Inspect Historical Photographs' : 'Analisis Foto Arsip Bersejarah'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'en'
                      ? 'Examine every detail of the archival photograph. Observe vehicle models, architectural styles, shop signs, clothing fashion, road infrastructure, and surrounding cultural clues.'
                      : 'Amati setiap detail foto arsip secara saksama. Perhatikan model kendaraan di jalan, gaya arsitektur gedung, plang toko, tren busana pejalan kaki, dan petunjuk budaya di sekitarnya.'}
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-slate-500 font-mono">
                  {lang === 'en' ? 'Tip: Pay attention to car models, building styles, and advertisements' : 'Tips: Perhatikan bentuk mobil, gaya bangunan, dan papan reklame'}
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center mb-3">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'en' ? 'Deduce the Year (Timeline)' : 'Tentukan Tahun pada Garis Waktu'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'en'
                      ? 'Slide the timeline control at the bottom right to choose the year (2007 to present). An exact year match yields a massive 5,000 pts Bullseye bonus!'
                      : 'Geser slider timeline di panel kanan bawah untuk memilih tahun (2007 hingga kini). Tebakan tahun yang tepat 100% memberikan bonus 5.000 pts Bullseye!'}
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-slate-500 font-mono">
                  {lang === 'en' ? 'Tip: Open the forensic guide button on the timeline' : 'Tips: Klik tombol Buku Petunjuk di atas slider'}
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-3">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'en' ? 'Search & Select Target City' : 'Cari & Pilih Nama Kota Target'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'en'
                      ? 'Type the city, country, or landmark name in the search bar to lock in your location deduction, or click directly on the interactive map.'
                      : 'Ketik nama kota, negara, atau wilayah pada kolom pencarian untuk menentukan deduksi lokasimu secara cepat dan presisi, atau klik langsung pada area peta.'}
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-slate-500 font-mono">
                  {lang === 'en' ? 'Tip: Type cities like "Jakarta", "Tokyo", or "Paris" for instant selection' : 'Tips: Ketik nama kota seperti "Jakarta", "Surabaya", "Tokyo" untuk memilih cepat'}
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-mono font-bold text-xs flex items-center justify-center mb-3">
                    04
                  </div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>{lang === 'en' ? 'Submit & Reveal Secrets' : 'Kirim Tebakan & Buka Arsip'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'en'
                      ? 'Press "Submit Guess" to see the true location, geodesic distance line, archival dossier notes, points breakdown, coins earned, and grade rank (S, A, B, C, D)!'
                      : 'Tekan "Kirim Tebakan" untuk melihat koordinat asli, garis jarak geodesik, dokumen sejarah rahasia, koin yang diraih, dan perolehan Rank (S, A, B, C, D)!'}
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-slate-500 font-mono">
                  {lang === 'en' ? 'Tip: Score ≥ 3,000 pts and close location to pass!' : 'Tips: Butuh skor ≥ 3.000 pts dan lokasi akurat untuk lulus'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Forensics Year Guide */}
        {activeTab === 'forensics' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
              💡 {lang === 'en'
                ? 'Historical photo archives range from 2007 through recent years. Use these three pillars of visual forensic clues:'
                : 'Arsip foto sejarah berada pada rentang tahun 2007 hingga era modern. Gunakan 3 pilar petunjuk forensik visual berikut:'}
            </div>

            {/* Pillar 1: Vehicles */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2 font-mono">
                <Car className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'VEHICLES & TRANSPORTATION CLUES' : 'PETUNJUK KENDARAAN & ANGKUTAN'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-amber-400 font-bold font-mono block mb-1">2007 – 2010</span>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'en'
                      ? 'Boxy early 2000s models. Classic box cabs, older halogen lights, analog taxi signs, and vintage license plate formats.'
                      : 'Bentuk mobil kotak khas 2000-an (Kijang Kapsul, Avanza Gen 1, taksi sedan Crown). Lampu mobil masih halogen kuning redup.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-cyan-400 font-bold font-mono block mb-1">2011 – 2014</span>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'en'
                      ? 'Aerodynamic sedans & early hybrids (Prius Gen 3). Transition from boxy vans to curvier crossover silhouettes.'
                      : 'Bodi mobil mulai aerodinamis (Innova Facelift, Honda Jazz GE8, Prius). Mulai terlihat stiker nomor darurat modern.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold font-mono block mb-1">2015 – 2020+</span>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'en'
                      ? 'LED daytime running lights (DRL), sharp angular grilles, ride-hailing stickers, and early electric vehicles.'
                      : 'Lampu LED DRL putih menyala terang di siang hari, grill tajam bersudut, dan helm/jaket ojek online modern.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2: Architecture & Construction */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2 font-mono">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'en' ? 'ARCHITECTURE, CRANES & BILLBOARDS' : 'PETUNJUK BANGUNAN & BILLBOARD'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    {lang === 'en' ? '🏗️ Under-Construction Landmarks' : '🏗️ Bangunan yang Masih Dibangun'}
                  </strong>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'en'
                      ? 'Look for cranes! In 2008 Times Square was paved for traffic; Burj Khalifa was unfinished scaffolding; Jakarta MRT at Bundaran HI was just drilling in 2014.'
                      : 'Perhatikan crane pembangunan! Times Square 2008 masih jalan aspal mobil; Burj Khalifa di Dubai masih kerangka derek; proyek MRT Bundaran HI Jakarta baru dimulai 2014.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    {lang === 'en' ? '🎬 Physical Store Brands & Ads' : '🎬 Toko Fisik & Papan Iklan Film'}
                  </strong>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'en'
                      ? 'Look for defunct retailers like Virgin Megastore, Blockbuster, or billboard ads for movie premieres that date the scene to an exact month!'
                      : 'Cari toko kaset/CD yang sudah tutup (Disc Tarra, Virgin Megastore), telepon koin umum, atau billboard promosi film bioskop legendaris!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Gadgets & Pop Culture */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2 font-mono">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'PHONES, GADGETS & FASHION' : 'PETUNJUK GADGET, HP & FESYEN'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    {lang === 'en' ? '📱 Mobile Phones in Hand' : '📱 Ponsel yang Dipegang Pejalan Kaki'}
                  </strong>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'en'
                      ? 'Flip phones and bulky keyboard devices (BlackBerry) are hallmarks of 2007–2010. Large bezelless glass smartphones appear in later years.'
                      : 'Ponsel lipat (flip phone) dan keypad QWERTY tebal (BlackBerry) adalah tanda mutlak era 2007–2011. Layar kaca penuh tanpa tombol fisik baru umum setelahnya.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    {lang === 'en' ? '👕 Clothing Styles & World Events' : '👕 Gaya Busana & Spanduk Acara Dunia'}
                  </strong>
                  <p className="text-slate-300 leading-snug">
                    {lang === 'en'
                      ? 'Baggy jeans, graphic tees, and banners for major global milestones (e.g. 2008 Beijing Olympics, 2010 South Africa World Cup).'
                      : 'Celana jeans baggy, kacamata hitam berbingkai tebal, serta spanduk perhelatan dunia (Olimpiade Beijing 2008, Piala Dunia Afrika Selatan 2010).'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: 100 Levels & 5 Chances Rules */}
        {activeTab === 'rules' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-3">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {lang === 'en' ? '5 Daily Chances System (5 Kesempatan Harian)' : 'Sistem 5 Kesempatan / Nyawa Harian'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Every day, each detective receives 5 daily chances (lives) to investigate and pass levels. Finding the correct city location protects your life and clears the level!'
                    : 'Setiap hari, setiap detektif dibekali 5 kesempatan harian (nyawa). Menemukan kota lokasi yang tepat akan menjaga nyawamu tetap aman dan meluluskan level!'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Rule 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white mb-0.5">
                    {lang === 'en' ? 'City Names Are Classified (Anti-Spoiler)' : 'Nama Kota Dirahasiakan (Anti-Spoiler)'}
                  </h5>
                  <p className="text-xs text-slate-400 leading-snug">
                    {lang === 'en'
                      ? 'In the 100 Levels campaign, unpassed cities are hidden as "Mystery City #X". City names and historic dossiers are only revealed after you score ≥ 3,000 pts and pass!'
                      : 'Pada pemilihan 100 level, kota yang belum kamu tebak berlabel "Kota Misteri #X". Nama kota asli hanya akan terbuka setelah kamu berhasil meraih skor ≥ 3.000 poin!'}
                  </p>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white mb-0.5">
                    {lang === 'en' ? 'Location Accuracy & Level Pass (≥ 3,000 Pts)' : 'Akurasi Lokasi & Syarat Lulus Level (≥ 3.000 Poin)'}
                  </h5>
                  <p className="text-xs text-slate-400 leading-snug">
                    {lang === 'en'
                      ? 'Finding the correct city/region (distance ≤ 750 km, score ≥ 3,000 pts) awards at least 1 Star ⭐ and immediately unlocks the next mystery case. A closer year deduction earns 2 to 3 full stars!'
                      : 'Menemukan kota/wilayah yang tepat (jarak ≤ 750 km, skor ≥ 3.000 poin) langsung meluluskan level (minimal 1 Bintang ⭐) dan membuka kasus berikutnya. Tebakan tahun yang semakin mendekati akan menambah bintang menjadi 2 hingga 3 bintang penuh!'}
                  </p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white mb-0.5">
                    {lang === 'en' ? 'Strict Scoring & Life Loss (Nyawa Berkurang 1)' : 'Sistem Penalti Nyawa Ketat (Nyawa Berkurang 1)'}
                  </h5>
                  <p className="text-xs text-slate-400 leading-snug">
                    {lang === 'en'
                      ? 'If you guess a completely wrong region/continent (> 750 km away) or your score is below 3,000 pts, you fail the attempt and lose 1 life (-1). If you lose all 5 lives (0/5), you must wait until midnight (00:00) when lives reset!'
                      : 'Jika tebakan meleset jauh (> 750 km dari kota target) atau total skor di bawah 3.000 poin, percobaanmu gagal dan nyawa berkurang 1 (-1). Bila seluruh 5 nyawa habis (0/5), kesempatan akan di-reset penuh kembali pada tengah malam (00:00)!'}
                  </p>
                </div>
              </div>

              {/* Rule 4 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white mb-0.5">
                    {lang === 'en' ? 'Daily Mystery Challenge (2x Coins)' : 'Tantangan Misteri Harian (2x Koin)'}
                  </h5>
                  <p className="text-xs text-slate-400 leading-snug">
                    {lang === 'en'
                      ? 'Every day features one synchronized worldwide challenge. Completing it awards Double Chrono Coins and safeguards your Daily Streak!'
                      : 'Setiap hari terdapat 1 arsip harian yang sama untuk seluruh pemain dunia. Menyelesaikannya memberikan bonus 2x Koin dan meningkatkan rekor Daily Streak!'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Scoring, Grades & Chrono Shop */}
        {activeTab === 'scoring' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Score Split Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-mono text-rose-400 uppercase font-bold flex items-center gap-1.5 mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'City Location Accuracy (Max 5,000 Pts)' : 'Akurasi Deduksi Kota (Maks 5.000 Pts)'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Deduce & select the target city. Exact city center (< 10 km): ~4,850–5,000 pts. Radius ~100 km: ~3,750 pts. Radius ~500 km: ~1,200 pts. Missed city (> 750 km): round fails. Distance ≥ 2,000 km: 0 pts.'
                    : 'Cari & pilih nama kota target. Tepat di pusat kota (< 10 km): ~4.850–5.000 pts. Radius ~100 km: ~3.750 pts. Radius ~500 km: ~1.200 pts. Meleset > 750 km: ronde gagal (salah kota). Jarak ≥ 2.000 km: 0 pts.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'Year Accuracy (Max 5,000 Pts)' : 'Akurasi Tahun Arsip (Maks 5.000 Pts)'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Exact year (Bullseye): 5,000 pts. 1 yr off: 3,500 pts. 2 yrs off: 2,000 pts. 3 yrs off: 1,000 pts. 4 yrs off: 400 pts. ≥ 5 yrs off: 0 pts.'
                    : 'Tepat 100% (Bullseye): 5.000 pts. Selisih 1 thn: 3.500 pts. Selisih 2 thn: 2.000 pts. Selisih 3 thn: 1.000 pts. Selisih 4 thn: 400 pts. Selisih ≥ 5 thn: 0 pts.'}
                </p>
              </div>
            </div>

            {/* Rank Table */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Detective Rank Grades & Stars' : 'Peringkat Ronde, Bintang & Hadiah Koin'}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <span className="text-lg font-black font-mono text-amber-400 block">👑 Rank S</span>
                  <span className="text-[11px] text-white font-bold block mt-0.5">≥ 9.000 pts</span>
                  <span className="text-[10px] text-amber-300/80 block mt-1">⭐⭐⭐ (+200 Koin)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-lg font-black font-mono text-emerald-400 block">🥇 Rank A</span>
                  <span className="text-[11px] text-white font-bold block mt-0.5">7.500–8.999</span>
                  <span className="text-[10px] text-emerald-300/80 block mt-1">⭐⭐⭐ (+100 Koin)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <span className="text-lg font-black font-mono text-blue-400 block">🥈 Rank B</span>
                  <span className="text-[11px] text-white font-bold block mt-0.5">5.500–7.499</span>
                  <span className="text-[10px] text-blue-300/80 block mt-1">⭐⭐ Lulus Mantap</span>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                  <span className="text-lg font-black font-mono text-indigo-400 block">🥉 Rank C</span>
                  <span className="text-[11px] text-white font-bold block mt-0.5">3.000–5.499</span>
                  <span className="text-[10px] text-indigo-300/80 block mt-1">⭐ Lulus Cukup</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-lg font-black font-mono text-slate-400 block">🔍 Rank D</span>
                  <span className="text-[11px] text-slate-300 font-bold block mt-0.5">&lt; 3.000 pts</span>
                  <span className="text-[10px] text-rose-400 block mt-1">❌ Gagal (-1 Nyawa)</span>
                </div>
              </div>
            </div>

            {/* Chrono Shop */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3.5">
              <ShoppingBag className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {lang === 'en' ? 'Chrono Shop: Retro Lenses, HUD Themes & Gadgets' : 'Toko Penjelajah: Lensa Retro, Tema HUD & Gadget'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Use earned Chrono Coins in the Passport & Shop to unlock visual gear: Retro Camera Lenses (VHS 90s CRT scanlines, Sepia 70s vintage film warmth), Map HUD Themes (Antique Maritime Gold Compass, Cyberpunk Neon), and Gadgets like the Time Shift Chronometer (scans archival anomalies & narrows target year)!'
                    : 'Gunakan Koin Penjelajah di menu Paspor & Toko untuk membuka perlengkapan: Lensa Kamera Retro (VHS 90-an efek scanlines TV tabung analog, Sepia 70-an warna album foto antik), Tema HUD Peta (Kompas Emas Maritim, Neon Cyberpunk), serta Gadget Kronometer Waktu (memindai anomali tahun arsip)!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400 font-mono">
            {lang === 'en' ? 'Time Trace • Archive Detective' : 'Time Trace • Detektif Arsip Masa Lalu'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md shadow-amber-500/20"
          >
            {lang === 'en' ? 'Ready to Investigate!' : 'Saya Siap Menyelidiki!'}
          </button>
        </div>
      </div>
    </div>
  );
};
