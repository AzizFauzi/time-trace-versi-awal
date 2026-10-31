import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, MapPin, Undo2, Search, X, Loader2, Navigation, Check } from 'lucide-react';
import { Language, RegionId, TRANSLATIONS } from '../utils/i18n';
import { REGION_MAP_CONFIGS } from '../utils/regionMapConfigs';
import {
  POPULAR_CITIES,
  searchLocalCities,
  searchGlobalLocations,
  CityRecord,
  getDefaultZoomForType,
} from '../utils/citiesDatabase';
import { soundManager } from '../utils/soundManager';

interface GuessMapProps {
  onLocationSelected: (location: { lat: number; lng: number } | null) => void;
  selectedLocation: { lat: number; lng: number } | null;
  confirmed: boolean;
  actualLocation?: { lat: number; lng: number };
  lang: Language;
  region: RegionId;
  theme?: string;
}

const getMapStylesForTheme = (theme: string = 'default'): google.maps.MapTypeStyle[] => {
  if (theme === 'theme_gold_compass') {
    // Antique Maritime Brass Compass Theme
    return [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#524021' }, { lightness: '-5' }],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#f7f2e4' }, { weight: '2.5' }],
      },
      {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#b58a2d' }, { weight: '1.8' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: '#eee5d0' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#8aa8a3' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ddceb0' }],
      },
    ];
  }

  if (theme === 'theme_cyberpunk') {
    // Cyberpunk Neon HUD Theme
    return [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#00f2ff' }],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#030712' }, { weight: '3.5' }],
      },
      {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#ec4899' }, { weight: '2' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: '#0b1022' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#031f38' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#182449' }],
      },
    ];
  }

  // Default clean slate theme
  return [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7c93a3' }, { lightness: '-10' }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#a0c8d7' }, { weight: '1.2' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ color: '#dde3e7' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#a3c7df' }],
    },
  ];
};

