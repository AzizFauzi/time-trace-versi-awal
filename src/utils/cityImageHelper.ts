import { GameHistoryEntry } from './gamification';
import { getChallengeByLevel, HISTORICAL_CHALLENGES } from '../data/challenges';

/**
 * Verified direct mapping from Level Number (1 to 100) to generated city images
 * stored in `/city-images/` (copied from `City Image/`).
 */
export const LEVEL_IMAGE_MAP: Record<number, string> = {
  1: '/city-images/L1_New York City.png',
  2: '/city-images/L1_Tokyo.png',
  3: '/city-images/L1_Jakarta.png',
  4: '/city-images/L1_London.png',
  5: '/city-images/L1_Paris.png',
  6: '/city-images/L1_Singapura.png',
  7: '/city-images/L1_San Fransisco.png',
  8: '/city-images/L1_Berlin.png',
  9: '/city-images/L1_Dublin.png',
  10: '/city-images/L1_Roma.png',
  11: '/city-images/L1_Lisbon.png',
  12: '/city-images/L1_Sydney.png',
  13: '/city-images/L1_Stockholm.png',
  14: '/city-images/L1_Chicago.png',
  15: '/city-images/L1_Honolulu.png',
  16: '/city-images/L1_Los Angeles.png',
  17: '/city-images/L1_Amsterdam.png',
  18: '/city-images/L1_Brussels.png',
  19: '/city-images/L1_Madrid.png',
  20: '/city-images/L1_Kyoto.png',
  21: '/city-images/L2_Milan.png',
  22: '/city-images/L2_Zurich.png',
  23: '/city-images/L2_Munich.png',
  24: '/city-images/L2_Reykjavik.png', // Temporary Nordic fallback for Oslo
  25: '/city-images/L2_Kopenhagen.png', // Temporary Nordic fallback for Helsinki
  26: '/city-images/L2_Kopenhagen.png',
  27: '/city-images/L2_Warsawa.png',
  28: '/city-images/L2_Budapest.png',
  29: '/city-images/L2_Reykjavik.png',
  30: '/city-images/L2_Montreal.png',
  31: '/city-images/L2_Vancouver.png',
  32: '/city-images/L2_Washington D.C.png',
  33: '/city-images/L2_Boston.png',
  34: '/city-images/L2_Melbourne.png',
  35: '/city-images/L2_Edinburgh.png',
  36: '/city-images/L2_Bangkok.png',
  37: '/city-images/L2_Kuala Lumpur.png',
  38: '/city-images/L2_Manila.png',
  39: '/city-images/L2_Taipei.png',
  40: '/city-images/L2_Hongkong.png',
  41: '/city-images/L3_Barcelona.png',
  42: '/city-images/L3_Venice.png',
  43: '/city-images/L3_Berlin.png',
  44: '/city-images/L3_London.png',
  45: '/city-images/L3_Paris.png',
  46: '/city-images/L3_Athens.png',
  47: '/city-images/L3_Prague.png',
  48: '/city-images/L3_Vienna.png',
  49: '/city-images/L3_San Francisco.png',
  50: '/city-images/L3_NYC.png',
  51: '/city-images/L3_Las Vegas.png',
  52: '/city-images/L3_Miami.png',
  53: '/city-images/L3_Seattle.png',
  54: '/city-images/L3_New Orleans.png',
  55: '/city-images/L3_Toronto.png',
  56: '/city-images/L3_Rio.png',
  57: '/city-images/L3_Buenos Aires.png',
  58: '/city-images/L3_Mexico.png',
  59: '/city-images/L3_santiago.png',
  60: '/city-images/L3_Cusco.png',
  61: '/city-images/L4_Nara.png',
  62: '/city-images/L4_Sapporo.png',
  63: '/city-images/L4_Incheon.png',
  64: '/city-images/L4_Doha.png',
  65: '/city-images/L4_Abu Dhabi.png',
  66: '/city-images/L4_Muscat.png',
  67: '/city-images/L4_Marrakech.png',
  68: '/city-images/L4_Casablanca.png',
  69: '/city-images/L4_Brisbane.png',
  70: '/city-images/L4_Kyoto.png',
  71: '/city-images/L4_Seoul.png',
  72: '/city-images/L4_Osaka.png',
  73: '/city-images/L4_Busan.png',
  74: '/city-images/L4_Dubai.png',
  75: '/city-images/L4_Petra.png',
  76: '/city-images/L4_Istanbul.png',
  77: '/city-images/L4_Cairo.png',
  78: '/city-images/L4_Cape Town.png',
  79: '/city-images/L4_Nairobi.png',
  80: '/city-images/L4_Auckland.png',
  81: '/city-images/L5_Tokyo.png',
  82: '/city-images/L5_Beijing.png',
  83: '/city-images/L5_London.png',
  84: '/city-images/L5_Paris.png',
  85: '/city-images/L5_NYC.png',
  86: '/city-images/L5_Kyoto.png',
  87: '/city-images/L5_Frankfurt.png',
  88: '/city-images/L5_Sao Paulo.png',
  89: '/city-images/L5_Bogota.png',
  90: '/city-images/L5_Rio de Janeiro.png',
  91: '/city-images/L5_Dubai.png',
  92: '/city-images/L5_San Francisco.png',
  93: '/city-images/L5_Rome.png',
  94: '/city-images/L5_Rotterdam.png',
  95: '/city-images/L5_Sydney.png',
  96: '/city-images/L5_Berlin.png',
  97: '/city-images/L5_Singapore.png',
  98: '/city-images/L5_Santa Monica.png',
  99: '/city-images/L5_Geneva.png',
  100: '/city-images/L5_Mountain View.png',
};

