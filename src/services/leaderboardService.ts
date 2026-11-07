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
  playerId?: string | null;
}

const DEFAULT_NICKNAME = 'Detektif Waktu';
const NICKNAME_KEY = 'time_trace_player_nickname';
const AVATAR_KEY = 'time_trace_player_avatar';

// In-flight singleton promise to prevent concurrent calls from spawning multiple anonymous accounts
let authInFlightPromise: Promise<string | null> | null = null;

// Track highest submitted score to prevent stale out-of-order score overwrites
let highestSubmittedScore = -1;

/**
 * Returns the unique player UUID from Supabase Auth.
 * If the user already has a persisted session, returns that UUID.
 * Otherwise, performs anonymous authentication (signInAnonymously) exactly once.
 */
export const getOrCreatePlayerId = async (): Promise<string | null> => {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  // If authentication is already resolving, await the shared promise
  if (authInFlightPromise) {
    return authInFlightPromise;
  }

  authInFlightPromise = (async () => {
    try {
      // 1. Check existing session (restored from localStorage)
      const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
      if (!sessionErr && sessionData?.session?.user?.id) {
        return sessionData.session.user.id;
      }

      // 2. Validate current authenticated user
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (!userErr && userData?.user?.id) {
        return userData.user.id;
      }

      // 3. No active session: Sign in anonymously
      const { data: authData, error: authErr } = await supabase.auth.signInAnonymously();
      if (authErr) {
        console.error('Supabase anonymous authentication failed:', authErr.message);
        return null;
      }

      if (authData?.user?.id) {
        return authData.user.id;
      }

      return null;
    } catch (err) {
      console.warn('Network or configuration error in getOrCreatePlayerId:', err);
      return null;
    } finally {
      // Clear in-flight promise so future calls or retries can proceed
      authInFlightPromise = null;
    }
  })();

  return authInFlightPromise;
};

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
    console.warn('Failed saving nickname to localStorage:', err);
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
    console.warn('Failed saving avatar to localStorage:', err);
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
 * Fetch leaderboard from Supabase (or fallback to mock synced with player score).
 * Accurately detects the current player using their Supabase Auth player_id UUID.
 */
export const fetchLeaderboard = async (
  playerCurrentScore: number,
  _period: 'week' | 'month' | 'all' = 'week'
): Promise<{ players: LeaderboardPlayer[]; isLive: boolean }> => {
  const playerName = getPlayerNickname();
  const playerAvatar = getPlayerAvatar();

  if (isSupabaseConfigured() && supabase) {
    try {
      // Get current player UUID for accurate identification
      const currentPlayerId = await getOrCreatePlayerId();

      const { data, error } = await supabase
        .from('leaderboard')
        .select('id, player_id, nickname, score, avatar, cases_solved, accuracy_pct, country, created_at')
        .order('score', { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        let playerIncluded = false;
        const livePlayers: LeaderboardPlayer[] = data.map((item, idx) => {
          // Identify player primarily by player_id, or fallback to nickname for legacy rows with NULL player_id
          const isPlayer = Boolean(
            (currentPlayerId && item.player_id === currentPlayerId) ||
            (!item.player_id && item.nickname.toLowerCase() === playerName.toLowerCase())
          );

          if (isPlayer) {
            playerIncluded = true;
          }

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
            playerId: item.player_id,
          };
        });

        // If player has a record outside top 10, fetch player's own record
        if (!playerIncluded && currentPlayerId) {
          const { data: myRecord } = await supabase
            .from('leaderboard')
            .select('id, player_id, nickname, score, avatar, cases_solved, accuracy_pct, country')
            .eq('player_id', currentPlayerId)
            .maybeSingle();

          if (myRecord) {
            livePlayers.push({
              rank: livePlayers.length + 1,
              name: `${myRecord.nickname} (Anda)`,
              score: myRecord.score,
              avatar: myRecord.avatar || playerAvatar,
              badge: '⭐',
              isCurrent: true,
              casesSolved: myRecord.cases_solved,
              accuracyPct: myRecord.accuracy_pct,
              country: myRecord.country || 'ID',
              playerId: myRecord.player_id,
            });
            playerIncluded = true;
          }
        }

        // If player is not yet in Supabase but has local score > 0, show virtual placement
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
 * Submit player score to Supabase leaderboard using UPSERT on player_id.
 * Ensures ONE PLAYER = ONE LEADERBOARD RECORD.
 *
 * @param score Current score (coins)
 * @param casesSolved Actual cases completed
 * @param accuracyPct Actual accuracy percentage
 * @param forceUpdate Whether to force an update even if score didn't increase (e.g. nickname changes)
 */
export const submitPlayerScore = async (
  score: number,
  casesSolved: number = 1,
  accuracyPct: number = 85,
  forceUpdate: boolean = false
): Promise<boolean> => {
  const safeScore = Math.max(0, score);

  if (!isSupabaseConfigured() || !supabase) {
    return false;
  }

  // Prevent stale, out-of-order lower score from overwriting newer higher score (unless forceUpdate)
  if (safeScore < highestSubmittedScore && !forceUpdate) {
    return true;
  }

  // Retrieve or create the unique Supabase Auth UUID
  const playerId = await getOrCreatePlayerId();
  if (!playerId) {
    console.warn('Supabase leaderboard sync aborted: could not obtain anonymous playerId');
    return false;
  }

  const nickname = getPlayerNickname();
  const avatar = getPlayerAvatar();

  try {
    const { error } = await supabase
      .from('leaderboard')
      .upsert(
        {
          player_id: playerId,
          nickname,
          score: safeScore,
          cases_solved: casesSolved,
          accuracy_pct: accuracyPct,
          avatar,
          country: 'ID',
        },
        {
          onConflict: 'player_id',
        }
      );

    if (error) {
      console.error('Error upserting leaderboard record in Supabase:', error.message);
      return false;
    }

    highestSubmittedScore = Math.max(highestSubmittedScore, safeScore);
    return true;
  } catch (err) {
    console.warn('Network exception upserting leaderboard record:', err);
    return false;
  }
};