export const GuessMap: React.FC<GuessMapProps> = ({
  onLocationSelected,
  selectedLocation,
  confirmed,
  actualLocation,
  lang,
  region,
  theme = 'default',
}) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const actualMarkerRef = useRef<google.maps.Marker | null>(null);
  const lineRef = useRef<google.maps.Polyline | null>(null);
  const cityHighlightMarkerRef = useRef<google.maps.Marker | null>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // City Search & Jump Navigation State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<CityRecord[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [lastJumpedCity, setLastJumpedCity] = useState<{ name: string; lat: number; lng: number } | null>(null);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const regionConfig = REGION_MAP_CONFIGS[region] || REGION_MAP_CONFIGS.global;

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !window.google || !window.google.maps) return;

    if (!mapInstanceRef.current) {
      // Initialize interactive map focused on selected region with current theme
      const map = new window.google.maps.Map(containerRef.current, {
        center: regionConfig.center,
        zoom: regionConfig.zoom,
        minZoom: regionConfig.minZoom,
        maxZoom: 18,
        restriction: regionConfig.restriction,
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: false,
        streetViewControl: false,
        mapTypeControl: false,
        gestureHandling: 'greedy',
        styles: getMapStylesForTheme(theme),
      });

      mapInstanceRef.current = map;

      // Click listener to place guess marker
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (confirmed) return; // Cannot change after confirming
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          onLocationSelected({ lat, lng });
          setSuggestions([]);
        }
      });
    }
  }, [confirmed, regionConfig]);

  // Update map styles when equipped theme changes in Chrono Shop
  useEffect(() => {
    if (mapInstanceRef.current && window.google && window.google.maps) {
      mapInstanceRef.current.setOptions({
        styles: getMapStylesForTheme(theme),
      });
    }
  }, [theme]);

  // When round resets or region changes (unconfirmed, no guess), re-center map onto selected region
  useEffect(() => {
    if (!mapInstanceRef.current || confirmed || selectedLocation) return;
    const config = REGION_MAP_CONFIGS[region] || REGION_MAP_CONFIGS.global;
    mapInstanceRef.current.setCenter(config.center);
    mapInstanceRef.current.setZoom(config.zoom);
    mapInstanceRef.current.setOptions({
      minZoom: config.minZoom,
      restriction: config.restriction,
    });
    setLastJumpedCity(null);
    setSearchQuery('');
    setSuggestions([]);
  }, [region, confirmed, selectedLocation]);

  // Update guess marker on selection with theme styling
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !window.google.maps) return;

    const markerFill =
      theme === 'theme_gold_compass'
        ? '#d97706'
        : theme === 'theme_cyberpunk'
        ? '#ec4899'
        : '#ef4444';

    const markerStroke =
      theme === 'theme_cyberpunk'
        ? '#06b6d4'
        : theme === 'theme_gold_compass'
        ? '#fef3c7'
        : '#ffffff';

    if (selectedLocation) {
      const pos = new window.google.maps.LatLng(selectedLocation.lat, selectedLocation.lng);

      if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
          position: pos,
          map: mapInstanceRef.current,
          title: lang === 'en' ? 'Your Guess' : 'Tebakan Anda',
          icon: {
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5.5,
            fillColor: markerFill,
            fillOpacity: 1,
            strokeWeight: 2.2,
            strokeColor: markerStroke,
          },
          animation: window.google.maps.Animation.DROP,
        });
      } else {
        markerRef.current.setPosition(pos);
        markerRef.current.setIcon({
          path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 5.5,
          fillColor: markerFill,
          fillOpacity: 1,
          strokeWeight: 2.2,
          strokeColor: markerStroke,
        });
        markerRef.current.setVisible(true);
      }
    } else if (markerRef.current) {
      markerRef.current.setVisible(false);
    }
  }, [selectedLocation, lang, theme]);

  // Handle post-guess reveal (actual location & polyline)
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !window.google.maps) return;

    if (confirmed && actualLocation && selectedLocation) {
      const actualPos = new window.google.maps.LatLng(actualLocation.lat, actualLocation.lng);
      const guessPos = new window.google.maps.LatLng(selectedLocation.lat, selectedLocation.lng);

      // Actual location marker (Green circle)
      if (!actualMarkerRef.current) {
        actualMarkerRef.current = new window.google.maps.Marker({
          position: actualPos,
          map: mapInstanceRef.current,
          title: lang === 'en' ? 'Actual Location' : 'Lokasi Sebenarnya',
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#10b981',
            fillOpacity: 1,
            strokeWeight: 2.5,
            strokeColor: '#ffffff',
          },
          animation: window.google.maps.Animation.BOUNCE,
        });
      } else {
        actualMarkerRef.current.setPosition(actualPos);
        actualMarkerRef.current.setVisible(true);
      }

      // Polyline connecting guess and actual
      if (!lineRef.current) {
        lineRef.current = new window.google.maps.Polyline({
          path: [guessPos, actualPos],
          geodesic: true,
          strokeColor: '#f59e0b',
          strokeOpacity: 0.9,
          strokeWeight: 3,
          map: mapInstanceRef.current,
        });
      } else {
        lineRef.current.setPath([guessPos, actualPos]);
        lineRef.current.setVisible(true);
      }

      // Fit bounds to show both
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(guessPos);
      bounds.extend(actualPos);
      mapInstanceRef.current.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    } else {
      // Clean up reveal elements
      if (actualMarkerRef.current) actualMarkerRef.current.setVisible(false);
      if (lineRef.current) lineRef.current.setVisible(false);
    }
  }, [confirmed, actualLocation, selectedLocation, lang]);

  // Fly / Pan directly to the given coordinates
  const flyToCoords = (lat: number, lng: number, zoomLevel: number, labelName: string) => {
    if (!mapInstanceRef.current || !window.google || !window.google.maps) return;

    const targetPos = new window.google.maps.LatLng(lat, lng);
    mapInstanceRef.current.panTo(targetPos);
    mapInstanceRef.current.setZoom(zoomLevel);

    // Audio feedback on fly
    soundManager.playModalOpen();

    setLastJumpedCity({ name: labelName, lat, lng });
    setSuggestions([]);
    setSearchQuery(labelName);

    // Show temporary pulsing target indicator on map
    if (!cityHighlightMarkerRef.current) {
      cityHighlightMarkerRef.current = new window.google.maps.Marker({
        position: targetPos,
        map: mapInstanceRef.current,
        title: labelName,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#f59e0b',
          fillOpacity: 0.4,
          strokeWeight: 2,
          strokeColor: '#fbbf24',
        },
      });
    } else {
      cityHighlightMarkerRef.current.setPosition(targetPos);
      cityHighlightMarkerRef.current.setTitle(labelName);
      cityHighlightMarkerRef.current.setVisible(true);
    }

    // Auto-hide the soft target indicator after 5 seconds
    setTimeout(() => {
      if (cityHighlightMarkerRef.current) {
        cityHighlightMarkerRef.current.setVisible(false);
      }
    }, 5000);
  };

  // Handle typing in search input with debounce and global geocoding
  const handleSearchInputChange = (val: string) => {
    setSearchQuery(val);
    setSearchFeedback(null);

    // Cancel existing debounce timer & in-flight requests
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!val.trim()) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    // 1. Instant local response (0ms latency for common cities/regencies)
    const localMatches = searchLocalCities(val);
    if (localMatches.length > 0) {
      setSuggestions(localMatches);
    }

    // 2. Concurrently fetch full world index (kecamatan, desa, kabupaten, world towns)
    setIsSearching(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchGlobalLocations(val, lang, controller.signal);
        if (!controller.signal.aborted) {
          setSuggestions(results);
          setIsSearching(false);
        }
      } catch (err: any) {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 280);
  };

  // Perform geocoding search when pressing Enter or submitting
  const executeCitySearch = async (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) return;

    // If suggestions are currently available, choose the top match
    if (suggestions.length > 0) {
      const top = suggestions[0];
      flyToCoords(top.lat, top.lng, top.zoom || getDefaultZoomForType(top.type), top.name);
      return;
    }

    // Check pre-indexed database first for instant zero-latency jump
    const localMatch = POPULAR_CITIES.find(
      (c) => c.name.toLowerCase() === q.toLowerCase() || c.name.toLowerCase().startsWith(q.toLowerCase())
    );

    if (localMatch) {
      flyToCoords(localMatch.lat, localMatch.lng, localMatch.zoom || 12, localMatch.name);
      return;
    }

    setIsSearching(true);

    try {
      const globalResults = await searchGlobalLocations(q, lang);
      if (globalResults.length > 0) {
        setIsSearching(false);
        const best = globalResults[0];
        flyToCoords(best.lat, best.lng, best.zoom || getDefaultZoomForType(best.type), best.name);
        return;
      }
    } catch {
      // Fallback to Google Geocoder
    }

    // Otherwise use Google Maps Geocoder API as fallback
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: q }, (results, status) => {
        setIsSearching(false);
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const loc = results[0].geometry.location;
          const formatted = results[0].formatted_address || q;
          const lat = loc.lat();
          const lng = loc.lng();

          if (results[0].geometry.viewport) {
            mapInstanceRef.current?.fitBounds(results[0].geometry.viewport);
            soundManager.playModalOpen();
            setLastJumpedCity({ name: formatted, lat, lng });
            setSuggestions([]);
            setSearchQuery(formatted);
          } else {
            flyToCoords(lat, lng, 12, formatted);
          }
        } else {
          setSearchFeedback(
            lang === 'en'
              ? `Location "${q}" not found. Try another city, county, district, or village name.`
              : `Lokasi "${q}" tidak ditemukan. Coba nama kota, kabupaten, kecamatan, atau desa lain.`
          );
          setTimeout(() => setSearchFeedback(null), 3500);
        }
      });
    } else {
      setIsSearching(false);
      setSearchFeedback(
        lang === 'en'
          ? `Location "${q}" not found.`
          : `Lokasi "${q}" tidak ditemukan.`
      );
      setTimeout(() => setSearchFeedback(null), 3500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCitySearch(searchQuery);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setSearchQuery('');
    setSuggestions([]);
    setIsSearching(false);
    setSearchFeedback(null);
  };

  const handlePlacePinAtJumpedCity = () => {
    if (!lastJumpedCity || confirmed) return;
    onLocationSelected({ lat: lastJumpedCity.lat, lng: lastJumpedCity.lng });
    soundManager.playTick();
  };

  const regionInfo = t.regions[region] || t.regions.global;
  const isGoldTheme = theme === 'theme_gold_compass';
  const isCyberTheme = theme === 'theme_cyberpunk';

  const themeContainerStyle = isGoldTheme
    ? 'border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/60 bg-[#16120b]/95'
    : isCyberTheme
    ? 'border-cyan-400/80 shadow-[0_0_32px_rgba(6,182,212,0.4)] ring-1 ring-fuchsia-500/60 bg-[#070c1a]/95'
    : 'border-slate-700/80 bg-slate-900/95';

  const themeHeaderStyle = isGoldTheme
    ? 'bg-[#1e170d] border-b border-amber-600/50 text-amber-200'
    : isCyberTheme
    ? 'bg-[#060a18] border-b border-cyan-500/40 text-cyan-200 font-mono'
    : 'bg-slate-950/90 border-b border-slate-800 text-slate-200';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSuggestions([]);
      }}
      className={`transition-all duration-300 ease-in-out z-20 flex flex-col rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md ${themeContainerStyle} ${
        isExpanded
          ? 'fixed inset-6 sm:inset-12 md:inset-20 z-50'
          : isHovered
          ? 'w-84 h-84 sm:w-[420px] sm:h-96 opacity-100'
          : 'w-76 h-64 sm:w-84 sm:h-72 opacity-95 hover:opacity-100'
      }`}
    >
      {/* Header Bar with Region Indicator & Map Controls */}
      <div className={`px-3 py-2 flex items-center justify-between shrink-0 ${themeHeaderStyle}`}>
        <div className="flex items-center gap-1.5 text-xs font-semibold truncate pr-2">
          {isGoldTheme ? (
            <span className="text-amber-400 text-xs font-serif font-black tracking-wider flex items-center gap-1">
              🧭 <span className="hidden sm:inline">BRASS HUD</span>
            </span>
          ) : isCyberTheme ? (
            <span className="text-cyan-400 text-xs font-mono font-bold tracking-wider flex items-center gap-1">
              ⚡ <span className="hidden sm:inline">CYBER HUD</span>
            </span>
          ) : (
            <span className="text-sm shrink-0">{regionInfo.flag}</span>
          )}
          <MapPin
            className={`w-3.5 h-3.5 shrink-0 ${
              isGoldTheme
                ? 'text-amber-400'
                : isCyberTheme
                ? 'text-cyan-400 animate-pulse'
                : 'text-rose-500'
            }`}
          />
          <span className="truncate">
            {selectedLocation ? t.pinPlaced : t.clickMapToGuess}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {selectedLocation && !confirmed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLocationSelected(null);
              }}
              title={t.resetPin}
              className={`p-1 rounded transition cursor-pointer ${
                isGoldTheme
                  ? 'hover:bg-amber-900/50 text-amber-300'
                  : isCyberTheme
                  ? 'hover:bg-cyan-900/50 text-cyan-300'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? t.minimizeMap : t.expandMap}
            className={`p-1 rounded transition cursor-pointer ${
              isGoldTheme
                ? 'hover:bg-amber-900/50 text-amber-300'
                : isCyberTheme
                ? 'hover:bg-cyan-900/50 text-cyan-300'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isExpanded ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Interactive City / Regency / District / Village Search Input Bar */}
      <div className="relative z-30 bg-slate-950/95 border-b border-slate-800/80 px-2.5 py-1.5 shrink-0">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            disabled={confirmed}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              lang === 'en'
                ? 'Search city, county, district, village worldwide...'
                : 'Cari kota, kabupaten, kecamatan, desa di dunia...'
            }
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-8 pr-16 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/90 focus:ring-1 focus:ring-amber-400/30 transition disabled:opacity-60"
          />

          <div className="absolute right-1.5 flex items-center gap-1">
            {isSearching ? (
              <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin mr-1" />
            ) : searchQuery ? (
              <button
                onClick={clearSearch}
                className="p-1 text-slate-400 hover:text-slate-200 rounded transition cursor-pointer"
                title={lang === 'en' ? 'Clear search' : 'Hapus pencarian'}
              >
                <X className="w-3 h-3" />
              </button>
            ) : null}

            <button
              onClick={() => executeCitySearch(searchQuery)}
              disabled={!searchQuery.trim() || confirmed}
              className="px-2 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-bold text-amber-300 transition cursor-pointer disabled:opacity-40"
              title={lang === 'en' ? 'Jump to location' : 'Tuju lokasi'}
            >
              {lang === 'en' ? 'Go' : 'Tuju'}
            </button>
          </div>
        </div>

        {/* Search Feedback / Error Notification */}
        {searchFeedback && (
          <div className="text-[11px] text-rose-400 mt-1 font-medium px-1 animate-fadeIn">
            {searchFeedback}
          </div>
        )}

        {/* Autocomplete Suggestions Dropdown with Rich Administrative Levels */}
        {suggestions.length > 0 && !confirmed && (
          <div className="absolute top-full left-2.5 right-2.5 mt-1 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-40 max-h-60 overflow-y-auto divide-y divide-slate-800/80 backdrop-blur-xl">
            <div className="px-3 py-1.5 bg-slate-950/90 text-[10px] text-slate-400 font-semibold tracking-wider uppercase border-b border-slate-800 flex justify-between items-center">
              <span>{lang === 'en' ? 'Worldwide Locations' : 'Hasil Pencarian Lokasi Dunia'}</span>
              <span className="text-[9px] text-amber-400/80 lowercase">
                {suggestions.length} {lang === 'en' ? 'found' : 'ditemukan'}
              </span>
            </div>
            {suggestions.map((c, i) => {
              // Type pill styling
              let badgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
              if (c.type === 'county') {
                badgeColor = 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
              } else if (c.type === 'district') {
                badgeColor = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
              } else if (c.type === 'village') {
                badgeColor = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
              } else if (c.type === 'town') {
                badgeColor = 'bg-sky-500/15 text-sky-300 border-sky-500/30';
              } else if (c.type === 'country') {
                badgeColor = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
              } else if (c.type === 'state') {
                badgeColor = 'bg-teal-500/15 text-teal-300 border-teal-500/30';
              }

              return (
                <button
                  key={i}
                  onClick={() => flyToCoords(c.lat, c.lng, c.zoom || getDefaultZoomForType(c.type), c.name)}
                  className="w-full px-3 py-2 flex items-center justify-between text-left text-xs hover:bg-amber-500/10 hover:text-amber-200 text-slate-200 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-base shrink-0 select-none">{c.flag || '📍'}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-white group-hover:text-amber-300 truncate">
                          {c.name}
                        </span>
                        {c.typeLabel && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium shrink-0 ${badgeColor}`}>
                            {c.typeLabel}
                          </span>
                        )}
                      </div>
                      {c.secondaryText && (
                        <p className="text-[10px] text-slate-400 truncate mt-0.5 max-w-[200px] sm:max-w-xs">
                          {c.secondaryText}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono shrink-0">
                    <span className="hidden sm:inline">{c.country}</span>
                    <Navigation className="w-3 h-3 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Jump Confirmation & One-Click Pin Placement Pill */}
      {lastJumpedCity && !confirmed && (
        <div className="bg-amber-950/70 border-b border-amber-500/30 px-3 py-1.5 flex items-center justify-between text-xs text-amber-200 z-20 shrink-0">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <Navigation className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
            <span className="truncate">
              {lang === 'en' ? 'At:' : 'Tiba di:'} <strong className="text-white">{lastJumpedCity.name}</strong>
            </span>
          </div>

          <button
            onClick={handlePlacePinAtJumpedCity}
            className="px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition shadow flex items-center gap-1 shrink-0 cursor-pointer"
            title={lang === 'en' ? 'Place Guess Pin here' : 'Pasang Pin Tebakan di Sini'}
          >
            <Check className="w-3 h-3" />
            <span>{lang === 'en' ? 'Pin Here' : 'Pin di Sini'}</span>
          </button>
        </div>
      )}

      {/* Interactive Google Map Canvas */}
      <div ref={containerRef} className="w-full flex-1 cursor-crosshair relative min-h-[140px]" />

      {/* Bottom hint banner with active region reminder */}
      <div className="px-2.5 py-1.5 bg-slate-950/95 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
        <span className="truncate">{regionInfo.name}</span>
        {selectedLocation ? (
          <span className="font-mono text-emerald-400 font-semibold shrink-0 ml-1">{t.readyToGuess}</span>
        ) : (
          <span className="text-slate-500 text-[10px] shrink-0 ml-1">
            {lang === 'en' ? 'Click map or search city to pin' : 'Klik peta atau cari kota untuk tebak'}
          </span>
        )}
      </div>
    </div>
  );
};