export interface ExploredLocationCard {
  level: number;
  image: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  year: number;
}

const COUNTRY_META: Record<string, { code: string; flag: string }> = {
  'indonesia': { code: 'id', flag: '🇮🇩' },
  'jepang': { code: 'jp', flag: '🇯🇵' },
  'japan': { code: 'jp', flag: '🇯🇵' },
  'amerika serikat': { code: 'us', flag: '🇺🇸' },
  'united states': { code: 'us', flag: '🇺🇸' },
  'usa': { code: 'us', flag: '🇺🇸' },
  'prancis': { code: 'fr', flag: '🇫🇷' },
  'france': { code: 'fr', flag: '🇫🇷' },
  'italia': { code: 'it', flag: '🇮🇹' },
  'italy': { code: 'it', flag: '🇮🇹' },
  'inggris raya': { code: 'gb', flag: '🇬🇧' },
  'united kingdom': { code: 'gb', flag: '🇬🇧' },
  'singapura': { code: 'sg', flag: '🇸🇬' },
  'singapore': { code: 'sg', flag: '🇸🇬' },
  'jerman': { code: 'de', flag: '🇩🇪' },
  'germany': { code: 'de', flag: '🇩🇪' },
  'australia': { code: 'au', flag: '🇦🇺' },
  'belanda': { code: 'nl', flag: '🇳🇱' },
  'netherlands': { code: 'nl', flag: '🇳🇱' },
  'spanyol': { code: 'es', flag: '🇪🇸' },
  'spain': { code: 'es', flag: '🇪🇸' },
  'thailand': { code: 'th', flag: '🇹🇭' },
  'malaysia': { code: 'my', flag: '🇲🇾' },
  'filipina': { code: 'ph', flag: '🇵🇭' },
  'philippines': { code: 'ph', flag: '🇵🇭' },
  'taiwan': { code: 'tw', flag: '🇹🇼' },
  'hong kong': { code: 'hk', flag: '🇭🇰' },
  'korea selatan': { code: 'kr', flag: '🇰🇷' },
  'south korea': { code: 'kr', flag: '🇰🇷' },
  'uni emirat arab': { code: 'ae', flag: '🇦🇪' },
  'united arab emirates': { code: 'ae', flag: '🇦🇪' },
  'yordania': { code: 'jo', flag: '🇯🇴' },
  'jordan': { code: 'jo', flag: '🇯🇴' },
  'turki': { code: 'tr', flag: '🇹🇷' },
  'turkey': { code: 'tr', flag: '🇹🇷' },
  'mesir': { code: 'eg', flag: '🇪🇬' },
  'egypt': { code: 'eg', flag: '🇪🇬' },
  'afrika selatan': { code: 'za', flag: '🇿🇦' },
  'south africa': { code: 'za', flag: '🇿🇦' },
  'kenya': { code: 'ke', flag: '🇰🇪' },
  'selandia baru': { code: 'nz', flag: '🇳🇿' },
  'new zealand': { code: 'nz', flag: '🇳🇿' },
  'kanada': { code: 'ca', flag: '🇨🇦' },
  'canada': { code: 'ca', flag: '🇨🇦' },
  'brasil': { code: 'br', flag: '🇧🇷' },
  'brazil': { code: 'br', flag: '🇧🇷' },
  'argentina': { code: 'ar', flag: '🇦🇷' },
  'meksiko': { code: 'mx', flag: '🇲🇽' },
  'mexico': { code: 'mx', flag: '🇲🇽' },
  'chili': { code: 'cl', flag: '🇨🇱' },
  'chile': { code: 'cl', flag: '🇨🇱' },
  'peru': { code: 'pe', flag: '🇵🇪' },
  'yunani': { code: 'gr', flag: '🇬🇷' },
  'greece': { code: 'gr', flag: '🇬🇷' },
  'ceko': { code: 'cz', flag: '🇨🇿' },
  'czechia': { code: 'cz', flag: '🇨🇿' },
  'austria': { code: 'at', flag: '🇦🇹' },
  'irlandia': { code: 'ie', flag: '🇮🇪' },
  'ireland': { code: 'ie', flag: '🇮🇪' },
  'portugal': { code: 'pt', flag: '🇵🇹' },
  'swedia': { code: 'se', flag: '🇸🇪' },
  'sweden': { code: 'se', flag: '🇸🇪' },
  'belgia': { code: 'be', flag: '🇧🇪' },
  'belgium': { code: 'be', flag: '🇧🇪' },
  'swiss': { code: 'ch', flag: '🇨🇭' },
  'switzerland': { code: 'ch', flag: '🇨🇭' },
  'norwegia': { code: 'no', flag: '🇳🇴' },
  'norway': { code: 'no', flag: '🇳🇴' },
  'finlandia': { code: 'fi', flag: '🇫🇮' },
  'finland': { code: 'fi', flag: '🇫🇮' },
  'denmark': { code: 'dk', flag: '🇩🇰' },
  'polandia': { code: 'pl', flag: '🇵🇱' },
  'poland': { code: 'pl', flag: '🇵🇱' },
  'hungaria': { code: 'hu', flag: '🇭🇺' },
  'hungary': { code: 'hu', flag: '🇭🇺' },
  'islandia': { code: 'is', flag: '🇮🇸' },
  'iceland': { code: 'is', flag: '🇮🇸' },
  'skotlandia': { code: 'gb', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  'scotland': { code: 'gb', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  'qatar': { code: 'qa', flag: '🇶🇦' },
  'oman': { code: 'om', flag: '🇴🇲' },
  'maroko': { code: 'ma', flag: '🇲🇦' },
  'morocco': { code: 'ma', flag: '🇲🇦' },
  'tiongkok': { code: 'cn', flag: '🇨🇳' },
  'china': { code: 'cn', flag: '🇨🇳' },
  'kolombia': { code: 'co', flag: '🇨🇴' },
  'colombia': { code: 'co', flag: '🇨🇴' },
};

export function getCountryMeta(countryName: string): { code: string; flag: string } {
  const norm = (countryName || '').trim().toLowerCase();
  if (COUNTRY_META[norm]) return COUNTRY_META[norm];
  for (const [k, v] of Object.entries(COUNTRY_META)) {
    if (norm.includes(k) || k.includes(norm)) return v;
  }
  return { code: 'un', flag: '📍' };
}

/**
 * Returns image URL for a given level number.
 */
export function getCityImageUrl(levelNumber: number): string {
  return LEVEL_IMAGE_MAP[levelNumber] || LEVEL_IMAGE_MAP[1];
}

/**
 * Build dynamic list for "Lokasi Terakhir yang Dijelajahi" carousel:
 * STRICTLY uses player's actual completed history or campaign levels.
 * Unexplored locations will NOT be included until the player finishes them.
 */
export function getExploredLocations(
  history: GameHistoryEntry[] = [],
  completedLevels: Record<number, any> = {}
): ExploredLocationCard[] {
  const results: ExploredLocationCard[] = [];
  const addedLevels = new Set<number>();

  // 1. First, include player's actual played history (newest first)
  if (Array.isArray(history) && history.length > 0) {
    const sortedHistory = [...history].reverse();
    for (const h of sortedHistory) {
      const lvlNum = h.levelNumber;
      if (lvlNum && !addedLevels.has(lvlNum)) {
        addedLevels.add(lvlNum);
        const meta = getCountryMeta(h.country);
        results.push({
          level: lvlNum,
          image: getCityImageUrl(lvlNum),
          city: h.city,
          country: h.country,
          countryCode: meta.code,
          flag: meta.flag,
          year: h.targetYear || 2010,
        });
      } else if (!lvlNum && h.city) {
        // Fallback for expedition mode without levelNumber
        const meta = getCountryMeta(h.country);
        results.push({
          level: 1,
          image: getCityImageUrl(1),
          city: h.city,
          country: h.country,
          countryCode: meta.code,
          flag: meta.flag,
          year: h.targetYear || 2010,
        });
      }
    }
  }

  // 2. Also include completed levels from PlayerProgress (if not already added)
  if (completedLevels && typeof completedLevels === 'object') {
    const levelNums = Object.keys(completedLevels)
      .map((k) => parseInt(k, 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 100)
      .sort((a, b) => b - a); // newest first

    for (const lvlNum of levelNums) {
      if (!addedLevels.has(lvlNum)) {
        addedLevels.add(lvlNum);
        const challenge = getChallengeByLevel(lvlNum);
        if (challenge) {
          const countryName = challenge.country.id;
          const meta = getCountryMeta(countryName);
          results.push({
            level: lvlNum,
            image: getCityImageUrl(lvlNum),
            city: challenge.city,
            country: countryName,
            countryCode: meta.code,
            flag: meta.flag,
            year: challenge.targetYear,
          });
        }
      }
    }
  }

  // Strictly return only explored locations!
  return results;
}
