import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  badge?: string;
  isCurrent?: boolean;
  casesSolved?: number;
  accuracyPct?: number;
  country?: string;
}

const DEFAULT_NICKNAME = 'Detektif Waktu';
const NICKNAME_KEY = 'time_trace_player_nickname';
const AVATAR_KEY = 'time_trace_player_avatar';

export const getPlayerNickname = (): string => {
  try {
    return localStorage.getItem(NICKNAME_KEY) || DEFAULT_NICKNAME;
  } catch {
    return DEFAULT_NICKNAME;
  }
};

export const setPlayerNickname = (name: string): void => {
  try {
    const trimmed = name.trim();
    if (trimmed) {
      localStorage.setItem(NICKNAME_KEY, trimmed);
    }
  } catch (err) {
    console.warn('Failed saving nickname:', err);
  }
};

export const getPlayerAvatar = (): string => {
  try {
    return localStorage.getItem(AVATAR_KEY) || '🎩';
  } catch {
    return '🎩';
  }
};

export const setPlayerAvatar = (avatar: string): void => {
  try {
    localStorage.setItem(AVATAR_KEY, avatar);
  } catch (err) {
    console.warn('Failed saving avatar:', err);
  }
};

// Fallback mock players when Supabase is not yet filled or offline
const MOCK_PLAYERS = [
  { rank: 1, name: 'ArchExplorer', score: 2540, avatar: '🧙‍♂️', badge: '🥇' },
  { rank: 2, name: 'HistoriaHunter', score: 2110, avatar: '🕵️', badge: '🥈' },
  { rank: 3, name: 'MapDetective', score: 1980, avatar: '🧭', badge: '🥉' },
  { rank: 5, name: 'GeoMystery', score: 1320, avatar: '🗺️', badge: '5' },
  { rank: 6, name: 'KronosID', score: 1150, avatar: '⏳', badge: '6' },
  { rank: 7, name: 'NusantaraVoyager', score: 980, avatar: '⛵', badge: '7' },
];

/**
 * Fetch leaderboard from Supabase (or fallback to mock synced with player score)
 */
export const fetchLeaderboard = async (
  playerCurrentScore: number,
  _period: 'week' | 'month' | 'all' = 'week'
): Promise<{ players: LeaderboardPlayer[]; isLive: boolean }> => {
  const playerName = getPlayerNickname();
  const playerAvatar = getPlayerAvatar();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        let playerIncluded = false;
        const livePlayers: LeaderboardPlayer[] = data.map((item, idx) => {
          const isPlayer = item.nickname.toLowerCase() === playerName.toLowerCase();
          if (isPlayer) playerIncluded = true;
          return {
            rank: idx + 1,
            name: item.nickname,
            score: item.score,
            avatar: item.avatar || '🕵️',
            badge: idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`,
            isCurrent: isPlayer,
            casesSolved: item.cases_solved,
            accuracyPct: item.accuracy_pct,
            country: item.country || 'ID',
          };
        });

        // If player is not in top 10, append them at their proper rank
        if (!playerIncluded && playerCurrentScore > 0) {
          livePlayers.push({
            rank: livePlayers.length + 1,
            name: `${playerName} (Anda)`,
            score: playerCurrentScore,
            avatar: playerAvatar,
            badge: '⭐',
            isCurrent: true,
          });
        }

        return { players: livePlayers, isLive: true };
      }
    } catch (err) {
      console.warn('Failed querying Supabase leaderboard, using local fallback:', err);
    }
  }

  // Graceful Fallback with synced player score
  const fallbackList: LeaderboardPlayer[] = [
    MOCK_PLAYERS[0],
    MOCK_PLAYERS[1],
    MOCK_PLAYERS[2],
    {
      rank: 4,
      name: `${playerName} (Anda)`,
      score: Math.max(1541, playerCurrentScore),
      avatar: playerAvatar,
      isCurrent: true,
      badge: '⭐',
    },
    MOCK_PLAYERS[3],
  ];

  // Re-sort and re-rank
  fallbackList.sort((a, b) => b.score - a.score);
  fallbackList.forEach((p, idx) => {
    p.rank = idx + 1;
    if (idx === 0) p.badge = '🥇';
    else if (idx === 1) p.badge = '🥈';
    else if (idx === 2) p.badge = '🥉';
  });

  return { players: fallbackList, isLive: false };
};

/**
 * Submit player score to Supabase leaderboard
 */
export const submitPlayerScore = async (
  score: number,
  casesSolved: number = 1,
  accuracyPct: number = 85
): Promise<boolean> => {
  if (score <= 0) return false;

  const nickname = getPlayerNickname();
  const avatar = getPlayerAvatar();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('leaderboard').insert([
        {
          nickname,
          score,
          cases_solved: casesSolved,
          accuracy_pct: accuracyPct,
          avatar,
          country: 'ID',
        },
      ]);

      if (error) {
        console.error('Error submitting score to Supabase:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Network error submitting score to Supabase:', err);
    }
  }

  return false;
};
