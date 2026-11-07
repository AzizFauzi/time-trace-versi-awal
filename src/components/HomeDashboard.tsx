import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Compass,
  FolderArchive,
  Trophy,
  Award,
  BookOpen,
  Heart,
  Coins,
  Flame,
  Search,
  Bell,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Lock,
  Globe2,
  Navigation,
  Eye,
  CheckCircle2,
  Volume2,
  VolumeX,
  Newspaper,
  ArrowRight,
  Crown,
  List,
  Edit3,
  Check,
  HelpCircle,
} from 'lucide-react';
import { PlayerProgress, PlayerRank, DailyChances, IndonesiaProgress } from '../utils/progress';
import { GamificationState } from '../utils/gamification';
import { Language, TRANSLATIONS, RegionId } from '../utils/i18n';
import { HistoricalPano, getChallengeByLevel } from '../data/challenges';
import { DASHBOARD_ASSETS } from '../utils/dashboardAssets';
import { getExploredLocations } from '../utils/cityImageHelper';
import { getRankAssetByStars } from '../utils/rankAssets';
import { soundManager } from '../utils/soundManager';
import { BlogArticle, BLOG_ARTICLES } from '../data/blogArticles';
import { fetchLeaderboard, getPlayerNickname, setPlayerNickname, submitPlayerScore, LeaderboardPlayer } from '../services/leaderboardService';
import { BlogReaderModal } from './BlogReaderModal';
import logoImg from '../assets/logo.png';

interface HomeDashboardProps {
  playerProgress: PlayerProgress;
  playerRank: PlayerRank;
  gamification: GamificationState;
  dailyChances: DailyChances;
  todayFormatted: string;
  timeUntilTomorrow: string;
  dailyCompleted: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  currentChallenge?: HistoricalPano;
  onStartCampaign: (levelNumber: number) => void;
  onStartExpedition: (region: RegionId) => void;
  onStartDaily: () => void;
  onStartIndonesia?: (caseNumber?: number) => void;
  onOpenIndonesiaSelector?: () => void;
  onOpenLevelSelector: () => void;
  onOpenPassport: (defaultTab?: 'history' | 'stats' | 'achievements' | 'shop') => void;
  onOpenHowToPlay: () => void;
  onOpenClaimGelar?: () => void;
  onOpenWaitlist?: () => void;
  indonesiaProgress?: IndonesiaProgress;
}

/**
 * Animated Ambient Time-Particles Canvas (Floating Golden Dust & Chrono Motes)
 */
const HeroParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.45 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      hue: Math.random() > 0.25 ? 42 : 205, // Mostly warm amber, some chrono cyan
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0.1, p.baseAlpha + Math.sin(Date.now() * p.pulseSpeed) * 0.25);

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === 42
            ? `rgba(251, 191, 36, ${p.alpha})`
            : `rgba(147, 197, 253, ${p.alpha * 0.8})`;
        ctx.shadowColor = p.hue === 42 ? '#f59e0b' : '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.9 }}
    />
  );
};

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  playerProgress,
  playerRank,
  gamification,
  dailyChances,
  todayFormatted,
  timeUntilTomorrow,
  dailyCompleted,
  lang,
  setLang,
  isMuted,
  onToggleMute,
  currentChallenge,
  onStartCampaign,
  onStartExpedition,
  onStartDaily,
  onStartIndonesia,
  onOpenIndonesiaSelector,
  onOpenLevelSelector,
  onOpenPassport,
  onOpenHowToPlay,
  onOpenClaimGelar,
  onOpenWaitlist,
  indonesiaProgress,
}) => {
  const isEn = lang === 'en';
  const t = TRANSLATIONS[lang];
  const locale = isEn ? 'en-US' : 'id-ID';

  const is100Completed = Boolean(
    (playerProgress.unlockedLevel >= 100 && (playerProgress.levels[100]?.score ?? 0) >= 4000) ||
    Object.keys(playerProgress.levels).length >= 100
  );
  const isTitleClaimed = typeof window !== 'undefined' && localStorage.getItem('time_trace_title_claimed') === 'true';

  const [activeNav, setActiveNav] = useState<'beranda' | 'ekspedisi' | 'arsip' | 'leaderboard' | 'prestasi' | 'paspor' | 'warta'>('beranda');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [selectedExpeditionRegion, setSelectedExpeditionRegion] = useState<RegionId>('global');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('all');

  // Deep linking: check URL search params for ?article=slug
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const articleSlug = params.get('article');
      if (articleSlug) {
        const found = BLOG_ARTICLES.find(
          (a) => a.slug === articleSlug || a.id === articleSlug
        );
        if (found) {
          setSelectedArticle(found);
        }
      }
    } catch (_) {}
  }, []);

  const filteredArticles = selectedBlogCategory === 'all'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter(
        (a) => a.category.id === selectedBlogCategory || a.category.en === selectedBlogCategory
      );

  const switchLanguage = (newLang: Language) => {
    try {
      soundManager.playTick();
    } catch (_) {}
    setLang(newLang);
  };

  const currentLevelNumber = playerProgress?.unlockedLevel || 1;
  const rankAsset = getRankAssetByStars(playerProgress?.totalStars || 0);

  // Calculate actual total cases completed (Campaign 100 + Indonesia 50)
  const campaignCasesCount = Object.keys(playerProgress?.levels || {}).length;
  const indoCasesCount = Object.keys(indonesiaProgress?.cases || {}).length;
  const casesCompleted = campaignCasesCount + indoCasesCount;

  // Calculate actual unique countries discovered strictly from player's played history and completed cases
  const countrySet = new Set<string>();

  // 1. From game history (record of every played round)
  (gamification?.history || []).forEach((h) => {
    if (h?.country && typeof h.country === 'string' && h.country.trim()) {
      countrySet.add(h.country.trim().toLowerCase());
    }
  });

  // 2. From completed campaign levels
  Object.keys(playerProgress?.levels || {}).forEach((lvlStr) => {
    const lvl = parseInt(lvlStr, 10);
    const challenge = getChallengeByLevel(lvl);
    if (challenge?.country) {
      const cName =
        typeof challenge.country === 'string'
          ? challenge.country
          : challenge.country.id || challenge.country.en || '';
      if (cName && typeof cName === 'string' && cName.trim()) {
        countrySet.add(cName.trim().toLowerCase());
      }
    }
  });

  // 3. From completed Indonesia cases
  if (indoCasesCount > 0) {
    countrySet.add('indonesia');
  }

  const uniqueCountriesCount = countrySet.size;
  const activeChallenge = currentChallenge || getChallengeByLevel(currentLevelNumber);

  // Dynamically load strictly explored locations from player history & completed levels
  const recentLocations = getExploredLocations(gamification?.history, playerProgress?.levels);
  const CAROUSEL_PAGE_SIZE = 5;
  const maxCarouselIndex = Math.max(0, recentLocations.length - CAROUSEL_PAGE_SIZE);
  const visibleLocations = recentLocations.slice(carouselIndex, carouselIndex + CAROUSEL_PAGE_SIZE);

  // If player has fewer than 5 explored locations, calculate locked placeholder slots
  const remainingLockedCount = Math.max(0, CAROUSEL_PAGE_SIZE - visibleLocations.length);
  const lockedSlots = Array.from({ length: remainingLockedCount }, (_, i) => {
    const targetLvl = currentLevelNumber + i;
    return {
      level: targetLvl,
      isLocked: true,
      isNextToPlay: i === 0 && visibleLocations.length === 0,
    };
  });

  const getCountryName = (country: string) => {
    if (isEn) {
      if (country === 'Jepang') return 'Japan';
      if (country === 'Prancis') return 'France';
      if (country === 'Italia') return 'Italy';
      if (country === 'Amerika Serikat') return 'USA';
      if (country === 'Inggris Raya') return 'United Kingdom';
      if (country === 'Singapura') return 'Singapore';
      if (country === 'Jerman') return 'Germany';
      if (country === 'Belanda') return 'Netherlands';
      if (country === 'Spanyol') return 'Spain';
      if (country === 'Australia') return 'Australia';
    }
    return country;
  };

  const getCityName = (city: string) => {
    if (isEn) {
      if (city === 'Roma') return 'Rome';
      if (city === 'Singapura') return 'Singapore';
    }
    return city;
  };

  const [playerNickname, setPlayerNicknameState] = useState<string>(getPlayerNickname());
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardPlayer[]>([]);
  const [isLiveLeaderboard, setIsLiveLeaderboard] = useState<boolean>(false);
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [nicknameDraft, setNicknameDraft] = useState<string>(playerNickname);

  useEffect(() => {
    let isMounted = true;
    fetchLeaderboard(gamification.coins, leaderboardPeriod).then((res) => {
      if (isMounted) {
        setLeaderboardList(res.players);
        setIsLiveLeaderboard(res.isLive);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [leaderboardPeriod, gamification.coins, playerNickname]);

  const handleSaveNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nicknameDraft.trim();
    if (trimmed) {
      setPlayerNickname(trimmed);
      setPlayerNicknameState(trimmed);
      try {
        soundManager.playCorrect();
      } catch (_) {}

      // Immediately sync with Supabase leaderboard table!
      try {
        await submitPlayerScore(
          Math.max(0, gamification?.coins || 500),
          casesCompleted || 1,
          85
        );
        const res = await fetchLeaderboard(gamification?.coins || 500, leaderboardPeriod);
        setLeaderboardList(res.players);
        setIsLiveLeaderboard(res.isLive);
      } catch (err) {
        console.warn('Failed syncing nickname to Supabase:', err);
      }
    }
    setIsEditingNickname(false);
  };

  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCarouselIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCarouselIndex((prev) => Math.min(maxCarouselIndex, prev + 1));
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. TOP NAVBAR                                             */}
      {/* ========================================================= */}
      <header className="h-16 px-4 sm:px-6 bg-[#090f1d]/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-40 shrink-0">
        {/* Left: Brand Logo & Navigation Tabs */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Brand Logo & Name */}
          <div
            onClick={() => setActiveNav('beranda')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <img
              src={logoImg}
              alt="Time Trace"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_2px_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform"
            />
            <span className="text-lg sm:text-xl font-black tracking-tight flex items-center">
              <span className="text-white">Time</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Trace</span>
            </span>
          </div>

          {/* Streamlined Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                soundManager.playModalOpen();
                onOpenHowToPlay();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-transparent text-slate-400 hover:text-amber-300 hover:bg-slate-800/40 transition cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEn ? 'How to Play' : 'Cara Bermain'}</span>
            </button>

            <button
              onClick={() => {
                setActiveNav('warta');
                document.getElementById('warta-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition cursor-pointer"
            >
              <Newspaper className="w-3.5 h-3.5 text-rose-400" />
              <span>{isEn ? 'Journal' : 'Warta Sejarah'}</span>
            </button>
          </nav>
        </div>

        {/* Right: Resources, Search, Notifications & Player Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hearts / Chances */}
          <div
            onClick={dailyChances.remaining <= 0 ? onOpenWaitlist : onOpenLevelSelector}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold shadow-sm cursor-pointer hover:border-rose-400/60 transition"
            title={isEn ? 'Daily Cases Remaining (Click for Unlimited VIP)' : 'Sisa Kasus Harian (Klik untuk VIP Tanpa Batas)'}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{dailyChances.remaining}/{dailyChances.maxChances || 5}</span>
          </div>

          {/* VIP Pass Coming Soon Button */}
          {onOpenWaitlist && (
            <button
              onClick={onOpenWaitlist}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 hover:from-amber-500/35 hover:to-yellow-500/40 border border-amber-400/80 text-amber-300 text-xs font-mono font-bold shadow-md shadow-amber-950/40 cursor-pointer transition active:scale-95"
              title={isEn ? 'VIP Unlimited Access (Coming Soon)' : 'Akses VIP Tanpa Batas (Segera Hadir)'}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">VIP Pass</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/50">
                Coming Soon
              </span>
            </button>
          )}

          {/* Coins */}
          <div
            onClick={() => onOpenPassport('shop')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold shadow-sm cursor-pointer hover:border-amber-400/60 transition"
            title={isEn ? 'Explorer Coins' : 'Koin Penjelajah'}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{gamification.coins.toLocaleString(locale)}</span>
          </div>

          {/* Streak */}
          <div
            onClick={() => onOpenPassport('history')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold shadow-sm cursor-pointer hover:border-orange-400/60 transition"
            title={isEn ? 'Adventure Streak' : 'Streak Petualangan'}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            <span>{gamification.dailyStreak} {isEn ? 'days' : 'hari'}</span>
          </div>

          {/* Sound Audio Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded-xl border transition cursor-pointer flex items-center justify-center ${
              isMuted
                ? 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
            }`}
            title={isMuted ? (isEn ? 'Audio Muted (Click to Unmute)' : 'Efek Suara Bisu (Klik untuk Bunyikan)') : (isEn ? 'Audio Active (Click to Mute)' : 'Efek Suara Aktif (Klik untuk Bisukan)')}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-950/90 p-0.5 rounded-xl border border-slate-800 shadow-sm">
            <button
              onClick={() => switchLanguage('id')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                lang === 'id'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => switchLanguage('en')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                lang === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Profile Badge (Avatar + Rank + Level XP Bar) */}
          <div
            onClick={() => onOpenPassport('stats')}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-slate-800 hover:border-slate-700 shadow-md cursor-pointer transition"
          >
            {/* Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/30 to-indigo-600/30 border border-amber-400/50 flex items-center justify-center shadow-inner ring-1 ring-amber-400/40 shrink-0 overflow-hidden relative">
              <img
                src={rankAsset.image}
                alt={playerRank.title}
                className="w-full h-full object-cover object-top scale-135 translate-y-0.5"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Profile Info */}
            <div className="hidden lg:flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-200 tracking-tight leading-none">
                  {playerRank.title}
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold leading-none">
                  Level {currentLevelNumber}
                </span>
              </div>
              {/* Mini XP Bar */}
              <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(15, (playerProgress.totalStars * 15) % 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. SECTION A: HERO BANNER (Full Bleed / Edge-to-Edge)     */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden bg-[#060a14] min-h-[280px] sm:min-h-[310px] lg:min-h-[330px] flex items-center">
        {/* Background Illustration with Ambient Lighting & Animation Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated Ken Burns Cinematic Wallpaper - Anchored to object-left so Paris Eiffel Tower silhouette is completely visible */}
          <img
            src={DASHBOARD_ASSETS.heroDeskBg}
            alt="Time Trace Explorer Desk"
            className="w-full h-full object-cover object-left select-none pointer-events-none filter brightness-[1.22] contrast-[1.12] scale-105 animate-hero-kenburns"
          />

          {/* Warm Flickering Lantern Glow over the lantern & globe desk area */}
          <div className="absolute right-[5%] top-[10%] w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-lantern-flicker mix-blend-screen z-10" />

          {/* Floating Golden Dust & Chrono Motes Canvas */}
          <HeroParticles />

          {/* Fully transparent on the left side so the Paris Eiffel Tower silhouette, stars, and old world map are 100% visible */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#070d1a] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Hero Content aligned with widescreen layout */}
        <div className="relative z-20 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 flex flex-col justify-center">
          <div className="max-w-2xl space-y-2.5 sm:space-y-3">
            {/* Big Brand Title */}
            <div className="space-y-0.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">Time</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Trace</span>
              </h1>
              <h2 className="text-xs sm:text-sm lg:text-base font-bold text-amber-300 tracking-wide font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {isEn ? 'Chronological Mysteries & Archival Exploration' : 'Misteri Kronologis & Eksplorasi Arsip Masa Lalu'}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-200 leading-relaxed max-w-lg font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {isEn ? 'Explore the world through archives, uncover historical traces, and solve mysteries behind every location.' : 'Jelajahi dunia melalui arsip, temukan jejak sejarah, dan pecahkan misteri di balik setiap lokasi.'}
            </p>

            {/* Actions Row: Play Button & Claim Gelar */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              {/* Primary CTA Button: Lanjutkan Petualangan */}
              <button
                onClick={() => onStartCampaign(currentLevelNumber)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer group shrink-0"
              >
                <div className="w-4 h-4 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2 h-2 fill-current ml-0.5" />
                </div>
                <span>{isEn ? 'Continue Adventure' : 'Lanjutkan Petualangan'}</span>
                <span className="text-sm leading-none">→</span>
              </button>

              {/* Special Claim Gelar Button in Hero when 100 cases finished */}
              {is100Completed && onOpenClaimGelar && (
                <button
                  onClick={onOpenClaimGelar}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-400 hover:from-amber-400 hover:to-yellow-200 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(245,158,11,0.65)] flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer group shrink-0 animate-pulse border border-yellow-200"
                >
                  <Crown className="w-4 h-4 text-slate-950" />
                  <span>
                    {isTitleClaimed
                      ? (isEn ? 'View Title Diploma 📜' : 'Lihat Piagam Gelar 📜')
                      : (isEn ? '🏆 Claim Detective Title (100 Done)!' : '🏆 Klaim Gelar Detektif (100 Selesai)!')}
                  </span>
                </button>
              )}
            </div>

            {/* Clue Progress Line */}
            <div className="flex items-center gap-2 pt-0.5 text-[10px] font-mono text-slate-400">
              <span>{isEn ? 'Clues discovered' : 'Petunjuk ditemukan'} <strong className="text-amber-400 font-bold">2 / 5</strong></span>
              <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-2/5 h-full bg-amber-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION B: PLAYER STATS HORIZONTAL BAR (Full Width Strip) */}
      {/* ========================================================= */}
      <section className="w-full bg-[#070d1a] border-y border-slate-800/80 shadow-md">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Detective Profile Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center text-lg shadow-inner shrink-0 overflow-hidden relative">
              <img
                src={rankAsset.image}
                alt={playerRank.title}
                className="w-full h-full object-cover object-top scale-135 translate-y-0.5"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-white">{playerRank.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                  Level {currentLevelNumber}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 sm:w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(10, (playerProgress.totalStars * 15) % 100))}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400">3 / 300 XP</span>
              </div>
            </div>
          </div>

          {/* Right: 4 Fast Stats */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-sans">
            {/* Stat 1: Negara Ditemukan */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-white block leading-none">
                  {uniqueCountriesCount}
                </span>
                <span className="text-[10px] text-slate-400">{isEn ? 'Countries Discovered' : 'Negara Ditemukan'}</span>
              </div>
            </div>

            {/* Stat 2: Kasus Selesai */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-white block leading-none">
                  {casesCompleted}
                </span>
                <span className="text-[10px] text-slate-400">{isEn ? 'Cases Completed' : 'Kasus Selesai'}</span>
              </div>
            </div>

            {/* Stat 3: Koin */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-amber-300 block leading-none font-mono">
                  {gamification.coins.toLocaleString(locale)}
                </span>
                <span className="text-[10px] text-slate-400">{isEn ? 'Coins' : 'Koin'}</span>
              </div>
            </div>

            {/* Stat 4: Prestasi */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-white block leading-none font-mono">
                  {gamification.unlockedAchievements.length}/8
                </span>
                <span className="text-[10px] text-slate-400">{isEn ? 'Achievements' : 'Prestasi'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. MAIN SCROLLABLE DASHBOARD CONTENT                      */}
      {/* ========================================================= */}
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-7">

        {/* ========================================================= */}
        {/* SECTION C: 4-CARD GAME MODE & ROUTE MAP GRID              */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

          {/* CARD 1: MODE UTAMA - PETUALANGAN 100 KASUS */}
          <div
            onClick={() => onStartCampaign(currentLevelNumber)}
            className="group relative rounded-[28px] overflow-hidden p-6 sm:p-7 border-2 border-amber-400/90 hover:border-amber-300 bg-slate-950 shadow-xl hover:shadow-amber-500/20 transition-all cursor-pointer flex flex-col justify-between min-h-[340px]"
          >
            {/* Full Card Background: Vintage Map & Brass Compass */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={DASHBOARD_ASSETS.compassCard}
                alt="Petualangan 100 Kasus Background"
                className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500 filter brightness-[1.04] contrast-[1.08]"
              />
              {/* Soft localized gradient focused only behind the text for contrast, leaving the bottom area completely transparent */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent z-10" />
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-slate-950/60 to-transparent z-10" />
            </div>

            <div className="space-y-3.5 relative z-10">
              <span className="px-3.5 py-1.5 rounded-xl font-sans text-xs font-black tracking-wider bg-amber-400 text-stone-950 uppercase inline-block shadow-sm">
                {isEn ? 'MAIN MODE' : 'MODE UTAMA'}
              </span>

              <h3 className="text-3xl sm:text-[32px] xl:text-[34px] font-black font-serif text-white group-hover:text-amber-300 transition leading-[1.08] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {isEn ? <>100-Case<br />Adventure</> : <>Petualangan<br />100 Kasus</>}
              </h3>

              <p className="text-xs sm:text-[13.5px] text-stone-100 leading-[1.4] font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] max-w-[260px]">
                {isEn ? <>Explore 100 historical locations in<br className="hidden sm:inline" /> 10 world chapters and solve their mysteries.</> : <>Jelajahi 100 lokasi bersejarah dalam<br className="hidden sm:inline" /> 10 bab dunia dan pecahkan misterinya.</>}
              </p>
            </div>

            {/* Bottom Row: Transparent area with Button & Level/XP Stats side by side */}
            <div className="pt-4 mt-auto relative z-10 flex items-center justify-between gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartCampaign(currentLevelNumber);
                }}
                className="py-3 px-6 sm:py-3.5 sm:px-7 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-black/40 transition active:scale-98 cursor-pointer shrink-0"
              >
                <span>{isEn ? 'Continue' : 'Lanjutkan'}</span>
                <span className="text-lg leading-none font-bold">→</span>
              </button>

              <div className="flex-1 space-y-1.5 min-w-[100px]">
                <span className="text-sm font-black text-amber-400 font-sans block leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  Level {currentLevelNumber}
                </span>
                <div className="w-full h-2 sm:h-2.5 bg-black/60 backdrop-blur-xs rounded-full overflow-hidden flex items-center p-0.5 border border-white/10 shadow-inner">
                  <div
                    className="h-full bg-amber-400 rounded-full flex items-center justify-end"
                    style={{ width: `${Math.min(100, Math.max(15, (playerProgress.totalStars * 15) % 100))}%` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-200 shadow-sm shrink-0" />
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-300 font-medium font-sans block leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  3/300 XP
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2: MODE CEPAT - EKSPEDISI ACAK REGIONAL */}
          <div
            onClick={() => onStartExpedition(selectedExpeditionRegion)}
            className="group relative rounded-[28px] overflow-hidden p-6 sm:p-7 border-2 border-blue-500/70 hover:border-blue-400 bg-[#060c1c] shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer flex flex-col justify-between min-h-[360px]"
          >
            {/* Full Card Background: Fantasy Cosmic Globe Artwork */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={DASHBOARD_ASSETS.globe3dCard}
                alt="Ekspedisi Acak Regional Background"
                className="w-full h-full object-cover object-[78%_25%] group-hover:scale-105 transition-transform duration-500 filter brightness-[0.98] contrast-[1.05]"
              />
              {/* Vignette gradients to keep text and button crystal clear while keeping the globe glowing */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#060c1c]/95 via-[#060c1c]/70 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060c1c]/90 via-transparent to-[#060c1c]/25 z-10" />
            </div>

            <div className="space-y-3 relative z-10">
              <span className="px-3.5 py-1.5 rounded-xl font-sans text-xs font-black tracking-wider bg-[#3b82f6] text-[#061129] uppercase inline-block shadow-sm">
                {isEn ? 'QUICK PLAY' : 'MODE CEPAT'}
              </span>

              <h3 className="text-3xl sm:text-[32px] xl:text-[34px] font-black font-serif text-white group-hover:text-blue-300 transition leading-[1.08] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {isEn ? <>Regional Random<br />Expedition</> : <>Ekspedisi Acak<br />Regional</>}
              </h3>

              <p className="text-xs sm:text-[13.5px] text-stone-200/90 leading-[1.4] font-normal drop-shadow-sm max-w-[280px]">
                {isEn ? <>Test your detective deduction with<br className="hidden sm:inline" /> 5 random locations in chosen continents.</> : <>Uji kemampuan detektifmu dengan<br className="hidden sm:inline" /> 5 lokasi acak di benua atau wilayah pilihan.</>}
              </p>

              {/* Pilihan Regional Pills */}
              <div className="pt-1 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3 h-3 text-blue-400" />
                  <span>{isEn ? 'Choose Region:' : 'Pilih Wilayah:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(['global', 'indonesia', 'asia', 'europe', 'americas'] as RegionId[]).map((reg) => {
                    const isSelected = selectedExpeditionRegion === reg;
                    const rData = t.regions[reg];
                    return (
                      <button
                        key={reg}
                        type="button"
                        onClick={() => {
                          soundManager.playTick();
                          setSelectedExpeditionRegion(reg);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-500/50 border border-blue-300 scale-105'
                            : 'bg-[#08122c]/90 hover:bg-[#0f1f4b] text-slate-300 border border-blue-500/30'
                        }`}
                        title={rData.desc}
                      >
                        <span className="text-sm leading-none">{rData.flag}</span>
                        <span className="text-[11px]">
                          {reg === 'global' ? (isEn ? 'Global' : 'Seluruh Dunia') : reg === 'indonesia' ? 'Indonesia' : reg === 'asia' ? 'Asia' : reg === 'europe' ? (isEn ? 'Europe' : 'Eropa') : (isEn ? 'Americas' : 'Amerika')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-auto relative z-10 flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartExpedition(selectedExpeditionRegion);
                }}
                className="py-3 px-6 sm:py-3.5 sm:px-7 rounded-2xl bg-[#233876] hover:bg-[#2b4491] border border-blue-400/40 text-white font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-950/60 transition active:scale-98 cursor-pointer group/btn"
              >
                <span>{isEn ? 'Start Expedition' : 'Mulai Ekspedisi'}</span>
                <span className="text-lg leading-none font-bold group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* CARD 3: MISTERI HARIAN - TEKA-TEKI ARSIP HARIAN */}
          <div
            onClick={onStartDaily}
            className="group relative rounded-[28px] overflow-hidden p-6 sm:p-7 border-2 border-rose-500/60 hover:border-rose-400 bg-[#140409] shadow-xl hover:shadow-rose-500/20 transition-all cursor-pointer flex flex-col justify-between min-h-[340px]"
          >
            {/* Full Card Background: Japanese Pagoda Archival Photo & Magnifying Glass Artwork */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={DASHBOARD_ASSETS.dossierCard}
                alt="Teka-Teki Arsip Harian Background"
                className="w-full h-full object-cover object-[80%_20%] group-hover:scale-105 transition-transform duration-500 filter brightness-[1.02] contrast-[1.06]"
              />
              {/* Vignette gradients to keep text and controls crystal clear while keeping the archival photos bright */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#140409]/95 via-[#140409]/65 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140409]/90 via-transparent to-[#140409]/20 z-10" />
            </div>

            <div className="space-y-3.5 relative z-10">
              <span className="px-3.5 py-1.5 rounded-xl font-sans text-xs font-black tracking-wider bg-gradient-to-r from-rose-400 to-red-400 text-[#140409] uppercase inline-block shadow-sm">
                {isEn ? 'DAILY MYSTERY' : 'MISTERI HARIAN'}
              </span>

              <h3 className="text-3xl sm:text-[32px] xl:text-[34px] font-black font-serif text-white group-hover:text-rose-200 transition leading-[1.08] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {isEn ? <>Daily Archive<br />Mystery</> : <>Teka-Teki<br />Arsip Harian</>}
              </h3>

              <p className="text-xs sm:text-[13.5px] text-stone-200/90 leading-[1.4] font-normal drop-shadow-sm max-w-[260px]">
                {isEn ? <>Crack today&apos;s historical archive<br className="hidden sm:inline" /> for 2x extra bonus coins!</> : <>Pecahkan arsip sejarah hari ini<br className="hidden sm:inline" /> untuk hadiah 2x koin ekstra!</>}
              </p>

              {/* Countdown Timer Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#280712]/80 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold shadow-sm backdrop-blur-xs">
                <Clock className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>{isEn ? `Ends in ${timeUntilTomorrow}` : `Berakhir dalam ${timeUntilTomorrow}`}</span>
              </div>
            </div>

            <div className="pt-4 mt-auto relative z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartDaily();
                }}
                className="py-3 px-7 sm:py-3.5 sm:px-8 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-black/50 transition active:scale-98 cursor-pointer"
              >
                <span>{dailyCompleted ? (isEn ? 'Play Again' : 'Mainkan Lagi') : (isEn ? 'Start Now' : 'Mulai Sekarang')}</span>
                <span className="text-lg leading-none font-bold">→</span>
              </button>
            </div>
          </div>

          {/* CARD 4: MODE KHUSUS - JELAJAH INDONESIA */}
          <div
            onClick={() => onStartIndonesia ? onStartIndonesia(1) : onStartExpedition('indonesia')}
            className="group relative rounded-[28px] overflow-hidden p-6 sm:p-7 border-2 border-emerald-500/70 hover:border-emerald-400 bg-[#06140e] shadow-xl hover:shadow-emerald-500/20 transition-all cursor-pointer flex flex-col justify-between min-h-[340px]"
          >
            {/* Full Card Background: Candi Borobudur / Indonesian Heritage Artwork */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/city-images/L2_Magelang.png"
                alt="Jelajah Indonesia Background"
                className="w-full h-full object-cover object-[65%_35%] group-hover:scale-105 transition-transform duration-500 filter brightness-[0.98] contrast-[1.08]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DASHBOARD_ASSETS.heroDeskBg;
                }}
              />
              {/* Vignette gradients to keep text readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06140e]/95 via-[#06140e]/70 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06140e]/95 via-transparent to-[#06140e]/20 z-10" />
            </div>

            <div className="space-y-3.5 relative z-10">
              <span className="px-3.5 py-1.5 rounded-xl font-sans text-xs font-black tracking-wider bg-gradient-to-r from-red-600 to-rose-500 text-white uppercase inline-block shadow-sm">
                {isEn ? 'SPECIAL MODE' : 'MODE KHUSUS'}
              </span>

              <h3 className="text-3xl sm:text-[32px] xl:text-[34px] font-black font-serif text-white group-hover:text-emerald-300 transition leading-[1.08] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {isEn ? <>Explore<br />Indonesia</> : <>Jelajah<br />Indonesia</>}
              </h3>

              <p className="text-xs sm:text-[13.5px] text-stone-200/90 leading-[1.4] font-normal drop-shadow-sm max-w-[260px]">
                {isEn ? <>50 historical archive cases across the Indonesian archipelago from Sabang to Merauke.</> : <>50 kasus arsip bersejarah dari Sabang sampai Merauke di seluruh pelosok nusantara.</>}
              </p>

              {/* Nusantara Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shadow-sm backdrop-blur-xs">
                <span>🇮🇩</span>
                <span>{isEn ? '50 Archipelago Cases' : '50 Kasus Nusantara'}</span>
              </div>
            </div>

            <div className="pt-4 mt-auto relative z-10 flex items-center justify-between gap-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onStartIndonesia) onStartIndonesia();
                  else onStartExpedition('indonesia');
                }}
                className="flex-1 py-3 px-5 sm:py-3.5 sm:px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-black/50 transition active:scale-98 cursor-pointer"
              >
                <span>{isEn ? 'Explore' : 'Mulai Jelajah'}</span>
                <span className="text-lg leading-none font-bold">→</span>
              </button>

              {onOpenIndonesiaSelector && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenIndonesiaSelector();
                  }}
                  className="py-3 px-3.5 sm:py-3.5 sm:px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 shadow-lg transition active:scale-98 cursor-pointer shrink-0"
                  title={isEn ? 'Choose from 50 cases' : 'Pilih dari 50 daftar kasus'}
                >
                  <List className="w-4 h-4 text-emerald-400" />
                  <span>{isEn ? 'Cases' : 'Daftar Kasus'}</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION D: BOTTOM 2-COLUMN SECTION                        */}
        {/* Left: Lokasi Terakhir yang Dijelajahi (Carousel)          */}
        {/* Right: Papan Peringkat (Leaderboard Widget)               */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT COLUMN: LOKASI TERAKHIR YANG DIJELAJAHI (Carousel) */}
          <div className="lg:col-span-8 bg-[#0a101f]/90 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            {/* Header with Navigation Link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg">🗺️</span>
                <h3 className="text-sm sm:text-base font-black text-white">
                  {isEn ? 'Recently Explored Locations' : 'Lokasi Terakhir yang Dijelajahi'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">
                  {recentLocations.length} / 100 {isEn ? 'Unlocked' : 'Terbuka'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenLevelSelector}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition"
                >
                  <span>{isEn ? 'View All' : 'Lihat Semua'}</span>
                  <span>→</span>
                </button>

                {/* Carousel Left / Right Arrows (only for > 5 explored locations) */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleScrollCarousel('left')}
                    disabled={recentLocations.length <= CAROUSEL_PAGE_SIZE || carouselIndex === 0}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleScrollCarousel('right')}
                    disabled={recentLocations.length <= CAROUSEL_PAGE_SIZE || carouselIndex >= maxCarouselIndex}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Location Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {/* 1. Unlocked Explored Locations */}
              {visibleLocations.map((loc, idx) => {
                if (!loc) return null;
                return (
                  <div
                    key={`unlocked-${loc.level}-${idx}`}
                    onClick={() => onStartCampaign(loc.level || 1)}
                    className="group rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-400/70 shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    {/* Photo Thumbnail */}
                    <div className="relative h-28 w-full overflow-hidden bg-slate-900">
                      <img
                        src={loc.image || DASHBOARD_ASSETS.heroDeskBg}
                        alt={getCityName(loc.city) || (isEn ? 'Location' : 'Lokasi')}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = DASHBOARD_ASSETS.heroDeskBg;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-mono text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                        <span>✓</span>
                        <span>{isEn ? 'Explored' : 'Selesai'}</span>
                      </div>
                    </div>

                    {/* Card Content Info with Flag beside City Name */}
                    <div className="p-3 flex items-start gap-2.5">
                      {loc.countryCode ? (
                        <img
                          src={`https://flagcdn.com/w40/${loc.countryCode}.png`}
                          alt={getCountryName(loc.country)}
                          className="w-5 h-3.5 object-cover rounded-xs border border-white/20 shadow-xs shrink-0 mt-0.5 select-none"
                        />
                      ) : (
                        <span className="text-base leading-none shrink-0 mt-0.5 drop-shadow-sm select-none">
                          {loc.flag || '📍'}
                        </span>
                      )}
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate leading-tight">
                          {getCityName(loc.city) || (isEn ? 'City' : 'Kota')}, {getCountryName(loc.country) || (isEn ? 'Country' : 'Negara')}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400 block font-normal">
                          {loc.year || '----'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 2. Locked Placeholder Slots (for unexplored locations) */}
              {lockedSlots.map((slot, idx) => (
                <div
                  key={`locked-${slot.level}-${idx}`}
                  onClick={() => {
                    if (slot.isNextToPlay) {
                      onStartCampaign(slot.level);
                    } else {
                      onOpenLevelSelector();
                    }
                  }}
                  className={`group rounded-2xl overflow-hidden bg-slate-950/60 border transition-all flex flex-col ${
                    slot.isNextToPlay
                      ? 'border-dashed border-amber-400/50 hover:border-amber-300 hover:bg-slate-900/50 cursor-pointer shadow-sm'
                      : 'border-dashed border-slate-800/80 opacity-70 hover:opacity-90 cursor-pointer'
                  }`}
                >
                  {/* Mystery Silhouette Box */}
                  <div className="relative h-28 w-full bg-slate-900/40 flex flex-col items-center justify-center gap-1.5 p-3 text-center border-b border-slate-800/50">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      slot.isNextToPlay ? 'bg-amber-400/15 text-amber-400' : 'bg-slate-800/60 text-slate-500'
                    }`}>
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {slot.isNextToPlay
                        ? (isEn ? 'Next Mystery' : 'Kasus Selanjutnya')
                        : (isEn ? 'Locked Mystery' : 'Arsip Terkunci')}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-bold text-slate-300 group-hover:text-white transition truncate">
                      {isEn ? `Case Level ${slot.level}` : `Kasus Level ${slot.level}`}
                    </h4>
                    <span className={`text-[10px] block leading-tight font-medium ${
                      slot.isNextToPlay ? 'text-amber-400 font-semibold' : 'text-slate-500'
                    }`}>
                      {slot.isNextToPlay
                        ? (isEn ? 'Play to reveal photo →' : 'Mainkan untuk buka foto →')
                        : (isEn ? 'Explore to unlock' : 'Jelajahi untuk membuka')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PAPAN PERINGKAT (Leaderboard Widget) */}
          <div className="lg:col-span-4 bg-[#0a101f]/90 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            {/* Header with Filter Dropdown */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-black text-white">
                  {isEn ? 'Leaderboard' : 'Papan Peringkat'}
                </h3>
                {isLiveLeaderboard ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-400">
                    Global
                  </span>
                )}
              </div>

              {/* Period Dropdown Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    const next = leaderboardPeriod === 'week' ? 'month' : leaderboardPeriod === 'month' ? 'all' : 'week';
                    setLeaderboardPeriod(next);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 hover:border-slate-700 transition cursor-pointer"
                >
                  <span>
                    {leaderboardPeriod === 'week'
                      ? (isEn ? 'This Week' : 'Minggu Ini')
                      : leaderboardPeriod === 'month'
                      ? (isEn ? 'This Month' : 'Bulan Ini')
                      : (isEn ? 'All Time' : 'Semua Waktu')}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Nickname Editor Drawer */}
            {isEditingNickname && (
              <form onSubmit={handleSaveNickname} className="p-3 bg-slate-900 border border-amber-400/50 rounded-2xl space-y-2 animate-fade-in">
                <div className="text-[11px] font-bold text-amber-300 flex items-center justify-between">
                  <span>{isEn ? 'Set Your Detective Nickname:' : 'Ganti Nama Panggilan Detektif Anda:'}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={18}
                    value={nicknameDraft}
                    onChange={(e) => setNicknameDraft(e.target.value)}
                    placeholder={isEn ? 'Detective Name...' : 'Nama Panggilan...'}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {isEn ? 'Save' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingNickname(false)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                  >
                    {isEn ? 'Cancel' : 'Batal'}
                  </button>
                </div>
              </form>
            )}

            {/* Leaderboard Players List */}
            <div className="space-y-2">
              {leaderboardList.map((user) => (
                <div
                  key={`${user.rank}-${user.name}`}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border transition ${
                    user.isCurrent
                      ? 'bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border-amber-400/80 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Rank Badge */}
                    <div className="w-6 text-center text-xs font-mono font-bold text-slate-400">
                      {user.badge}
                    </div>

                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs shadow-inner shrink-0">
                      {user.avatar}
                    </div>

                    {/* Player Name */}
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold truncate max-w-[130px] ${
                        user.isCurrent ? 'text-amber-300' : 'text-slate-200'
                      }`}>
                        {user.name}
                      </span>
                      {user.isCurrent && (
                        <button
                          onClick={() => {
                            setNicknameDraft(playerNickname);
                            setIsEditingNickname(true);
                          }}
                          title={isEn ? 'Edit Nickname' : 'Ubah Nama'}
                          className="p-1 rounded hover:bg-amber-400/20 text-amber-300 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <span className={`text-xs font-mono font-bold ${
                    user.isCurrent ? 'text-amber-400' : 'text-amber-400/90'
                  }`}>
                    {user.score.toLocaleString(locale)}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer with Edit Nickname trigger */}
            <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-800/50">
              <button
                onClick={() => {
                  setNicknameDraft(playerNickname);
                  setIsEditingNickname((prev) => !prev);
                }}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 cursor-pointer transition hover:underline"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Customize Detective Nickname' : 'Ganti Nama Panggilan'}</span>
              </button>
              <span className="text-slate-500 font-mono text-[10px]">
                {isLiveLeaderboard ? (isEn ? 'Online Sync' : 'Tersinkron Cloud') : (isEn ? 'Offline / Auto' : 'Mode Otomatis')}
              </span>
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* SECTION E: WARTA & JURNAL ARSIP (The Chrono Gazette)     */}
        {/* ========================================================= */}
        <section id="warta-section" className="space-y-4 pt-3">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider shadow-xs">
                <Newspaper className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEn ? 'THE CHRONO GAZETTE' : 'WARTA BIRO KRONO'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif text-white tracking-tight flex items-center gap-2.5">
                <span>{isEn ? 'Detective Field Journal & Archives' : 'Jurnal Penjelajah & Arsip Sejarah'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
                {isEn
                  ? 'In-depth historical investigations, Street View deduction techniques, and archival photo discoveries to sharpen your chronological instincts.'
                  : 'Wawasan sejarah mendalam, teknik deduksi foto Street View, dan penelusuran arsip masa lalu untuk mempertajam insting detektif Anda.'}
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0 bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
              {[
                { id: 'all', label: isEn ? 'All Articles' : 'Semua Artikel' },
                { id: 'Panduan Detektif', label: isEn ? 'Guides' : 'Panduan' },
                { id: 'Arsip Nusantara', label: isEn ? 'Nusantara' : 'Nusantara' },
                { id: 'Kiat Meta', label: isEn ? 'Meta Clues' : 'Kiat Meta' },
                { id: 'Warisan Sejarah', label: isEn ? 'History' : 'Sejarah' },
              ].map((cat) => {
                const isActive = selectedBlogCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      try {
                        soundManager.playTick();
                      } catch (_) {}
                      setSelectedBlogCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredArticles.map((article) => {
              const artTitle = isEn ? article.title.en : article.title.id;
              const artExcerpt = isEn ? article.excerpt.en : article.excerpt.id;
              const artCategory = isEn ? article.category.en : article.category.id;

              return (
                <article
                  key={article.id}
                  onClick={() => {
                    try {
                      soundManager.playTick();
                    } catch (_) {}
                    setSelectedArticle(article);
                  }}
                  className="group rounded-3xl overflow-hidden bg-[#0a101f]/90 backdrop-blur-md border border-slate-800/90 hover:border-amber-400/60 shadow-xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
                >
                  {/* Thumbnail Container */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img
                      src={article.coverImage}
                      alt={artTitle}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter brightness-[1.02]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = DASHBOARD_ASSETS.heroDeskBg;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent opacity-90" />

                    {/* Category Pill on top left */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                      {artCategory}
                    </div>

                    {/* Read time on top right */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] font-mono text-slate-300 border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{article.readTime}</span>
                    </div>

                    {/* Related Level Pill */}
                    {article.relatedLevel && (
                      <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-amber-500/20 backdrop-blur-xs text-[10px] font-mono text-amber-300 border border-amber-400/40 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        <span>Level {article.relatedLevel}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      {/* Author & Date */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span>{article.author.avatar}</span>
                        <span className="font-sans font-semibold text-slate-300 truncate max-w-[120px]">
                          {article.author.name}
                        </span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold font-serif text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {artTitle}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {artExcerpt}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                      <span>{isEn ? 'Read Journal' : 'Baca Jurnal'}</span>
                      <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </main>

      {/* ========================================================= */}
      {/* 5. BUREAU CHRONO-CARTOGRAPHY THEMATIC FOOTER              */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#050811] border-t border-slate-800/80 mt-10">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Col 1 & 2: Branding & Description */}
            <div className="lg:col-span-2 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <img
                  src={logoImg}
                  alt="Time Trace"
                  className="w-8 h-8 object-contain drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
                />
                <span className="text-xl font-black tracking-tight">
                  <span className="text-white">Time</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Trace</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {isEn
                  ? 'Biro Krono-Kartografi Dunia. Travel through time via 360° panoramic archives, deduce epochs, and uncover historical mysteries behind world cities.'
                  : 'Biro Krono-Kartografi Dunia. Menjelajahi masa lalu melalui arsip fotografi panorama 360°, menguji deduksi tahun, dan mengungkap misteri sejarah kota-kota dunia.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isEn ? 'Archival Bureau Active • v1.4.0' : 'Biro Arsip Aktif • v1.4.0'}</span>
              </div>
            </div>

            {/* Col 3: Mode Permainan */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                {isEn ? 'Game Modes' : 'Mode Permainan'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => onStartCampaign(currentLevelNumber)}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? '100-Case Adventure' : 'Petualangan 100 Kasus'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onStartExpedition('global')}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? 'Random Expedition' : 'Ekspedisi Acak'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={onStartDaily}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? 'Daily Archive Mystery' : 'Misteri Arsip Harian'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onStartIndonesia ? onStartIndonesia(1) : onStartExpedition('indonesia')}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? 'Explore Indonesia (50 Cases)' : 'Jelajah Nusantara (50 Kasus)'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Fitur & Detektif */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                {isEn ? 'Field Bureau' : 'Biro Detektif'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => onOpenPassport('stats')}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? 'Detective Passport' : 'Paspor Detektif'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPassport('achievements')}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? 'Achievements & Badges' : 'Prestasi & Lencana'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenPassport('shop')}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? 'Chrono Shop & Gears' : 'Toko Krono & Perlengkapan'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenHowToPlay}
                    className="hover:text-amber-300 transition text-left cursor-pointer"
                  >
                    {isEn ? 'How to Play & Guide' : 'Panduan & Cara Bermain'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Jurnal Terkini */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                {isEn ? 'Recent Archives' : 'Jurnal Terkini'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {BLOG_ARTICLES.slice(0, 3).map((art) => (
                  <li key={art.id}>
                    <button
                      onClick={() => {
                        setSelectedArticle(art);
                      }}
                      className="hover:text-amber-300 transition text-left truncate max-w-[220px] block cursor-pointer"
                    >
                      {isEn ? art.title.en : art.title.id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>
              © 2026 Time Trace. {isEn ? 'All rights reserved.' : 'Hak cipta dilindungi.'}
            </div>
            <div className="flex items-center gap-4">
              <span>{isEn ? 'Historical Photography Archives' : 'Arsip Fotografi Sejarah'}</span>
              <span>•</span>
              <span>Powered by Google Maps & Street View</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 6. BLOG READER MODAL                                      */}
      {/* ========================================================= */}
      {selectedArticle && (
        <BlogReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          lang={lang}
          onStartCampaign={onStartCampaign}
          onSelectArticle={(a) => setSelectedArticle(a)}
        />
      )}
    </div>
  );
};
