import { Language } from './i18n';

export interface GameHistoryEntry {
  id: string;
  timestamp: string; // ISO date
  city: string;
  country: string;
  targetYear: number;
  guessedYear: number;
  yearDiff: number;
  distanceKm: number;
  locationScore: number;
  yearScore: number;
  totalScore: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  mode: 'campaign' | 'expedition' | 'daily' | 'indonesia';
  levelNumber?: number;
}

export interface Achievement {
  id: string;
  icon: string;
  title: { id: string; en: string };
  desc: { id: string; en: string };
  rewardCoins: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100%
}

export interface ShopItem {
  id: string;
  name: { id: string; en: string };
  desc: { id: string; en: string };
  price: number;
  icon: string;
  category: 'filter' | 'theme' | 'perk';
  unlocked: boolean;
}

export interface GamificationState {
  coins: number;
  dailyStreak: number;
  lastDailyDate: string | null;
  history: GameHistoryEntry[];
  unlockedAchievements: string[];
  unlockedShopItems: string[];
  activeTheme: string;
  activeFilter: string;
  activePerk: string; // 'none' | 'perk_time_shift' | etc.
}

const STORAGE_KEY = 'street_view_time_traveler_gamification_v2';

if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('street_view_time_traveler_gamification_v1');
  } catch (_) { }
}

export function calculateGrade(score: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  if (score >= 9000) return 'S';
  if (score >= 7500) return 'A';
  if (score >= 5500) return 'B';
  if (score >= 3000) return 'C';
  return 'D';
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_guess',
    icon: '🎯',
    title: { id: 'Langkah Pertama Waktu', en: 'First Leap Through Time' },
    desc: { id: 'Selesaikan tebakan investigasi pertamamu.', en: 'Complete your first mystery deduction.' },
    rewardCoins: 200,
    unlocked: false,
    progress: 0,
  },
  {
    id: 'bullseye_year',
    icon: '⏳',
    title: { id: 'Mata Elang Kronologis', en: 'Bullseye Chronologist' },
    desc: { id: 'Tebak tahun rekaman arsip tepat 100% tanpa selisih (selisih 0 tahun).', en: 'Guess the exact archival year with 0 year error.' },
    rewardCoins: 500,
    unlocked: false,
    progress: 0,
  },
  {
    id: 'pinpoint_location',
    icon: '📍',
    title: { id: 'GPS Manusia', en: 'Human GPS' },
    desc: { id: 'Letakkan pin tebakan dalam jarak kurang dari 500 meter dari lokasi asli.', en: 'Place a guess pin within 500 meters of the actual spot.' },
    rewardCoins: 500,
    unlocked: false,
    progress: 0,
  },
  {
    id: 'grade_s',
    icon: '👑',
    title: { id: 'Detektif Legendaris', en: 'Legendary Detective' },
    desc: { id: 'Raih nilai sempurna Rank S (≥ 9.000 pts) dalam satu ronde.', en: 'Achieve Rank S score (≥ 9,000 pts) in a single round.' },
    rewardCoins: 750,
    unlocked: false,
    progress: 0,
  },
  {
    id: 'streak_3',
    icon: '🔥',
    title: { id: 'Rutinitas Penjelajah', en: 'Daily Habit' },
    desc: { id: 'Mainkan Misteri Harian selama 3 hari berturut-turut.', en: 'Complete the Daily Mystery 3 days in a row.' },
    rewardCoins: 600,
    unlocked: false,
    progress: 0,
  },
  {
    id: 'games_10',
    icon: '📚',
    title: { id: 'Kolektor Arsip Sejati', en: 'True Archive Collector' },
    desc: { id: 'Mainkan dan catat minimal 10 ekspedisi di Paspor Waktumu.', en: 'Log at least 10 expeditions in your Time Passport.' },
    rewardCoins: 800,
    unlocked: false,
    progress: 0,
  },
  {
    id: 'indonesia_master',
    icon: '🇮🇩',
    title: { id: 'Penjelajah Nusantara', en: 'Archipelago Voyager' },
    desc: { id: 'Selesaikan tebakan di 5 kota berbeda di Indonesia.', en: 'Complete mystery guesses in 5 Indonesian cities.' },
    rewardCoins: 500,
    unlocked: false,
    progress: 0,
  },
  {
    id: 'rich_traveler',
    icon: '💎',
    title: { id: 'Kaya Poin Waktu', en: 'Time Tycoon' },
    desc: { id: 'Kumpulkan total 2.500 Koin Penjelajah (Coins).', en: 'Accumulate 2,500 total Chrono Coins.' },
    rewardCoins: 1000,
    unlocked: false,
    progress: 0,
  },
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'filter_vhs',
    name: { id: 'Lensa VHS 90-an Retro', en: '90s VHS Retro Lens' },
    desc: { id: 'Efek distorsi pita kaset dan scanlines TV tabung era 90-an.', en: 'Analog magnetic tape distortion and CRT scanlines.' },
    price: 600,
    icon: '📼',
    category: 'filter',
    unlocked: false,
  },
  {
    id: 'filter_sepia_70s',
    name: { id: 'Lensa Sepia Nostalgia 70s', en: '70s Nostalgia Sepia Lens' },
    desc: { id: 'Warna hangat monokrom sepia seperti foto album kakek-nenek.', en: 'Warm monochrome sepia tones like vintage photo albums.' },
    price: 450,
    icon: '🎞️',
    category: 'filter',
    unlocked: false,
  },
  {
    id: 'theme_gold_compass',
    name: { id: 'Kompas Emas Maritim Antik', en: 'Antique Maritime Brass Compass' },
    desc: { id: 'Tampilan HUD peta beraksen emas kuno navigator samudra.', en: 'Vintage polished brass HUD accents on the guess map.' },
    price: 800,
    icon: '🧭',
    category: 'theme',
    unlocked: false,
  },
  {
    id: 'theme_cyberpunk',
    name: { id: 'HUD Neon Cyberpunk', en: 'Cyberpunk Neon HUD' },
    desc: { id: 'Nuansa grid futuristik warna cyan dan magenta menyala.', en: 'Futuristic glowing cyan and magenta map telemetry.' },
    price: 1000,
    icon: '⚡',
    category: 'theme',
    unlocked: false,
  },
  {
    id: 'perk_time_shift',
    name: { id: 'Kronometer Pergeseran Waktu (Time Shift)', en: 'Time Shift Chronometer' },
    desc: {
      id: 'Gadget kronometer legendaris (dibatasi 3x penggunaan per hari). Pasang (equip) untuk memindai anomali masa lalu & mengungkap rentang tahun arsip (±2 tahun) saat menghadapi ronde/level sulit.',
      en: 'Legendary temporal chronometer gadget (limited to 3 daily activations). Equip to scan archival anomalies & reveal the target year range (±2 years).',
    },
    price: 1200,
    icon: '⏳',
    category: 'perk',
    unlocked: false,
  },
];

