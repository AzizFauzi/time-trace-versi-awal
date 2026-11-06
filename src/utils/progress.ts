import { Language } from './i18n';
import { MINIMUM_PASS_SCORE } from './scoring';

export { MINIMUM_PASS_SCORE };

export interface LevelRecord {
  score: number;
  stars: number; // 0, 1, 2, 3
  completedAt: string;
}

export interface PlayerProgress {
  unlockedLevel: number; // 1 to 100
  levels: Record<number, LevelRecord>;
  totalStars: number;
  totalScore: number;
}

const STORAGE_KEY = 'street_view_time_traveler_progress_v3';

// Auto-cleanup legacy storage keys on load
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('street_view_time_traveler_indonesia_progress_v1');
    localStorage.removeItem('street_view_time_traveler_progress_v2');
  } catch (_) {}
}

export function calculateStars(score: number): number {
  if (score >= 8000) return 3;
  if (score >= 5500) return 2;
  if (score >= MINIMUM_PASS_SCORE) return 1;
  return 0;
}

export function getPlayerProgress(): PlayerProgress {
  if (typeof window === 'undefined') {
    return { unlockedLevel: 1, levels: {}, totalStars: 0, totalScore: 0 };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { unlockedLevel: 1, levels: {}, totalStars: 0, totalScore: 0 };
    }
    const parsed = JSON.parse(raw);
    const unlockedLevel = Math.max(1, Math.min(100, parsed.unlockedLevel || 1));
    const levels = parsed.levels || {};

    let totalStars = 0;
    let totalScore = 0;
    Object.values(levels as Record<number, LevelRecord>).forEach((rec) => {
      totalStars += rec.stars || 0;
      totalScore += rec.score || 0;
    });

    return {
      unlockedLevel,
      levels,
      totalStars,
      totalScore,
    };
  } catch (e) {
    console.error('Failed to read progress from storage', e);
    return { unlockedLevel: 1, levels: {}, totalStars: 0, totalScore: 0 };
  }
}

export function saveLevelScore(levelNumber: number, score: number): {
  starsEarned: number;
  isNewHigh: boolean;
  unlockedNext: boolean;
  newUnlockedLevel: number;
} {
  const current = getPlayerProgress();
  const starsEarned = calculateStars(score);
  const existing = current.levels[levelNumber];

  const isNewHigh = !existing || score > existing.score;
  const bestScore = isNewHigh ? score : existing.score;
  const bestStars = isNewHigh ? starsEarned : existing.stars;

  current.levels[levelNumber] = {
    score: bestScore,
    stars: bestStars,
    completedAt: new Date().toISOString(),
  };

  let unlockedNext = false;
  let newUnlocked = current.unlockedLevel;

  // Passing threshold is >= MINIMUM_PASS_SCORE points (at least 1 star)
  if (score >= MINIMUM_PASS_SCORE && levelNumber >= current.unlockedLevel && levelNumber < 100) {
    newUnlocked = levelNumber + 1;
    current.unlockedLevel = newUnlocked;
    unlockedNext = true;
  }

  // Recalculate totals
  let totalStars = 0;
  let totalScore = 0;
  Object.values(current.levels).forEach((rec) => {
    totalStars += rec.stars || 0;
    totalScore += rec.score || 0;
  });
  current.totalStars = totalStars;
  current.totalScore = totalScore;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save progress to storage', e);
  }

  return {
    starsEarned,
    isNewHigh,
    unlockedNext,
    newUnlockedLevel: newUnlocked,
  };
}

export function resetPlayerProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
}

export interface IndonesiaProgress {
  unlockedCase: number; // 1 to 50
  cases: Record<number, LevelRecord>;
  totalStars: number;
  totalScore: number;
}

const INDONESIA_STORAGE_KEY = 'street_view_time_traveler_indonesia_progress_v2';

