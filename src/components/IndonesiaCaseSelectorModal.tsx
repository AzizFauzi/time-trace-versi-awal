import React, { useState } from 'react';
import { HistoricalPano } from '../data/challenges';
import { IndonesiaProgress, DailyChances, MAX_DAILY_CHANCES } from '../utils/progress';
import { MINIMUM_PASS_SCORE } from '../utils/scoring';
import { Language, TRANSLATIONS } from '../utils/i18n';
import {
  Trophy,
  Star,
  Lock,
  Play,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Heart,
  Clock,
  Compass,
} from 'lucide-react';

interface IndonesiaCaseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (caseNumber: number) => void;
  allCases: HistoricalPano[];
  progress: IndonesiaProgress;
  lang: Language;
  dailyChances?: DailyChances;
  timeUntilTomorrow?: string;
}

export const IndonesiaCaseSelectorModal: React.FC<IndonesiaCaseSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectCase,
  allCases,
  progress,
  lang,
  dailyChances = { remaining: MAX_DAILY_CHANCES, maxChances: MAX_DAILY_CHANCES, lastDate: '' },
  timeUntilTomorrow = '00:00:00',
}) => {
  const [activeChapter, setActiveChapter] = useState<number>(0);

  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';

  const totalChapters = 5;
  const casesPerChapter = 10;
  const currentChapterCases = allCases.slice(
    activeChapter * casesPerChapter,
    (activeChapter + 1) * casesPerChapter
  );

  const chapterTitles: { id: string; en: string; subtitle: string }[] = [
    {
      id: "Wilayah 1: Jantung Jawa & Bali (Kasus 1-10)",
      en: "Region 1: Heart of Java & Bali (Cases 1-10)",
      subtitle: isEn ? "Heritage & classic historical archives (Cases 1-10)" : "Arsip sejarah pusaka & cagar budaya (Kasus 1-10)"
    },
    {
      id: "Wilayah 2: Nusa Tenggara & Sumatera (Kasus 11-20)",
      en: "Region 2: Lesser Sunda & Sumatra (Cases 11-20)",
      subtitle: isEn ? "Historic trails & ancient kingdoms (Cases 11-20)" : "Jalur sejarah pusaka keraton & pesisir (Kasus 11-20)"
    },
    {
      id: "Wilayah 3: Gerbang Barat & Jalur Kepulauan (Kasus 21-30)",
      en: "Region 3: Western Frontiers & Island Trails (Cases 21-30)",
      subtitle: isEn ? "Maritime waterways & frontier trails (Cases 21-30)" : "Jalur perairan maritim & tapal batas barat (Kasus 21-30)"
    },
    {
      id: "Wilayah 4: Zamrud Khatulistiwa & Tanah Borneo (Kasus 31-40)",
      en: "Region 4: Equator & Borneo Expedition (Cases 31-40)",
      subtitle: isEn ? "Equator rivers, coastal cities & island heritage (Cases 31-40)" : "Sungai purba, pesisir pulau & jalur khatulistiwa (Kasus 31-40)"
    },
    {
      id: "Wilayah 5: Sulawesi, Maluku & Mahakarya Timur (Kasus 41-50)",
      en: "Region 5: Celebes, Maluku & Eastern Wonders (Cases 41-50)",
      subtitle: isEn ? "Ancient fortresses & eastern frontiers (Cases 41-50)" : "Benteng bersejarah, teluk laut & gerbang timur (Kasus 41-50)"
    },
  ];

  const totalCompleted = Object.keys(progress.cases || {}).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-[#071311] to-[#040e0b] border border-emerald-500/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-emerald-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇮🇩</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{isEn ? 'Explore Indonesia: 50 Archipelago Cases' : 'Jelajah Indonesia: 50 Kasus Nusantara'}</span>
              </h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{progress.unlockedCase}/50 {isEn ? 'Cases Unlocked' : 'Kasus Terbuka'}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300 font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{progress.totalStars} {isEn ? 'Stars' : 'Bintang'}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-teal-300 font-mono">
                  {totalCompleted}/50 {isEn ? 'Solved' : 'Terpecahkan'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Lives Remaining Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                dailyChances.remaining > 0
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                  : 'bg-red-950/80 border-red-500 text-red-200 animate-pulse'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${dailyChances.remaining > 0 ? 'fill-rose-400 text-rose-400' : 'text-red-400'}`} />
              <span>
                {dailyChances.remaining}/{dailyChances.maxChances || MAX_DAILY_CHANCES}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Region / Chapter Navigation Tabs */}
        <div className="px-4 py-3 bg-[#081512] border-b border-emerald-950/60 flex items-center justify-between shrink-0 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveChapter((prev) => Math.max(0, prev - 1))}
            disabled={activeChapter === 0}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center flex-1 px-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              {isEn ? `Region ${activeChapter + 1} of ${totalChapters}` : `Wilayah ${activeChapter + 1} dari ${totalChapters}`}
            </span>
            <h3 className="text-sm font-bold text-white truncate">
              {chapterTitles[activeChapter]?.[isEn ? 'en' : 'id']}
            </h3>
            <span className="text-[11px] text-emerald-200/60 truncate block">
              {chapterTitles[activeChapter]?.subtitle}
            </span>
          </div>

          <button
            onClick={() => setActiveChapter((prev) => Math.min(totalChapters - 1, prev + 1))}
            disabled={activeChapter === totalChapters - 1}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition cursor-pointer shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Chapter Quick Dots */}
        <div className="flex justify-center gap-1.5 py-2 bg-[#050e0c] border-b border-emerald-950/40 shrink-0">
          {Array.from({ length: totalChapters }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveChapter(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === activeChapter ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Wilayah ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scrollable Cases Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentChapterCases.map((c) => {
              const caseNum = c.levelNumber || 1;
              const isUnlocked = caseNum <= progress.unlockedCase;
              const record = progress.cases[caseNum];
              const isPassed = record && record.score >= MINIMUM_PASS_SCORE;
              const stars = record ? record.stars : 0;

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    if (isUnlocked) {
                      onSelectCase(caseNum);
                      onClose();
                    }
                  }}
                  className={`relative rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-slate-900/90 hover:bg-[#0c241c] border-emerald-500/40 hover:border-emerald-400 shadow-lg hover:shadow-emerald-500/20 cursor-pointer active:scale-98'
                      : 'bg-slate-950/60 border-slate-800/80 opacity-55 cursor-not-allowed'
                  }`}
                >
                  {/* Top Line: Badge & Stars */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isPassed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isUnlocked
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isEn ? `CASE ${caseNum}` : `KASUS ${caseNum}`}
                      </span>
                      {isPassed && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{record.score.toLocaleString()} pts</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {isUnlocked ? (
                        [1, 2, 3].map((starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-3.5 h-3.5 ${
                              starIdx <= stars
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))
                      ) : (
                        <Lock className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  </div>

                  {/* Middle Line: Title & City - HIDE UNTIL PASSED TO AVOID SPOILERS */}
                  <div className="space-y-1 mb-3">
                    <h4 className="text-sm sm:text-base font-bold leading-snug line-clamp-1">
                      {isPassed ? (
                        <span className="text-white">{c.title[lang] || c.title.id}</span>
                      ) : (
                        <span className="text-amber-200/90 font-mono">
                          {isEn ? `Mystery Case #${caseNum}` : `Misteri Kasus #${caseNum}`}
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs">
                      {isPassed ? (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="text-slate-300 truncate font-semibold">{c.city}, Indonesia</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-amber-400 font-mono font-semibold shrink-0">
                            {c.targetYear}
                          </span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                          <span className="text-slate-400 font-mono">
                            {isEn ? `City #${caseNum}` : `Kota ke-${caseNum}`}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-500 italic text-[11px]">
                            {isEn ? 'Classified Location' : 'Lokasi Rahasia'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bottom Line: Clue Snippet or Locked message */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    {isUnlocked ? (
                      <>
                        <span className="text-[11px] text-slate-400 line-clamp-1 italic">
                          {isPassed
                            ? `🚗 ${c.hints.cars[lang] || c.hints.cars.id}`
                            : isEn
                            ? '🔍 Guess & pass to reveal city name & clues'
                            : '🔍 Tebak & lulus untuk membuka nama kota'}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 shrink-0 ml-2">
                          <Play className="w-3 h-3 fill-emerald-400" />
                          <span>{isPassed ? (isEn ? 'Replay' : 'Main Ulang') : (isEn ? 'Play' : 'Mulai')}</span>
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{isEn ? `Complete Case ${caseNum - 1} to unlock` : `Selesaikan Kasus ${caseNum - 1} untuk membuka`}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-emerald-950/80 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>
              {isEn
                ? 'Tip: You can replay any unlocked case anytime to improve your score & stars!'
                : 'Tip: Kamu bisa memainkan kembali kasus mana pun yang sudah terbuka kapan saja!'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
          >
            {isEn ? 'Close' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};
