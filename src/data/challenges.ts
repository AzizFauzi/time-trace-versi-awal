import { RegionId, Language } from '../utils/i18n';
import { LEVELS_1_TO_20 } from './levelsChapter1';
import { LEVELS_21_TO_40 } from './levelsChapter2';
import { LEVELS_41_TO_60 } from './levelsChapter3';
import { LEVELS_61_TO_80 } from './levelsChapter4';
import { LEVELS_81_TO_100 } from './levelsChapter5';
import { LEVELS_JELAJAH_INDONESIA } from './levelsIndonesia';

export { LEVELS_JELAJAH_INDONESIA };

export interface LocalizedString {
  id: string;
  en: string;
}

export interface HistoricalPano {
  id: string;
  levelNumber?: number;
  regions: RegionId[];
  title: LocalizedString;
  city: string;
  country: LocalizedString;
  realLocation: {
    lat: number;
    lng: number;
  };
  targetYear: number;
  targetMonth?: string;
  targetDateStr: LocalizedString; // e.g., "Juli 2008" / "July 2008"
  description: LocalizedString; // Context revealed after guessing
  hints: {
    cars: LocalizedString;
    architecture: LocalizedString;
    cultureOrFashion: LocalizedString;
  };
  panoId?: string;
  streetViewOptions: {
    position: {
      lat: number;
      lng: number;
    };
    pov: {
      heading: number;
      pitch: number;
      zoom?: number;
    };
  };
}

// Complete 100-Level Historical Street View Archive
export const HISTORICAL_CHALLENGES: HistoricalPano[] = [
  ...LEVELS_1_TO_20,
  ...LEVELS_21_TO_40,
  ...LEVELS_41_TO_60,
  ...LEVELS_61_TO_80,
  ...LEVELS_81_TO_100,
];

export function getChallengesByRegion(region: RegionId): HistoricalPano[] {
  if (region === 'indonesia') {
    return LEVELS_JELAJAH_INDONESIA;
  }
  if (region === 'global') {
    return HISTORICAL_CHALLENGES;
  }
  const filtered = HISTORICAL_CHALLENGES.filter((c) => c.regions.includes(region));
  return filtered.length > 0 ? filtered : HISTORICAL_CHALLENGES;
}

export function getChallengeByLevel(levelNumber: number): HistoricalPano {
  const found = HISTORICAL_CHALLENGES.find((c) => c.levelNumber === levelNumber);
  return found || HISTORICAL_CHALLENGES[0];
}
