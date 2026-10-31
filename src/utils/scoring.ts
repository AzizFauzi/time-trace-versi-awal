// Scoring and distance helper calculations

/**
 * Calculate great-circle distance between two points in kilometers (Haversine formula)
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Minimum score required to pass a round/level and protect lives (nyawa)
 * Out of 10,000 max points (5,000 location + 5,000 year)
 */
export const MINIMUM_PASS_SCORE = 3000;

/**
 * Strict Location score: Max 5,000 points.
 * Steep exponential decay:
 * - Exact pin (< 50m): 5,000 pts
 * - Within 10km: ~4,850 pts
 * - Within 100km: ~3,750 pts
 * - Within 250km: ~2,450 pts
 * - Within 500km: ~1,200 pts
 * - Within 1,000km: ~280 pts
 * - >= 2,000km (or wrong continent): 0 pts
 */
export function calculateLocationScore(distanceKm: number): number {
  if (distanceKm <= 0.05) return 5000;
  if (distanceKm >= 2000) return 0;
  // Scaled steep exponential decay (tau = 350 km)
  const score = Math.round(5000 * Math.exp(-distanceKm / 350));
  return Math.max(0, Math.min(5000, score));
}

/**
 * Strict Year score: Max 5,000 points.
 * Requires high historical accuracy:
 * - Exact year: 5,000 pts
 * - Off by 1 year: 3,500 pts
 * - Off by 2 years: 2,000 pts
 * - Off by 3 years: 1,000 pts
 * - Off by 4 years: 400 pts
 * - Off by >= 5 years: 0 pts
 */
export function calculateYearScore(guessedYear: number, targetYear: number): number {
  const diff = Math.abs(guessedYear - targetYear);
  if (diff === 0) return 5000;
  if (diff === 1) return 3500;
  if (diff === 2) return 2000;
  if (diff === 3) return 1000;
  if (diff === 4) return 400;
  return 0;
}

export function formatDistance(distanceKm: number, lang: 'id' | 'en' = 'id'): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return lang === 'en' ? `${meters} meters` : `${meters} meter`;
  }
  const locale = lang === 'en' ? 'en-US' : 'id-ID';
  return `${distanceKm.toLocaleString(locale, { maximumFractionDigits: 1 })} km`;
}