export function getGamificationState(): GamificationState {
  if (typeof window === 'undefined') {
    return {
      coins: 500, // Starter bonus!
      dailyStreak: 1,
      lastDailyDate: null,
      history: [],
      unlockedAchievements: [],
      unlockedShopItems: [],
      activeTheme: 'default',
      activeFilter: 'none',
      activePerk: 'none',
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: GamificationState = {
        coins: 500,
        dailyStreak: 1,
        lastDailyDate: null,
        history: [],
        unlockedAchievements: [],
        unlockedShopItems: [],
        activeTheme: 'default',
        activeFilter: 'none',
        activePerk: 'none',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return {
      coins: typeof parsed.coins === 'number' ? parsed.coins : 500,
      dailyStreak: typeof parsed.dailyStreak === 'number' ? parsed.dailyStreak : 1,
      lastDailyDate: parsed.lastDailyDate || null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements) ? parsed.unlockedAchievements : [],
      unlockedShopItems: Array.isArray(parsed.unlockedShopItems) ? parsed.unlockedShopItems : [],
      activeTheme: parsed.activeTheme || 'default',
      activeFilter: parsed.activeFilter || 'none',
      activePerk: parsed.activePerk || 'none',
    };
  } catch (e) {
    console.error('Failed to parse gamification data', e);
    return {
      coins: 500,
      dailyStreak: 1,
      lastDailyDate: null,
      history: [],
      unlockedAchievements: [],
      unlockedShopItems: [],
      activeTheme: 'default',
      activeFilter: 'none',
      activePerk: 'none',
    };
  }
}

export function saveGamificationState(state: GamificationState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save gamification data', e);
  }
}