export function getIndonesiaProgress(): IndonesiaProgress {
  if (typeof window === 'undefined') {
    return { unlockedCase: 1, cases: {}, totalStars: 0, totalScore: 0 };
  }
  try {
    const raw = localStorage.getItem(INDONESIA_STORAGE_KEY);
    if (!raw) {
      return { unlockedCase: 1, cases: {}, totalStars: 0, totalScore: 0 };
    }
    const parsed = JSON.parse(raw);
    const unlockedCase = Math.max(1, Math.min(50, parsed.unlockedCase || 1));
    const cases = parsed.cases || {};
    let totalStars = 0;
    let totalScore = 0;
    Object.values(cases as Record<number, LevelRecord>).forEach((rec) => {
      totalStars += rec.stars || 0;
      totalScore += rec.score || 0;
    });
    return {
      unlockedCase,
      cases,
      totalStars,
      totalScore,
    };
  } catch (e) {
    console.error('Failed to read indonesia progress from storage', e);
    return { unlockedCase: 1, cases: {}, totalStars: 0, totalScore: 0 };
  }
}

export function saveIndonesiaCaseScore(caseNumber: number, score: number): {
  starsEarned: number;
  isNewHigh: boolean;
  unlockedNext: boolean;
  newUnlockedCase: number;
} {
  const current = getIndonesiaProgress();
  const starsEarned = calculateStars(score);
  const existing = current.cases[caseNumber];

  const isNewHigh = !existing || score > existing.score;
  const bestScore = isNewHigh ? score : existing.score;
  const bestStars = isNewHigh ? starsEarned : existing.stars;

  current.cases[caseNumber] = {
    score: bestScore,
    stars: bestStars,
    completedAt: new Date().toISOString(),
  };

  let unlockedNext = false;
  let newUnlocked = current.unlockedCase;

  if (score >= MINIMUM_PASS_SCORE && caseNumber >= current.unlockedCase && caseNumber < 50) {
    newUnlocked = caseNumber + 1;
    current.unlockedCase = newUnlocked;
    unlockedNext = true;
  }

  let totalStars = 0;
  let totalScore = 0;
  Object.values(current.cases).forEach((rec) => {
    totalStars += rec.stars || 0;
    totalScore += rec.score || 0;
  });
  current.totalStars = totalStars;
  current.totalScore = totalScore;

  try {
    localStorage.setItem(INDONESIA_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save indonesia progress to storage', e);
  }

  return {
    starsEarned,
    isNewHigh,
    unlockedNext,
    newUnlockedCase: newUnlocked,
  };
}

export function resetIndonesiaProgress(): void {
  try {
    localStorage.removeItem(INDONESIA_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear indonesia progress', e);
  }
}

export interface PlayerRank {
  title: string;
  badge: string;
  color: string;
  minStars: number;
}

export function getPlayerRank(totalStars: number, lang: Language): PlayerRank {
  const ranks: { minStars: number; id: string; en: string; badge: string; color: string }[] = [
    {
      minStars: 280,
      id: 'Grandmaster Penjelajah Waktu',
      en: 'Legendary Time Grandmaster',
      badge: '👑',
      color: 'text-amber-400',
    },
    {
      minStars: 220,
      id: 'Penjaga Garis Waktu',
      en: 'Chronos Guardian',
      badge: '⚡',
      color: 'text-purple-400',
    },
    {
      minStars: 160,
      id: 'Master Detektif Arsip',
      en: 'Master Archive Detective',
      badge: '🏆',
      color: 'text-indigo-400',
    },
    {
      minStars: 100,
      id: 'Arkeolog Geografi Senior',
      en: 'Senior Geo-Archaeologist',
      badge: '🧭',
      color: 'text-cyan-400',
    },
    {
      minStars: 50,
      id: 'Penyelidik Kronologis',
      en: 'Chronological Investigator',
      badge: '🔍',
      color: 'text-emerald-400',
    },
    {
      minStars: 20,
      id: 'Penjelajah Arsip',
      en: 'Archive Explorer',
      badge: '🗺️',
      color: 'text-blue-400',
    },
    {
      minStars: 0,
      id: 'Detektif Magang',
      en: 'Chrono Apprentice',
      badge: '🌱',
      color: 'text-slate-400',
    },
  ];

  const matched = ranks.find((r) => totalStars >= r.minStars) || ranks[ranks.length - 1];

  return {
    title: lang === 'en' ? matched.en : matched.id,
    badge: matched.badge,
    color: matched.color,
    minStars: matched.minStars,
  };
}

const CHANCES_STORAGE_KEY = 'street_view_time_traveler_chances_v4';
export const MAX_DAILY_CHANCES = 5;

export interface DailyChances {
  remaining: number; // 0 to 5
  maxChances: number; // 5
  lastDate: string; // YYYY-MM-DD
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyChances(): DailyChances {
  const todayStr = getTodayDateString();
  if (typeof window === 'undefined') {
    return { remaining: MAX_DAILY_CHANCES, maxChances: MAX_DAILY_CHANCES, lastDate: todayStr };
  }

  try {
    const raw = localStorage.getItem(CHANCES_STORAGE_KEY);
    if (!raw) {
      const initial: DailyChances = { remaining: MAX_DAILY_CHANCES, maxChances: MAX_DAILY_CHANCES, lastDate: todayStr };
      localStorage.setItem(CHANCES_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed: DailyChances = JSON.parse(raw);
    if (parsed.lastDate !== todayStr) {
      // New day: reset to 3
      const resetState: DailyChances = { remaining: MAX_DAILY_CHANCES, maxChances: MAX_DAILY_CHANCES, lastDate: todayStr };
      localStorage.setItem(CHANCES_STORAGE_KEY, JSON.stringify(resetState));
      return resetState;
    }
    const remaining = typeof parsed.remaining === 'number'
      ? Math.max(0, Math.min(MAX_DAILY_CHANCES, parsed.remaining))
      : MAX_DAILY_CHANCES;

    return {
      remaining,
      maxChances: MAX_DAILY_CHANCES,
      lastDate: todayStr,
    };
  } catch (e) {
    console.error('Failed to parse daily chances', e);
    return { remaining: MAX_DAILY_CHANCES, maxChances: MAX_DAILY_CHANCES, lastDate: todayStr };
  }
}

export function useDailyChance(): DailyChances {
  const current = getDailyChances();
  const updated: DailyChances = {
    ...current,
    remaining: Math.max(0, current.remaining - 1),
  };
  try {
    localStorage.setItem(CHANCES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save daily chances', e);
  }
  return updated;
}

export function resetDailyChances(): DailyChances {
  const todayStr = getTodayDateString();
  const initial: DailyChances = { remaining: MAX_DAILY_CHANCES, maxChances: MAX_DAILY_CHANCES, lastDate: todayStr };
  try {
    localStorage.setItem(CHANCES_STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    console.error('Failed to reset daily chances', e);
  }
  return initial;
}

export function getTimeUntilTomorrowFormatted(lang: Language): string {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const diffMs = Math.max(0, tomorrow.getTime() - now.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  if (lang === 'en') {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${hours} jam ${minutes} mnt ${seconds} dtk`;
}

const CHRONO_USES_STORAGE_KEY = 'street_view_time_traveler_chrono_uses_v1';
export const MAX_DAILY_CHRONO_USES = 3;

export const CHRONO_SHOP_ITEM_IDS = [
  'filter_vhs',
  'filter_sepia_70s',
  'theme_gold_compass',
  'theme_cyberpunk',
  'perk_time_shift',
] as const;

export type ChronoShopItemId = typeof CHRONO_SHOP_ITEM_IDS[number];

export interface ChronoUsage {
  remaining: number; // backward-compatible shorthand for perk_time_shift
  maxUses: number;   // 3
  lastDate: string;  // YYYY-MM-DD
  remainingByItem: Record<string, number>; // Individual 3x quota per item
}

function getDefaultRemainingByItem(): Record<string, number> {
  const result: Record<string, number> = {};
  for (const id of CHRONO_SHOP_ITEM_IDS) {
    result[id] = MAX_DAILY_CHRONO_USES;
  }
  return result;
}

export function getChronoUsage(): ChronoUsage {
  const todayStr = getTodayDateString();
  const defaultRemaining = getDefaultRemainingByItem();

  if (typeof window === 'undefined') {
    return {
      remaining: MAX_DAILY_CHRONO_USES,
      maxUses: MAX_DAILY_CHRONO_USES,
      lastDate: todayStr,
      remainingByItem: defaultRemaining,
    };
  }

  try {
    const raw = localStorage.getItem(CHRONO_USES_STORAGE_KEY);
    if (!raw) {
      const initial: ChronoUsage = {
        remaining: MAX_DAILY_CHRONO_USES,
        maxUses: MAX_DAILY_CHRONO_USES,
        lastDate: todayStr,
        remainingByItem: defaultRemaining,
      };
      localStorage.setItem(CHRONO_USES_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw);
    if (parsed.lastDate !== todayStr) {
      // New day: reset every item's quota to 3 uses
      const resetState: ChronoUsage = {
        remaining: MAX_DAILY_CHRONO_USES,
        maxUses: MAX_DAILY_CHRONO_USES,
        lastDate: todayStr,
        remainingByItem: defaultRemaining,
      };
      localStorage.setItem(CHRONO_USES_STORAGE_KEY, JSON.stringify(resetState));
      return resetState;
    }

    // Merge parsed remainingByItem with defaults
    const remainingByItem: Record<string, number> = { ...defaultRemaining };
    if (parsed.remainingByItem && typeof parsed.remainingByItem === 'object') {
      for (const id of CHRONO_SHOP_ITEM_IDS) {
        if (typeof parsed.remainingByItem[id] === 'number') {
          remainingByItem[id] = Math.max(0, Math.min(MAX_DAILY_CHRONO_USES, parsed.remainingByItem[id]));
        }
      }
    } else if (typeof parsed.remaining === 'number') {
      remainingByItem['perk_time_shift'] = Math.max(0, Math.min(MAX_DAILY_CHRONO_USES, parsed.remaining));
    }

    const timeShiftRemaining = remainingByItem['perk_time_shift'] ?? MAX_DAILY_CHRONO_USES;

    return {
      remaining: timeShiftRemaining,
      maxUses: MAX_DAILY_CHRONO_USES,
      lastDate: todayStr,
      remainingByItem,
    };
  } catch (e) {
    console.error('Failed to parse chrono usage', e);
    return {
      remaining: MAX_DAILY_CHRONO_USES,
      maxUses: MAX_DAILY_CHRONO_USES,
      lastDate: todayStr,
      remainingByItem: defaultRemaining,
    };
  }
}

export function useChronoActivation(itemId: string = 'perk_time_shift'): ChronoUsage {
  const current = getChronoUsage();
  const currentRemaining = current.remainingByItem[itemId] ?? MAX_DAILY_CHRONO_USES;
  const newRemaining = Math.max(0, currentRemaining - 1);

  const updatedByItem = {
    ...current.remainingByItem,
    [itemId]: newRemaining,
  };

  const updated: ChronoUsage = {
    ...current,
    remaining: itemId === 'perk_time_shift' ? newRemaining : (current.remainingByItem['perk_time_shift'] ?? 3),
    remainingByItem: updatedByItem,
  };

  try {
    localStorage.setItem(CHRONO_USES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save chrono usage', e);
  }
  return updated;
}

export function resetChronoUsage(): ChronoUsage {
  const todayStr = getTodayDateString();
  const initial: ChronoUsage = {
    remaining: MAX_DAILY_CHRONO_USES,
    maxUses: MAX_DAILY_CHRONO_USES,
    lastDate: todayStr,
    remainingByItem: getDefaultRemainingByItem(),
  };
  try {
    localStorage.setItem(CHRONO_USES_STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    console.error('Failed to reset chrono usage', e);
  }
  return initial;
}

