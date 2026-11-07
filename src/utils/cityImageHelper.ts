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

/**
 * 50 Kasus Jelajah Indonesia Image Mapping
 * 50 Landmark & Kota Unik dari Sabang sampai Merauke - 100% Foto Otentik & Relevan
 */
export const INDONESIA_IMAGE_MAP: Record<number, string> = {
  1: '/city-images/indo_1_jakarta.png',             // Jakarta (Bundaran HI)
  2: '/city-images/indo_2_surabaya.png',            // Surabaya (Jembatan Merah)
  3: '/city-images/indo_3_bandung.png',             // Bandung (Gedung Sate)
  4: '/city-images/indo_4_yogyakarta.png',          // Yogyakarta (Malioboro)
  5: '/city-images/indo_5_semarang.png',            // Semarang (Simpang Lima)
  6: '/city-images/indo_6_surakarta.png',           // Surakarta / Solo (Pasar Gede Harjonagoro)
  7: '/city-images/indo_7_malang.png',              // Malang (Balai Kota & Kayutangan)
  8: '/city-images/indo_8_magelang.png',            // Magelang (Candi Borobudur)
  9: '/city-images/indo_9_sleman.png',              // Sleman (Candi Prambanan)
  10: '/city-images/indo_10_wonosobo.png',          // Wonosobo (Candi Arjuna Dieng)
  11: '/city-images/indo_11_probolinggo.png',       // Probolinggo (Lautan Pasir Bromo)
  12: '/city-images/indo_12_anyer.png',             // Anyer Serang (Mercusuar Cikoneng Titik Nol Daendels)
  13: '/city-images/indo_13_kuta.png',              // Kuta (Pantai Kuta Bali)
  14: '/city-images/indo_14_ubud.png',              // Ubud (Mandala Suci Wenara Wana Monkey Forest)
  15: '/city-images/indo_15_tabanan.png',           // Tabanan (Pura Tanah Lot)
  16: '/city-images/indo_16_jimbaran.png',          // Jimbaran (Taman Budaya GWK Garuda Wisnu Kencana)
  17: '/city-images/indo_17_lombok.png',            // Lombok Barat (Pantai Senggigi)
  18: '/city-images/indo_18_labuan_bajo.png',       // Labuan Bajo (Pelabuhan Bahari NTT)
  19: '/city-images/indo_19_kupang.png',            // Kupang (Pesisir Teluk Kupang)
  20: '/city-images/indo_20_medan.png',             // Medan (Istana Maimun)
  21: '/city-images/indo_21_palembang.png',         // Palembang (Jembatan Ampera & Sungai Musi)
  22: '/city-images/indo_22_bukittinggi.png',       // Bukittinggi (Jam Gadang)
  23: '/city-images/indo_23_parapat.png',           // Parapat (Danau Toba & Pelabuhan Samosir)
  24: '/city-images/indo_24_banda_aceh.png',        // Banda Aceh (Masjid Raya Baiturrahman)
  25: '/city-images/indo_25_sabang.png',            // Sabang (Tugu Nol Kilometer Indonesia)
  26: '/city-images/indo_26_payakumbuh.png',        // Payakumbuh (Jembatan Kelok 9)
  27: '/city-images/indo_27_belitung.png',          // Belitung (Pantai Tanjung Tinggi Granit Laskar Pelangi)
  28: '/city-images/indo_28_lampung.png',           // Bandar Lampung (Menara Siger)
  29: '/city-images/indo_29_batam.png',             // Batam (Jembatan Barelang)
  30: '/city-images/indo_30_pangkalpinang.png',     // Pangkalpinang (Jembatan Emas)
  31: '/city-images/indo_31_jambi.png',             // Jambi (Jembatan Gentala Arasy)
  32: '/city-images/indo_32_bengkulu.png',          // Bengkulu (Benteng Marlborough)
  33: '/city-images/indo_33_pekanbaru.png',         // Pekanbaru (Jembatan Siak)
  34: '/city-images/indo_34_pontianak.png',         // Pontianak (Tugu Khatulistiwa)
  35: '/city-images/indo_35_banjarmasin.png',       // Banjarmasin (Pasar Terapung Lok Baintan)
  36: '/city-images/indo_36_balikpapan.png',        // Balikpapan (Pantai Melawai)
  37: '/city-images/indo_37_samarinda.png',         // Samarinda (Jembatan Mahakam)
  38: '/city-images/indo_38_palangkaraya.png',      // Palangkaraya (Jembatan Kahayan)
  39: '/city-images/indo_39_tarakan.png',           // Tarakan (Mangrove & Pesisir Tarakan)
  40: '/city-images/indo_40_makassar.png',          // Makassar (Benteng Rotterdam & Losari)
  41: '/city-images/indo_41_manado.png',            // Manado (Jembatan Soekarno)
  42: '/city-images/indo_42_toraja.png',            // Tana Toraja (Desa Adat Kete Kesu Tongkonan)
  43: '/city-images/indo_43_palu.png',              // Palu (Teluk Palu & Jembatan Kuning)
  44: '/city-images/indo_44_kendari.png',           // Kendari (Jembatan Teluk Kendari)
  45: '/city-images/indo_45_gorontalo.png',         // Gorontalo (Benteng Otanaha)
  46: '/city-images/indo_46_ambon.png',             // Ambon (Jembatan Merah Putih)
  47: '/city-images/indo_47_ternate.png',           // Ternate (Benteng Tolukko & Gunung Gamalama)
  48: '/city-images/indo_48_jayapura.png',          // Jayapura (Jembatan Youtefa)
  49: '/city-images/indo_49_sentani.png',           // Sentani (Danau Sentani & Bukit Tungkuwiri)
  50: '/city-images/indo_50_sorong.png',            // Sorong (Pelabuhan Pesisir Sorong Raja Ampat)
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
 * STRICTLY uses player's actual completed 100-case campaign adventure levels.
 * Non-campaign modes (expedition, daily, indonesia) are excluded.
 */
export function getExploredLocations(
  history: GameHistoryEntry[] = [],
  completedLevels: Record<number, any> = {}
): ExploredLocationCard[] {
  const results: ExploredLocationCard[] = [];
  const addedLevels = new Set<number>();

  // 1. First, include player's actual completed campaign history (newest first)
  if (Array.isArray(history) && history.length > 0) {
    const sortedHistory = [...history].reverse();
    for (const h of sortedHistory) {
      // STRICT: Only include 100-case campaign adventure mode
      if (h.mode !== 'campaign') continue;

      const lvlNum = h.levelNumber;
      if (lvlNum && lvlNum >= 1 && lvlNum <= 100 && !addedLevels.has(lvlNum)) {
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
          const countryName =
            typeof challenge.country === 'string'
              ? challenge.country
              : (challenge.country?.id || challenge.country?.en || '');
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

  // Strictly return only 100-case campaign explored locations!
  return results;
}
