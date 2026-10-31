import React, { useState, useEffect, useRef } from 'react';
import { loadGoogleMapsApi } from './utils/mapsLoader';
import {
  HISTORICAL_CHALLENGES,
  LEVELS_JELAJAH_INDONESIA,
  HistoricalPano,
  getChallengesByRegion,
  getChallengeByLevel,
} from './data/challenges';
import { calculateHaversineDistanceKm, calculateLocationScore, calculateYearScore, MINIMUM_PASS_SCORE } from './utils/scoring';
import { StreetViewViewer } from './components/StreetViewViewer';
import { GuessMap } from './components/GuessMap';
import { YearPickerTimeline } from './components/YearPickerTimeline';
import { ChronoGearPanel } from './components/ChronoGearPanel';
import { RoundResultModal } from './components/RoundResultModal';
import { LevelSelectorModal } from './components/LevelSelectorModal';
import { IndonesiaCaseSelectorModal } from './components/IndonesiaCaseSelectorModal';
import { HistoryAndPassportModal } from './components/HistoryAndPassportModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { GrandVictoryCelebrationModal } from './components/GrandVictoryCelebrationModal';
import { PremiumWaitlistModal } from './components/PremiumWaitlistModal';
import { AppBackground } from './components/AppBackground';
import { HomeDashboard } from './components/HomeDashboard';
import logoImg from './assets/logo.png';
import { soundManager } from './utils/soundManager';
import { Language, RegionId, TRANSLATIONS } from './utils/i18n';
import { sanitizeClue } from './utils/sanitizeClue';
import {
  getPlayerProgress,
  saveLevelScore,
  calculateStars,
  resetPlayerProgress,
  PlayerProgress,
  getIndonesiaProgress,
  saveIndonesiaCaseScore,
  resetIndonesiaProgress,
  IndonesiaProgress,
  getPlayerRank,
  DailyChances,
  getDailyChances,
  useDailyChance,
  resetDailyChances,
  getTimeUntilTomorrowFormatted,
  MAX_DAILY_CHANCES,
  ChronoUsage,
  getChronoUsage,
  useChronoActivation,
  resetChronoUsage,
  MAX_DAILY_CHRONO_USES,
} from './utils/progress';
import {
  getGamificationState,
  addGameHistory,
  GamificationState,
  Achievement,
  getDailyChallengeId,
  isDailyCompletedToday,
  resetGamification,
  calculateGrade,
  consumeCoins,
  toggleActiveItem,
  SHOP_ITEMS,
} from './utils/gamification';
import {
  Compass,
  Trophy,
  History,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Globe2,
  Languages,
  Check,
  MapPin,
  Star,
  List,
  Flame,
  Award,
  Coins,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Heart,
  AlertCircle,
  Clock,
  HelpCircle,
  Volume2,
  VolumeX,
  Car,
  Building2,
  Shirt,
  X,
  Crown,
  ChevronDown,
} from 'lucide-react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAyHABnIHtU02YfBdzsXoK8wDg2_N324Uc';
const DEFAULT_TOTAL_ROUNDS = 5;

