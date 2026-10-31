import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Crown,
  Sparkles,
  Check,
  X,
  Globe2,
  Swords,
  History,
  MapPin,
  BarChart3,
  ShieldCheck,
  Send,
  HelpCircle,
  Zap,
  Star,
  Flame,
  Award,
} from 'lucide-react';
import { Language } from '../utils/i18n';
import { soundManager } from '../utils/soundManager';
import logoImg from '../assets/logo.png';

interface PremiumUpgradePageProps {
  onBack: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

interface FeatureVote {
  id: string;
  title: { id: string; en: string };
  desc: { id: string; en: string };
  badge: { id: string; en: string };
  icon: React.ReactNode;
}

export const PremiumUpgradePage: React.FC<PremiumUpgradePageProps> = ({
  onBack,
  lang,
  setLang,
  isMuted,
  onToggleMute,
}) => {
  const isEn = lang === 'en';

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'cases_1000',
    'multiplayer',
    'before_after',
  ]);
  const [contactInput, setContactInput] = useState<string>('');
  const [preferredPrice, setPreferredPrice] = useState<string>('one_time_29k');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [waitlistNumber, setWaitlistNumber] = useState<number>(142);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const features: FeatureVote[] = [
    {
      id: 'cases_1000',
      title: {
        id: '1.000 Kasus Dunia & 250 Kasus Nusantara',
        en: '1,000 World Cases & 250 Archipelago Cases',
      },
      desc: {
        id: 'Ekspansi perjalanan 10x lipat melintasi 100 bab kota-kota bersejarah dunia serta 250 arsip terlengkap dari Sabang sampai Merauke.',
        en: '10x journey expansion across 100 global archival chapters and 250 exhaustive Indonesian heritage cases.',
      },
      badge: { id: 'KONTEN UTAMA', en: 'CORE CONTENT' },
      icon: <Globe2 className="w-6 h-6 text-amber-400" />,
    },
    {
      id: 'multiplayer',
      title: {
        id: 'Mode Duel Multiplayer (1v1 & Party Room)',
        en: 'Multiplayer Duel Mode (1v1 & Party Rooms)',
      },
      desc: {
        id: 'Ajak teman atau komunitas untuk bertanding secara real-time. Adu kecepatan dan ketajaman deduksi tahun dan koordinat.',
        en: 'Battle friends or world detectives in real-time. Test who deduces the epoch and coordinates quickest and closest.',
      },
      badge: { id: 'KOMPETITIF', en: 'REAL-TIME PVP' },
      icon: <Swords className="w-6 h-6 text-rose-400" />,
    },
    {
      id: 'before_after',
      title: {
        id: 'Slider "Sebelum vs Sekarang" (Before & After)',
        en: '"Before & After" Time-Travel Slider',
      },
      desc: {
        id: 'Fitur interaktif membandingkan sudut pandang foto arsip tahun lama dengan rekaman Street View kondisi tahun sekarang.',
        en: 'Interactive slider directly comparing historical vintage street imagery with today’s modern panorama.',
      },
      badge: { id: 'TIME-LAPSE', en: 'TIME-LAPSE' },
      icon: <History className="w-6 h-6 text-blue-400" />,
    },
    {
      id: 'custom_cases',
      title: {
        id: 'Pembuat Kasus Kustom & Berbagi Tautan',
        en: 'Custom Case Creator & Link Sharing',
      },
      desc: {
        id: 'Jelajahi peta Street View, tentukan lokasi misteri favorit Anda, dan bagikan tautan tantangan khusus ke teman Anda.',
        en: 'Browse any coordinate on Earth, craft your own custom time-trace riddle, and share challenge links with friends.',
      },
      badge: { id: 'KREASI', en: 'CREATOR' },
      icon: <MapPin className="w-6 h-6 text-emerald-400" />,
    },
    {
      id: 'analytics',
      title: {
        id: 'Peta Panas Dunia (Heatmap) & Radar Akurasi',
        en: 'World Heatmap & Detective Accuracy Radar',
      },
      desc: {
        id: 'Dasbor analitik mendalam tentang kekuatan deduksi benua, grafik akurasi tahun per dekade, dan jejak langkah eksplorasi Anda.',
        en: 'Deep forensic analytics tracking continent strengths, epoch deduction curves, and personal world exploration footprints.',
      },
      badge: { id: 'INSIGHT', en: 'ANALYTICS' },
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
    },
    {
      id: 'no_ads_infinite_lives',
      title: {
        id: '100% Bebas Iklan & Nyawa Harian Tak Terbatas',
        en: '100% Ad-Free & Unlimited Daily Lives',
      },
      desc: {
        id: 'Pengalaman bermain murni tanpa jeda iklan, tanpa banner mengganggu, dan tanpa batasan nyawa harian.',
        en: 'Enjoy pure, uninterrupted exploration without ad breaks or limits on daily mystery lives.',
      },
      badge: { id: 'PREMIUM', en: 'UNLIMITED' },
      icon: <ShieldCheck className="w-6 h-6 text-amber-300" />,
    },
  ];

  const faqs = [
    {
      q: {
        id: 'Kapan Time Trace PRO akan resmi diluncurkan?',
        en: 'When will Time Trace PRO officially launch?',
      },
      a: {
        id: 'Kami sedang merampungkan kurasi 1.000 kasus arsip dunia dan mode duel multiplayer. Peluncuran ditargetkan segera! Pengguna di daftar antrean ini akan mendapatkan undangan khusus gelombang pertama.',
        en: 'We are completing the curation of 1,000 world archival cases and the multiplayer engine. Launch is coming soon, and waitlist detectives will receive priority Wave 1 invites.',
      },
    },
    {
      q: {
        id: 'Apakah progres dan koin saya saat ini akan tetap tersimpan?',
        en: 'Will my current game progress and coins carry over?',
      },
      a: {
        id: 'Ya, 100%! Semua bintang level, koin penjelajah, pangkat detektif, dan stempel paspor Anda akan otomatis terhubung ke akun PRO Anda.',
        en: 'Yes, absolutely! All your stars, explorer coins, detective ranks, and passport stamps will seamlessly sync to your PRO profile.',
      },
    },
    {
      q: {
        id: 'Bagaimana cara mengklaim diskon 50% peluncuran?',
        en: 'How do I claim the 50% launch discount?',
      },
      a: {
        id: 'Cukup masukkan Email atau nomor WhatsApp Anda pada formulir di atas. Saat peluncuran resmi dibuka, kami akan mengirimkan kode voucher khusus diskon 50% langsung kepada Anda.',
        en: 'Simply submit your Email or WhatsApp number in the form above. When PRO launches, a 50% discount voucher code will be sent directly to you.',
      },
    },
    {
      q: {
        id: 'Metode pembayaran apa saja yang akan didukung?',
        en: 'Which payment methods will be supported?',
      },
      a: {
        id: 'Kami mendukung pembayaran lokal instan melalui QRIS, GoPay, OVO, ShopeePay, Virtual Account Bank (BCA, Mandiri, BRI), serta Kartu Kredit/Debit internasional.',
        en: 'We support instant local payment via QRIS, e-wallets, bank transfer, and international Credit/Debit cards.',
      },
    },
  ];

  const toggleFeature = (id: string) => {
    try {
      soundManager.playTick();
    } catch (_) {}
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      soundManager.playCorrect();
    } catch (_) {}

    try {
      const existingEntries = JSON.parse(
        localStorage.getItem('time_trace_premium_waitlist') || '[]'
      );
      const newEntry = {
        contact: contactInput.trim() || 'Anonymous Explorer',
        preferredPrice,
        selectedFeatures,
        timestamp: new Date().toISOString(),
      };
      existingEntries.push(newEntry);
      localStorage.setItem('time_trace_premium_waitlist', JSON.stringify(existingEntries));
      setWaitlistNumber(142 + existingEntries.length);
    } catch (_) {}

    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#060a14] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. TOP STICKY NAVIGATION BAR                              */}
      {/* ========================================================= */}
      <header className="h-16 px-4 sm:px-8 bg-[#090f1f]/95 backdrop-blur-md border-b border-amber-500/20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button
            onClick={() => {
              try { soundManager.playTick(); } catch (_) {}
              onBack();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-400 text-xs font-bold text-slate-200 hover:text-amber-300 transition cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>{isEn ? 'Back to Dashboard' : 'Kembali ke Beranda'}</span>
          </button>

          {/* Logo & Brand */}
          <div className="hidden sm:flex items-center gap-2.5">
            <img
              src={logoImg}
              alt="Time Trace"
              className="w-7 h-7 object-contain drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
            />
            <span className="text-base font-black tracking-tight flex items-center">
              <span className="text-white">Time</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Trace</span>
            </span>
            <span className="ml-1 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              PRO
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 shadow-sm">
            <button
              onClick={() => setLang('id')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                lang === 'id' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                lang === 'en' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SHOWCASE SECTION                                  */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0a1228] via-[#070d1e] to-[#060a14] pt-12 pb-16 sm:pb-20 border-b border-amber-500/20">
        {/* Glow Spheres Backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest shadow-md animate-pulse">
            <Crown className="w-4 h-4 fill-current text-amber-400" />
            <span>TIME TRACE PRO • EARLY ACCESS DETECTIVE PASS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] max-w-4xl mx-auto">
            {isEn ? (
              <>
                Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">1,000 World Cases</span> & Elite Detective Tools
              </>
            ) : (
              <>
                Buka <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">1.000 Kasus Dunia</span> & Fitur Detektif Elit
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {isEn
              ? 'Expand your chronological journey 10x with 1,000 world chapters, 250 Indonesian heritage archives, real-time 1v1 multiplayer duels, and interactive before & after time-lapse sliders.'
              : 'Ekspansi perjalanan waktu 10x lipat dengan 1.000 bab arsip dunia, 250 kasus nusantara terlengkap, mode duel multiplayer bersama teman, dan slider komparasi masa lalu vs masa kini.'}
          </p>

          {/* Value Pills Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center gap-1.5 shadow-sm">
              <Globe2 className="w-3.5 h-3.5" />
              <span>1.000 Kasus Dunia</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 shadow-sm">
              <span>🇮🇩</span>
              <span>250 Kasus Nusantara</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1.5 shadow-sm">
              <Swords className="w-3.5 h-3.5" />
              <span>Duel Multiplayer 1v1</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 flex items-center gap-1.5 shadow-sm">
              <History className="w-3.5 h-3.5" />
              <span>Slider Masa Lalu vs Kini</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Bebas Iklan</span>
            </span>
          </div>

          {/* Fast Scroll to Survey Button */}
          <div className="pt-4">
            <button
              onClick={() => {
                document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wider uppercase shadow-xl shadow-amber-500/30 transition active:scale-98 cursor-pointer ring-2 ring-amber-300/80"
            >
              {isEn ? 'Join Priority Waitlist (50% Off) ↓' : 'Daftar Antrean Prioritas (Diskon 50%) ↓'}
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FEATURE COMPARISON MATRIX (Free vs PRO)                */}
      {/* ========================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            {isEn ? 'Free Detective vs Time Trace PRO' : 'Perbandingan: Versi Gratis vs Time Trace PRO'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {isEn
              ? 'See all the expanded superpowers unlocked with PRO membership.'
              : 'Lihat seluruh keistimewaan dan kekuatan tambahan yang terbuka untuk Detektif PRO.'}
          </p>
        </div>

        {/* Table Card */}
        <div className="rounded-3xl border border-slate-800 bg-[#0a101f]/90 backdrop-blur-md overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0e162b]">
                  <th className="p-4 sm:p-5 font-bold text-slate-300">
                    {isEn ? 'Feature & Capability' : 'Fitur & Kemampuan'}
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-slate-400 w-36 sm:w-48 text-center">
                    {isEn ? 'Standard (Free)' : 'Standar (Gratis)'}
                  </th>
                  <th className="p-4 sm:p-5 font-black text-amber-300 w-44 sm:w-56 text-center bg-amber-400/10 border-x border-amber-400/30">
                    <div className="flex items-center justify-center gap-1.5">
                      <Crown className="w-4 h-4 fill-current text-amber-400" />
                      <span>TIME TRACE PRO</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {[
                  {
                    name: isEn ? 'World Campaign Cases' : 'Kasus Mode Utama Dunia',
                    free: '100 Kasus (10 Bab)',
                    pro: '1.000 Kasus (100 Bab)',
                    highlight: true,
                  },
                  {
                    name: isEn ? 'Explore Indonesia (Archipelago)' : 'Kasus Jelajah Nusantara',
                    free: '50 Kasus Sampel',
                    pro: '250 Kasus Lengkap Sabang-Merauke',
                    highlight: true,
                  },
                  {
                    name: isEn ? 'Real-time 1v1 Multiplayer Duels' : 'Mode Duel Multiplayer 1v1 & Party',
                    free: 'Terkunci',
                    pro: 'Bebas Host & Main Sepuasnya',
                    highlight: true,
                  },
                  {
                    name: isEn ? 'Before & After Time-Travel Slider' : 'Slider "Sebelum vs Sekarang"',
                    free: 'Terkunci',
                    pro: 'Akses Penuh Semua Lokasi',
                    highlight: true,
                  },
                  {
                    name: isEn ? 'Custom Case Maker & Link Sharing' : 'Pembuat Kasus Kustom & Bagikan Tautan',
                    free: 'Terkunci',
                    pro: 'Bebas Buat Teka-Teki Tanpa Batas',
                    highlight: false,
                  },
                  {
                    name: isEn ? 'World Heatmap & Forensic Radar' : 'Peta Panas Dunia & Radar Akurasi',
                    free: 'Statistik Dasar',
                    pro: 'Dasbor Analitik Lengkap',
                    highlight: false,
                  },
                  {
                    name: isEn ? 'Daily Mystery Lives' : 'Kesempatan Nyawa Harian',
                    free: '3 Nyawa / Hari',
                    pro: 'Nyawa Tanpa Batas (Unlimited)',
                    highlight: true,
                  },
                  {
                    name: isEn ? 'Advertising Experience' : 'Pengalaman Iklan',
                    free: 'Didukung Iklan',
                    pro: '100% Bebas Iklan',
                    highlight: true,
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition">
                    <td className="p-4 sm:p-5 font-medium text-slate-200">
                      {row.name}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-slate-400 font-mono text-xs">
                      {row.free}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-bold text-amber-300 font-mono text-xs bg-amber-400/5 border-x border-amber-400/20">
                      <div className="flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                        <span>{row.pro}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FEATURE CARDS DETAIL SHOWCASE                          */}
      {/* ========================================================= */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FITUR EKSKLUSIF PRO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            {isEn ? '6 Superpowers Designed for True Explorers' : '6 Kemampuan Unggulan untuk Penjelajah Sejati'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="p-6 rounded-3xl bg-[#0a101f]/90 border border-slate-800 hover:border-amber-400/60 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {isEn ? feat.badge.en : feat.badge.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-serif leading-snug">
                  {isEn ? feat.title.en : feat.title.id}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {isEn ? feat.desc.en : feat.desc.id}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-amber-400 font-bold">
                <span>✓ {isEn ? 'Included in PRO' : 'Tersedia di Paket PRO'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE SURVEY & WAITLIST SECTION                  */}
      {/* ========================================================= */}
      <section id="waitlist-form" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0f1933] via-[#0b1328] to-[#070d1e] border-2 border-amber-400/80 shadow-[0_10px_60px_rgba(245,158,11,0.2)] space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 fill-current" />
              <span>PENDATAAN ANTREAN DETEKTIF PRIORITAS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
              {isEn ? 'Help Us Build Your Dream Version' : 'Bantu Kami Menentukan Fitur Favorit Anda'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {isEn
                ? 'Select your priority features, share what price feels fair, and claim an exclusive 50% Early Detective launch discount.'
                : 'Pilih fitur yang paling Anda inginkan, tentukan harga yang dirasa adil, dan klaim kupon diskon peluncuran 50% eksklusif.'}
            </p>
          </div>

          {submitted ? (
            /* SUCCESS TICKET */
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25 animate-bounce">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-serif">
                  {isEn ? 'Welcome to Priority Waitlist!' : 'Selamat! Anda di Antrean Prioritas!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isEn
                    ? `Thank you for supporting Time Trace! You are Detective #${waitlistNumber}. We will notify you with the 50% discount voucher as soon as PRO opens.`
                    : `Terima kasih atas antusiasme Anda! Anda tercatat sebagai Detektif #${waitlistNumber} di daftar antrean prioritas. Kami akan mengabari Anda bersama kupon promo diskon 50%.`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 text-amber-300 text-xs font-mono max-w-md mx-auto shadow-inner space-y-1">
                <div className="font-bold text-sm">🎟️ VIP ACCESS PASS #PRO-{waitlistNumber}</div>
                <div className="text-[11px] opacity-80">Status: Diskon 50% Peluncuran Terkunci</div>
              </div>

              <button
                onClick={() => {
                  soundManager.playTick();
                  onBack();
                }}
                className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
              >
                {isEn ? 'Return to Dashboard' : 'Kembali ke Beranda'}
              </button>
            </div>
          ) : (
            /* SURVEY FORM */
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Step 1: Voting Fitur */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-bold">1</span>
                    <span>{isEn ? 'Vote Features You Want Most:' : 'Pilih Fitur yang Paling Anda Inginkan:'}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {selectedFeatures.length} {isEn ? 'selected' : 'dipilih'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat.id);
                    return (
                      <div
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400/90 shadow-md shadow-amber-500/10'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                              isSelected
                                ? 'bg-amber-400 border-amber-400 text-slate-950'
                                : 'border-slate-700 bg-slate-900'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                              {isEn ? feat.title.en : feat.title.id}
                            </span>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-900 text-amber-400 border border-amber-400/30 shrink-0">
                              {isEn ? feat.badge.en : feat.badge.id}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {isEn ? feat.desc.en : feat.desc.id}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Harga Paling Pantas */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-bold">2</span>
                  <span>{isEn ? 'What Price Feels Fair to You?' : 'Berapa Harga yang Menurut Anda Paling Pantas?'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'one_time_29k', label: 'Rp 29.000 (Sekali Beli Selamanya)', sub: isEn ? 'Lifetime Pass (Most Popular)' : 'Beli Putus Seumur Hidup' },
                    { id: 'sub_15k', label: 'Rp 15.000 / Bulan', sub: isEn ? 'Monthly Subscription' : 'Langganan Fleksibel' },
                    { id: 'free_with_ads', label: isEn ? 'Keep It 100% Free with Ads' : 'Tetap Gratis Saja (Didukung Iklan)', sub: isEn ? 'Ad-supported tier' : 'Tanpa bayar sama sekali' },
                  ].map((p) => (
                    <label
                      key={p.id}
                      onClick={() => {
                        try { soundManager.playTick(); } catch (_) {}
                        setPreferredPrice(p.id);
                      }}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer flex flex-col justify-between transition ${
                        preferredPrice === p.id
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-sm'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">{p.label}</span>
                      <span className="text-[10px] opacity-75 font-mono mt-1">{p.sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Input Kontak */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-bold">3</span>
                  <span>{isEn ? 'Claim 50% Launch Discount Voucher:' : 'Klaim Kupon Diskon 50% Saat Peluncuran:'}</span>
                </h3>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder={isEn ? 'Enter your Email or WhatsApp number...' : 'Masukkan Email atau no. WhatsApp Anda...'}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer transition active:scale-98 shrink-0"
                  >
                    <Send className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Submit & Lock 50% Off' : 'Kirim & Kunci Diskon 50%'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-normal">
                  🔒 {isEn ? 'We respect your privacy. No spam. You can unsubscribe anytime.' : 'Data Anda aman dan tidak akan dikirimkan spam. Digunakan hanya untuk notifikasi diskon rilis resmi.'}
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FAQ (FREQUENTLY ASKED QUESTIONS)                       */}
      {/* ========================================================= */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-black font-serif text-white tracking-tight">
            {isEn ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan'}
          </h2>
          <p className="text-xs text-slate-400">
            {isEn ? 'Everything you need to know about the PRO expansion.' : 'Segala hal yang perlu Anda ketahui tentang ekspansi Time Trace PRO.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#0a101f]/90 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-200 hover:text-amber-300 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{isEn ? faq.q.en : faq.q.id}</span>
                  </span>
                  <span className="text-base font-mono text-slate-400">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 font-sans">
                    {isEn ? faq.a.en : faq.a.id}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. BOTTOM FOOTER                                          */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#04070e] border-t border-slate-800/80 py-8 text-center text-xs text-slate-400 space-y-3">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-300">
          <img src={logoImg} alt="Time Trace" className="w-5 h-5 object-contain" />
          <span>Time Trace • Biro Krono-Kartografi Dunia</span>
        </div>
        <p className="text-[11px] text-slate-400">
          © 2026 Time Trace. {isEn ? 'All rights reserved.' : 'Hak cipta dilindungi.'}
        </p>
        <div>
          <button
            onClick={onBack}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
          >
            ← {isEn ? 'Back to Dashboard' : 'Kembali ke Beranda'}
          </button>
        </div>
      </footer>
    </div>
  );
};
