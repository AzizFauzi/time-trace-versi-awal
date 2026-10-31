import React from 'react';
import heroBackground from '../assets/hero_background.png';

export const AppBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#030712]">
      {/* Permanent Vintage Antique Cartography & Exploration Artifacts Visual Asset */}
      <img
        src={heroBackground}
        alt="Vintage World Cartography Background"
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
        referrerPolicy="no-referrer"
      />

      {/* Subtle Atmospheric Lighting Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />

      {/* Deep Corner Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.65)]" />
    </div>
  );
};