export default function App() {
  const [mapsLoaded, setMapsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isPremiumWaitlistOpen, setIsPremiumWaitlistOpen] = useState<boolean>(false);

  // Localization & Region State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('time_trace_lang');
    return (saved === 'en' || saved === 'id') ? (saved as Language) : 'id';
  });
  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('time_trace_lang', newLang);
  };
  const [selectedRegion, setSelectedRegion] = useState<RegionId>('global');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<boolean>(false);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        regionDropdownRef.current &&
        !regionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRegionDropdownOpen(false);
      }
    };
    if (isRegionDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRegionDropdownOpen]);

  // Game Mode State: 'campaign' (100 Levels), 'expedition' (Quick 5 Rounds), 'daily' (Daily Mystery), or 'indonesia' (50 Nusantara Cases)
  const [gameMode, setGameMode] = useState<'campaign' | 'expedition' | 'daily' | 'indonesia'>('campaign');
  const [currentLevelNumber, setCurrentLevelNumber] = useState<number>(1);

  // Player Progress State (Persistent 100 Levels)
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress>(getPlayerProgress);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState<boolean>(false);

  // Indonesia Mode Progress State (Persistent 50 Cases)
  const [indonesiaProgress, setIndonesiaProgress] = useState<IndonesiaProgress>(getIndonesiaProgress);
  const [isIndonesiaModalOpen, setIsIndonesiaModalOpen] = useState<boolean>(false);

  // Daily Chances / Energy State (3 attempts per day to pass & unlock)
  const [dailyChances, setDailyChances] = useState<DailyChances>(getDailyChances);
  const [chronoUsage, setChronoUsage] = useState<ChronoUsage>(getChronoUsage);
  const [timeUntilTomorrow, setTimeUntilTomorrow] = useState<string>(() => getTimeUntilTomorrowFormatted(lang));

  // Gamification & Points State (Persistent Coins, Streak, History, Shop, Achievements)
  const [gamification, setGamification] = useState<GamificationState>(getGamificationState);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState<boolean>(false);
  const [passportModalInitialTab, setPassportModalInitialTab] = useState<'history' | 'stats' | 'achievements' | 'shop'>('history');
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [showGrandVictoryModal, setShowGrandVictoryModal] = useState<boolean>(false);
  const [chronoToast, setChronoToast] = useState<string | null>(null);

  const showChronoToast = (msg: string) => {
    setChronoToast(msg);
    setTimeout(() => setChronoToast(null), 3500);
  };

  // Audio Sound Effect Manager State
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.isMuted());

  const openLevelModal = () => {
    soundManager.playModalOpen();
    setIsLevelModalOpen(true);
  };

  const openPassportModal = (tab: 'history' | 'stats' | 'achievements' | 'shop' = 'history') => {
    soundManager.playModalOpen();
    setPassportModalInitialTab(tab);
    setIsPassportModalOpen(true);
  };

  const openHowToPlayModal = () => {
    soundManager.playModalOpen();
    setIsHowToPlayOpen(true);
  };

  // Game Progress State
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [activeChallenges, setActiveChallenges] = useState<HistoricalPano[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);

  // Current Round Guess State
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [submittedLocation, setSubmittedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2010);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [roundConfirmed, setRoundConfirmed] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [isTimeShiftActive, setIsTimeShiftActive] = useState<boolean>(false);
  const [showForensicHints, setShowForensicHints] = useState<boolean>(false);
  const [showChronoGear, setShowChronoGear] = useState<boolean>(false);
  const [activeHintTab, setActiveHintTab] = useState<'cars' | 'architecture' | 'culture'>('cars');

  // Scores & Level Results
  const [currentDistanceKm, setCurrentDistanceKm] = useState<number>(0);
  const [currentLocationScore, setCurrentLocationScore] = useState<number>(0);
  const [currentYearScore, setCurrentYearScore] = useState<number>(0);
  const [lastStarsEarned, setLastStarsEarned] = useState<number>(0);
  const [unlockedNextLevel, setUnlockedNextLevel] = useState<boolean>(false);
  const [lostLifeThisRound, setLostLifeThisRound] = useState<boolean>(false);

  // Gamification Round Reward Data
  const [lastEarnedCoins, setLastEarnedCoins] = useState<number>(0);
  const [lastNewAchievements, setLastNewAchievements] = useState<Achievement[]>([]);
  const [lastRoundGrade, setLastRoundGrade] = useState<'S' | 'A' | 'B' | 'C' | 'D'>('B');

  const t = TRANSLATIONS[lang];
  const locale = lang === 'en' ? 'en-US' : 'id-ID';
  const playerRank = getPlayerRank(playerProgress.totalStars, lang);
  const dailyCompleted = isDailyCompletedToday(gamification);

  // Initialize and load Google Maps SDK
  useEffect(() => {
    loadGoogleMapsApi(API_KEY)
      .then(() => {
        setMapsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load Google Maps SDK', err);
        setLoadError(
          lang === 'en'
            ? 'Failed to load Google Maps SDK. Please check your internet connection.'
            : 'Gagal memuat Google Maps SDK. Pastikan koneksi internet stabil.'
        );
      });
  }, [lang]);

  // Live timer for midnight chances & chrono limit reset
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilTomorrow(getTimeUntilTomorrowFormatted(lang));
      const fresh = getDailyChances();
      if (fresh.remaining !== dailyChances.remaining || fresh.lastDate !== dailyChances.lastDate) {
        setDailyChances(fresh);
      }
      const freshChrono = getChronoUsage();
      if (
        freshChrono.remaining !== chronoUsage.remaining ||
        freshChrono.lastDate !== chronoUsage.lastDate ||
        JSON.stringify(freshChrono.remainingByItem) !== JSON.stringify(chronoUsage.remainingByItem)
      ) {
        setChronoUsage(freshChrono);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lang, dailyChances, chronoUsage]);

  // Start campaign at a specific level (1-100)
  const startCampaignLevel = (levelNumber: number) => {
    const isAlreadyPassed = Boolean(
      playerProgress.levels[levelNumber] && playerProgress.levels[levelNumber].score >= MINIMUM_PASS_SCORE
    );

    // If level is uncleared and no daily chances left, block and open VIP subscription modal
    if (!isAlreadyPassed && dailyChances.remaining <= 0) {
      soundManager.playModalOpen();
      setIsPremiumWaitlistOpen(true);
      return;
    }

    const challenge = getChallengeByLevel(levelNumber);
    setGameMode('campaign');
    setCurrentLevelNumber(levelNumber);
    setActiveChallenges([challenge]);
    setCurrentRoundIndex(0);
    setTotalScore(0);
    setSelectedLocation(null);
    setSelectedYear(2010);
    setRoundConfirmed(false);
    setShowResultModal(false);
    setIsTimeShiftActive(false);
    setLostLifeThisRound(false);
    setGameStarted(true);
  };

  // Start daily mystery challenge
  const startDailyChallenge = () => {
    if (dailyChances.remaining <= 0) {
      soundManager.playModalOpen();
      setIsPremiumWaitlistOpen(true);
      return;
    }
    const dailyLevel = getDailyChallengeId(100);
    const challenge = getChallengeByLevel(dailyLevel);
    setGameMode('daily');
    setCurrentLevelNumber(dailyLevel);
    setActiveChallenges([challenge]);
    setCurrentRoundIndex(0);
    setTotalScore(0);
    setSelectedLocation(null);
    setSelectedYear(2010);
    setRoundConfirmed(false);
    setShowResultModal(false);
    setIsTimeShiftActive(false);
    setLostLifeThisRound(false);
    setGameStarted(true);
  };

  // Start quick expedition (5 rounds) by region
  const startQuickExpedition = (regionToUse: RegionId = selectedRegion) => {
    if (dailyChances.remaining <= 0) {
      soundManager.playModalOpen();
      setIsPremiumWaitlistOpen(true);
      return;
    }
    setSelectedRegion(regionToUse);
    const pool = getChallengesByRegion(regionToUse);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const roundsCount = Math.min(DEFAULT_TOTAL_ROUNDS, shuffled.length);
    const selected = shuffled.slice(0, roundsCount);

    setGameMode('expedition');
    setActiveChallenges(selected);
    setCurrentRoundIndex(0);
    setTotalScore(0);
    setSelectedLocation(null);
    setSelectedYear(2010);
    setRoundConfirmed(false);
    setShowResultModal(false);
    setIsTimeShiftActive(false);
    setLostLifeThisRound(false);
    setGameStarted(true);
  };

  // Start Indonesia heritage campaign (50 sequential cases)
  const startIndonesiaCampaign = (caseNumber: number = 1) => {
    if (dailyChances.remaining <= 0) {
      soundManager.playModalOpen();
      setIsPremiumWaitlistOpen(true);
      return;
    }
    const safeCase = Math.max(1, Math.min(50, caseNumber));
    const challenge = LEVELS_JELAJAH_INDONESIA[safeCase - 1] || LEVELS_JELAJAH_INDONESIA[0];
    setGameMode('indonesia');
    setCurrentLevelNumber(safeCase);
    setActiveChallenges([challenge]);
    setCurrentRoundIndex(0);
    setTotalScore(0);
    setSelectedLocation(null);
    setSelectedYear(2010);
    setRoundConfirmed(false);
    setShowResultModal(false);
    setIsTimeShiftActive(false);
    setLostLifeThisRound(false);
    setGameStarted(true);
  };

  const currentChallenge = activeChallenges[currentRoundIndex];
  const totalRounds = activeChallenges.length || DEFAULT_TOTAL_ROUNDS;

  const timeShiftRange: [number, number] | null = currentChallenge
    ? [
        Math.max(2007, currentChallenge.targetYear - 2),
        Math.min(2024, currentChallenge.targetYear + 2),
      ]
    : null;

  // Submit guess
  const handleConfirmGuess = () => {
    if (!selectedLocation || !currentChallenge) return;

    setIsSubmitting(true);

    const dist = calculateHaversineDistanceKm(
      selectedLocation.lat,
      selectedLocation.lng,
      currentChallenge.realLocation.lat,
      currentChallenge.realLocation.lng
    );

    const locScore = calculateLocationScore(dist);
    const yrScore = calculateYearScore(selectedYear, currentChallenge.targetYear);
    const roundTotal = locScore + yrScore;
    const yrDiff = Math.abs(selectedYear - currentChallenge.targetYear);
    const grade = calculateGrade(roundTotal);
    const isLevelPassed = roundTotal >= MINIMUM_PASS_SCORE;

    setSubmittedLocation(selectedLocation);
    setCurrentDistanceKm(dist);
    setCurrentLocationScore(locScore);
    setCurrentYearScore(yrScore);
    setTotalScore((prev) => prev + roundTotal);
    setRoundConfirmed(true);
    setLastRoundGrade(grade);

    let nextLevelUnlocked = false;
    let didLoseLife = false;

    // Deduct 1 life if score is below minimum points (MINIMUM_PASS_SCORE = 3000 pts)
    if (!isLevelPassed) {
      const updated = useDailyChance();
      setDailyChances(updated);
      didLoseLife = true;
    }

    // If in campaign or indonesia mode:
    if ((gameMode === 'campaign' || gameMode === 'indonesia') && currentChallenge.levelNumber) {
      if (gameMode === 'campaign') {
        const saveRes = saveLevelScore(currentChallenge.levelNumber, roundTotal);
        setLastStarsEarned(saveRes.starsEarned);
        setUnlockedNextLevel(saveRes.unlockedNext);
        nextLevelUnlocked = saveRes.unlockedNext;
        setPlayerProgress(getPlayerProgress());
      } else {
        const saveRes = saveIndonesiaCaseScore(currentChallenge.levelNumber, roundTotal);
        setLastStarsEarned(saveRes.starsEarned);
        setUnlockedNextLevel(saveRes.unlockedNext);
        nextLevelUnlocked = saveRes.unlockedNext;
        setIndonesiaProgress(getIndonesiaProgress());
      }
    }

    setLostLifeThisRound(didLoseLife);

    // Audio SFX Feedback: Leveling Up, Correct/Passed guess, or Incorrect guess
    if (isLevelPassed) {
      if (nextLevelUnlocked) {
        soundManager.playLevelUp();
      } else {
        soundManager.playCorrect();
      }
    } else {
      soundManager.playIncorrect();
    }

    // Save Game History & award Coins & Streaks & Achievements
    const histRes = addGameHistory({
      city: currentChallenge.city,
      country: currentChallenge.country[lang] || currentChallenge.country.id,
      targetYear: currentChallenge.targetYear,
      guessedYear: selectedYear,
      yearDiff: yrDiff,
      distanceKm: dist,
      locationScore: locScore,
      yearScore: yrScore,
      totalScore: roundTotal,
      mode: gameMode,
      levelNumber: currentChallenge.levelNumber,
    });

    setLastEarnedCoins(histRes.coinsEarned);
    setLastNewAchievements(histRes.newAchievements);
    setGamification(getGamificationState());

    if (histRes.coinsEarned > 0) {
      setTimeout(() => {
        soundManager.playCoin();
      }, 500);
    }

    // Deduct 1 usage from equipped photo filter and map theme (3x daily quota per item)
    let currentChrono = getChronoUsage();
    let gamificationChanged = false;

    if (gamification.activeFilter && gamification.activeFilter !== 'none') {
      currentChrono = useChronoActivation(gamification.activeFilter);
      const remainingUses = currentChrono.remainingByItem?.[gamification.activeFilter] ?? 0;
      if (remainingUses <= 0) {
        toggleActiveItem(gamification.activeFilter, 'filter');
        gamificationChanged = true;
        showChronoToast(
          lang === 'en'
            ? 'Daily quota (3x) for photo filter exhausted! Reverted to Normal.'
            : 'Kuota harian (3x) lensa foto habis! Dilepas otomatis ke Normal.'
        );
      }
    }

    if (gamification.activeTheme && gamification.activeTheme !== 'default') {
      currentChrono = useChronoActivation(gamification.activeTheme);
      const remainingUses = currentChrono.remainingByItem?.[gamification.activeTheme] ?? 0;
      if (remainingUses <= 0) {
        toggleActiveItem(gamification.activeTheme, 'theme');
        gamificationChanged = true;
        showChronoToast(
          lang === 'en'
            ? 'Daily quota (3x) for map theme exhausted! Reverted to Default.'
            : 'Kuota harian (3x) tema peta habis! Kembali ke tema Default.'
        );
      }
    }

    setChronoUsage(currentChrono);
    if (gamificationChanged) {
      setGamification(getGamificationState());
    }

    setIsSubmitting(false);
    setShowResultModal(true);
  };

  const TIME_SHIFT_COST = 150;

  const handleActivateTimeShift = () => {
    if (isTimeShiftActive || roundConfirmed || !currentChallenge) return;

    // Check daily 3x chrono limit for perk_time_shift
    const timeShiftRemaining = chronoUsage.remainingByItem?.['perk_time_shift'] ?? chronoUsage.remaining;
    if (timeShiftRemaining <= 0) {
      soundManager.playIncorrect();
      showChronoToast(
        lang === 'en'
          ? 'Daily Time Shift limit (3x) reached! Resets tomorrow at 00:00.'
          : 'Batas harian Time Shift (3x) habis! Reset besok pukul 00:00.'
      );
      return;
    }

    // If player owns perk_time_shift but has not equipped it yet, equip it
    if (
      gamification.unlockedShopItems.includes('perk_time_shift') &&
      gamification.activePerk !== 'perk_time_shift'
    ) {
      toggleActiveItem('perk_time_shift', 'perk');
      setGamification(getGamificationState());
    }

    if (gamification.coins < TIME_SHIFT_COST) {
      soundManager.playIncorrect();
      showChronoToast(
        lang === 'en'
          ? `Not enough coins! Time Shift activation requires ${TIME_SHIFT_COST} coins.`
          : `Koin tidak cukup! Aktivasi Time Shift butuh ${TIME_SHIFT_COST} koin.`
      );
      return;
    }

    const res = consumeCoins(TIME_SHIFT_COST);
    if (res.success) {
      const updatedChrono = useChronoActivation('perk_time_shift');
      setChronoUsage(updatedChrono);
      setGamification(getGamificationState());
      setIsTimeShiftActive(true);
      soundManager.playTimeShift();
      const leftUses = updatedChrono.remainingByItem?.['perk_time_shift'] ?? updatedChrono.remaining;
      showChronoToast(
        lang === 'en'
          ? `Time Shift active! Target narrowed to ${timeShiftRange ? `${timeShiftRange[0]}–${timeShiftRange[1]}` : '±2 years'}. (${leftUses}/3 left today)`
          : `Time Shift aktif! Rentang target ${timeShiftRange ? `${timeShiftRange[0]}–${timeShiftRange[1]}` : '±2 tahun'}. (Sisa ${leftUses}/3 hari ini)`
      );
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleToggleChronoItem = (itemId: string, category: 'filter' | 'theme' | 'perk') => {
    const isCurrentlyEquipped =
      (category === 'filter' && gamification.activeFilter === itemId) ||
      (category === 'theme' && gamification.activeTheme === itemId) ||
      (category === 'perk' && gamification.activePerk === itemId);

    // If trying to equip/use, check quota
    if (!isCurrentlyEquipped) {
      const remaining = chronoUsage.remainingByItem?.[itemId] ?? 3;
      if (remaining <= 0) {
        soundManager.playIncorrect();
        showChronoToast(
          lang === 'en'
            ? 'Daily quota (3x) for this item is exhausted! Resets tomorrow at 00:00.'
            : 'Batas harian (3x) item ini telah habis! Reset besok pukul 00:00.'
        );
        return;
      }
    }

    toggleActiveItem(itemId, category);
    const updated = getGamificationState();
    setGamification(updated);
    soundManager.playTick();

    const willBeEquipped = !isCurrentlyEquipped;
    const shopItem = SHOP_ITEMS.find((s) => s.id === itemId);
    const itemName = shopItem ? (shopItem.name[lang] || shopItem.name.id) : itemId;
    showChronoToast(
      willBeEquipped
        ? (lang === 'en' ? `${itemName} equipped!` : `${itemName} dipasang & digunakan!`)
        : (lang === 'en' ? `${itemName} unequipped.` : `${itemName} dilepas (tidak digunakan).`)
    );
  };

  const handleNextRound = () => {
    setShowResultModal(false);
    setRoundConfirmed(false);
    setSelectedLocation(null);
    setSelectedYear(2010);
    setIsTimeShiftActive(false);
    setLostLifeThisRound(false);
    setShowForensicHints(false);
    setShowChronoGear(false);

    if (gameMode === 'campaign') {
      if (currentLevelNumber < 100) {
        startCampaignLevel(currentLevelNumber + 1);
      } else {
        setGameStarted(false);
        setShowGrandVictoryModal(true);
      }
    } else if (gameMode === 'indonesia') {
      if (currentLevelNumber < 50) {
        startIndonesiaCampaign(currentLevelNumber + 1);
      } else {
        setGameStarted(false);
        showChronoToast(
          lang === 'en'
            ? '🎉 Incredible! You solved all 50 Indonesia Heritage Cases!'
            : '🎉 Luar biasa! Kamu telah menyelesaikan seluruh 50 Kasus Jelajah Nusantara!'
        );
      }
    } else if (gameMode === 'daily') {
      setGameStarted(false);
    } else {
      setCurrentRoundIndex((prev) => prev + 1);
    }
  };

  const handleRetryLevel = () => {
    setShowResultModal(false);
    setRoundConfirmed(false);
    setSelectedLocation(null);
    setSelectedYear(2010);
    setIsTimeShiftActive(false);
    setLostLifeThisRound(false);
    setShowForensicHints(false);
    setShowChronoGear(false);
    if (gameMode === 'campaign') {
      startCampaignLevel(currentLevelNumber);
    } else if (gameMode === 'indonesia') {
      startIndonesiaCampaign(currentLevelNumber);
    } else if (gameMode === 'daily') {
      startDailyChallenge();
    }
  };

  const handleBackToHome = () => {
    setShowResultModal(false);
    setRoundConfirmed(false);
    setSelectedLocation(null);
    setIsTimeShiftActive(false);
    setLostLifeThisRound(false);
    setShowForensicHints(false);
    setShowChronoGear(false);
    setGameStarted(false);
  };

  const handleResetAllProgress = () => {
    resetPlayerProgress();
    resetGamification();
    resetDailyChances();
    resetChronoUsage();
    setPlayerProgress(getPlayerProgress());
    setGamification(getGamificationState());
    setDailyChances(getDailyChances());
    setChronoUsage(getChronoUsage());
  };

  const isGameOver =
    gameMode === 'expedition' && currentRoundIndex >= totalRounds - 1 && roundConfirmed;

  const regionOptions: RegionId[] = ['global', 'indonesia', 'asia', 'europe', 'americas'];

  const todayFormatted = new Date().toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const nextCampaignPassed = Boolean(
    playerProgress.levels[playerProgress.unlockedLevel] &&
    playerProgress.levels[playerProgress.unlockedLevel].score >= MINIMUM_PASS_SCORE
  );

  // If game is not started, render the new rich Home Dashboard
  if (!gameStarted) {
    return (
      <div className="min-h-screen w-full bg-[#070b14] overflow-x-hidden">
        <HomeDashboard
          playerProgress={playerProgress}
          playerRank={playerRank}
          gamification={gamification}
          dailyChances={dailyChances}
          todayFormatted={todayFormatted}
          timeUntilTomorrow={timeUntilTomorrow}
          dailyCompleted={dailyCompleted}
          lang={lang}
          setLang={setLang}
          isMuted={isMuted}
          onToggleMute={() => {
            const nextMuted = soundManager.toggleMute();
            setIsMuted(nextMuted);
          }}
          currentChallenge={currentChallenge || getChallengeByLevel(playerProgress.unlockedLevel || 1)}
          onStartCampaign={(lvl) => startCampaignLevel(lvl)}
          onStartExpedition={(reg) => startQuickExpedition(reg)}
          onStartDaily={startDailyChallenge}
          onStartIndonesia={(caseNum) => startIndonesiaCampaign(caseNum || indonesiaProgress.unlockedCase || 1)}
          onOpenIndonesiaSelector={() => setIsIndonesiaModalOpen(true)}
          onOpenLevelSelector={openLevelModal}
          onOpenPassport={(tab) => openPassportModal(tab || 'shop')}
          onOpenHowToPlay={openHowToPlayModal}
          onOpenClaimGelar={() => setShowGrandVictoryModal(true)}
          onOpenWaitlist={() => {
            soundManager.playModalOpen();
            setIsPremiumWaitlistOpen(true);
          }}
        />

        {/* Global Modals Accessible From Dashboard */}
        <LevelSelectorModal
          isOpen={isLevelModalOpen}
          onClose={() => setIsLevelModalOpen(false)}
          onSelectLevel={startCampaignLevel}
          allChallenges={HISTORICAL_CHALLENGES}
          progress={playerProgress}
          lang={lang}
          onResetProgress={handleResetAllProgress}
          dailyChances={dailyChances}
          timeUntilTomorrow={timeUntilTomorrow}
          onOpenClaimGelar={() => setShowGrandVictoryModal(true)}
        />

        <HistoryAndPassportModal
          isOpen={isPassportModalOpen}
          onClose={() => setIsPassportModalOpen(false)}
          gamification={gamification}
          chronoUsage={chronoUsage}
          onRefreshGamification={() => {
            setGamification(getGamificationState());
            setChronoUsage(getChronoUsage());
          }}
          lang={lang}
          initialTab={passportModalInitialTab}
          onOpenClaimGelar={() => setShowGrandVictoryModal(true)}
        />

        <HowToPlayModal
          isOpen={isHowToPlayOpen}
          onClose={() => setIsHowToPlayOpen(false)}
          lang={lang}
        />

        {/* Grand Victory 100 Cases Celebration & Claim Gelar Modal */}
        {showGrandVictoryModal && (
          <GrandVictoryCelebrationModal
            lang={lang}
            progress={playerProgress}
            playerRank={playerRank}
            onClose={() => setShowGrandVictoryModal(false)}
            onOpenPassport={() => openPassportModal('stats')}
            onOpenLevelSelector={openLevelModal}
          />
        )}

        {/* Premium VIP Pass Coming Soon Modal */}
        <PremiumWaitlistModal
          isOpen={isPremiumWaitlistOpen}
          onClose={() => setIsPremiumWaitlistOpen(false)}
          lang={lang}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* Top Navigation Bar */}
      <header className="h-14 sm:h-16 px-3 sm:px-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-30 shrink-0">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src={logoImg}
              alt="Time Trace Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight flex items-center gap-1.5 text-white">
              Time <span className="text-amber-400">Trace</span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right Nav: Daily Chances, Coins, Streak, Passport, Levels, Language */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Daily Chances / Lives Indicator */}
          <button
            onClick={openLevelModal}
            className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-bold shadow-md transition cursor-pointer ${
              dailyChances.remaining > 0
                ? 'bg-rose-950/40 hover:bg-rose-900/60 border-rose-500/40 text-rose-300'
                : 'bg-rose-950/80 border-rose-500/80 text-rose-400 animate-pulse'
            }`}
            title={
              dailyChances.remaining > 0
                ? (lang === 'en' ? `${dailyChances.remaining}/${dailyChances.maxChances || MAX_DAILY_CHANCES} Daily Chances remaining` : `${dailyChances.remaining}/${dailyChances.maxChances || MAX_DAILY_CHANCES} Kesempatan menebak tersisa`)
                : (lang === 'en' ? `0/${dailyChances.maxChances || MAX_DAILY_CHANCES} Chances! Reset tomorrow in ${timeUntilTomorrow}` : `0/${dailyChances.maxChances || MAX_DAILY_CHANCES} Kesempatan habis! Tunggu besok (Reset: ${timeUntilTomorrow})`)
            }
          >
            <Heart className={`w-3.5 h-3.5 ${dailyChances.remaining > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
            <span className="font-mono">{dailyChances.remaining}/{dailyChances.maxChances || MAX_DAILY_CHANCES}</span>
            <span className="text-[10px] text-rose-400/80 hidden md:inline">
              {lang === 'en' ? 'Chances' : 'Kesempatan'}
            </span>
          </button>

          {/* Chrono Coins / Points Badge (Clickable to open Chrono Shop directly) */}
          <button
            onClick={() => openPassportModal('shop')}
            className="flex items-center gap-1.5 bg-slate-950/90 hover:bg-slate-800/90 px-2 sm:px-3 py-1.5 rounded-xl border border-amber-500/40 text-xs font-bold text-amber-300 shadow-md transition cursor-pointer group"
            title={lang === 'en' ? 'Chrono Shop: Spend Coins on Lenses, Gadgets & Themes' : 'Toko Penjelajah: Belanja Lensa, Gadget & Tema'}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition animate-pulse" />
            <span className="font-mono">{gamification.coins.toLocaleString(locale)}</span>
            <span className="text-[10px] text-amber-400/80 hidden lg:inline">{lang === 'en' ? 'Shop' : 'Toko'}</span>
          </button>

          {/* Daily Streak Indicator */}
          <button
            onClick={() => openPassportModal('stats')}
            className="flex items-center gap-1 bg-slate-950/90 hover:bg-slate-800/90 px-2 sm:px-2.5 py-1.5 rounded-xl border border-orange-500/40 text-xs font-bold text-orange-400 shadow-md transition cursor-pointer"
            title={lang === 'en' ? 'Daily Streak & Career Stats' : 'Streak Harian & Statistik'}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            <span className="font-mono">{gamification.dailyStreak}</span>
            <span className="text-[10px] text-orange-400/80 hidden lg:inline">{lang === 'en' ? 'days' : 'hari'}</span>
          </button>

          {/* Time Passport & History Button */}
          <button
            onClick={() => openPassportModal('history')}
            className="flex items-center gap-1.5 bg-indigo-950/70 hover:bg-indigo-900/80 px-2.5 sm:px-3 py-1.5 rounded-xl border border-indigo-500/40 text-xs font-bold text-indigo-200 shadow-md transition cursor-pointer"
            title={lang === 'en' ? 'View Time Passport, History & Shop' : 'Buka Paspor Waktu, Riwayat & Toko'}
          >
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{lang === 'en' ? 'Passport' : 'Paspor'}</span>
            {gamification.history.length > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300">
                {gamification.history.length}
              </span>
            )}
          </button>

          {/* Level Selector Button (Opens 100-Level Campaign Grid) - Only in Campaign Mode */}
          {gameMode === 'campaign' && (
            <button
              onClick={openLevelModal}
              className="flex items-center gap-1.5 bg-slate-950/90 hover:bg-slate-800/90 px-2 sm:px-2.5 py-1.5 rounded-xl border border-amber-500/40 text-xs font-bold text-amber-300 shadow-md transition cursor-pointer"
              title={lang === 'en' ? 'Open 100 Levels Map' : 'Buka Peta 100 Level'}
            >
              <List className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono hidden sm:inline">
                {lang === 'en' ? 'Levels' : '100 Level'} ({playerProgress.unlockedLevel}/100)
              </span>
              <div className="flex items-center gap-0.5 ml-0.5 text-amber-400 font-mono text-[11px]">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{playerProgress.totalStars}</span>
              </div>
            </button>
          )}

          {/* Regional Selector Pill & Dropdown (Mode Cepat - Ekspedisi Acak Regional) */}
          {gameMode === 'expedition' && (
            <div className="relative" ref={regionDropdownRef}>
              <button
                onClick={() => setIsRegionDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-950/90 to-indigo-950/90 hover:from-blue-900/90 hover:to-indigo-900/90 px-2.5 sm:px-3 py-1.5 rounded-xl border border-blue-400/60 hover:border-blue-300 text-xs font-bold text-blue-200 shadow-md shadow-blue-950/40 transition cursor-pointer group"
                title={lang === 'en' ? 'Choose Expedition Region' : 'Pilih Wilayah Ekspedisi'}
              >
                <Compass className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-45 transition-transform" />
                <span className="text-sm leading-none">{t.regions[selectedRegion]?.flag || '🌍'}</span>
                <span className="font-semibold text-white">
                  {selectedRegion === 'global'
                    ? (lang === 'en' ? 'Global' : 'Seluruh Dunia')
                    : selectedRegion === 'indonesia'
                    ? 'Indonesia'
                    : selectedRegion === 'asia'
                    ? 'Asia'
                    : selectedRegion === 'europe'
                    ? (lang === 'en' ? 'Europe' : 'Eropa')
                    : (lang === 'en' ? 'Americas' : 'Amerika')}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-blue-300 transition-transform duration-200 ${isRegionDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Regional Options Dropdown Menu */}
              {isRegionDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 sm:left-auto right-0 sm:right-auto z-50 w-64 sm:w-72 bg-slate-900/95 backdrop-blur-xl border border-blue-500/50 rounded-2xl p-1.5 shadow-2xl shadow-black/80 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 border-b border-slate-800 flex items-center justify-between">
                    <span>{lang === 'en' ? 'Expedition Region' : 'Pilihan Wilayah Regional'}</span>
                    <span className="text-slate-500 font-mono">5 {lang === 'en' ? 'rounds' : 'ronde'}</span>
                  </div>

                  {regionOptions.map((reg) => {
                    const isSelected = selectedRegion === reg;
                    const rData = t.regions[reg];
                    return (
                      <button
                        key={reg}
                        onClick={() => {
                          setIsRegionDropdownOpen(false);
                          if (reg !== selectedRegion) {
                            startQuickExpedition(reg);
                          }
                        }}
                        className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/30 border border-blue-400/50 text-white font-bold'
                            : 'hover:bg-slate-800/80 border border-transparent text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{rData.flag}</span>
                          <div>
                            <div className={`font-semibold ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                              {rData.name}
                            </div>
                            <div className="text-[10px] text-slate-400 line-clamp-1">
                              {rData.desc}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-400 shrink-0 ml-1.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Grandmaster Victory Button (If Level 100 passed and in campaign mode) */}
          {gameMode === 'campaign' && (playerProgress.levels[100]?.score >= MINIMUM_PASS_SCORE || playerProgress.unlockedLevel >= 100) && (
            <button
              onClick={() => setShowGrandVictoryModal(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/25 via-yellow-500/30 to-amber-500/25 hover:from-amber-500/40 hover:to-yellow-500/40 px-2 sm:px-2.5 py-1.5 rounded-xl border border-amber-400/80 text-xs font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition cursor-pointer animate-pulse"
              title={lang === 'en' ? 'Grandmaster 100 Cases Victory Page' : 'Lihat Halaman Tamat 100 Kasus & Gelar Detektif'}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-mono">
                {lang === 'en' ? 'Victory 👑' : 'Tamat 👑'}
              </span>
            </button>
          )}

          {/* Campaign Level / Daily Indicator */}
          {gameStarted && gameMode === 'campaign' && (
            <div className="bg-gradient-to-r from-amber-500/20 to-indigo-500/20 px-2.5 py-1 rounded-xl border border-amber-400/50 text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>LVL {currentLevelNumber}/100</span>
            </div>
          )}

          {gameStarted && gameMode === 'indonesia' && (
            <button
              onClick={() => setIsIndonesiaModalOpen(true)}
              className="bg-gradient-to-r from-emerald-950/90 to-teal-950/90 hover:from-emerald-900/90 hover:to-teal-900/90 px-2.5 sm:px-3 py-1.5 rounded-xl border border-emerald-400/70 hover:border-emerald-300 text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition cursor-pointer active:scale-95 group"
              title={lang === 'en' ? 'Select and explore cases (1-50)' : 'Pilih dan jelajahi kasus (1-50)'}
            >
              <span className="text-sm group-hover:scale-110 transition-transform">🇮🇩</span>
              <span>{lang === 'en' ? 'CASE' : 'KASUS'} {currentLevelNumber}/50</span>
              <List className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
            </button>
          )}

          {gameStarted && gameMode === 'daily' && (
            <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 px-2.5 py-1 rounded-xl border border-orange-400/50 text-xs font-mono font-bold text-orange-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              <span>DAILY</span>
            </div>
          )}

          {/* Quick Play In-game Stats */}
          {gameStarted && gameMode === 'expedition' && (
            <>
              <div className="bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 hidden sm:inline">{t.round}: </span>
                <span className="text-amber-400 font-bold">
                  {currentRoundIndex + 1}/{totalRounds}
                </span>
              </div>
              <div className="bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-mono flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-emerald-400 font-bold">
                  {totalScore.toLocaleString(locale)}
                </span>
              </div>
            </>
          )}

          {/* How to Play / Guide Button */}
          <button
            onClick={openHowToPlayModal}
            className="flex items-center gap-1.5 bg-slate-950/90 hover:bg-slate-800/90 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-700/80 text-xs font-bold text-slate-300 shadow-md transition cursor-pointer"
            title={lang === 'en' ? 'How to Play & Detective Guide' : 'Cara Bermain & Panduan Detektif'}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">{lang === 'en' ? 'How to Play' : 'Cara Bermain'}</span>
          </button>

          {/* VIP Pass / Langganan (Coming Soon) */}
          <button
            onClick={() => {
              soundManager.playModalOpen();
              setIsPremiumWaitlistOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 hover:from-amber-500/35 hover:to-yellow-500/40 border border-amber-400/80 text-xs font-bold text-amber-300 shadow-md shadow-amber-950/40 transition cursor-pointer active:scale-95"
            title={lang === 'en' ? 'Unlimited Cases & Ad-Free (Coming Soon)' : 'Akses Tanpa Batas & Bebas Iklan (Segera Hadir)'}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono hidden sm:inline">VIP Pass</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/50 font-mono font-semibold">
              Coming Soon
            </span>
          </button>

          {/* Sound Effects Audio Toggle */}
          <button
            onClick={() => {
              const nextMuted = soundManager.toggleMute();
              setIsMuted(nextMuted);
            }}
            className={`p-2 rounded-xl border text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
            }`}
            title={
              isMuted
                ? (lang === 'en' ? 'Sound Effects Muted (Click to Unmute)' : 'Efek Suara Bisu (Klik untuk Bunyikan)')
                : (lang === 'en' ? 'Sound Effects Active (Click to Mute)' : 'Efek Suara Aktif (Klik untuk Bisukan)')
            }
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Language Segmented Switch */}
          <div className="flex items-center bg-slate-950/90 p-0.5 rounded-xl border border-slate-700/90 shadow-md">
            <button
              onClick={() => setLang('id')}
              title="Ganti ke Bahasa Indonesia"
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                lang === 'id'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-sm">🇮🇩</span>
              <span className="text-[11px]">ID</span>
            </button>
            <button
              onClick={() => setLang('en')}
              title="Switch to English"
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                lang === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-sm">🇬🇧</span>
              <span className="text-[11px]">EN</span>
            </button>
          </div>

          {/* Exit / Return to Menu Button */}
          {gameStarted && (
            <button
              onClick={() => setGameStarted(false)}
              title={t.restart}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative flex-1 w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden">
        {/* Permanent Vintage Antique Cartography Visual Asset */}
        <AppBackground />

        {/* IN-GAME ACTIVE VIEW */}
        {gameStarted && currentChallenge && mapsLoaded && (
          <div className="relative w-full h-full">
            {/* Google Street View Fullscreen 360 Viewer */}
            <div className="absolute inset-0">
              <StreetViewViewer
                key={currentChallenge.id}
                challenge={currentChallenge}
                apiKey={API_KEY}
                isInspecting={!roundConfirmed}
                lang={lang}
                activeFilter={gamification.activeFilter}
              />
            </div>

            {/* Bottom-Left Floating Panel: Forensic Clues & Chrono Equipment */}
            {(showForensicHints || showChronoGear) && !roundConfirmed && (
              <div className="absolute left-3 sm:left-4 bottom-3 sm:bottom-4 z-30 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-slate-900/95 backdrop-blur-md rounded-2xl border border-amber-500/50 shadow-2xl p-4 text-white animate-in fade-in slide-in-from-bottom-2">
                {/* Unified Tab Switcher Header */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    {/* Tab 1: Chrono Gear */}
                    <button
                      onClick={() => {
                        setShowChronoGear(true);
                        setShowForensicHints(false);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        showChronoGear
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'en' ? 'Chrono Gear' : 'Peralatan Chrono'}</span>
                      {gamification.unlockedShopItems.length > 0 && (
                        <span className="text-[10px] px-1 rounded-full bg-amber-500/30 text-amber-300 font-mono">
                          {gamification.unlockedShopItems.length}
                        </span>
                      )}
                    </button>

                    {/* Tab 2: Forensic Clues */}
                    <button
                      onClick={() => {
                        setShowForensicHints(true);
                        setShowChronoGear(false);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        showForensicHints
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'en' ? 'Clues' : 'Petunjuk'}</span>
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setShowForensicHints(false);
                      setShowChronoGear(false);
                    }}
                    className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl transition cursor-pointer"
                    title={lang === 'en' ? 'Close Panel' : 'Tutup Panel'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tab Content: Chrono Gear Panel */}
                {showChronoGear && (
                  <ChronoGearPanel
                    lang={lang}
                    unlockedShopItems={gamification.unlockedShopItems}
                    activeFilter={gamification.activeFilter}
                    activeTheme={gamification.activeTheme}
                    activePerk={gamification.activePerk}
                    chronoUsage={chronoUsage}
                    onToggleItem={handleToggleChronoItem}
                    isTimeShiftEquipped={
                      gamification.activePerk === 'perk_time_shift' ||
                      gamification.unlockedShopItems.includes('perk_time_shift')
                    }
                    isTimeShiftActive={isTimeShiftActive}
                    timeShiftRange={timeShiftRange}
                    timeShiftCost={TIME_SHIFT_COST}
                    playerCoins={gamification.coins}
                    onActivateTimeShift={handleActivateTimeShift}
                    onOpenShop={() => openPassportModal('shop')}
                    disabled={roundConfirmed}
                  />
                )}

                {/* Tab Content: Forensic Clues */}
                {showForensicHints && (
                  <div>
                    {/* Clue Category Selector */}
                    <div className="flex gap-1.5 mb-3">
                      <button
                        onClick={() => setActiveHintTab('cars')}
                        className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition cursor-pointer ${
                          activeHintTab === 'cars'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        <Car className="w-3.5 h-3.5" />
                        <span>{t.tabCars}</span>
                      </button>
                      <button
                        onClick={() => setActiveHintTab('architecture')}
                        className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition cursor-pointer ${
                          activeHintTab === 'architecture'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{t.tabArchitecture}</span>
                      </button>
                      <button
                        onClick={() => setActiveHintTab('culture')}
                        className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition cursor-pointer ${
                          activeHintTab === 'culture'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        <Shirt className="w-3.5 h-3.5" />
                        <span>{t.tabCulture}</span>
                      </button>
                    </div>

                    {/* Hint Content Box */}
                    <div className="text-slate-200 text-xs bg-slate-950/85 p-3.5 rounded-xl border border-slate-800/90 leading-relaxed shadow-inner">
                      {activeHintTab === 'cars' && (
                        <p>
                          <strong className="text-amber-400 font-bold">{t.labelCars} </strong>
                          {sanitizeClue(currentChallenge.hints.cars[lang], currentChallenge.city, lang)}
                        </p>
                      )}
                      {activeHintTab === 'architecture' && (
                        <p>
                          <strong className="text-amber-400 font-bold">{t.labelArchitecture} </strong>
                          {sanitizeClue(currentChallenge.hints.architecture[lang], currentChallenge.city, lang)}
                        </p>
                      )}
                      {activeHintTab === 'culture' && (
                        <p>
                          <strong className="text-amber-400 font-bold">{t.labelCulture} </strong>
                          {sanitizeClue(currentChallenge.hints.cultureOrFashion[lang], currentChallenge.city, lang)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom-Right Floating Mystery Guessing Station */}
            <div className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 z-20 flex flex-col items-end gap-2 sm:gap-2.5 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] max-h-[calc(100vh-4.5rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-visible scrollbar-none pointer-events-auto pr-0.5">
              {/* Year Timeline Panel */}
              <div className="w-80 sm:w-96">
                <YearPickerTimeline
                  selectedYear={selectedYear}
                  onYearSelect={(yr) => {
                    setSelectedYear(yr);
                    soundManager.playTick();
                  }}
                  disabled={roundConfirmed}
                  actualYear={currentChallenge.targetYear}
                  revealed={roundConfirmed}
                  challenge={currentChallenge}
                  lang={lang}
                  showHints={showForensicHints}
                  onToggleHints={() => {
                    if (showForensicHints) {
                      setShowForensicHints(false);
                    } else {
                      setShowForensicHints(true);
                      setShowChronoGear(false);
                    }
                  }}
                  showChronoGear={showChronoGear}
                  onToggleChronoGear={() => {
                    if (showChronoGear) {
                      setShowChronoGear(false);
                    } else {
                      setShowChronoGear(true);
                      setShowForensicHints(false);
                    }
                  }}
                  unlockedShopItems={gamification.unlockedShopItems}
                  activeFilter={gamification.activeFilter}
                  activeTheme={gamification.activeTheme}
                  activePerk={gamification.activePerk}
                  chronoUsage={chronoUsage}
                  onToggleItem={handleToggleChronoItem}
                  isTimeShiftEquipped={
                    gamification.activePerk === 'perk_time_shift' ||
                    gamification.unlockedShopItems.includes('perk_time_shift')
                  }
                  isTimeShiftActive={isTimeShiftActive}
                  timeShiftRange={timeShiftRange}
                  timeShiftCost={TIME_SHIFT_COST}
                  playerCoins={gamification.coins}
                  chronoUsesRemaining={chronoUsage.remainingByItem?.['perk_time_shift'] ?? chronoUsage.remaining}
                  maxChronoUses={chronoUsage.maxUses}
                  onActivateTimeShift={handleActivateTimeShift}
                  onOpenShop={() => openPassportModal('shop')}
                />
              </div>

              {/* Mini Map for Guessing Location */}
              <GuessMap
                onLocationSelected={setSelectedLocation}
                selectedLocation={selectedLocation}
                confirmed={roundConfirmed}
                actualLocation={currentChallenge.realLocation}
                lang={lang}
                region={gameMode === 'campaign' || gameMode === 'daily' ? 'global' : gameMode === 'indonesia' ? 'indonesia' : selectedRegion}
                theme={gamification.activeTheme}
              />

              {/* Submit Guess Action Button */}
              {!roundConfirmed && (
                <button
                  onClick={handleConfirmGuess}
                  disabled={!selectedLocation || isSubmitting}
                  className={`w-80 sm:w-96 py-3.5 px-6 rounded-2xl font-black text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                    selectedLocation
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/30 scale-100 active:scale-98'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed opacity-80'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {selectedLocation
                      ? t.submitGuessBtn(selectedYear)
                      : t.markMapFirstBtn}
                  </span>
                </button>
              )}
            </div>

            {/* Floating Toast Notification for Chrono / Time Shift Actions */}
            {chronoToast && (
              <div className="absolute top-18 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-amber-400/80 shadow-2xl backdrop-blur-md text-amber-300 text-xs font-bold font-mono animate-in fade-in slide-in-from-top-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
                <span>{chronoToast}</span>
              </div>
            )}

            {/* Round Result Modal */}
            {showResultModal && (
              <RoundResultModal
                challenge={currentChallenge}
                locationScore={currentLocationScore}
                yearScore={currentYearScore}
                distanceKm={currentDistanceKm}
                guessedYear={selectedYear}
                guessedLocation={submittedLocation || selectedLocation}
                roundNumber={currentRoundIndex + 1}
                totalRounds={totalRounds}
                totalScore={totalScore}
                onNextRound={handleNextRound}
                isGameOver={isGameOver}
                onRestart={handleBackToHome}
                lang={lang}
                gameMode={gameMode}
                levelNumber={currentChallenge.levelNumber}
                starsEarned={lastStarsEarned}
                unlockedNextLevel={unlockedNextLevel}
                onOpenLevelSelect={gameMode === 'indonesia' ? () => setIsIndonesiaModalOpen(true) : openLevelModal}
                onRetryLevel={handleRetryLevel}
                chancesRemaining={dailyChances.remaining}
                maxChances={dailyChances.maxChances || MAX_DAILY_CHANCES}
                lostLifeThisRound={lostLifeThisRound}
                timeUntilTomorrow={timeUntilTomorrow}
                coinsEarned={lastEarnedCoins}
                newAchievements={lastNewAchievements}
                grade={lastRoundGrade}
                onOpenPassport={() => openPassportModal('shop')}
                onOpenWaitlist={() => setIsPremiumWaitlistOpen(true)}
              />
            )}
          </div>
        )}

        {/* 100-Level Selector Modal */}
        <LevelSelectorModal
          isOpen={isLevelModalOpen}
          onClose={() => setIsLevelModalOpen(false)}
          onSelectLevel={startCampaignLevel}
          allChallenges={HISTORICAL_CHALLENGES}
          progress={playerProgress}
          lang={lang}
          onResetProgress={handleResetAllProgress}
          dailyChances={dailyChances}
          timeUntilTomorrow={timeUntilTomorrow}
          onOpenClaimGelar={() => setShowGrandVictoryModal(true)}
        />

        {/* 50-Case Indonesia Heritage Selector Modal */}
        <IndonesiaCaseSelectorModal
          isOpen={isIndonesiaModalOpen}
          onClose={() => setIsIndonesiaModalOpen(false)}
          onSelectCase={(caseNum) => startIndonesiaCampaign(caseNum)}
          allCases={LEVELS_JELAJAH_INDONESIA}
          progress={indonesiaProgress}
          lang={lang}
          dailyChances={dailyChances}
          timeUntilTomorrow={timeUntilTomorrow}
        />

        {/* Time Passport & History & Shop Modal */}
        <HistoryAndPassportModal
          isOpen={isPassportModalOpen}
          onClose={() => setIsPassportModalOpen(false)}
          gamification={gamification}
          chronoUsage={chronoUsage}
          onRefreshGamification={() => {
            setGamification(getGamificationState());
            setChronoUsage(getChronoUsage());
          }}
          lang={lang}
          initialTab={passportModalInitialTab}
          onOpenClaimGelar={() => setShowGrandVictoryModal(true)}
        />

        {/* How to Play Detective Guide Modal */}
        <HowToPlayModal
          isOpen={isHowToPlayOpen}
          onClose={() => setIsHowToPlayOpen(false)}
          lang={lang}
        />

        {/* Grand Victory 100 Cases Celebration Modal */}
        {showGrandVictoryModal && (
          <GrandVictoryCelebrationModal
            lang={lang}
            progress={playerProgress}
            playerRank={playerRank}
            onClose={() => setShowGrandVictoryModal(false)}
            onOpenPassport={() => openPassportModal('history')}
            onOpenLevelSelector={openLevelModal}
          />
        )}

        {/* Premium VIP Pass Coming Soon Modal */}
        <PremiumWaitlistModal
          isOpen={isPremiumWaitlistOpen}
          onClose={() => setIsPremiumWaitlistOpen(false)}
          lang={lang}
        />
      </main>
    </div>
  );
}
