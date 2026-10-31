import React, { useEffect, useRef, useState } from 'react';
import { HistoricalPano } from '../data/challenges';
import {
  Camera,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Compass,
  RotateCw,
  Eye,
  Layers,
  Maximize,
  HelpCircle,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { LEVEL_IMAGE_MAP } from '../utils/cityImageHelper';

declare global {
  interface Window {
    pannellum?: any;
  }
}

interface WebGLPanoramaViewerProps {
  challenge: HistoricalPano;
  apiKey?: string;
  isInspecting: boolean;
  lang: Language;
  onPanoLoaded?: (panoMetadata: { date?: string; panoId?: string; copyright?: string }) => void;
  activeFilter?: string;
}

export const WebGLPanoramaViewer: React.FC<WebGLPanoramaViewerProps> = ({
  challenge,
  apiKey,
  lang,
  onPanoLoaded,
  activeFilter = 'none',
}) => {
  const t = TRANSLATIONS[lang];
  const pannellumContainerRef = useRef<HTMLDivElement>(null);
  const pannellumViewerRef = useRef<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [currentYaw, setCurrentYaw] = useState<number>(0);
  const [currentPitch, setCurrentPitch] = useState<number>(0);
  const [currentHfov, setCurrentHfov] = useState<number>(100);

  // High-resolution photographic asset
  const photoAssetUrl =
    (challenge.id === 'indo-50-papua-danau-sentani' && '/city-images/indo_danau_sentani.jpg') ||
    (!challenge.id.startsWith('indo-') && challenge.levelNumber && LEVEL_IMAGE_MAP[challenge.levelNumber]) ||
    (challenge.panoId && apiKey
      ? `https://maps.googleapis.com/maps/api/streetview?size=1600x900&pano=${challenge.panoId}&key=${apiKey}`
      : `/city-images/L1_NYC.png`);

  // Check if Pannellum library is ready
  const isPannellumAvailable = typeof window !== 'undefined' && !!window.pannellum;

  // Initialize WebGL Panorama Viewer
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Destroy existing viewer instance before remounting
    if (pannellumViewerRef.current) {
      try {
        pannellumViewerRef.current.destroy();
      } catch (e) {
        // Ignore destroy error
      }
      pannellumViewerRef.current = null;
    }

    const initViewer = () => {
      if (!pannellumContainerRef.current) return;

      if (!window.pannellum) {
        // Fallback if CDN hasn't finished loading: wait 300ms
        setTimeout(() => {
          if (isMounted) initViewer();
        }, 300);
        return;
      }

      try {
        const viewer = window.pannellum.viewer(pannellumContainerRef.current, {
          type: 'equirectangular',
          panorama: photoAssetUrl,
          autoLoad: true,
          autoRotate: isAutoRotating ? -2 : 0,
          compass: true,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          mouseZoom: true,
          hfov: 100,
          minHfov: 40,
          maxHfov: 120,
          yaw: challenge.streetViewOptions?.pov?.heading || 0,
          pitch: challenge.streetViewOptions?.pov?.pitch || 0,
        });

        viewer.on('load', () => {
          if (!isMounted) return;
          setLoading(false);
          onPanoLoaded?.({
            date: challenge.targetYear ? String(challenge.targetYear) : undefined,
            copyright: 'Arsip Forensik Waktu',
          });
        });

        viewer.on('error', () => {
          if (!isMounted) return;
          // In case the image is a standard flat projection, Pannellum might give error;
          // gracefully fallback
          setLoading(false);
        });

        pannellumViewerRef.current = viewer;
      } catch (err: any) {
        console.error('Error initializing Pannellum:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(initViewer, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (pannellumViewerRef.current) {
        try {
          pannellumViewerRef.current.destroy();
        } catch (e) {}
        pannellumViewerRef.current = null;
      }
    };
  }, [challenge.id, photoAssetUrl]);

  // Controls
  const handleZoom = (delta: number) => {
    if (!pannellumViewerRef.current) return;
    try {
      const current = pannellumViewerRef.current.getHfov();
      pannellumViewerRef.current.setHfov(Math.max(40, Math.min(120, current + delta)));
    } catch (e) {}
  };

  const handleToggleAutoRotate = () => {
    if (!pannellumViewerRef.current) return;
    try {
      if (isAutoRotating) {
        pannellumViewerRef.current.stopAutoRotate();
        setIsAutoRotating(false);
      } else {
        pannellumViewerRef.current.startAutoRotate(-2);
        setIsAutoRotating(true);
      }
    } catch (e) {}
  };

  const handleResetView = () => {
    if (!pannellumViewerRef.current) return;
    try {
      pannellumViewerRef.current.setPitch(challenge.streetViewOptions?.pov?.pitch || 0);
      pannellumViewerRef.current.setYaw(challenge.streetViewOptions?.pov?.heading || 0);
      pannellumViewerRef.current.setHfov(100);
    } catch (e) {}
  };

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      {/* 360 WebGL Canvas Container */}
      <div
        ref={pannellumContainerRef}
        className={`w-full h-full transition-filter duration-300 ${
          activeFilter === 'vintage_1970'
            ? 'sepia-[0.6] contrast-125 brightness-95'
            : activeFilter === 'vintage_1990'
            ? 'saturate-150 contrast-110 hue-rotate-15'
            : ''
        }`}
      />

      {/* Retro VHS Scanline Filter Overlay */}
      {activeFilter === 'vintage_1990' && (
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-40 z-10" />
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
          <p className="text-amber-200 font-serif tracking-widest text-sm animate-pulse">
            MEMUAT ARSIP PANORAMA 360° WEBGL...
          </p>
          <span className="text-[11px] text-slate-400 mt-1 font-mono">
            Mode Bebas Kuota (100% Open-Source Rp 0)
          </span>
        </div>
      )}

      {/* Floating HUD Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Reset View */}
        <button
          onClick={handleResetView}
          title="Reset Arah Kamera"
          className="p-2.5 bg-slate-900/80 hover:bg-amber-600/80 text-amber-200 hover:text-white rounded-xl backdrop-blur-md border border-amber-500/30 shadow-lg transition-all"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Auto Rotate */}
        <button
          onClick={handleToggleAutoRotate}
          title={isAutoRotating ? 'Hentikan Putar Otomatis' : 'Putar 360° Otomatis'}
          className={`p-2.5 rounded-xl backdrop-blur-md border shadow-lg transition-all ${
            isAutoRotating
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-slate-900/80 hover:bg-amber-600/80 text-amber-200 hover:text-white border-amber-500/30'
          }`}
        >
          <RotateCw className="w-4 h-4" />
        </button>

        {/* Zoom In */}
        <button
          onClick={() => handleZoom(-15)}
          title="Zoom In (Perbesar Petunjuk)"
          className="p-2.5 bg-slate-900/80 hover:bg-amber-600/80 text-amber-200 hover:text-white rounded-xl backdrop-blur-md border border-amber-500/30 shadow-lg transition-all"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => handleZoom(15)}
          title="Zoom Out (Perluas Sudut Pandang)"
          className="p-2.5 bg-slate-900/80 hover:bg-amber-600/80 text-amber-200 hover:text-white rounded-xl backdrop-blur-md border border-amber-500/30 shadow-lg transition-all"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom-Left Engine Badge */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/20 text-xs text-amber-300 font-mono shadow-xl">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>360° WebGL Panorama Engine</span>
        <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
          Rp 0 Selamanya
        </span>
      </div>
    </div>
  );
};
