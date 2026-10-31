export interface RankVisualAsset {
  rankLevel: number;
  id: string;
  name: { id: string; en: string };
  image: string;
  minStars: number;
  badge: string;
  color: string;
}

export const RANK_VISUAL_ASSETS: Record<number, RankVisualAsset> = {
  1: {
    rankLevel: 1,
    id: 'detektif_magang',
    name: { id: 'Detektif Magang', en: 'Chrono Apprentice' },
    image: '/ranks/rank_1.png',
    minStars: 0,
    badge: '🌱',
    color: 'text-slate-400',
  },
  2: {
    rankLevel: 2,
    id: 'penjelajah_arsip',
    name: { id: 'Penjelajah Arsip', en: 'Archive Explorer' },
    image: '/ranks/rank_2.png',
    minStars: 20,
    badge: '🗺️',
    color: 'text-blue-400',
  },
  3: {
    rankLevel: 3,
    id: 'penyelidik_kronologis',
    name: { id: 'Penyelidik Kronologis', en: 'Chronological Investigator' },
    image: '/ranks/rank_3.png',
    minStars: 50,
    badge: '🔍',
    color: 'text-emerald-400',
  },
  4: {
    rankLevel: 4,
    id: 'arkeolog_senior',
    name: { id: 'Arkeolog Geografi Senior', en: 'Senior Geo-Archaeologist' },
    image: '/ranks/rank_4.png',
    minStars: 100,
    badge: '🧭',
    color: 'text-cyan-400',
  },
  5: {
    rankLevel: 5,
    id: 'master_detektif',
    name: { id: 'Master Detektif Arsip', en: 'Master Archive Detective' },
    image: '/ranks/rank_5.png',
    minStars: 160,
    badge: '🏆',
    color: 'text-indigo-400',
  },
  6: {
    rankLevel: 6,
    id: 'penjaga_garis_waktu',
    name: { id: 'Penjaga Garis Waktu', en: 'Chronos Guardian' },
    image: '/ranks/rank_6.png',
    minStars: 220,
    badge: '⚡',
    color: 'text-purple-400',
  },
  7: {
    rankLevel: 7,
    id: 'grandmaster_waktu',
    name: { id: 'Grandmaster Penjelajah Waktu', en: 'Legendary Time Grandmaster' },
    image: '/ranks/rank_7.png',
    minStars: 280,
    badge: '👑',
    color: 'text-amber-400',
  },
};

export function getRankAssetByStars(totalStars: number): RankVisualAsset {
  if (totalStars >= 280) return RANK_VISUAL_ASSETS[7];
  if (totalStars >= 220) return RANK_VISUAL_ASSETS[6];
  if (totalStars >= 160) return RANK_VISUAL_ASSETS[5];
  if (totalStars >= 100) return RANK_VISUAL_ASSETS[4];
  if (totalStars >= 50) return RANK_VISUAL_ASSETS[3];
  if (totalStars >= 20) return RANK_VISUAL_ASSETS[2];
  return RANK_VISUAL_ASSETS[1];
}
