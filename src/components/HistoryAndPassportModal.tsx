import React, { useState } from 'react';
import {
  GamificationState,
  ACHIEVEMENTS_LIST,
  SHOP_ITEMS,
  buyShopItem,
  toggleActiveItem,
} from '../utils/gamification';
import { Language } from '../utils/i18n';
import { formatDistance } from '../utils/scoring';
import { ChronoUsage, getPlayerProgress, getPlayerRank } from '../utils/progress';
import { getRankAssetByStars, RANK_VISUAL_ASSETS } from '../utils/rankAssets';
import {
  History,
  Trophy,
  Award,
  ShoppingBag,
  Flame,
  Coins,
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  Lock,
  Sparkles,
  TrendingUp,
  Compass,
  Check,
  Crown,
} from 'lucide-react';

interface HistoryAndPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  gamification: GamificationState;
  onRefreshGamification: () => void;
  lang: Language;
  initialTab?: 'history' | 'stats' | 'achievements' | 'shop';
  chronoUsage?: ChronoUsage;
  onOpenClaimGelar?: () => void;
}

export const HistoryAndPassportModal: React.FC<HistoryAndPassportModalProps> = ({
  isOpen,
  onClose,
  gamification,
  onRefreshGamification,
  lang,
  initialTab = 'history',
  chronoUsage,
  onOpenClaimGelar,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'stats' | 'achievements' | 'shop'>(initialTab);
  const [shopFeedback, setShopFeedback] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const locale = lang === 'en' ? 'en-US' : 'id-ID';

  const playerProg = getPlayerProgress();
  const playerRankObj = getPlayerRank(playerProg.totalStars, lang);
  const rankAsset = getRankAssetByStars(playerProg.totalStars);

  const is100Completed = Boolean(
    (playerProg.unlockedLevel >= 100 && (playerProg.levels[100]?.score ?? 0) >= 4000) ||
    Object.keys(playerProg.levels).length >= 100
  );

  // Compute Career Stats
  const totalGames = gamification.history.length;
  const totalScoreAllTime = gamification.history.reduce((acc, h) => acc + h.totalScore, 0);
  const avgScore = totalGames > 0 ? Math.round(totalScoreAllTime / totalGames) : 0;
  const bestScore = totalGames > 0 ? Math.max(...gamification.history.map((h) => h.totalScore)) : 0;
  const closestDistance = totalGames > 0 ? Math.min(...gamification.history.map((h) => h.distanceKm)) : 0;
  const avgYearDiff =
    totalGames > 0
      ? (gamification.history.reduce((acc, h) => acc + h.yearDiff, 0) / totalGames).toFixed(1)
      : '0';

  const rankCounts = {
    S: gamification.history.filter((h) => h.grade === 'S').length,
    A: gamification.history.filter((h) => h.grade === 'A').length,
    B: gamification.history.filter((h) => h.grade === 'B').length,
    C: gamification.history.filter((h) => h.grade === 'C').length,
    D: gamification.history.filter((h) => h.grade === 'D').length,
  };

  const handleBuy = (itemId: string) => {
    const res = buyShopItem(itemId);
    setShopFeedback(res.message);
    onRefreshGamification();
    setTimeout(() => setShopFeedback(null), 3000);
  };

  const handleToggle = (itemId: string, category: 'filter' | 'theme' | 'perk') => {
    const isEquipping =
      (category === 'filter' && gamification.activeFilter !== itemId) ||
      (category === 'theme' && gamification.activeTheme !== itemId) ||
      (category === 'perk' && gamification.activePerk !== itemId);

    const remainingUses = chronoUsage?.remainingByItem?.[itemId] ?? 3;

    if (isEquipping && remainingUses <= 0) {
      setShopFeedback(
        lang === 'en'
          ? 'Daily 3x limit exhausted for this item! Resets tomorrow at 00:00.'
          : 'Batas harian 3x pakai untuk item ini telah habis! Reset besok pukul 00:00.'
      );
      setTimeout(() => setShopFeedback(null), 3500);
      return;
    }

    toggleActiveItem(itemId, category);
    onRefreshGamification();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header with Stats Overview */}
        <div className="p-4 sm:p-5 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Time Trace" className="w-10 h-10 object-contain drop-shadow-md shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{lang === 'en' ? 'Time Passport & Archive Log' : 'Paspor Waktu & Riwayat Ekspedisi'}</span>
              </h2>
              <div className="flex items-center gap-3 text-xs">
                {/* Coins */}
                <div className="flex items-center gap-1 font-mono text-amber-400 font-bold">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{gamification.coins.toLocaleString(locale)}</span>
                  <span className="text-[10px] text-amber-500/80">{lang === 'en' ? 'Coins' : 'Koin'}</span>
                </div>
                <span className="text-slate-600">•</span>
                {/* Streak */}
                <div className="flex items-center gap-1 font-mono text-orange-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" />
                  <span>{gamification.dailyStreak} {lang === 'en' ? 'Day Streak' : 'Hari Streak'}</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                  {totalGames} {lang === 'en' ? 'Records' : 'Catatan'}
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

        {/* 4 Tabs Navigation Bar */}
        <div className="bg-slate-950/70 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'history'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Past Expeditions' : 'Riwayat Ekspedisi'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800/80 text-amber-300 font-mono">
              {totalGames}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'stats'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Career Stats' : 'Statistik Karier'}</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'achievements'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Achievements' : 'Pencapaian & Trofi'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800/80 text-amber-300 font-mono">
              {gamification.unlockedAchievements.length}/{ACHIEVEMENTS_LIST.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'shop'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Chrono Shop' : 'Toko Penjelajah'}</span>
          </button>
        </div>

        {/* Tab 1: History Log */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {gamification.history.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Compass className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
                <h3 className="text-base font-bold text-slate-200">
                  {lang === 'en' ? 'No Expeditions Logged Yet' : 'Belum Ada Riwayat Ekspedisi'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  {lang === 'en'
                    ? 'Play any round in 100 Levels or Quick Play to log your historical discoveries here!'
                    : 'Mainkan level atau mode ekspedisi untuk mencatat jejak petualangan waktu dan perolehan skormu di sini!'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {gamification.history.map((entry) => {
                  const dateStr = new Date(entry.timestamp).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  const gradeBg =
                    entry.grade === 'S'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                      : entry.grade === 'A'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                      : entry.grade === 'B'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-400/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700';

                  return (
                    <div
                      key={entry.id}
                      className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-3.5 sm:p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                    >
                      {/* Left: Location & Metadata */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-black font-mono text-lg shrink-0 shadow-inner ${gradeBg}`}
                        >
                          {entry.grade}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-rose-400" />
                              <span>{entry.city}, {entry.country}</span>
                            </h4>
                            {entry.levelNumber && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                LVL {entry.levelNumber}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-400 font-mono">
                            <span>
                              {lang === 'en' ? 'Year: ' : 'Tahun: '}
                              <strong className="text-amber-400">{entry.targetYear}</strong>
                              {' '}(tebak: {entry.guessedYear}, selisih {entry.yearDiff} thn)
                            </span>
                            <span>•</span>
                            <span>
                              {lang === 'en' ? 'Distance: ' : 'Jarak: '}
                              <strong className="text-slate-200">{formatDistance(entry.distanceKm, lang)}</strong>
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-500 mt-1 font-mono">
                            {dateStr}
                          </div>
                        </div>
                      </div>

                      {/* Right: Points Breakdown */}
                      <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-900 flex sm:flex-col justify-between items-center sm:items-end">
                        <span className="text-xl font-black font-mono text-emerald-400">
                          +{entry.totalScore.toLocaleString(locale)} <span className="text-[11px] text-slate-500 font-normal">pts</span>
                        </span>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Lok: {entry.locationScore.toLocaleString(locale)} | Thn: {entry.yearScore.toLocaleString(locale)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Career Stats & Detective ID */}
        {activeTab === 'stats' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Detective Identity Passport Card */}
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden">
              <div className="w-28 h-36 sm:w-32 sm:h-44 shrink-0 flex items-center justify-center relative">
                <img
                  src={rankAsset.image}
                  alt={playerRankObj.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                  <span>{rankAsset.badge}</span>
                  <span>{lang === 'en' ? `Rank Tier ${rankAsset.rankLevel} / 7` : `Pangkat Tingkat ${rankAsset.rankLevel} / 7`}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {playerRankObj.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  {lang === 'en'
                    ? 'Official Time Traveler Passport ID. Accumulate investigative stars across historic panoramas to ascend detective ranks.'
                    : 'Kartu Identitas Resmi Penjelajah Waktu. Kumpulkan bintang penyelidikan di berbagai arsip kota dunia untuk menaikkan pangkat detektif.'}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                    <span className="text-slate-400">{lang === 'en' ? 'Total Stars: ' : 'Total Bintang: '}</span>
                    <strong className="text-amber-400 font-bold">{playerProg.totalStars} ⭐</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                    <span className="text-slate-400">{lang === 'en' ? 'Unlocked Level: ' : 'Level Terbuka: '}</span>
                    <strong className="text-cyan-400 font-bold">Lvl {playerProg.unlockedLevel}</strong>
                  </div>
                  {onOpenClaimGelar && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenClaimGelar();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer ${
                        is100Completed
                          ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black shadow-amber-500/30 animate-pulse'
                          : 'bg-slate-950/80 text-amber-300/80 border border-amber-500/30 hover:border-amber-400'
                      }`}
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {is100Completed
                          ? (lang === 'en' ? 'Claim / View Title 👑' : 'Klaim / Lihat Gelar 👑')
                          : (lang === 'en' ? 'Preview 100 Title 📜' : 'Pratinjau Gelar 100 📜')}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 7 Detective Ranks Progression Showcase */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'en' ? '7 Detective Rank Tiers Progression' : 'Progres 7 Tingkatan Pangkat Detektif'}</span>
                </h4>
                <span className="text-[11px] font-mono text-amber-400 font-bold">
                  {lang === 'en' ? `Active: Tier ${rankAsset.rankLevel} / 7` : `Aktif: Pangkat ${rankAsset.rankLevel} / 7`}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {[1, 2, 3, 4, 5, 6, 7].map((lvl) => {
                  const rankInfo = RANK_VISUAL_ASSETS[lvl];
                  const isCurrent = rankAsset.rankLevel === lvl;
                  const isUnlocked = playerProg.totalStars >= rankInfo.minStars;

                  return (
                    <div
                      key={lvl}
                      className={`rounded-2xl p-2.5 flex flex-col items-center text-center transition-all relative ${
                        isCurrent
                          ? 'bg-gradient-to-b from-amber-500/25 to-indigo-950/60 border-2 border-amber-400 shadow-xl shadow-amber-500/10'
                          : isUnlocked
                          ? 'bg-slate-900/90 border border-slate-700/80 hover:border-slate-600'
                          : 'bg-slate-950/60 border border-slate-800/80 opacity-60'
                      }`}
                    >
                      {/* Character Artwork Thumbnail */}
                      <div className="w-16 h-20 sm:w-20 sm:h-26 mb-1.5 flex items-center justify-center relative">
                        <img
                          src={rankInfo.image}
                          alt={rankInfo.name[lang] || rankInfo.name.id}
                          className={`w-full h-full object-contain filter ${
                            isUnlocked ? 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]' : 'grayscale brightness-50'
                          }`}
                        />
                        {!isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="p-1 rounded-full bg-slate-950/90 border border-slate-700 text-slate-400">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Rank Title & Requirement */}
                      <span className={`text-[10px] font-black leading-tight line-clamp-2 min-h-[24px] ${isCurrent ? 'text-amber-300' : isUnlocked ? 'text-slate-200' : 'text-slate-400'}`}>
                        {rankInfo.name[lang] || rankInfo.name.id}
                      </span>

                      <div className="mt-1 pt-1.5 border-t border-slate-800/80 w-full flex items-center justify-center">
                        {isCurrent ? (
                          <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-400/15 px-1.5 py-0.2 rounded-full border border-amber-400/30">
                            {lang === 'en' ? 'ACTIVE' : 'AKTIF'}
                          </span>
                        ) : isUnlocked ? (
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">
                            ✓ {lang === 'en' ? 'UNLOCKED' : 'TERBUKA'}
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-slate-400 font-bold">
                            {rankInfo.minStars} ⭐
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-mono uppercase block">Total Poin Seumur Hidup</span>
                <span className="text-2xl font-black font-mono text-amber-400 mt-1 block">
                  {totalScoreAllTime.toLocaleString(locale)}
                </span>
                <span className="text-[10px] text-slate-500">{totalGames} ronde dimainkan</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-mono uppercase block">Skor Ronde Terbaik</span>
                <span className="text-2xl font-black font-mono text-emerald-400 mt-1 block">
                  {bestScore.toLocaleString(locale)}
                </span>
                <span className="text-[10px] text-slate-500">Maksimum 10.000 pts</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-mono uppercase block">Presisi Jarak Terdekat</span>
                <span className="text-2xl font-black font-mono text-rose-400 mt-1 block">
                  {totalGames > 0 ? formatDistance(closestDistance, lang) : '-'}
                </span>
                <span className="text-[10px] text-slate-500">Rekor pin paling akurat</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs text-slate-400 font-mono uppercase block">Rata-rata Selisih Tahun</span>
                <span className="text-2xl font-black font-mono text-cyan-400 mt-1 block">
                  ± {avgYearDiff} {lang === 'en' ? 'yrs' : 'thn'}
                </span>
                <span className="text-[10px] text-slate-500">Akurasi deduksi dekade</span>
              </div>
            </div>

            {/* Rank Distribution */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Distribusi Peringkat Ronde (Grade Distribution)</span>
              </h4>

              <div className="grid grid-cols-5 gap-2 text-center">
                {(['S', 'A', 'B', 'C', 'D'] as const).map((gradeKey) => (
                  <div key={gradeKey} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-lg font-black font-mono text-amber-400 block">{gradeKey}</span>
                    <span className="text-xl font-bold font-mono text-white mt-1 block">
                      {rankCounts[gradeKey]}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {totalGames > 0 ? `${Math.round((rankCounts[gradeKey] / totalGames) * 100)}%` : '0%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detective Advice Note */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-indigo-400 block mb-1">💡 Tips Meningkatkan Akurasi Paspor:</strong>
              Perhatikan papan reklame film di bioskop untuk menentukan tahun spesifik hingga rentang 1 tahun, serta amati pelat nomor mobil dan model taksi untuk membedakan kota di belahan dunia yang berbeda!
            </div>
          </div>
        )}

        {/* Tab 3: Achievements */}
        {activeTab === 'achievements' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ACHIEVEMENTS_LIST.map((ach) => {
              const isUnlocked = gamification.unlockedAchievements.includes(ach.id);

              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isUnlocked
                      ? 'bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-950/50 border-slate-800/80 opacity-70'
                  }`}
                >
                  <div className="text-3xl shrink-0 p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                    {ach.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white">
                        {ach.title[lang]}
                      </h4>
                      {isUnlocked ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                          <Check className="w-3 h-3" /> {lang === 'en' ? 'UNLOCKED' : 'TERCAPAI'}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {lang === 'en' ? 'LOCKED' : 'TERKUNCI'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 leading-snug">
                      {ach.desc[lang]}
                    </p>

                    <div className="mt-2 text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      <span>+{ach.rewardCoins} {lang === 'en' ? 'Coins Reward' : 'Hadiah Koin'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 4: Chrono Shop */}
        {activeTab === 'shop' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {shopFeedback && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold text-center animate-in fade-in">
                {shopFeedback}
              </div>
            )}

            <div className="mb-4 flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                {lang === 'en' ? 'Available Balance:' : 'Saldo Koin Tersedia:'}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-amber-400 font-bold text-base">
                <Coins className="w-4 h-4" />
                <span>{gamification.coins.toLocaleString(locale)} Koin</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SHOP_ITEMS.map((item) => {
                const isOwned = gamification.unlockedShopItems.includes(item.id);
                const isActive =
                  (item.category === 'filter' && gamification.activeFilter === item.id) ||
                  (item.category === 'theme' && gamification.activeTheme === item.id) ||
                  (item.category === 'perk' && gamification.activePerk === item.id);
                const canAfford = gamification.coins >= item.price;
                const remainingUses = chronoUsage?.remainingByItem?.[item.id] ?? 3;

                const categoryLabel =
                  item.category === 'perk'
                    ? (lang === 'en' ? 'Chrono Gadget' : 'Gadget Waktu')
                    : item.category === 'filter'
                    ? (lang === 'en' ? 'Visual Filter' : 'Filter Visual')
                    : (lang === 'en' ? 'Map Theme' : 'Tema Peta');

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/50 shadow-lg'
                        : isOwned
                        ? 'bg-slate-900 border-slate-700'
                        : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-3xl">{item.icon}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-amber-300/80 border border-slate-700">
                            {categoryLabel}
                          </span>
                          {isOwned && (
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                                remainingUses > 0
                                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              }`}
                            >
                              <span>⚡ {remainingUses}/3</span>
                              <span className="hidden sm:inline">
                                {remainingUses > 0 ? (lang === 'en' ? 'Today' : 'Hari Ini') : 'Habis'}
                              </span>
                            </span>
                          )}
                        </div>
                        {isOwned ? (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {isActive ? (lang === 'en' ? 'EQUIPPED' : 'DIPAKAI') : (lang === 'en' ? 'OWNED' : 'DIMILIKI')}
                          </span>
                        ) : (
                          <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                            <Coins className="w-3 h-3" />
                            {item.price}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white">{item.name[lang]}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-snug">{item.desc[lang]}</p>

                      {/* Daily 3x limit note */}
                      <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <span>⚡ {lang === 'en' ? 'Quota: 3 uses per day (resets 00:00)' : 'Kuota: 3x pakai per hari (reset 00:00)'}</span>
                      </div>

                      {/* Item Preview & Cost Highlights */}
                      {item.id === 'perk_time_shift' && (
                        <div className="mt-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-mono flex items-center justify-between">
                          <span>⚡ {lang === 'en' ? 'Activation cost:' : 'Biaya per ronde:'} 150 {lang === 'en' ? 'Coins' : 'Koin'}</span>
                          <span className="text-[10px] text-slate-400 font-bold">{lang === 'en' ? '3x/day (Reset 00:00)' : 'Maks 3x/hari (Reset 00:00)'}</span>
                        </div>
                      )}

                      {item.id === 'filter_vhs' && (
                        <div className="mt-2.5 p-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                          <span>{lang === 'en' ? 'Active CRT scanlines & REC-1994 OSD' : 'Garis TV tabung scanline & OSD REC-1994'}</span>
                        </div>
                      )}

                      {item.id === 'filter_sepia_70s' && (
                        <div className="mt-2.5 p-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[10px] text-amber-300 font-serif italic flex items-center gap-1.5">
                          <span>🎞️ {lang === 'en' ? '1970s Kodak vignette & monochrome sepia tone' : 'Vignette Kodak 70-an & warna sepia monokrom'}</span>
                        </div>
                      )}

                      {item.id === 'theme_gold_compass' && (
                        <div className="mt-2.5 p-1.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[10px] text-amber-300 font-mono flex items-center gap-1.5">
                          <span>🧭 {lang === 'en' ? 'Parchment map & antique brass mini-map frame' : 'Peta kertas antik & bingkai emas maritim'}</span>
                        </div>
                      )}

                      {item.id === 'theme_cyberpunk' && (
                        <div className="mt-2.5 p-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-[10px] text-cyan-300 font-mono flex items-center gap-1.5">
                          <span>⚡ {lang === 'en' ? 'Dark neon map & glowing cyan/magenta frame' : 'Peta gelap neon & bingkai cyan/magenta'}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      {isOwned ? (
                        <button
                          disabled={!isActive && remainingUses <= 0}
                          onClick={() => handleToggle(item.id, item.category)}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            isActive
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer'
                              : remainingUses <= 0
                              ? 'bg-slate-800/60 text-slate-500 border border-slate-800 cursor-not-allowed'
                              : 'bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>
                            {isActive
                              ? (lang === 'en' ? 'Unequip' : 'Lepas')
                              : remainingUses <= 0
                              ? (lang === 'en' ? '0/3 Limit (Reset 00:00)' : '0/3 Kuota Habis (Reset 00:00)')
                              : (lang === 'en' ? 'Equip' : 'Gunakan')}
                          </span>
                        </button>
                      ) : (
                        <button
                          disabled={!canAfford}
                          onClick={() => handleBuy(item.id)}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            canAfford
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Coins className="w-3.5 h-3.5" />
                          <span>{canAfford ? (lang === 'en' ? `Buy (${item.price} Coins)` : `Beli (${item.price} Koin)`) : (lang === 'en' ? 'Not Enough Coins' : 'Koin Kurang')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
