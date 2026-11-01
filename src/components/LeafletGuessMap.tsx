import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Maximize2, Minimize2, MapPin, Undo2, Search, X, Check, Loader2 } from 'lucide-react';
import { Language, RegionId, TRANSLATIONS } from '../utils/i18n';
import { REGION_MAP_CONFIGS } from '../utils/regionMapConfigs';
import { soundManager } from '../utils/soundManager';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  class: string;
}

interface CityResult {
  name: string;
  lat: number;
  lng: number;
}

interface LeafletGuessMapProps {
  onLocationSelected: (location: { lat: number; lng: number } | null) => void;
  selectedLocation: { lat: number; lng: number } | null;
  confirmed: boolean;
  actualLocation?: { lat: number; lng: number };
  lang: Language;
  region: RegionId;
  theme?: string;
}

// Tile layer configurations — 100% free, no API key required
const TILE_LAYERS = {
  voyager: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

// Calculate Haversine distance in KM
const calculateDistanceKm = (
  loc1: { lat: number; lng: number },
  loc2: { lat: number; lng: number }
): number => {
  const R = 6371; // Earth radius in km
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLon = ((loc2.lng - loc1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

export const LeafletGuessMap: React.FC<LeafletGuessMapProps> = ({
  onLocationSelected,
  selectedLocation,
  confirmed,
  actualLocation,
  lang,
  region,
  theme = 'default',
}) => {
  const t = TRANSLATIONS[lang];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const guessMarkerRef = useRef<L.Marker | null>(null);
  const actualMarkerRef = useRef<L.Marker | null>(null);
  const lineRef = useRef<L.Polyline | null>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<CityResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<'voyager' | 'dark' | 'osm'>('voyager');
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Custom marker icons using SVG for crisp high-DPI rendering
  const createGuessIcon = () =>
    L.divIcon({
      className: 'custom-guess-marker',
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 32px; height: 32px; background: rgba(239, 68, 68, 0.25); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; background: #dc2626; border: 2.5px solid #ffffff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 30],
    });

  const createActualIcon = () =>
    L.divIcon({
      className: 'custom-actual-marker',
      html: `
        <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 36px; height: 36px; background: rgba(16, 185, 129, 0.3); border-radius: 50%; animation: pulse 2s infinite;"></div>
          <div style="position: relative; background: #059669; border: 3px solid #fef08a; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.6);">
            <span style="font-size: 16px;">🎯</span>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

  // Initial map setup
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const regionConfig = REGION_MAP_CONFIGS[region] || REGION_MAP_CONFIGS['indonesia'];
    const initialCenter: [number, number] = [regionConfig.center.lat, regionConfig.center.lng];
    const initialZoom = regionConfig.zoom || 5;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    // Add minimal zoom controls on top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Add tile layer
    const tileUrl = theme.includes('dark') || theme.includes('navy') ? TILE_LAYERS.dark : TILE_LAYERS.voyager;
    const tile = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abc',
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    tileLayerRef.current = tile;

    // Click handler to drop pin
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (confirmed) return;
      const { lat, lng } = e.latlng;
      soundManager.playTick();
      onLocationSelected({ lat, lng });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center when region changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const config = REGION_MAP_CONFIGS[region];
    if (config && !selectedLocation && !confirmed) {
      mapInstanceRef.current.setView([config.center.lat, config.center.lng], config.zoom || 5, {
        animate: true,
      });
    }
  }, [region]);

  // Sync guess marker with selectedLocation
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedLocation) {
      if (!guessMarkerRef.current) {
        guessMarkerRef.current = L.marker([selectedLocation.lat, selectedLocation.lng], {
          icon: createGuessIcon(),
          interactive: !confirmed,
        }).addTo(map);
      } else {
        guessMarkerRef.current.setLatLng([selectedLocation.lat, selectedLocation.lng]);
      }
    } else if (guessMarkerRef.current) {
      map.removeLayer(guessMarkerRef.current);
      guessMarkerRef.current = null;
    }
  }, [selectedLocation, confirmed]);

  // Handle post-round evaluation & distance lines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (confirmed && actualLocation && selectedLocation) {
      // 1. Place actual location marker
      if (!actualMarkerRef.current) {
        actualMarkerRef.current = L.marker([actualLocation.lat, actualLocation.lng], {
          icon: createActualIcon(),
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-family: sans-serif; font-size: 13px; font-weight: bold; color: #047857; padding: 4px;">🎯 Lokasi Arsip Sebenarnya</div>`
          );
      }

      // 2. Draw connecting distance polyline
      if (!lineRef.current) {
        const distanceKm = calculateDistanceKm(selectedLocation, actualLocation);
        lineRef.current = L.polyline(
          [
            [selectedLocation.lat, selectedLocation.lng],
            [actualLocation.lat, actualLocation.lng],
          ],
          {
            color: '#f59e0b',
            weight: 3.5,
            dashArray: '8, 8',
            opacity: 0.9,
          }
        )
          .addTo(map)
          .bindTooltip(`📍 Jarak: ${distanceKm.toLocaleString()} km`, {
            permanent: true,
            direction: 'center',
            className: 'distance-tooltip',
          });
      }

      // 3. Smoothly fit bounds so both markers are visible
      const bounds = L.latLngBounds([
        [selectedLocation.lat, selectedLocation.lng],
        [actualLocation.lat, actualLocation.lng],
      ]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    } else {
      // Clean up evaluation overlays when resetting
      if (actualMarkerRef.current) {
        map.removeLayer(actualMarkerRef.current);
        actualMarkerRef.current = null;
      }
      if (lineRef.current) {
        map.removeLayer(lineRef.current);
        lineRef.current = null;
      }
    }
  }, [confirmed, actualLocation, selectedLocation]);

  // Handle container resize when expanding/minimizing
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  // Nominatim geocoding search (OpenStreetMap, free, no API key)
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSearchResults([]);

    if (query.trim().length < 2) {
      setIsSearching(false);
      return;
    }

    // Debounce: wait 400ms after user stops typing before calling API
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    setIsSearching(true);

    searchDebounceRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&addressdetails=0`;
        const res = await fetch(url, {
          headers: { 'Accept-Language': 'id,en', 'User-Agent': 'TimeTrace-Game/1.0' },
        });
        const data: NominatimResult[] = await res.json();
        const results: CityResult[] = data.map((r) => ({
          name: r.display_name,
          lat: parseFloat(r.lat),
          lng: parseFloat(r.lon),
        }));
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  }, []);

  const handleSelectCity = (city: CityResult) => {
    if (!mapInstanceRef.current) return;
    // Pan map to the selected city
    mapInstanceRef.current.setView([city.lat, city.lng], 12, { animate: true });
    // Drop the guess pin at the city location
    soundManager.playTick();
    onLocationSelected({ lat: city.lat, lng: city.lng });
    // Clear search
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div
      className={`relative transition-all duration-300 ease-out z-20 flex flex-col bg-slate-900/95 backdrop-blur-md border border-amber-500/30 rounded-2xl shadow-2xl ${
        isExpanded
          ? 'w-[94vw] h-[78vh] sm:w-[85vw] sm:h-[75vh] md:w-[720px] md:h-[550px]'
          : 'w-[280px] h-[220px] sm:w-[320px] sm:h-[260px] md:w-[380px] md:h-[300px]'
      }`}
    >
      {/* Map Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-500/20 text-xs font-semibold text-amber-200">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span className="tracking-wide uppercase font-mono">
            {confirmed ? 'Evaluasi Koordinat' : 'Tancapkan Pin Lokasi'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {selectedLocation && !confirmed && (
            <button
              onClick={() => {
                soundManager.playModalOpen();
                onLocationSelected(null);
              }}
              title="Hapus pin tebakan"
              className="p-1 text-slate-400 hover:text-rose-400 transition-colors rounded hover:bg-slate-800"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Kecilkan peta' : 'Perbesar peta'}
            className="p-1 text-slate-400 hover:text-amber-400 transition-colors rounded hover:bg-slate-800"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* City Search Bar (always visible when not confirmed) */}
      {!confirmed && (
        <div ref={searchBarRef} className="px-2.5 py-1.5 bg-slate-950/80 border-b border-slate-800">
          <div className="relative flex items-center">
            {isSearching
              ? <Loader2 className="w-3.5 h-3.5 absolute left-2 text-amber-400 animate-spin" />
              : <Search className="w-3.5 h-3.5 absolute left-2 text-slate-400" />
            }
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="🔍 Ketik nama kota untuk menempatkan pin..."
              className="w-full bg-slate-900 border border-slate-700/60 rounded-lg pl-7 pr-7 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute right-2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dropdown rendered OUTSIDE the overflow-hidden wrapper — floats over the map */}
      {!confirmed && (searchResults.length > 0 || (!isSearching && searchQuery.trim().length >= 2 && searchResults.length === 0)) && (
        <div
          className="absolute left-2.5 right-2.5 z-[999] bg-slate-900 border border-amber-500/40 rounded-lg shadow-2xl max-h-52 overflow-y-auto"
          style={{ top: searchBarRef.current ? searchBarRef.current.offsetTop + searchBarRef.current.offsetHeight + 2 : 70 }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((city, idx) => (
              <button
                key={`${city.lat}-${city.lng}-${idx}`}
                onClick={() => handleSelectCity(city)}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-amber-500/20 hover:text-amber-200 flex items-start gap-2 border-b border-slate-800 last:border-0"
              >
                <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-amber-400" />
                <span className="line-clamp-2">{city.name}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-slate-500">
              Tidak ditemukan. Coba nama lain.
            </div>
          )}
        </div>
      )}

      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="flex-1 w-full h-full relative cursor-crosshair" />

      {/* Footer Info Badge */}
      <div className="px-2.5 py-1 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <div>
          {selectedLocation ? (
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              {selectedLocation.lat.toFixed(3)}°, {selectedLocation.lng.toFixed(3)}°
            </span>
          ) : (
            <span>Klik peta untuk meletakkan pin</span>
          )}
        </div>
        <div className="text-slate-500 text-[9px]">© OpenStreetMap / CartoDB</div>
      </div>
    </div>
  );
};
