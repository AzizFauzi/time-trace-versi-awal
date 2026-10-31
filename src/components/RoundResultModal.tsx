import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HistoricalPano } from '../data/challenges';
import { formatDistance, calculateHaversineDistanceKm, MINIMUM_PASS_SCORE } from '../utils/scoring';
import { POPULAR_CITIES } from '../utils/citiesDatabase';
import { Achievement, calculateGrade } from '../utils/gamification';
import {
  Trophy,
  Compass,
  Calendar,
  ArrowRight,
  Share2,
  Star,
  List,
  Coins,
  History,
  CheckCircle2,
  Heart,
  HeartCrack,
  ShieldCheck,
  MapPin,
  Target,
  ArrowLeft,
  BookOpen,
  FileText,
  Gem,
  Glasses,
  Crown,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface RoundResultModalProps {
  challenge: HistoricalPano;
  locationScore: number;
  yearScore: number;
  distanceKm: number;
  guessedYear: number;
  guessedLocation?: { lat: number; lng: number } | null;
  roundNumber: number;
  totalRounds: number;
  totalScore: number;
  onNextRound: () => void;
  isGameOver: boolean;
  onRestart: () => void;
  lang: Language;
  // Level / Campaign mode props
  gameMode?: 'campaign' | 'expedition' | 'daily' | 'indonesia';
  levelNumber?: number;
  starsEarned?: number;
  unlockedNextLevel?: boolean;
  onOpenLevelSelect?: () => void;
  onRetryLevel?: () => void;
  chancesRemaining?: number;
  maxChances?: number;
  lostLifeThisRound?: boolean;
  timeUntilTomorrow?: string;
  // Gamification props
  coinsEarned?: number;
  newAchievements?: Achievement[];
  grade?: 'S' | 'A' | 'B' | 'C' | 'D';
  onOpenPassport?: () => void;
  onOpenWaitlist?: () => void;
}

export const RoundResultModal: React.FC<RoundResultModalProps> = ({
  challenge,
  locationScore,
  yearScore,
  distanceKm,
  guessedYear,
  guessedLocation,
  roundNumber,
  totalRounds,
  totalScore,
  onNextRound,
  isGameOver,
  onRestart,
  lang,
  gameMode = 'expedition',
  levelNumber,
  starsEarned = 0,
  unlockedNextLevel = false,
  onOpenLevelSelect,
  onRetryLevel,
  chancesRemaining,
  maxChances = 5,
  lostLifeThisRound = false,
  timeUntilTomorrow = '00:00:00',
  coinsEarned = 0,
  newAchievements = [],
  grade: explicitGrade,
  onOpenPassport,
  onOpenWaitlist,
}) => {
  const t = TRANSLATIONS[lang];
  const roundTotalScore = locationScore + yearScore;
  const yearDiff = Math.abs(guessedYear - challenge.targetYear);
  const locale = lang === 'en' ? 'en-US' : 'id-ID';

  const formatCoord = (val: number, isLat: boolean) => {
    const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
    return `${Math.abs(val).toFixed(3)}° ${dir}`;
  };

  const guessedCoordsStr = guessedLocation
    ? `${formatCoord(guessedLocation.lat, true)}, ${formatCoord(guessedLocation.lng, false)}`
    : null;

  // Check if near target city
  const isNearTarget = distanceKm <= 50;

  // Nearest city from POPULAR_CITIES
  const nearestCity = guessedLocation
    ? POPULAR_CITIES.map((c) => ({
        city: c,
        dist: calculateHaversineDistanceKm(guessedLocation.lat, guessedLocation.lng, c.lat, c.lng),
      })).sort((a, b) => a.dist - b.dist)[0]
    : null;

  const locationGuessLabel = isNearTarget
    ? `${challenge.city} (${guessedCoordsStr || ''})`
    : nearestCity && nearestCity.dist <= 60
    ? `${nearestCity.city.name} (${guessedCoordsStr || ''})`
    : guessedCoordsStr
    ? `${guessedCoordsStr}`
    : (lang === 'en' ? 'Location Pin Placed' : 'Pin Lokasi Diletakkan');

  const roundGrade = explicitGrade || calculateGrade(roundTotalScore);
  const isLevelPassed = roundTotalScore >= MINIMUM_PASS_SCORE;

  useEffect(() => {
    // Confetti celebration if score is awesome (> 7000 or 3 stars or level passed)
    if (roundTotalScore >= 7000 || isGameOver || (gameMode === 'campaign' && isLevelPassed)) {
      confetti({
        particleCount: roundTotalScore >= 8000 ? 100 : 60,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899'],
      });
    }
  }, [roundTotalScore, isGameOver, gameMode, isLevelPassed]);

  const generateShareText = () => {
    return gameMode === 'campaign' && levelNumber
      ? lang === 'en'
        ? `🌟 Time Trace: I completed Level ${levelNumber} (${challenge.city}) with ${starsEarned} Stars (${roundTotalScore.toLocaleString('en-US')}/10,000 pts)!`
        : `🌟 Time Trace: Saya menyelesaikan Level ${levelNumber} (${challenge.city}) dengan ${starsEarned} Bintang (${roundTotalScore.toLocaleString('id-ID')}/10.000 pts)!`
      : t.shareTextTemplate(challenge.city, challenge.targetYear, roundTotalScore);
  };

  const handleSocialShare = (platform: 'whatsapp' | 'instagram' | 'x' | 'facebook') => {
    const text = generateShareText();
    const currentUrl = window.location.href;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + currentUrl)}`, '_blank');
    } else if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'instagram') {
      if (navigator.share) {
        navigator.share({ title: 'Time Trace', text, url: currentUrl }).catch(() => {});
      } else {
        navigator.clipboard.writeText(text + ' ' + currentUrl);
        alert(lang === 'en' ? 'Share text copied! Paste it in Instagram story.' : 'Teks dibagikan disalin ke clipboard! Buka Instagram untuk menempelkannya.');
      }
    }
  };

  // Default / fallback achievements shown in mockup
  const displayAchievements = newAchievements && newAchievements.length > 0
    ? newAchievements.map(a => ({
        id: a.id,
        icon: a.icon,
        title: a.title[lang],
        coins: a.rewardCoins
      }))
    : [
        { id: 'gps-human', icon: '👓', title: lang === 'en' ? 'Human GPS' : 'GPS Manusia', coins: 500 },
        { id: 'archive-collector', icon: '📖', title: lang === 'en' ? 'True Archive Collector' : 'Kolektor Arsip Sejati', coins: 800 },
        { id: 'time-points', icon: '💎', title: lang === 'en' ? 'Wealth of Time Points' : 'Kaya Poin Waktu', coins: 1000 },
      ];

  const polaroidImageSrc = challenge.city.toLowerCase().includes('singapore')
    ? '/assets/polaroid_singapore.jpg'
    : '/assets/default_polaroid.jpg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      {/* Main Modal Card with Gambar 3 Background Artwork */}
      <div 
        className="relative w-full max-w-[540px] my-auto rounded-[2.2rem] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-white overflow-hidden max-h-[94vh] flex flex-col"
        style={{
          backgroundImage: "url('/assets/result_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Vignette / Backdrop overlay to keep text ultra-sharp while showing vintage map & photos */}
        <div className="absolute inset-0 bg-slate-950/72 backdrop-blur-[1.5px] pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-36 bg-cyan-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Top-Right Quick Close / Back Button */}
        <button
          onClick={onRestart}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition cursor-pointer border border-cyan-500/30 z-30 flex items-center gap-1.5 text-xs font-bold shadow-md"
          title={lang === 'en' ? 'Back to Main Menu' : 'Kembali ke Menu Utama'}
        >
          <ArrowLeft className="w-4 h-4 text-slate-300" />
          <span className="hidden sm:inline">{lang === 'en' ? 'Back' : 'Kembali'}</span>
        </button>

        {/* Scrollable Content Area with custom sleek scrollbar */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 pr-3 sm:pr-4.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-cyan-500/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/50">
          {/* 1. Header: Logo & Level Tag */}
          <div className="text-center pt-1 mb-3">
            {/* Existing TimeTrace Logo */}
            <img 
              src="/logo.png" 
              alt="Time Trace" 
              className="h-20 sm:h-24 w-auto object-contain mx-auto drop-shadow-[0_0_22px_rgba(245,158,11,0.55)] transition hover:scale-105 duration-300" 
            />

            {/* Level Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950/80 border border-amber-500/50 text-[11px] font-mono font-bold text-amber-300 tracking-wider shadow-sm mt-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {gameMode === 'campaign' && levelNumber
                  ? lang === 'en'
                    ? `CAMPAIGN • LEVEL ${levelNumber} OF 100`
                    : `PETUALANGAN • LEVEL ${levelNumber} DARI 100`
                  : gameMode === 'indonesia' && levelNumber
                  ? lang === 'en'
                    ? `EXPLORE INDONESIA • CASE ${levelNumber} OF 50`
                    : `JELAJAH INDONESIA • KASUS ${levelNumber} DARI 50`
                  : isGameOver
                  ? t.gameOverHeader
                  : t.roundResultHeader(roundNumber, totalRounds)}
              </span>
            </div>

            {/* City, Country */}
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-wide mt-2 drop-shadow-md">
              {challenge.city}, {challenge.country[lang]}
            </h2>

            {/* Original Archive Date */}
            <p className="text-xs sm:text-sm font-serif font-bold text-amber-400 mt-0.5">
              {t.originalArchiveLabel} <span className="text-amber-300">{challenge.targetDateStr[lang]}</span>
            </p>

            {/* Stars Row */}
            <div className="flex items-center justify-center gap-2 mt-2">
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 ${
                    starIdx <= starsEarned
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_14px_rgba(251,191,36,0.9)] animate-pulse'
                      : 'text-slate-600/80 stroke-[1.5]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 2. Level Status Banner */}
          {isLevelPassed ? (
            <div className="relative mt-2 p-2.5 px-4 rounded-2xl bg-gradient-to-r from-teal-950/85 via-emerald-900/65 to-teal-950/85 border-2 border-teal-400/80 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(20,184,166,0.35)] overflow-hidden">
              <span className="text-amber-400 text-xs animate-ping absolute left-3 top-2 pointer-events-none">✦</span>
              <span className="text-teal-300 text-xs animate-pulse absolute right-3 bottom-2 pointer-events-none">✦</span>
              <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-slate-950 font-black shadow-md shrink-0">
                <CheckCircle2 className="w-5 h-5 text-slate-950" />
              </div>
              <div className="text-left">
                <div className="text-base sm:text-lg font-black text-white tracking-wider leading-tight">
                  {lang === 'en' ? 'LEVEL CLEARED!' : 'LEVEL LULUS!'}
                </div>
                <div className="text-xs text-teal-200/90 font-medium">
                  {unlockedNextLevel
                    ? (lang === 'en' ? 'Next level unlocked!' : 'Level berikutnya terbuka!')
                    : (lang === 'en' ? 'Deduction cleared!' : 'Level berikutnya terbuka!')}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative mt-2 p-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-950/85 via-red-900/65 to-rose-950/85 border-2 border-rose-500/80 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(244,63,94,0.35)] overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-black shadow-md shrink-0">
                <HeartCrack className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-base sm:text-lg font-black text-rose-100 tracking-wider leading-tight">
                  {lang === 'en' ? 'LEVEL FAILED!' : 'LEVEL BELUM LOLOS!'}
                </div>
                <div className="text-xs text-rose-300 font-medium">
                  {lang === 'en'
                    ? `Need ≥ ${MINIMUM_PASS_SCORE.toLocaleString(locale)} pts to pass.`
                    : `Butuh minimal ${MINIMUM_PASS_SCORE.toLocaleString(locale)} pts untuk lulus.`}
                </div>
              </div>
            </div>
          )}

          {/* 3. Status Badges Row (3 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
            {/* Shield / Life Safe or Life Lost */}
            <div className={`rounded-xl p-2.5 border backdrop-blur-sm flex items-center gap-2.5 text-left shadow-sm ${
              isLevelPassed ? 'border-teal-500/40 bg-teal-950/40' : 'border-rose-500/40 bg-rose-950/40'
            }`}>
              <div className={`p-1.5 rounded-lg shrink-0 ${
                isLevelPassed ? 'bg-teal-500/20 text-teal-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {isLevelPassed ? (
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                ) : (
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                )}
              </div>
              <div className="leading-tight">
                <div className={`text-[11px] font-bold ${isLevelPassed ? 'text-teal-200' : 'text-rose-200'}`}>
                  {isLevelPassed ? (lang === 'en' ? 'Life Safe' : 'Nyawa Aman') : (lang === 'en' ? 'Life Lost (-1)' : 'Nyawa Berkurang (-1)')}
                </div>
                <div className={`text-[9px] ${isLevelPassed ? 'text-teal-300/80' : 'text-rose-300/80'}`}>
                  {isLevelPassed ? (lang === 'en' ? '(Minimum Met)' : '(Lolos Skor Minimum)') : (lang === 'en' ? '(Below Minimum)' : '(Skor < 3.000)')}
                </div>
                <div className={`text-[10px] font-mono font-bold ${isLevelPassed ? 'text-teal-300' : 'text-rose-300'} mt-0.5`}>
                  ≥ {MINIMUM_PASS_SCORE.toLocaleString(locale)} pts
                </div>
              </div>
            </div>

            {/* Remaining Chances / Lives */}
            <div className={`rounded-xl p-2.5 border backdrop-blur-sm flex items-center gap-2.5 text-left shadow-sm ${
              typeof chancesRemaining === 'number' && chancesRemaining <= 0
                ? 'border-rose-600/70 bg-rose-950/60 ring-1 ring-rose-500/50'
                : 'border-rose-500/40 bg-rose-950/40'
            }`}>
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
                <Heart className={`w-4 h-4 ${typeof chancesRemaining === 'number' && chancesRemaining <= 0 ? 'text-slate-500' : 'fill-rose-500 text-rose-500'}`} />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold text-rose-200">
                  {lang === 'en' ? 'Remaining lives' : 'Sisa kesempatan'}
                </div>
                <div className="text-[10px] font-mono font-bold text-rose-300 mt-0.5">
                  {lang === 'en' ? 'today:' : 'hari ini:'} {typeof chancesRemaining === 'number' ? chancesRemaining : 0}/{maxChances || 3}
                </div>
              </div>
            </div>

            {/* Coins Earned */}
            <div className="rounded-xl p-2.5 border border-amber-500/40 bg-amber-950/40 backdrop-blur-sm flex items-center justify-center gap-2 shadow-sm">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Coins className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs sm:text-sm font-mono font-black text-amber-300">
                +{coinsEarned > 0 ? coinsEarned.toLocaleString(locale) : '500'} {lang === 'en' ? 'Coins' : 'Koin'}
              </div>
            </div>
          </div>

          {/* 4. Prestasi Baru Terbuka (Achievements Box) */}
          <div className="mt-3 rounded-2xl border border-amber-400/60 bg-amber-950/20 backdrop-blur-sm p-3 relative overflow-hidden shadow-md">
            {/* Background Stamp Watermark */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 text-amber-400">
              <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="50" r="45" strokeDasharray="4 2" />
                <circle cx="50" cy="50" r="38" />
                <path d="M50 15 L53 35 L70 25 L60 42 L80 50 L60 58 L70 75 L53 65 L50 85 L47 65 L30 75 L40 58 L20 50 L40 42 L30 25 L47 35 Z" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Achievement Header */}
            <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'NEW ACHIEVEMENTS UNLOCKED!' : 'PRESTASI BARU TERBUKA!'}</span>
            </div>

            {/* Achievement Items */}
            <div className="space-y-1.5 relative z-10">
              {displayAchievements.map((item) => (
                <div key={item.id} className="text-xs text-white font-bold flex items-center justify-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-slate-100">{item.title}</span>
                  <span className="text-amber-400 font-mono text-[11px] font-semibold">(+{item.coins} Koin)</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Jawaban Yang Anda Submit (Answer Breakdown) */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-teal-400 mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-teal-400" />
                <span>{lang === 'en' ? 'YOUR SUBMITTED DEDUCTION' : 'JAWABAN YANG ANDA SUBMIT'}</span>
              </div>
              <span className="font-mono text-teal-400/50 tracking-widest text-xs">/////</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Left Box: Year Guess */}
              <div className="rounded-2xl border border-cyan-500/40 bg-slate-950/70 backdrop-blur-sm p-3 flex flex-col justify-between shadow-inner">
                <div>
                  <div className="flex items-center justify-between text-slate-300 text-[11px] mb-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {lang === 'en' ? 'Your Year Guess:' : 'Tebakan Tahun Anda:'}
                    </span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-md font-bold border border-slate-700 ${
                      yearDiff === 0 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800/90 text-slate-300'
                    }`}>
                      {yearDiff === 0
                        ? (lang === 'en' ? 'Exact Match!' : 'Tepat!')
                        : (lang === 'en' ? `Diff: ${yearDiff} yrs` : `Selisih: ${yearDiff} thn`)}
                    </span>
                  </div>
                  <div className="text-3xl font-black font-mono text-amber-400 my-1">
                    {guessedYear}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Target Archive Year:' : 'Tahun Arsip Target:'}</span>
                  <span className="font-mono text-white font-bold">{challenge.targetYear}</span>
                </div>
              </div>

              {/* Right Box: Location Guess */}
              <div className="rounded-2xl border border-cyan-500/40 bg-slate-950/70 backdrop-blur-sm p-3 flex flex-col justify-between shadow-inner">
                <div>
                  <div className="flex items-center justify-between text-slate-300 text-[11px] mb-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {lang === 'en' ? 'Your Pin Location:' : 'Pin Lokasi Anda:'}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 font-bold border border-slate-700">
                      {formatDistance(distanceKm, lang)}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white my-1 leading-snug break-words">
                    {locationGuessLabel}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Target Actual Location:' : 'Lokasi Asli Target:'}</span>
                  <span className="font-mono text-white font-bold truncate max-w-[140px]" title={challenge.city}>
                    {challenge.city}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Score Cards Row (Location Precision & Year Guess) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5">
            {/* Location Score */}
            <div className="rounded-2xl border border-cyan-500/40 bg-slate-950/70 backdrop-blur-sm p-3.5 relative overflow-hidden flex flex-col justify-between">
              {/* Radar Coordinate Grid Graphic watermark */}
              <div className="absolute right-2 bottom-2 pointer-events-none opacity-20 text-cyan-400">
                <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <circle cx="50" cy="50" r="45" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="30" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="15" strokeWidth="1.5" />
                  <line x1="50" y1="5" x2="50" y2="95" strokeWidth="1" />
                  <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5 font-bold text-rose-300">
                    <Target className="w-4 h-4 text-rose-400" /> {t.locationPrecision}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 font-bold border border-slate-700">
                    {formatDistance(distanceKm, lang)}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                  +{locationScore.toLocaleString(locale)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.maxPointsNotice}</div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between relative z-10">
                <span>{lang === 'en' ? 'Your Pin:' : 'Pin Anda:'}</span>
                <span className="font-mono text-rose-300 font-semibold truncate max-w-[120px]" title={guessedCoordsStr || ''}>
                  {guessedCoordsStr || (lang === 'en' ? 'Placed' : 'Ditaruh')}
                </span>
              </div>
            </div>

            {/* Year Score */}
            <div className="rounded-2xl border border-cyan-500/40 bg-slate-950/70 backdrop-blur-sm p-3.5 relative overflow-hidden flex flex-col justify-between">
              {/* Bar Chart Graphic watermark */}
              <div className="absolute right-3 bottom-2 pointer-events-none opacity-25 text-amber-400">
                <svg className="w-12 h-10" viewBox="0 0 60 50" fill="currentColor">
                  <rect x="5" y="30" width="8" height="20" rx="1" />
                  <rect x="18" y="20" width="8" height="30" rx="1" />
                  <rect x="31" y="10" width="8" height="40" rx="1" />
                  <rect x="44" y="2" width="8" height="48" rx="1" />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Calendar className="w-4 h-4 text-amber-400" /> {t.yearGuessTitle}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 font-bold border border-slate-700">
                    {yearDiff === 0 ? t.exactYearMatch : t.yearDiffNotice(yearDiff)}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-1">
                  +{yearScore.toLocaleString(locale)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {yearDiff === 0 ? (lang === 'en' ? 'Exact match!' : 'Tepat!') : (lang === 'en' ? `${yearDiff} yrs off` : `Selisih ${yearDiff} thn`)}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between relative z-10">
                <span>{lang === 'en' ? 'Your Guess:' : 'Tebakan Anda:'}</span>
                <span className="font-mono text-amber-300 font-bold">{guessedYear}</span>
              </div>
            </div>
          </div>

          {/* 7. Berkas Dokumen Masa Lalu & Vintage Polaroid Photo */}
          <div className="mt-3 rounded-2xl border border-cyan-500/40 bg-slate-950/75 backdrop-blur-sm p-3.5 flex flex-col sm:flex-row items-center gap-3.5 relative shadow-md">
            {/* Text description */}
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.historicalDossierTitle}</span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-sans">
                {challenge.description[lang]}
              </p>
            </div>

            {/* Vintage Polaroid Photo Card with Scotch Tape */}
            <div className="w-32 sm:w-36 shrink-0 bg-white p-2 pb-3.5 rounded-sm shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300 relative border border-slate-300/40">
              {/* Scotch Tape Graphic at Top */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-amber-100/70 border border-white/40 shadow-xs rotate-[-3deg] pointer-events-none" />
              
              {/* Archival Photo */}
              <img
                src={polaroidImageSrc}
                alt={challenge.city}
                className="w-full aspect-[4/3] object-cover rounded-xs filter brightness-95 contrast-105"
              />

              {/* Polaroid Handwritten Caption */}
              <div className="text-[11px] text-slate-800 text-center font-serif italic mt-1.5 font-bold tracking-tight">
                {challenge.targetDateStr[lang]}
              </div>
            </div>
          </div>

          {/* 8. Bagikan Hasil (Social Share Bar) */}
          <div className="mt-3 rounded-2xl border border-cyan-500/40 bg-slate-950/75 backdrop-blur-sm p-3 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400">
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'en' ? 'SHARE RESULT' : 'BAGIKAN HASIL'}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-sans">
                {lang === 'en' ? 'Show your score to friends!' : 'Tunjukkan pencapaianmu ke teman-teman!'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {/* WhatsApp */}
              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer"
                title="Bagikan ke WhatsApp"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.947 3.24.947 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.802 0-3.488-.479-4.946-1.312l-5.054 1.376 1.398-4.939c-.939-1.503-1.488-3.275-1.488-5.125 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
                </svg>
                <span>WhatsApp</span>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleSocialShare('instagram')}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer"
                title="Bagikan ke Instagram"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </button>

              {/* X */}
              <button
                onClick={() => handleSocialShare('x')}
                className="py-2 px-3 rounded-xl bg-black hover:bg-slate-900 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer"
                title="Bagikan ke X"
              >
                <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSocialShare('facebook')}
                className="py-2 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer"
                title="Bagikan ke Facebook"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* 9. Pinned Action Buttons Footer */}
        <div className="relative z-20 p-3 sm:p-4 bg-slate-950/90 border-t border-cyan-500/30 flex items-center gap-2 sm:gap-2.5 shrink-0 backdrop-blur-md">
          {/* Tombol Kembali */}
          <button
            onClick={onRestart}
            className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-cyan-500/40 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-bold transition active:scale-95 flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
            title={lang === 'en' ? 'Back to Main Menu' : 'Kembali ke Menu Utama'}
          >
            <ArrowLeft className="w-4 h-4 text-cyan-300" />
            <span>{lang === 'en' ? 'Back' : 'Kembali'}</span>
          </button>

          {/* Paspor Button */}
          {onOpenPassport && (
            <button
              onClick={onOpenPassport}
              className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-amber-500/60 bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 text-xs font-bold transition active:scale-95 flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
              title={lang === 'en' ? 'Open Time Passport & History' : 'Buka Paspor Waktu & Riwayat'}
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Passport' : 'Paspor'}</span>
            </button>
          )}

          {/* Level List Button */}
          {gameMode === 'campaign' && onOpenLevelSelect && (
            <button
              onClick={onOpenLevelSelect}
              className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-cyan-500/40 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-bold transition active:scale-95 flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
              title={lang === 'en' ? 'Level List' : 'Daftar Level'}
            >
              <List className="w-4 h-4 text-cyan-300" />
              <span>{lang === 'en' ? 'Level' : 'Level'}</span>
            </button>
          )}

          {/* Next Level / Retry / Restart Primary Action */}
          {gameMode === 'campaign' ? (
            !isLevelPassed ? (
              chancesRemaining !== undefined && chancesRemaining <= 0 && onOpenWaitlist ? (
                <button
                  onClick={onOpenWaitlist}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-amber-500/30 via-yellow-500/40 to-amber-500/30 hover:from-amber-500/40 hover:to-yellow-500/50 text-amber-200 border border-amber-400/80 transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-lg shadow-amber-950/60"
                >
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'en' ? 'Out of Lives • Get VIP Pass 👑' : 'Kuota Habis • Buka Akses VIP 👑'}</span>
                </button>
              ) : (
                <button
                  onClick={onRestart}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-md"
                >
                  <span>{lang === 'en' ? 'Back to Menu' : 'Kembali ke Menu'}</span>
                </button>
              )
            ) : levelNumber === 100 ? (
              <button
                onClick={onNextRound}
                className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 transition active:scale-98 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.6)] cursor-pointer text-xs sm:text-sm animate-pulse"
              >
                <Trophy className="w-4 h-4 text-slate-950" />
                <span>{lang === 'en' ? 'Victory • Claim Detective Rank!' : 'Tamat Petualangan • Klaim Gelar!'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              <button
                onClick={onNextRound}
                className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-black bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 transition active:scale-98 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.5)] cursor-pointer text-xs sm:text-sm"
              >
                <span>{lang === 'en' ? 'Next Level' : 'Level Berikutnya'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            )
          ) : gameMode === 'indonesia' ? (
            !isLevelPassed ? (
              chancesRemaining !== undefined && chancesRemaining <= 0 && onOpenWaitlist ? (
                <button
                  onClick={onOpenWaitlist}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-amber-500/30 via-yellow-500/40 to-amber-500/30 hover:from-amber-500/40 hover:to-yellow-500/50 text-amber-200 border border-amber-400/80 transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-lg shadow-amber-950/60"
                >
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'en' ? 'Out of Lives • Get VIP Pass 👑' : 'Kuota Habis • Buka Akses VIP 👑'}</span>
                </button>
              ) : (
                <button
                  onClick={onRestart}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-md"
                >
                  <span>{lang === 'en' ? 'Back to Menu' : 'Kembali ke Menu'}</span>
                </button>
              )
            ) : levelNumber === 50 ? (
              <button
                onClick={onRestart}
                className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 transition active:scale-98 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.6)] cursor-pointer text-xs sm:text-sm animate-pulse"
              >
                <Trophy className="w-4 h-4 text-slate-950" />
                <span>{lang === 'en' ? 'Completed 50 Cases • Nusantara Master!' : 'Selesai 50 Kasus • Pengelana Nusantara!'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              <button
                onClick={onNextRound}
                className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 transition active:scale-98 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer text-xs sm:text-sm"
              >
                <span>{lang === 'en' ? 'Next Case' : 'Kasus Selanjutnya'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            )
          ) : isGameOver ? (
            <button
              onClick={onRestart}
              className="flex-1 py-2.5 sm:py-3 px-5 rounded-xl font-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 transition active:scale-98 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer text-xs sm:text-sm"
            >
              <Trophy className="w-4 h-4" />
              <span>{t.restartExpeditionBtn}</span>
            </button>
          ) : typeof chancesRemaining === 'number' && chancesRemaining <= 0 ? (
            <button
              onClick={onRestart}
              className="flex-1 py-2.5 sm:py-3 px-5 rounded-xl font-black bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white transition active:scale-98 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] cursor-pointer text-xs sm:text-sm"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{lang === 'en' ? 'Out of Lives • Back to Menu' : 'Kesempatan Habis • Kembali ke Menu'}</span>
            </button>
          ) : (
            <button
              onClick={onNextRound}
              className="flex-1 py-2.5 sm:py-3 px-5 rounded-xl font-black bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 transition active:scale-98 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.5)] cursor-pointer text-xs sm:text-sm"
            >
              <span>{t.nextLocationBtn}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
