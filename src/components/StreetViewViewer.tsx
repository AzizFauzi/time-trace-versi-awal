import React, { useEffect, useRef, useState } from 'react';
import { HistoricalPano } from '../data/challenges';
import { Camera, RefreshCw, ZoomIn, ZoomOut, AlertCircle, History, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { LEVEL_IMAGE_MAP, INDONESIA_IMAGE_MAP } from '../utils/cityImageHelper';

interface StreetViewViewerProps {
  challenge: HistoricalPano;
  apiKey: string;
  isInspecting: boolean;
  lang: Language;
  onPanoLoaded?: (panoMetadata: { date?: string; panoId?: string; copyright?: string }) => void;
  activeFilter?: string;
}

export const StreetViewViewer: React.FC<StreetViewViewerProps> = ({
  challenge,
  apiKey,
  lang,
  onPanoLoaded,
  activeFilter = 'none',
}) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPanoDate, setCurrentPanoDate] = useState<string | null>(null);
  const [availableTimeMachineCount, setAvailableTimeMachineCount] = useState<number>(0);
  const [vintageFilterActive, setVintageFilterActive] = useState<boolean>(false);
  const [useFallbackImage, setUseFallbackImage] = useState<boolean>(false);
  const [fallbackZoom, setFallbackZoom] = useState<number>(1);

  // High-resolution archival photographic asset if StreetView 3D tiles fail or for manual toggle
  const archivalPhotoUrl =
    (challenge.id.startsWith('indo-') && challenge.levelNumber && INDONESIA_IMAGE_MAP[challenge.levelNumber]) ||
    (challenge.id === 'indo-50-papua-danau-sentani' && '/city-images/indo_danau_sentani.jpg') ||
    (!challenge.id.startsWith('indo-') && challenge.levelNumber && LEVEL_IMAGE_MAP[challenge.levelNumber]) ||
    (challenge.panoId
      ? `https://maps.googleapis.com/maps/api/streetview?size=1600x900&pano=${challenge.panoId}&key=${apiKey}`
      : `https://maps.googleapis.com/maps/api/streetview?size=1600x900&location=${challenge.streetViewOptions.position.lat},${challenge.streetViewOptions.position.lng}&radius=500&key=${apiKey}`);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setCurrentPanoDate(null);
    setAvailableTimeMachineCount(0);
    setUseFallbackImage(false);
    setFallbackZoom(1);

    const initStreetView = async () => {
      try {
        if (!window.google || !window.google.maps) {
          throw new Error('Google Maps script is not loaded');
        }

        if (!containerRef.current) return;

        // StreetView Service to search for historical or closest panorama
        const svService = new window.google.maps.StreetViewService();
        const pos = new window.google.maps.LatLng(
          challenge.streetViewOptions.position.lat,
          challenge.streetViewOptions.position.lng
        );

        // Helper to check if a panorama is official Google coverage
        const isOfficialGooglePano = (data: google.maps.StreetViewPanoramaData | null): boolean => {
          if (!data || !data.location || !data.location.pano) return false;
          const pano = data.location.pano;
          if (pano.startsWith('CAoS') || pano.startsWith('CIHM')) return false;
          if (data.copyright && !data.copyright.includes('Google')) return false;
          return true;
        };

        // Helper for multi-pass panorama search
        const findPanorama = async (): Promise<google.maps.StreetViewPanoramaData | null> => {
          const googleSource = window.google.maps.StreetViewSource.GOOGLE || ('google' as any);

          // Pass 0: Direct panoId if specified in challenge metadata
          if (challenge.panoId) {
            const byPano = await new Promise<google.maps.StreetViewPanoramaData | null>((resolve) => {
              svService.getPanorama({ pano: challenge.panoId }, (data: any, status: any) => {
                if (status === 'OK' && data) resolve(data);
                else resolve(null);
              });
            });
            if (byPano) return byPano;
          }

          // Pass 1: Official GOOGLE collections within 250m
          const pass1 = await new Promise<google.maps.StreetViewPanoramaData | null>((resolve) => {
            svService.getPanorama(
              {
                location: pos,
                radius: 250,
                preference: window.google.maps.StreetViewPreference.NEAREST,
                source: googleSource,
              },
              (data: any, status: any) => {
                if (status === 'OK' && isOfficialGooglePano(data)) resolve(data);
                else resolve(null);
              }
            );
          });
          if (pass1) return pass1;

          // Pass 2: Official GOOGLE collections within 750m
          const pass2 = await new Promise<google.maps.StreetViewPanoramaData | null>((resolve) => {
            svService.getPanorama(
              {
                location: pos,
                radius: 750,
                preference: window.google.maps.StreetViewPreference.NEAREST,
                source: googleSource,
              },
              (data: any, status: any) => {
                if (status === 'OK' && isOfficialGooglePano(data)) resolve(data);
                else resolve(null);
              }
            );
          });
          if (pass2) return pass2;

          // Pass 3: Official GOOGLE collections within 2000m
          const pass3 = await new Promise<google.maps.StreetViewPanoramaData | null>((resolve) => {
            svService.getPanorama(
              {
                location: pos,
                radius: 2000,
                preference: window.google.maps.StreetViewPreference.NEAREST,
                source: googleSource,
              },
              (data: any, status: any) => {
                if (status === 'OK' && isOfficialGooglePano(data)) resolve(data);
                else resolve(null);
              }
            );
          });
          if (pass3) return pass3;

          // Pass 4: Fallback to OUTDOOR within 2000m
          const pass4 = await new Promise<google.maps.StreetViewPanoramaData | null>((resolve) => {
            svService.getPanorama(
              {
                location: pos,
                radius: 2000,
                preference: window.google.maps.StreetViewPreference.NEAREST,
                source: window.google.maps.StreetViewSource.OUTDOOR,
              },
              (data: any, status: any) => {
                if (status === 'OK' && data) resolve(data);
                else resolve(null);
              }
            );
          });
          return pass4;
        };

        const panoData = await findPanorama();
        if (!isMounted) return;

        if (panoData && panoData.location) {
          const panoLoc = panoData.location;
          const panoLatLng = panoLoc.latLng;
          const panoDate = (panoData as any).imageDate || (panoLoc as any).description;
          if (panoDate) {
            setCurrentPanoDate(panoDate);
          }

          if ((panoData as any).time) {
            setAvailableTimeMachineCount((panoData as any).time.length);
          }

          if (onPanoLoaded) {
            onPanoLoaded({
              date: panoDate,
              panoId: panoLoc.pano,
              copyright: panoData.copyright,
            });
          }

          // Options for StreetViewPanorama
          const panoOptions: google.maps.StreetViewPanoramaOptions = {
            pov: challenge.streetViewOptions.pov,
            zoom: challenge.streetViewOptions.pov.zoom ?? 1,
            addressControl: false,
            showRoadLabels: false,
            fullscreenControl: false,
            linksControl: true,
            panControl: true,
            zoomControl: false,
            enableCloseButton: false,
            motionTracking: false,
            motionTrackingControl: false,
          };

          // CRITICAL FIX: Do NOT pass position if pano is provided! Passing both causes Google Maps to override the custom/outdoor pano and display a black screen.
          if (panoLoc.pano) {
            panoOptions.pano = panoLoc.pano;
          } else if (panoLatLng) {
            panoOptions.position = panoLatLng;
          }

          if (!panoramaRef.current && containerRef.current) {
            const panoInstance = new window.google.maps.StreetViewPanorama(containerRef.current, panoOptions);
            panoramaRef.current = panoInstance;

            // Listen to pano status changes
            panoInstance.addListener('status_changed', () => {
              const status = panoInstance.getStatus();
              if (String(status) === 'OK') {
                setLoading(false);
                setError(null);
              } else {
                console.warn('StreetViewPanorama status changed to:', status);
                // Graceful fallback to HD archival photo
                setUseFallbackImage(true);
                setLoading(false);
              }
            });

            // Listen to pano_changed
            panoInstance.addListener('pano_changed', () => {
              const currPano = panoInstance.getPano();
              const photoDate = (panoInstance as any).imageDate;
              if (photoDate) setCurrentPanoDate(photoDate);
              if (onPanoLoaded) {
                onPanoLoaded({
                  date: photoDate,
                  panoId: currPano,
                });
              }
            });
          } else if (panoramaRef.current) {
            if (panoLoc.pano) {
              panoramaRef.current.setPano(panoLoc.pano);
            } else if (panoLatLng) {
              panoramaRef.current.setPosition(panoLatLng);
            }
            panoramaRef.current.setPov(challenge.streetViewOptions.pov);
            panoramaRef.current.setZoom(challenge.streetViewOptions.pov.zoom ?? 1);
          }

          // Timeout safety guard: If still loading after 4s, clear spinner
          setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 3500);
        } else {
          console.warn('No street view panorama found nearby, activating archival photo fallback');
          setUseFallbackImage(true);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error initializing Street View:', err);
        if (isMounted) {
          setUseFallbackImage(true);
          setLoading(false);
        }
      }
    };

    initStreetView();

    return () => {
      isMounted = false;
    };
  }, [challenge, apiKey]);

  const handleZoomIn = () => {
    if (useFallbackImage) {
      setFallbackZoom((prev) => Math.min(prev + 0.35, 3.5));
    } else if (panoramaRef.current) {
      const current = panoramaRef.current.getZoom() || 1;
      panoramaRef.current.setZoom(Math.min(current + 1, 4));
    }
  };

  const handleZoomOut = () => {
    if (useFallbackImage) {
      setFallbackZoom((prev) => Math.max(prev - 0.35, 0.8));
    } else if (panoramaRef.current) {
      const current = panoramaRef.current.getZoom() || 1;
      panoramaRef.current.setZoom(Math.max(current - 1, 0));
    }
  };

  const handleResetPov = () => {
    if (useFallbackImage) {
      setFallbackZoom(1);
    } else if (panoramaRef.current) {
      panoramaRef.current.setPov(challenge.streetViewOptions.pov);
      panoramaRef.current.setZoom(challenge.streetViewOptions.pov.zoom ?? 1);
    }
  };

  const isSepiaActive = activeFilter === 'filter_sepia_70s' || vintageFilterActive;
  const isVhsActive = activeFilter === 'filter_vhs';

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      {/* Street View 360 Panorama canvas */}
      <div
        ref={containerRef}
        style={{
          display: useFallbackImage ? 'none' : 'block',
          filter: isSepiaActive
            ? 'sepia(0.65) contrast(1.15) saturate(0.85) brightness(0.95)'
            : isVhsActive
              ? 'contrast(1.25) saturate(1.3) hue-rotate(-12deg)'
              : undefined,
        }}
        className="w-full h-full transition-all duration-700"
      />

      {/* High-Resolution Archival Photograph Fallback View */}
      {useFallbackImage && (
        <div className="absolute inset-0 z-10 bg-slate-950 flex items-center justify-center overflow-hidden">
          <img
            src={archivalPhotoUrl}
            alt={challenge.title[lang]}
            className="w-full h-full object-cover transition-transform duration-300 pointer-events-none"
            style={{
              transform: `scale(${fallbackZoom})`,
              filter: isSepiaActive
                ? 'sepia(0.65) contrast(1.15) saturate(0.85) brightness(0.95)'
                : isVhsActive
                  ? 'contrast(1.25) saturate(1.3) hue-rotate(-12deg)'
                  : undefined,
            }}
          />
          {/* Archival Mode HUD Banner */}
          <div className="absolute bottom-5 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-amber-500/50 rounded-xl px-3.5 py-2 shadow-2xl flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-amber-300 block">
                {lang === 'en' ? 'HD Historical Photo Record' : 'Arsip Rekaman Citra Sejarah HD'}
              </span>
              <span className="text-[10px] text-slate-300 font-sans">
                {lang === 'en'
                  ? 'High-res archival photo active for this historical landmark'
                  : 'Citra fotografi arsip sejarah aktif untuk titik eksplorasi ini'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VHS Scanlines & Vintage CRT Effect Overlay */}
      {isVhsActive && (
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-40">
          <div className="absolute top-20 left-4 font-mono text-emerald-400 text-xs font-bold tracking-widest flex items-center gap-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
            <span>REC ● [SP] VHS-1994</span>
          </div>
        </div>
      )}

      {/* 70s Nostalgia Sepia Vignette Overlay */}
      {isSepiaActive && (
        <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_120px_rgba(55,25,5,0.75)]">
          <div className="absolute top-20 left-4 font-serif italic text-amber-300/80 text-xs tracking-wider">
            🎞️ KODAK RETRO 1970s
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center text-white">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-amber-400 animate-spin"></div>
            <History className="w-7 h-7 text-amber-400 absolute inset-0 m-auto animate-pulse" />
          </div>
          <p className="text-lg font-bold tracking-wide text-slate-100 font-mono">
            {t.loadingStreetView}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {t.loadingStreetViewDesc}
          </p>
        </div>
      )}

      {/* Atmospheric Retro HUD Overlays */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-2">
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${useFallbackImage ? 'bg-amber-400' : 'bg-emerald-400'} animate-ping`}></div>
          <span className="text-xs uppercase tracking-wider font-mono font-bold text-amber-300 flex items-center gap-1.5">
            {useFallbackImage ? <ImageIcon className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
            {useFallbackImage ? (lang === 'en' ? 'ARCHIVE PHOTO ACTIVE' : 'ARSIP FOTO AKTIF') : t.streetViewActive}
          </span>
        </div>

        <div className="bg-slate-900/75 backdrop-blur-md border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 max-w-xs shadow-md">
          <span className="text-slate-400 font-mono text-[10px] block">{t.investigationMission}</span>
          {t.investigationMissionDesc}
        </div>
      </div>

      {/* Street View Custom Navigation Controls */}
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2 pointer-events-auto">
        {/* Toggle Mode: 360 Street View vs HD Photo */}
        <button
          onClick={() => setUseFallbackImage(!useFallbackImage)}
          title={useFallbackImage ? (lang === 'en' ? 'Switch to Street View 360' : 'Beralih ke Street View 360') : (lang === 'en' ? 'View HD Archival Photo' : 'Lihat Foto Arsip HD')}
          aria-label="Toggle Viewer Mode"
          className={`p-2.5 rounded-xl border shadow-lg backdrop-blur-md transition active:scale-95 cursor-pointer ${useFallbackImage
              ? 'bg-amber-500/30 border-amber-400 text-amber-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
        >
          {useFallbackImage ? <Camera className="w-5 h-5 text-amber-400" /> : <ImageIcon className="w-5 h-5 text-slate-200" />}
        </button>

        <button
          onClick={handleZoomIn}
          title={t.zoomIn}
          aria-label={t.zoomIn}
          className="p-2.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-xl border border-slate-700 shadow-lg backdrop-blur-md transition active:scale-95 cursor-pointer"
        >
          <ZoomIn className="w-5 h-5 text-slate-200" />
        </button>

        <button
          onClick={handleZoomOut}
          title={t.zoomOut}
          aria-label={t.zoomOut}
          className="p-2.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-xl border border-slate-700 shadow-lg backdrop-blur-md transition active:scale-95 cursor-pointer"
        >
          <ZoomOut className="w-5 h-5 text-slate-200" />
        </button>

        <button
          onClick={handleResetPov}
          title={t.resetPov}
          aria-label={t.resetPov}
          className="p-2.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-xl border border-slate-700 shadow-lg backdrop-blur-md transition active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-5 h-5 text-slate-200" />
        </button>

        <button
          onClick={() => setVintageFilterActive(!vintageFilterActive)}
          title={t.vintageFilter}
          aria-label={t.vintageFilter}
          className={`p-2.5 rounded-xl border shadow-lg backdrop-blur-md transition active:scale-95 cursor-pointer ${vintageFilterActive
              ? 'bg-amber-500/25 border-amber-400/80 text-amber-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      {/* Vignette effect for immersive time-travel feel */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.65)]" />
    </div>
  );
};
