import { Language } from './i18n';

/**
 * Sanitizes hint text so that it never accidentally leaks the target city name.
 */
export function sanitizeClue(text: string, city: string, lang: Language = 'id'): string {
  if (!text || !city) return text;

  let sanitized = text;
  const replacement = lang === 'en' ? 'this city' : 'kota ini';

  // 1. Check exact city name (case-insensitive)
  const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cityRegex = new RegExp(`\\b${escapedCity}\\b`, 'gi');
  sanitized = sanitized.replace(cityRegex, replacement);

  // 2. Also check parts of multi-word cities (e.g., "Makassar", "Janeiro", "Dublin")
  const words = city
    .split(/[\s,\/\(\)]+/)
    .map(w => w.replace(/[^\w]/g, '').trim())
    .filter(w => w.length > 3 && !['kota', 'city', 'downtown', 'barat', 'timur', 'selatan', 'utara', 'pusat', 'saint', 'san', 'los', 'del', 'the', 'new'].includes(w.toLowerCase()));

  for (const word of words) {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const wordRegex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
    sanitized = sanitized.replace(wordRegex, replacement);
  }

  return sanitized;
}