export function addGameHistory(entry: Omit<GameHistoryEntry, 'id' | 'timestamp' | 'grade'>): {
  coinsEarned: number;
  newAchievements: Achievement[];
  streakUpdated: boolean;
  currentStreak: number;
} {
  const state = getGamificationState();
  const id = `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
  const grade = calculateGrade(entry.totalScore);

  const fullEntry: GameHistoryEntry = {
    ...entry,
    id,
    timestamp: new Date().toISOString(),
    grade,
  };

  // Add to top of history (keep max 100 recent games)
  state.history = [fullEntry, ...state.history].slice(0, 100);

  // Coins reward calculation:
  // Base: score / 20 (e.g. 8000 score -> 400 coins)
  // Grade bonuses: S -> +200, A -> +100
  // Bullseye year (diff === 0) -> +150
  let earnedCoins = Math.round(entry.totalScore / 20);
  if (grade === 'S') earnedCoins += 200;
  else if (grade === 'A') earnedCoins += 100;
  if (entry.yearDiff === 0) earnedCoins += 150;
  if (entry.distanceKm < 1) earnedCoins += 150;

  // Double coins bonus for Daily Mystery Challenge
  if (entry.mode === 'daily') {
    earnedCoins *= 2;
  }

  state.coins += earnedCoins;

  // Daily streak check
  let streakUpdated = false;
  const todayStr = new Date().toISOString().split('T')[0];
  if (state.lastDailyDate !== todayStr) {
    if (state.lastDailyDate) {
      const lastDate = new Date(state.lastDailyDate);
      const today = new Date(todayStr);
      const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        state.dailyStreak += 1;
      } else if (diffDays > 1) {
        state.dailyStreak = 1;
      }
    } else {
      state.dailyStreak = 1;
    }
    state.lastDailyDate = todayStr;
    streakUpdated = true;
    // Daily bonus coins
    const streakBonus = Math.min(500, state.dailyStreak * 50);
    state.coins += streakBonus;
    earnedCoins += streakBonus;
  }

  // Check achievements unlocks
  const newAchievements: Achievement[] = [];
  const checkUnlock = (achId: string) => {
    if (!state.unlockedAchievements.includes(achId)) {
      state.unlockedAchievements.push(achId);
      const def = ACHIEVEMENTS_LIST.find((a) => a.id === achId);
      if (def) {
        state.coins += def.rewardCoins;
        newAchievements.push(def);
      }
    }
  };

  // 1. First guess
  checkUnlock('first_guess');

  // 2. Exact year
  if (entry.yearDiff === 0) checkUnlock('bullseye_year');

  // 3. Pinpoint (< 500m)
  if (entry.distanceKm <= 0.5) checkUnlock('pinpoint_location');

  // 4. Grade S
  if (grade === 'S') checkUnlock('grade_s');

  // 5. Streak >= 3
  if (state.dailyStreak >= 3) checkUnlock('streak_3');

  // 6. 10 games
  if (state.history.length >= 10) checkUnlock('games_10');

  // 7. Indonesia master
  const idCities = new Set(
    state.history
      .filter((h) => h.country.toLowerCase().includes('indonesia'))
      .map((h) => h.city)
  );
  if (idCities.size >= 5) checkUnlock('indonesia_master');

  // 8. 2500 coins
  if (state.coins >= 2500) checkUnlock('rich_traveler');

  saveGamificationState(state);

  return {
    coinsEarned: earnedCoins,
    newAchievements,
    streakUpdated,
    currentStreak: state.dailyStreak,
  };
}

export function buyShopItem(itemId: string): { success: boolean; message: string } {
  const state = getGamificationState();
  const item = SHOP_ITEMS.find((i) => i.id === itemId);
  if (!item) return { success: false, message: 'Item tidak ditemukan.' };

  if (state.unlockedShopItems.includes(itemId)) {
    return { success: false, message: 'Item sudah kamu miliki!' };
  }

  if (state.coins < item.price) {
    return { success: false, message: 'Koin tidak cukup! Selesaikan ekspedisi untuk dapat koin.' };
  }

  state.coins -= item.price;
  state.unlockedShopItems.push(itemId);

  if (item.category === 'filter') {
    state.activeFilter = itemId;
  } else if (item.category === 'theme') {
    state.activeTheme = itemId;
  } else if (item.category === 'perk') {
    state.activePerk = itemId;
  }

  saveGamificationState(state);
  return { success: true, message: 'Item berhasil dibeli dan dipasang!' };
}

export function toggleActiveItem(itemId: string, category: 'filter' | 'theme' | 'perk'): void {
  const state = getGamificationState();
  if (category === 'filter') {
    state.activeFilter = state.activeFilter === itemId ? 'none' : itemId;
  } else if (category === 'theme') {
    state.activeTheme = state.activeTheme === itemId ? 'default' : itemId;
  } else if (category === 'perk') {
    state.activePerk = state.activePerk === itemId ? 'none' : itemId;
  }
  saveGamificationState(state);
}

export function consumeCoins(amount: number): { success: boolean; remainingCoins: number } {
  const state = getGamificationState();
  if (state.coins < amount) {
    return { success: false, remainingCoins: state.coins };
  }
  state.coins -= amount;
  saveGamificationState(state);
  return { success: true, remainingCoins: state.coins };
}

export function getDailyChallengeId(totalCount: number): number {
  const todayStr = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = (hash << 5) - hash + todayStr.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash);
  return (positive % totalCount) + 1; // 1-based level
}

export function isDailyCompletedToday(state: GamificationState): boolean {
  const todayStr = new Date().toISOString().split('T')[0];
  return state.history.some(
    (h) => h.mode === 'daily' && h.timestamp.startsWith(todayStr)
  );
}

export function resetGamification(): GamificationState {
  const initial: GamificationState = {
    coins: 500,
    dailyStreak: 1,
    lastDailyDate: null,
    history: [],
    unlockedAchievements: [],
    unlockedShopItems: [],
    activeTheme: 'default',
    activeFilter: 'none',
    activePerk: 'none',
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    console.error('Failed to reset gamification state', e);
  }
  return initial;
}
