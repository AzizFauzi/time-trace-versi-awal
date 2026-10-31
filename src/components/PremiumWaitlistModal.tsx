import React, { useState, useEffect } from 'react';
import {
  X,
  Crown,
  Sparkles,
  CheckCircle2,
  Send,
  Globe2,
  Swords,
  History,
  MapPin,
  BarChart3,
  ShieldCheck,
  HeartHandshake,
  Check,
} from 'lucide-react';
import { Language } from '../utils/i18n';
import { soundManager } from '../utils/soundManager';

interface PremiumWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface FeatureVote {
  id: string;
  title: { id: string; en: string };
  desc: { id: string; en: string };
  badge: { id: string; en: string };
  icon: React.ReactNode;
}

export const PremiumWaitlistModal: React.FC<PremiumWaitlistModalProps> = ({
  isOpen,
  onClose,
  lang,
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

  const features: FeatureVote[] = [
    {
      id: 'cases_1000',
      title: {
        id: '1.000 Kasus Dunia & 250 Kasus Nusantara',
        en: '1,000 World Cases & 250 Archipelago Cases',
      },
      desc: {
        id: 'Ekspansi perjalanan 10x lipat melintasi 100 bab benua dunia dan arsip bersejarah nusantara terlengkap dari Sabang sampai Merauke.',
        en: '10x journey expansion spanning 100 global chapters and the most exhaustive Indonesian archival cases from Sabang to Merauke.',
      },
      badge: { id: 'UTAMA', en: 'CORE' },
      icon: <Globe2 className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'multiplayer',
      title: {
        id: 'Mode Duel Multiplayer (1v1 & Party Room)',
        en: 'Multiplayer Duel Mode (1v1 & Party Rooms)',
      },
      desc: {
        id: 'Buat ruang bermain bersama teman secara online, adu ketajaman deduksi tahun dan kecepatan menebak koordinat secara real-time.',
        en: 'Create private lobbies with friends online, battle in real-time chronological deduction and coordinate accuracy.',
      },
      badge: { id: 'KOMPETITIF', en: 'PVP' },
      icon: <Swords className="w-5 h-5 text-rose-400" />,
    },
    {
      id: 'before_after',
      title: {
        id: 'Slider "Sebelum vs Sekarang" (Before & After)',
        en: '"Before & After" Time-Travel Slider',
      },
      desc: {
        id: 'Bandingkan sudut pandang lokasi yang sama di tahun foto lama vs kondisi jalanan tahun sekarang secara interaktif.',
        en: 'Interactively slide between historical archival photography and contemporary modern Street View at the exact same coordinates.',
      },
      badge: { id: 'VISUAL', en: 'TIME-LAPSE' },
      icon: <History className="w-5 h-5 text-blue-400" />,
    },
    {
      id: 'custom_cases',
      title: {
        id: 'Pembuat Kasus Kustom & Berbagi Tautan',
        en: 'Custom Case Creator & Link Sharing',
      },
      desc: {
        id: 'Pilih titik lokasi mana pun di dunia di Google Street View, buat teka-teki misteri sendiri, dan bagikan tautannya ke komunitas.',
        en: 'Pick any Street View coordinate on Earth, craft your own custom case mystery, and share the challenge link with friends.',
      },
      badge: { id: 'KREASI', en: 'CREATOR' },
      icon: <MapPin className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'analytics',
      title: {
        id: 'Peta Panas Dunia (Heatmap) & Radar Akurasi',
        en: 'World Heatmap & Detective Accuracy Radar',
      },
      desc: {
        id: 'Analisis statistik mendalam kekuatan deduksi benua Anda, grafik akurasi per dekade, serta peta titik bumi yang pernah Anda kunjungi.',
        en: 'Deep analytical dashboard highlighting continent strengths, decade accuracy charts, and a personal global footprint heatmap.',
      },
      badge: { id: 'INSIGHT', en: 'STATS' },
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
    },
    {
      id: 'no_ads_infinite_lives',
      title: {
        id: '100% Bebas Iklan & Nyawa Harian Tak Terbatas',
        en: '100% Ad-Free & Unlimited Daily Lives',
      },
      desc: {
        id: 'Bermain sepuasnya tanpa gangguan jeda iklan dan tanpa khawatir kehabisan kesempatan nyawa harian.',
        en: 'Enjoy seamless gameplay without advertising interruptions and never worry about running out of daily lives.',
      },
      badge: { id: 'PREMIUM', en: 'PRO' },
      icon: <ShieldCheck className="w-5 h-5 text-amber-300" />,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

    // Save vote and contact to localStorage for admin inspection
    try {
      const existingEntries = JSON.parse(
        localStorage.getItem('time_trace_premium_waitlist') || '[]'
      );
      const newEntry = {
        contact: contactInput.trim() || 'Anonymous User',
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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#090f1e] border-2 border-amber-400/80 rounded-3xl shadow-[0_10px_50px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden text-slate-100 ring-1 ring-white/10"
      >
        {/* TOP ACCENT STRIP */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

        {/* HEADER */}
        <div className="p-6 sm:p-7 pb-4 bg-gradient-to-b from-[#0e172e] to-[#090f1e] border-b border-slate-800/80 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span>TIME TRACE PRO • EARLY ACCESS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight leading-tight">
              {isEn
                ? 'Unlock 1,000 World Cases & Elite Detective Gears'
                : 'Buka 1.000 Kasus Dunia & Fitur Detektif Elit'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {isEn
                ? 'We are finalizing the ultimate Time Trace PRO expansion. Help us prioritize your favorite features and secure a 50% Early Detective launch discount!'
                : 'Kami sedang menyiapkan ekspansi terlengkap Time Trace PRO. Pilih fitur impian Anda di bawah dan dapatkan Diskon Peluncuran 50% saat rilis resmi!'}
            </p>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6 custom-scrollbar">
          {submitted ? (
            /* SUCCESS STATE */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-white font-serif">
                  {isEn ? 'You are on the Priority Waitlist!' : 'Anda Masuk Antrean Prioritas!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isEn
                    ? `Thank you for your feedback! You are Detective #${waitlistNumber} on the priority list. We will notify you with the 50% launch discount voucher.`
                    : `Terima kasih atas antusiasme Anda! Anda adalah Detektif #${waitlistNumber} di daftar antrean prioritas. Kami akan mengabari Anda bersama voucher promo diskon 50%.`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-mono max-w-sm mx-auto shadow-inner">
                <span>🎟️ VIP TICKET: #PRO-EXPEDITION-{waitlistNumber}</span>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
              >
                {isEn ? 'Back to Game' : 'Kembali ke Game'}
              </button>
            </div>
          ) : (
            /* FORM & FEATURE VOTING */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION: PILIH FITUR IMPIAN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 font-mono">
                    {isEn ? '1. Select Your Top Desired Features:' : '1. Pilih Fitur yang Paling Anda Inginkan:'}
                  </h4>
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
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
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
                            <span className="text-xs font-bold text-white leading-tight">
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

              {/* SECTION: EKSPEKTASI HARGA */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 font-mono">
                  {isEn ? '2. What price feels fair to you?' : '2. Berapa harga yang menurut Anda paling pantas?'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'one_time_29k', label: 'Rp 29.000 (Sekali Beli Selamanya)', sub: isEn ? 'Lifetime Pass' : 'Beli Putus' },
                    { id: 'sub_15k', label: 'Rp 15.000 / Bulan', sub: isEn ? 'Monthly Sub' : 'Langganan' },
                    { id: 'free_with_ads', label: isEn ? 'Free (Keep Ads)' : 'Tetap Gratis Saja (Ada Iklan)', sub: isEn ? 'Ad-supported' : 'Didukung Iklan' },
                  ].map((p) => (
                    <label
                      key={p.id}
                      onClick={() => {
                        try { soundManager.playTick(); } catch (_) {}
                        setPreferredPrice(p.id);
                      }}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex flex-col justify-between transition ${
                        preferredPrice === p.id
                          ? 'bg-amber-400/15 border-amber-400 text-amber-200'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-bold">{p.label}</span>
                      <span className="text-[10px] opacity-75 font-mono">{p.sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SECTION: INPUT KONTAK */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 font-mono">
                  {isEn ? '3. Email / WhatsApp (Optional for 50% Promo Voucher):' : '3. Email atau WhatsApp (Untuk Dapat Kupon Diskon 50%):'}
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder={isEn ? 'your.email@example.com or WhatsApp number...' : 'email@anda.com atau no. WhatsApp...'}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition active:scale-98 shrink-0"
                  >
                    <Send className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Submit & Join Waitlist' : 'Kirim & Masuk Antrean'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-normal">
                  🔒 {isEn ? 'We respect your privacy. No spam guaranteed.' : 'Data Anda aman dan tidak akan dikirimkan spam.'}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
