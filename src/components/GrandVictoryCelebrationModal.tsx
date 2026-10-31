import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Crown,
  Sparkles,
  Star,
  CheckCircle,
  Home,
  Share2,
  Compass,
  History,
  PartyPopper,
  BookOpen,
  Download,
  Gift,
  ShieldCheck,
  Check,
  Tent,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Film,
  ArrowRight,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { Language } from '../utils/i18n';
import { PlayerProgress, PlayerRank } from '../utils/progress';
import { getRankAssetByStars, RankVisualAsset } from '../utils/rankAssets';
import { soundManager } from '../utils/soundManager';

interface GrandVictoryCelebrationModalProps {
  lang: Language;
  progress: PlayerProgress;
  playerRank: PlayerRank;
  onClose: () => void;
  onOpenPassport: () => void;
  onOpenLevelSelector: () => void;
  initialStage?: 'video' | 'certificate';
}

const CLAIMED_KEY = 'time_trace_title_claimed';
const CLAIMED_DATE_KEY = 'time_trace_title_claimed_date';

export const GrandVictoryCelebrationModal: React.FC<GrandVictoryCelebrationModalProps> = ({
  lang,
  progress,
  playerRank,
  onClose,
  onOpenPassport,
  onOpenLevelSelector,
  initialStage = 'video',
}) => {
  const [stage, setStage] = useState<'video' | 'certificate'>(initialStage);
  const [copied, setCopied] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [downloadFeedback, setDownloadFeedback] = useState<boolean>(false);

  // Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  // Claim date
  const [claimedDate, setClaimedDate] = useState<string>(() => {
    return (
      (typeof window !== 'undefined' && localStorage.getItem(CLAIMED_DATE_KEY)) ||
      new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  });

  const rankAsset: RankVisualAsset = getRankAssetByStars(progress.totalStars);

  // Certificate serial number (e.g. GAME-CERT-100-261-7042)
  const scoreHash = Math.abs((progress.totalScore * 7 + 1042) % 9999).toString().padStart(4, '0');
  const certSerial = `GAME-CERT-100-${progress.totalStars}-${scoreHash}`;

  // Automatically mark title as claimed on viewing ceremony
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CLAIMED_KEY, 'true');
      if (!localStorage.getItem(CLAIMED_DATE_KEY)) {
        const d = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        localStorage.setItem(CLAIMED_DATE_KEY, d);
        setClaimedDate(d);
      }
    }
  }, [lang]);

  // Attempt to autoplay video on mount (with fallback for browsers requiring muted autoplay)
  useEffect(() => {
    setShowContent(true);

    if (stage === 'video' && videoRef.current) {
      const v = videoRef.current;
      v.play().catch(() => {
        // Autoplay policy prevented unmuted audio, mute and play
        v.muted = true;
        setIsVideoMuted(true);
        v.play().catch((err) => console.log('Autoplay deferred:', err));
      });
    }
  }, [stage]);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setVideoProgress((current / duration) * 100);
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    setIsVideoPlaying(false);
    // Trigger celebratory confetti on video completion
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308'],
    });
  };

  const handleTransitionToCertificate = () => {
    soundManager.playLevelUp();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setStage('certificate');

    // Fireworks explosion entering the certificate view
    confetti({
      particleCount: 160,
      spread: 110,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#f59e0b', '#38bdf8', '#10b981', '#ec4899'],
    });
  };

  const handleReplayVideo = () => {
    setStage('video');
    setVideoEnded(false);
    setIsVideoPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 150);
  };

  const triggerMoreFireworks = () => {
    soundManager.playLevelUp();
    confetti({
      particleCount: 160,
      spread: 110,
      origin: { y: 0.55 },
      colors: ['#ffd700', '#ff6b6b', '#48dbfb', '#1dd1a1', '#f368e0'],
    });
  };

  const handleShareAchievement = () => {
    const text =
      lang === 'en'
        ? `🏆 TIME TRACE: CONGRATULATIONS, HERO!\n📜 Certificate of Achievement: Penakluk Waktu (Level Elite ${rankAsset.rankLevel}/7)\n⭐ Total Stars: ${progress.totalStars}/300 | 100/100 Missions Resolved\n🎖️ Serial: ${certSerial}\nVerified by the World Explorer Council.`
        : `🏆 TIME TRACE: SELAMAT, PAHLAWAN!\n📜 Piagam Penghargaan Keberhasilan: Penakluk Waktu (Level Elite ${rankAsset.rankLevel}/7)\n⭐ Total Bintang: ${progress.totalStars}/300 | 100/100 Misi Terpecahkan\n🎖️ No. Sertifikat: ${certSerial}\nTelah Diverifikasi oleh Dewan Penjelajah Dunia.`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    soundManager.playTick();
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadCertificate = () => {
    soundManager.playCoin();
    const link = document.createElement('a');
    link.href = '/certificate/selamat_pahlawan_full.png';
    link.download = `Piagam_Penakluk_Waktu_${progress.totalStars}_Bintang.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadFeedback(true);
    setTimeout(() => setDownloadFeedback(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto">
      {/* Background Atmosphere: Deep night sky, medieval citadel silhouettes, and golden dust */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/assets/hero_desk.png"
          alt="Time Trace Hero Background"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.2] scale-105"
        />
        {/* Dark Vignette Overlay & Golden Radiance */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/98 via-slate-950/80 to-slate-950/95" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.22)_0%,rgba(59,130,246,0.1)_45%,transparent_70%)] animate-pulse" />
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: CINEMATIC OPENING CELEBRATION VIDEO                               */}
      {/* ========================================================================= */}
      {stage === 'video' && (
        <div
          className={`relative z-10 w-full max-w-3xl my-auto text-white p-3 sm:p-6 text-center transition-all duration-700 ${
            showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Top Badges */}
          <div className="flex items-center justify-between w-full mb-3 px-1 sm:px-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-400/40 bg-slate-950/80 text-amber-300 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md">
              <span className="text-amber-400">✦</span>
              <span>{lang === 'en' ? 'GRAND FINALE 100 MISSIONS' : 'KASUS 100 SELESAI'}</span>
            </div>

            <button
              onClick={handleTransitionToCertificate}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-400/40 bg-slate-950/80 hover:bg-slate-900 text-amber-300 hover:text-amber-200 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase transition cursor-pointer shadow-md"
            >
              <span>{lang === 'en' ? 'Skip to Certificate >' : 'Lewati ke Piagam >'}</span>
            </button>
          </div>

          {/* Heading */}
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 font-mono text-xs font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'VICTORY CEREMONY' : 'SEREMONI KEMENANGAN'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-wide bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-md">
              {lang === 'en' ? 'CONGRATULATIONS, TIME HERO!' : 'SELAMAT, PENAKLUK WAKTU!'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mt-1 font-medium leading-relaxed">
              {lang === 'en'
                ? 'Watch the victory chronicle of your journey restoring 100 historical timelines across the globe.'
                : 'Saksikan video penobatan kemenangan atas tuntasnya 100 kasus sejarah dunia yang telah Anda pulihkan.'}
            </p>
          </div>

          {/* Cinema Video Player Container with Gold Frame */}
          <div className="relative w-full rounded-3xl border-2 border-amber-400/80 bg-slate-950/90 shadow-[0_0_80px_rgba(245,158,11,0.35)] overflow-hidden aspect-video group">
            <video
              ref={videoRef}
              src="/certificate/congratulation.mp4"
              className="w-full h-full object-cover cursor-pointer"
              playsInline
              autoPlay
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              onClick={toggleVideoPlay}
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent flex items-center justify-between gap-3 z-20">
              {/* Play / Pause button */}
              <button
                onClick={toggleVideoPlay}
                className="p-2 sm:p-2.5 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 shadow-lg transition cursor-pointer active:scale-95"
                title={isVideoPlaying ? 'Pause' : 'Play'}
              >
                {isVideoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              {/* Progress Bar */}
              <div
                onClick={(e) => {
                  if (!videoRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
                }}
                className="flex-1 h-2 bg-slate-800/80 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              {/* Sound / Mute button */}
              <button
                onClick={toggleVideoMute}
                className={`p-2 rounded-full border transition cursor-pointer active:scale-95 ${
                  isVideoMuted
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                    : 'bg-slate-900/80 border-slate-700 text-amber-300 hover:bg-slate-800'
                }`}
                title={isVideoMuted ? 'Unmute' : 'Mute'}
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Watermark / Logo on top right of video */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/75 border border-amber-400/40 text-[10px] font-mono text-amber-300 backdrop-blur-md">
              <img src="/logo.png" alt="Time Trace" className="w-4 h-4 object-contain" />
              <span>TIME TRACE CHRONO FINALE</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE REQUESTED "CLAIM NOW / LIHAT SEKARANG" PRIMARY ACTION BUTTON          */}
          {/* ========================================================================= */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              onClick={handleTransitionToCertificate}
              className="w-full sm:w-auto min-w-[320px] sm:min-w-[420px] py-4 px-8 rounded-2xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 text-slate-950 text-sm sm:text-base tracking-wide shadow-[0_0_40px_rgba(245,158,11,0.7)] flex items-center justify-center gap-3 transition active:scale-98 cursor-pointer border-2 border-yellow-200 group animate-pulse"
            >
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-center leading-tight">
                <span>{lang === 'en' ? 'CLAIM NOW • VIEW CERTIFICATE >' : 'KLAIM SEKARANG • LIHAT SEKARANG >'}</span>
                <span className="text-[10px] font-mono text-slate-900 font-bold opacity-80 mt-0.5">
                  {lang === 'en' ? 'Click to open your official Diploma of Honor' : 'Buka Piagam Penghargaan Keberhasilan Resmi'}
                </span>
              </div>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 group-hover:scale-110 transition-transform" />
            </button>

            {/* Replay or Back option */}
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={handleReplayVideo}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Replay Video' : 'Putar Ulang Video'}</span>
              </button>
              <span className="text-slate-700">•</span>
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer font-medium"
              >
                {lang === 'en' ? 'Return to HQ' : 'Kembali ke Markas'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: "SELAMAT, PAHLAWAN!" CERTIFICATE PAGE                            */}
      {/* ========================================================================= */}
      {stage === 'certificate' && (
        <div
          className={`relative z-10 w-full max-w-2xl my-auto text-white p-3 sm:p-5 text-center transition-all duration-700 ${
            showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Top Header Row with Corner Badges */}
          <div className="flex items-center justify-between w-full mb-3 px-1 sm:px-2">
            {/* Top-Left: Ekspedisi 100 Misi */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-400/40 bg-slate-950/70 text-amber-300 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm">
              <span className="text-amber-400">✦</span>
              <span>{lang === 'en' ? 'EXPEDITION 100 MISSIONS' : 'EKSPEDISI 100 MISI'}</span>
            </div>

            {/* Top-Right: Catatan Pahlawan & Replay Video Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReplayVideo}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-400/40 bg-slate-950/70 hover:bg-slate-900 text-amber-300 hover:text-amber-200 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm transition cursor-pointer"
                title={lang === 'en' ? 'Watch Celebration Video' : 'Tonton Video Perayaan'}
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{lang === 'en' ? 'WATCH VIDEO' : 'VIDEO PEMBUKAAN'}</span>
              </button>

              <button
                onClick={onOpenPassport}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-400/40 bg-slate-950/70 hover:bg-slate-900 text-amber-300 hover:text-amber-200 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm transition cursor-pointer"
              >
                <span>{lang === 'en' ? 'HERO DOSSIER' : 'CATATAN PAHLAWAN'}</span>
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Top Center Emblem Crest (With User's Logo integrated in center) */}
          <div className="flex flex-col items-center justify-center -mb-2">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
              {/* Ambient golden aura behind crest */}
              <div className="absolute inset-0 bg-amber-400/25 blur-xl rounded-full animate-pulse" />
              
              {/* The Golden Laurel Wreath Crown Crest from Certificate folder */}
              <img
                src="/certificate/cert_crown_crest.png"
                alt="Golden Crown Wreath Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(245,158,11,0.65)]"
              />

              {/* Our Official Logo embedded seamlessly inside the crest center */}
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-slate-950/80 p-1 border border-amber-400/80 shadow-inner flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Time Trace Logo"
                  className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                />
              </div>
            </div>

            {/* Main Title: SELAMAT, PAHLAWAN! */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-wider bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] mt-1">
              {lang === 'en' ? 'CONGRATULATIONS, HERO!' : 'SELAMAT, PAHLAWAN!'}
            </h1>

            {/* Subtitle with diamond flourishes */}
            <div className="flex items-center justify-center gap-2 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mt-1">
              <span className="text-amber-400 text-xs">✦ ✧ ✦</span>
              <span className="drop-shadow-sm font-serif">
                {lang === 'en'
                  ? 'Certificate of achievement unlocked'
                  : 'Piagam penghargaan keberhasilan telah dibuka'}
              </span>
              <span className="text-amber-400 text-xs">✦ ✧ ✦</span>
            </div>

            {/* Inscription text */}
            <p className="text-slate-300 text-[11px] sm:text-xs max-w-lg mt-2 font-medium leading-relaxed drop-shadow-sm">
              {lang === 'en'
                ? 'With perseverance, strategy, and courage, you have resolved all missions with excellence. The world now records your name as one of history\'s greatest time explorers.'
                : 'Dengan ketekunan, strategi, dan keberanian, Anda telah menyelesaikan seluruh rangkaian misi dengan luar biasa. Dunia kini mencatat namamu sebagai salah satu penjelajah paling berprestasi.'}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* THE ORNATE GOLDEN CERTIFICATE CARD ("DUNIA MENGAKUI")                      */}
          {/* ========================================================================= */}
          <div
            className="relative w-full my-3 sm:my-4 rounded-[2rem] border-2 border-amber-400/85 text-white shadow-[0_0_80px_rgba(245,158,11,0.4)] p-4 sm:p-6 text-center overflow-hidden"
            style={{
              backgroundImage: "url('/certificate/cert_frame.png')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundColor: '#070f20',
            }}
          >
            {/* Dark Overlay inside frame for ultra-crisp text contrast */}
            <div className="absolute inset-0 bg-slate-950/78 backdrop-blur-[0.5px] pointer-events-none" />

            {/* Inner content wrapper */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Top Pill: DUNIA MENGAKUI */}
              <div className="inline-flex items-center gap-2 px-4 py-0.5 rounded-full bg-slate-950/90 border border-amber-400/60 text-amber-300 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 shadow-md">
                <span>✦</span>
                <span>{lang === 'en' ? 'WORLD ACCLAIMED' : 'DUNIA MENGAKUI'}</span>
                <span>✦</span>
              </div>

              {/* Heading: PIAGAM PENGHARGAAN KEBERHASILAN */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5">
                <span className="text-amber-400 text-base sm:text-xl">🌿</span>
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-black font-serif tracking-wider text-amber-200 drop-shadow-md">
                  {lang === 'en'
                    ? 'CERTIFICATE OF SUPREME ACHIEVEMENT'
                    : 'PIAGAM PENGHARGAAN KEBERHASILAN'}
                </h2>
                <span className="text-amber-400 text-base sm:text-xl scale-x-[-1]">🌿</span>
              </div>

              {/* Inscription Body */}
              <p className="text-slate-200 text-[10px] sm:text-xs max-w-md mx-auto leading-relaxed drop-shadow-sm mb-3">
                {lang === 'en'
                  ? 'This hereby certifies that you have conquered all challenges in this expedition and are entitled to receive the rank of honor for exceptional dedication and triumph.'
                  : 'Dengan ini menyatakan bahwa Anda telah berhasil menyelesaikan seluruh tantangan dalam ekspedisi ini dan berhak menerima gelar kehormatan atas dedikasi, ketangguhan, dan pencapaian luar biasa.'}
              </p>

              {/* Hero Rank Box (Level Elite 7/7 • Penakluk Waktu) */}
              <div className="w-full max-w-lg my-1 p-3 rounded-2xl bg-[#091326]/90 border border-amber-400/60 shadow-lg flex items-center justify-between gap-3 relative overflow-hidden">
                {/* Subtle blue radiance behind title */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-48 h-32 bg-blue-600/20 blur-2xl pointer-events-none" />

                {/* Left: Detective Avatar inside ornate ring */}
                <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-amber-400 p-0.5 bg-gradient-to-tr from-amber-500/30 to-blue-600/30 shrink-0 shadow-md">
                  <img
                    src={rankAsset.image}
                    alt={rankAsset.name[lang]}
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
                  />
                </div>

                {/* Right: Title & Elite Level */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5 text-amber-400 text-[9px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                    <span>✦</span>
                    <span>{lang === 'en' ? `ELITE LEVEL ${rankAsset.rankLevel}/7` : `LEVEL ELITE ${rankAsset.rankLevel}/7`}</span>
                    <span>✦</span>
                  </div>

                  <div className="text-xl sm:text-2xl lg:text-3xl font-black font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 drop-shadow-md">
                    {lang === 'en' ? (rankAsset.name.en || 'Time Conqueror') : 'Penakluk Waktu'}
                  </div>

                  <div className="flex items-center gap-1.5 text-blue-300 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase mt-0.5 font-bold">
                    <span>✦</span>
                    <span>{lang === 'en' ? 'TITLE OF HONOR' : 'GELAR KEHORMATAN'}</span>
                    <span>✦</span>
                  </div>
                </div>
              </div>

              {/* 4 Stat Boxes (Misi, Bintang, Skor, Tanggal) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg mt-3">
                {/* 1. Misi */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#081020]/90 border border-amber-500/40 text-center shadow-md">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                    <span>📜</span>
                    <span>{lang === 'en' ? 'Missions' : 'Misi'}</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-emerald-400 font-mono mt-0.5">
                    100/100
                  </div>
                </div>

                {/* 2. Bintang */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#081020]/90 border border-amber-500/40 text-center shadow-md">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                    <span>⭐</span>
                    <span>{lang === 'en' ? 'Stars' : 'Bintang'}</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-amber-300 font-mono mt-0.5">
                    {progress.totalStars}/300
                  </div>
                </div>

                {/* 3. Skor */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#081020]/90 border border-amber-500/40 text-center shadow-md">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                    <span>🏆</span>
                    <span>{lang === 'en' ? 'Score' : 'Skor'}</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-cyan-300 font-mono mt-0.5">
                    {progress.totalScore.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')}
                  </div>
                </div>

                {/* 4. Tanggal */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#081020]/90 border border-amber-500/40 text-center shadow-md">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                    <span>📅</span>
                    <span>{lang === 'en' ? 'Date' : 'Tanggal'}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-200 mt-1 truncate">
                    {claimedDate}
                  </div>
                </div>
              </div>

              {/* Bottom Certification Info & Wax Seal Medal */}
              <div className="w-full max-w-lg mt-3 pt-2.5 border-t border-amber-500/30 flex items-center justify-between text-left relative">
                {/* Left: Serial Number */}
                <div>
                  <p className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                    {lang === 'en' ? 'CERTIFICATE ID' : 'SERTIFIKAT'}
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-amber-300 font-bold tracking-wide">
                    {certSerial}
                  </p>
                </div>

                {/* Right: Verified Badge & Golden Wax Seal Ribbon */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-400 font-mono">
                      <span>{lang === 'en' ? 'VERIFIED' : 'TELAH DIVERIFIKASI'}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[9px] text-slate-400">
                      {lang === 'en' ? 'World Explorer Council' : 'Dewan Penjelajah Dunia'}
                    </p>
                  </div>

                  {/* 3D Wax Seal with Blue Ribbons from Certificate folder */}
                  <div className="relative -mr-2 sm:-mr-4 -my-3 shrink-0">
                    <img
                      src="/certificate/cert_wax_seal.png"
                      alt="Official Gold Wax Seal"
                      className="w-16 h-20 sm:w-20 sm:h-24 object-contain filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.6)] hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ACTION BUTTONS (MATCHING THE EXAMPLE DESIGN)                               */}
          {/* ========================================================================= */}
          <div className="w-full max-w-lg mx-auto flex flex-col gap-2.5 mt-2">
            {/* Top Row: 3 Buttons (Lihat Hadiah, Bagikan, Simpan Sertifikat) */}
            <div className="grid grid-cols-3 gap-2">
              {/* 1. Lihat Hadiah */}
              <button
                onClick={onOpenPassport}
                className="py-2.5 sm:py-3 px-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer group"
                title={lang === 'en' ? 'View Rewards & Passport' : 'Lihat Hadiah & Paspor'}
              >
                <Gift className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>{lang === 'en' ? 'Rewards >' : 'Lihat Hadiah >'}</span>
              </button>

              {/* 2. Bagikan */}
              <button
                onClick={handleShareAchievement}
                className="py-2.5 sm:py-3 px-2 rounded-xl bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-900/90 border border-blue-400/60 hover:border-blue-300 text-blue-100 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer group shadow-blue-500/20"
                title={lang === 'en' ? 'Share Achievement' : 'Bagikan Pencapaian'}
              >
                <Share2 className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>{copied ? (lang === 'en' ? 'Copied! ✓' : 'Tersalin! ✓') : (lang === 'en' ? 'Share >' : 'Bagikan >')}</span>
              </button>

              {/* 3. Simpan Sertifikat */}
              <button
                onClick={handleDownloadCertificate}
                className="py-2.5 sm:py-3 px-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer group"
                title={lang === 'en' ? 'Download Certificate Image' : 'Unduh Piagam Sertifikat'}
              >
                <Download className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>{downloadFeedback ? (lang === 'en' ? 'Saved! ✓' : 'Tersimpan! ✓') : (lang === 'en' ? 'Save Cert >' : 'Simpan Sertifikat >')}</span>
              </button>
            </div>

            {/* Bottom Row: Primary Full-Width Golden Button (Kembali ke Markas) */}
            <button
              onClick={onClose}
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-black bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer border border-yellow-200 group"
            >
              <Tent className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>{lang === 'en' ? 'Return to Headquarters >' : 'Kembali ke Markas >'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
