import React, { useState } from 'react';
import { HistoricalPano } from '../data/challenges';
import { PlayerProgress, PlayerRank, getPlayerRank, DailyChances, MAX_DAILY_CHANCES } from '../utils/progress';
import { MINIMUM_PASS_SCORE } from '../utils/scoring';
import { Language, TRANSLATIONS } from '../utils/i18n';
import {
  Trophy,
  Star,
  Lock,
  Play,
  X,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Heart,
  AlertCircle,
  Clock,
  Crown,
} from 'lucide-react';

interface LevelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (levelNumber: number) => void;
  allChallenges: HistoricalPano[];
  progress: PlayerProgress;
  lang: Language;
  onResetProgress: () => void;
  dailyChances?: DailyChances;
  timeUntilTomorrow?: string;
  onOpenClaimGelar?: () => void;
}

export const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectLevel,
  allChallenges,
  progress,
  lang,
  onResetProgress,
  dailyChances = { remaining: MAX_DAILY_CHANCES, maxChances: MAX_DAILY_CHANCES, lastDate: '' },
  timeUntilTomorrow = '00:00:00',
  onOpenClaimGelar,
}) => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const is100Completed = Boolean(
    (progress.unlockedLevel >= 100 && (progress.levels[100]?.score ?? 0) >= MINIMUM_PASS_SCORE) ||
    Object.keys(progress.levels).length >= 100
  );

  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const rank: PlayerRank = getPlayerRank(progress.totalStars, lang);

  // Group challenges into 10 chapters of 10 levels each
  const totalChapters = 10;
  const levelsPerChapter = 10;
  const currentChapterChallenges = allChallenges.slice(
    activeChapter * levelsPerChapter,
    (activeChapter + 1) * levelsPerChapter
  );

  const chapterTitles: { id: string; en: string }[] = [
    { id: "Bab 1: Fajar Street View (Level 1-10)", en: "Chapter 1: Dawn of Street View (Level 1-10)" },
    { id: "Bab 2: Metropolis & Landmark Dunia (Level 11-20)", en: "Chapter 2: Global Metropolises (Level 11-20)" },
    { id: "Bab 3: Jejak Nusantara & Jawa Barat (Level 21-30)", en: "Chapter 3: Heart of Java (Level 21-30)" },
    { id: "Bab 4: Eksplorasi Bali, Lombok & Jawa (Level 31-40)", en: "Chapter 4: Bali & Islands (Level 31-40)" },
    { id: "Bab 5: Eropa Klasik & Mediterania (Level 41-50)", en: "Chapter 5: Classical Europe (Level 41-50)" },
    { id: "Bab 6: Pesisir Pasifik & Benua Amerika (Level 51-60)", en: "Chapter 6: Pan-American Trails (Level 51-60)" },
    { id: "Bab 7: Borneo, Celebes & Papua (Level 61-70)", en: "Chapter 7: Outer Archipelago (Level 61-70)" },
    { id: "Bab 8: Keajaiban Asia & Timur Tengah (Level 71-80)", en: "Chapter 8: Wonders of Asia (Level 71-80)" },
    { id: "Bab 9: Rekonstruksi & Transformasi (Level 81-90)", en: "Chapter 9: Transformations (Level 81-90)" },
    { id: "Bab 10: Grandmaster Finale (Level 91-100)", en: "Chapter 10: Grandmaster Finale (Level 91-100)" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Time Trace" className="w-10 h-10 object-contain drop-shadow-md shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{lang === 'en' ? 'Expedition Campaign: 100 Levels' : 'Petualangan 100 Level Waktu'}</span>
              </h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <span>{rank.badge}</span>
                  <span>{rank.title}</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong>{progress.totalStars}</strong> / 300 {lang === 'en' ? 'Stars' : 'Bintang'}
                </span>
                <span className="text-slate-500">•</span>
                <span className={`font-mono flex items-center gap-1 font-bold ${
                  dailyChances.remaining > 0 ? 'text-rose-400' : 'text-rose-500'
                }`}>
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <strong>{dailyChances.remaining}</strong>/{dailyChances.maxChances || MAX_DAILY_CHANCES} {lang === 'en' ? 'Chances' : 'Kesempatan'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 100 Cases Completion Celebratory Banner */}
        {is100Completed && onOpenClaimGelar && (
          <div className="px-5 py-2.5 bg-gradient-to-r from-amber-500/25 via-yellow-400/30 to-amber-500/25 border-b border-amber-400/60 flex items-center justify-between gap-3 text-xs shadow-md">
            <div className="flex items-center gap-2 text-amber-200 font-bold">
              <Crown className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
              <span>
                {lang === 'en'
                  ? 'All 100 Historical Case Files Solved! Your Supreme Detective Rank & Diploma is ready.'
                  : 'Seluruh 100 Kasus Sejarah Dunia Selesai! Gelar Resmi & Piagam Detektif Anda siap diklaim.'}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenClaimGelar();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs transition cursor-pointer shadow-md flex items-center gap-1.5 shrink-0 active:scale-95"
            >
              <Trophy className="w-3.5 h-3.5 text-slate-950" />
              <span>{lang === 'en' ? 'Claim Rank & Diploma' : 'Klaim Gelar & Piagam'}</span>
            </button>
          </div>
        )}

        {/* Chapter Tabs Ribbon */}
        <div className="bg-slate-950/60 px-4 py-2.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {Array.from({ length: totalChapters }).map((_, idx) => {
            const isCurrent = activeChapter === idx;
            const startLevel = idx * levelsPerChapter + 1;
            const endLevel = (idx + 1) * levelsPerChapter;
            const isChapterUnlocked = progress.unlockedLevel >= startLevel;

            return (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : isChapterUnlocked
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-900/60 text-slate-500 hover:bg-slate-800/60'
                }`}
              >
                {!isChapterUnlocked && <Lock className="w-3 h-3 text-slate-500" />}
                <span>
                  {lang === 'en' ? `Ch. ${idx + 1}` : `Bab ${idx + 1}`} ({startLevel}-{endLevel})
                </span>
              </button>
            );
          })}
        </div>

        {/* Daily Chances Status / Warning Banner */}
        {dailyChances.remaining === 0 ? (
          <div className="px-5 py-2.5 bg-rose-950/60 border-b border-rose-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <div className="flex items-center gap-2 text-rose-200 font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                {lang === 'en'
                  ? `All ${dailyChances.maxChances || MAX_DAILY_CHANCES} daily attempts used! You must wait until tomorrow to guess and unlock the next city.`
                  : `${dailyChances.maxChances || MAX_DAILY_CHANCES} Kesempatan menebak hari ini telah habis! Anda harus menunggu hari berikutnya untuk menebak lagi.`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-amber-300 font-bold shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>Reset: {timeUntilTomorrow}</span>
            </div>
          </div>
        ) : (
          <div className="px-5 py-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>
                {lang === 'en'
                  ? `You have ${dailyChances.remaining} of ${dailyChances.maxChances || MAX_DAILY_CHANCES} attempts left today to pass & unlock cities.`
                  : `Tersisa ${dailyChances.remaining} dari ${dailyChances.maxChances || MAX_DAILY_CHANCES} kesempatan hari ini untuk menebak & unlock kota.`}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {lang === 'en'
                ? `Pass with ≥ ${MINIMUM_PASS_SCORE.toLocaleString('en-US')} pts • Resets daily at midnight`
                : `Lulus skor ≥ ${MINIMUM_PASS_SCORE.toLocaleString('id-ID')} pts • Reset tengah malam`}
            </span>
          </div>
        )}

        {/* Levels Grid Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {currentChapterChallenges.map((challenge) => {
            const lvl = challenge.levelNumber || 1;
            const isUnlocked = lvl <= progress.unlockedLevel;
            const record = progress.levels[lvl];
            const isPassed = Boolean(record && record.score >= MINIMUM_PASS_SCORE);
            const stars = record ? record.stars : 0;
            const score = record ? record.score : null;
            // Can play if unlocked, and if not passed must have remaining chances > 0
            const canPlayThisLevel = isUnlocked && (isPassed || dailyChances.remaining > 0);

            return (
              <div
                key={challenge.id}
                className={`relative rounded-2xl p-3.5 border transition-all flex flex-col justify-between ${
                  !isUnlocked
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : isPassed
                    ? 'bg-slate-900 border-amber-500/40 shadow-md shadow-amber-500/5 hover:border-amber-400'
                    : dailyChances.remaining === 0
                    ? 'bg-slate-950/80 border-rose-900/50'
                    : 'bg-slate-900 border-slate-700 hover:border-slate-500 shadow-md'
                }`}
              >
                {/* Level Number & Lock / Star header */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-lg ${
                    isPassed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isUnlocked
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    LVL {lvl}
                  </span>

                  {isPassed ? (
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-3.5 h-3.5 ${
                            starIdx <= stars
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  ) : isUnlocked ? (
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30">
                      {lang === 'en' ? 'ACTIVE' : 'AKTIF'}
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>

                {/* City & Title - HIDE UNTIL PASSED TO AVOID SPOILERS */}
                <div className="mb-3">
                  <div className="text-xs font-bold line-clamp-1 flex items-center gap-1.5">
                    {isPassed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-white">{challenge.city}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({challenge.country[lang]})</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                        <span className="text-amber-200/90 font-mono">
                          {lang === 'en' ? `City #${lvl}` : `Kota #${lvl}`}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-[11px] line-clamp-2 mt-0.5 leading-snug">
                    {isPassed ? (
                      <span className="text-slate-300">{challenge.title[lang]}</span>
                    ) : (
                      <span className="text-slate-500 italic">
                        {lang === 'en'
                          ? 'Classified location • Guess & pass to reveal city name'
                          : 'Lokasi dirahasiakan • Tebak & lulus untuk membuka nama kota'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Score & Play Button */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-400">
                    {score !== null ? (
                      <span className="text-emerald-400 font-bold">
                        {score.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')} pts
                      </span>
                    ) : (
                      <span className={dailyChances.remaining === 0 && isUnlocked ? 'text-rose-400' : ''}>
                        {isUnlocked
                          ? dailyChances.remaining === 0
                            ? (lang === 'en' ? 'No chances' : 'Habis hari ini')
                            : (lang === 'en' ? 'Ready' : 'Belum lulus')
                          : (lang === 'en' ? 'Locked' : 'Terkunci')}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={!canPlayThisLevel}
                    onClick={() => {
                      onSelectLevel(lvl);
                      onClose();
                    }}
                    className={`p-1.5 rounded-xl transition cursor-pointer flex items-center justify-center ${
                      !isUnlocked
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : !canPlayThisLevel
                        ? 'bg-slate-800 text-rose-500/50 cursor-not-allowed border border-rose-500/20'
                        : isPassed
                        ? 'bg-emerald-600/80 hover:bg-emerald-500 text-white shadow-md'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95 shadow-md shadow-amber-500/20'
                    }`}
                    title={
                      !isUnlocked
                        ? (lang === 'en' ? 'Level Locked' : 'Level Terkunci')
                        : !canPlayThisLevel
                        ? (lang === 'en' ? 'No Chances Left Today (Wait until tomorrow)' : 'Kesempatan Hari Ini Habis (Tunggu besok)')
                        : (lang === 'en' ? `Play Level ${lvl}` : `Mulai Level ${lvl}`)
                    }
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer with Reset Option */}
        <div className="p-3.5 sm:p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Reset Progress' : 'Reset Progres Level'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-xl text-rose-300">
                <span>{lang === 'en' ? 'Confirm reset all progress?' : 'Yakin hapus semua bintang & progres?'}</span>
                <button
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="font-bold underline text-white hover:text-rose-200 cursor-pointer"
                >
                  {lang === 'en' ? 'Yes, Reset' : 'Ya, Hapus'}
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={activeChapter === 0}
              onClick={() => setActiveChapter((prev) => Math.max(0, prev - 1))}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition cursor-pointer"
              title={lang === 'en' ? 'Previous Chapter' : 'Bab Sebelumnya'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-2">
              {activeChapter + 1} / {totalChapters}
            </span>
            <button
              disabled={activeChapter === totalChapters - 1}
              onClick={() => setActiveChapter((prev) => Math.min(totalChapters - 1, prev + 1))}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition cursor-pointer"
              title={lang === 'en' ? 'Next Chapter' : 'Bab Berikutnya'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
