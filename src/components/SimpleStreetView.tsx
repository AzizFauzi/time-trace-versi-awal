/**
 * SimpleStreetView – lightweight replacement for StreetViewViewer.
 * Displays a static image (archival photo → Google Static API → placeholder).
 * No Google Maps JavaScript SDK is loaded or required.
 */
import React, { useEffect, useState } from 'react';
import { HistoricalPano } from '../data/challenges';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { LEVEL_IMAGE_MAP, INDONESIA_IMAGE_MAP } from '../utils/cityImageHelper';

interface SimpleStreetViewProps {
  challenge: HistoricalPano;
  /** Optional Google Street‑View Static API key. Falls back to local image if omitted. */
  apiKey?: string;
  lang: Language;
  activeFilter?: string;
  isInspecting?: boolean;
}

export const SimpleStreetView: React.FC<SimpleStreetViewProps> = ({
  challenge,
  apiKey,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setLoading(true);
    setImgError(false);

    let url = '';

    // 1️⃣ Jelajah Indonesia mode (50 Kasus Nusantara)
    if (challenge.id.startsWith('indo-')) {
      if (challenge.levelNumber && INDONESIA_IMAGE_MAP[challenge.levelNumber]) {
        url = INDONESIA_IMAGE_MAP[challenge.levelNumber];
      } else if (challenge.id === 'indo-49-sentani-danau' || challenge.id === 'indo-50-papua-danau-sentani') {
        url = '/city-images/indo_danau_sentani.jpg';
      } else {
        url = '/city-images/L1_Jakarta.png';
      }
    }
    // 2️⃣ Campaign 100 Levels from LEVEL_IMAGE_MAP
    else if (
      challenge.levelNumber &&
      LEVEL_IMAGE_MAP[challenge.levelNumber]
    ) {
      url = LEVEL_IMAGE_MAP[challenge.levelNumber];
    }
    // 3️⃣ Google Street View Static API fallback (if apiKey exists and is working)
    else if (apiKey) {
      const { lat, lng } = challenge.streetViewOptions.position;
      if (challenge.panoId) {
        url = `https://maps.googleapis.com/maps/api/streetview?size=1600x900&pano=${challenge.panoId}&key=${apiKey}`;
      } else {
        url = `https://maps.googleapis.com/maps/api/streetview?size=1600x900&location=${lat},${lng}&radius=500&fov=90&heading=${challenge.streetViewOptions.pov.heading}&pitch=${challenge.streetViewOptions.pov.pitch}&key=${apiKey}`;
      }
    }
    // 4️⃣ Default fallback image
    else {
      url = '/assets/hero_background.png';
    }

    setImageUrl(url);
  }, [challenge, apiKey]);

  return (
    <div className="relative w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Loading spinner */}
      {loading && !imgError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 gap-3 z-10">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">{t['loading'] ?? 'Loading...'}</span>
        </div>
      )}

      {/* Error state */}
      {imgError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 gap-3">
          <span className="text-5xl">🗺️</span>
          <span className="text-sm text-center px-4">
            {t['image_load_error'] ?? 'Image not available for this location.'}
          </span>
          <span className="text-xs text-white/30">{challenge.city}</span>
        </div>
      )}

      {/* The image */}
      {imageUrl && !imgError && (
        <img
          key={imageUrl}
          src={imageUrl}
          alt={challenge.title.en}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setImgError(true); }}
          loading="eager"
        />
      )}
    </div>
  );
};

