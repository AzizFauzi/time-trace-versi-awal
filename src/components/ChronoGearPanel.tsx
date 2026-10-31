import React from 'react';
import { Sparkles, Hourglass, Zap, Coins, ShoppingBag, X } from 'lucide-react';
import { Language } from '../utils/i18n';
import { SHOP_ITEMS } from '../utils/gamification';
import { ChronoUsage } from '../utils/progress';

interface ChronoGearPanelProps {
  lang: Language;
  unlockedShopItems: string[];
  activeFilter?: string;
  activeTheme?: string;
  activePerk?: string;
  chronoUsage?: ChronoUsage;
  onToggleItem?: (itemId: string, category: 'filter' | 'theme' | 'perk') => void;
  isTimeShiftEquipped?: boolean;
  isTimeShiftActive?: boolean;
  timeShiftRange?: [number, number] | null;
  timeShiftCost?: number;
  playerCoins?: number;
  onActivateTimeShift?: () => void;
  onOpenShop?: () => void;
  disabled?: boolean;
  onClose?: () => void;
}

export const ChronoGearPanel: React.FC<ChronoGearPanelProps> = ({
  lang,
  unlockedShopItems = [],
  activeFilter = 'none',
  activeTheme = 'default',
  activePerk = 'none',
  chronoUsage,
  onToggleItem,
  isTimeShiftEquipped = false,
  isTimeShiftActive = false,
  timeShiftRange = null,
  timeShiftCost = 150,
  playerCoins = 0,
  onActivateTimeShift,
  onOpenShop,
  disabled = false,
  onClose,
}) => {
  // Find all purchased items
  const purchasedItems = SHOP_ITEMS.filter((item) => {
    return (
      unlockedShopItems.includes(item.id) ||
      (item.id === 'perk_time_shift' && isTimeShiftEquipped)
    );
  });

  const canAffordShift = playerCoins >= timeShiftCost;

  return (
    <div className="flex flex-col gap-2.5">
      {/* Header if standalone */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black tracking-wide uppercase text-amber-300 font-mono">
                {lang === 'en' ? 'Chrono Gear' : 'Peralatan Chrono'}
              </h4>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {purchasedItems.length}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {lang === 'en'
                ? 'Equip temporal gadgets & archival filters'
                : 'Aktifkan gadget waktu & filter visual arsip'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenShop && (
            <button
              onClick={onOpenShop}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-bold font-mono flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition cursor-pointer"
              title={lang === 'en' ? 'Open Chrono Shop' : 'Buka Toko Penjelajah'}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>{lang === 'en' ? 'Shop' : 'Toko'}</span>
              <span>↗</span>
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl transition cursor-pointer"
              title={lang === 'en' ? 'Close' : 'Tutup'}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {purchasedItems.length === 0 ? (
        <div
          onClick={onOpenShop}
          className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition cursor-pointer flex items-center justify-between group shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⏳</span>
            <div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition">
                {lang === 'en' ? 'No Chrono items owned yet' : 'Belum ada item Chrono'}
              </div>
              <div className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                {lang === 'en'
                  ? 'Get lenses, map themes & time shift in Chrono Shop'
                  : 'Beli lensa, tema peta & time shift di Toko Penjelajah'}
              </div>
            </div>
          </div>
          <span className="text-[11px] text-amber-400 font-bold font-mono shrink-0 group-hover:translate-x-0.5 transition ml-2">
            {lang === 'en' ? 'Shop →' : 'Toko →'}
          </span>
        </div>
      ) : (
        <div className="space-y-2 max-h-60 sm:max-h-72 overflow-y-auto pr-1 scrollbar-thin">
          {purchasedItems.map((item) => {
            const isActive =
              item.category === 'filter'
                ? activeFilter === item.id
                : item.category === 'theme'
                ? activeTheme === item.id
                : activePerk === item.id;

            const remaining = chronoUsage?.remainingByItem?.[item.id] ?? 3;
            const isOutOfQuota = remaining <= 0;

            return (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border transition flex flex-col gap-2 ${
                  isActive
                    ? 'bg-amber-500/10 border-amber-400/50 shadow-sm shadow-amber-500/5'
                    : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-200 truncate">
                          {item.name[lang] || item.name.id}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                            isOutOfQuota
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          }`}
                        >
                          {isOutOfQuota
                            ? `0/3 ${lang === 'en' ? 'Used' : 'Habis'}`
                            : `⚡ ${remaining}/3`}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.category === 'filter'
                          ? lang === 'en'
                            ? 'Visual Lens Filter'
                            : 'Filter Visual Lensa'
                          : item.category === 'theme'
                          ? lang === 'en'
                            ? 'Guess Map HUD Theme'
                            : 'Tema HUD Peta'
                          : lang === 'en'
                          ? 'Temporal Gadget'
                          : 'Gadget Waktu'}
                      </div>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={() => onToggleItem?.(item.id, item.category)}
                    disabled={disabled || (!isActive && isOutOfQuota)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono transition flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 shadow-sm shadow-emerald-500/10'
                        : isOutOfQuota
                        ? 'bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title={
                      isActive
                        ? lang === 'en'
                          ? 'Currently In Use (click to remove)'
                          : 'Sedang Digunakan (klik untuk lepas)'
                        : isOutOfQuota
                        ? lang === 'en'
                          ? 'Daily quota exhausted'
                          : 'Kuota habis hari ini'
                        : lang === 'en'
                        ? 'Click to Use'
                        : 'Klik untuk Menggunakan'
                    }
                  >
                    {isActive ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{lang === 'en' ? 'In Use' : 'Digunakan'}</span>
                      </>
                    ) : isOutOfQuota ? (
                      <span>{lang === 'en' ? 'Exhausted' : 'Habis'}</span>
                    ) : (
                      <span>{lang === 'en' ? 'Use' : 'Gunakan'}</span>
                    )}
                  </button>
                </div>

                {/* Specific Action for Time Shift Gadget if Active */}
                {item.id === 'perk_time_shift' && isActive && (
                  <div className="pt-1.5 border-t border-slate-800/80">
                    {isTimeShiftActive && timeShiftRange ? (
                      <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-between text-xs font-mono text-amber-300 animate-in fade-in">
                        <span className="flex items-center gap-1.5">
                          <Hourglass className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          <span>{lang === 'en' ? 'Target Range' : 'Rentang Target'}:</span>
                        </span>
                        <span className="font-black px-2 py-0.5 rounded bg-slate-950/80 border border-amber-400/40 text-amber-200">
                          {timeShiftRange[0]} – {timeShiftRange[1]}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={onActivateTimeShift}
                        disabled={disabled || !canAffordShift || isOutOfQuota}
                        className={`w-full py-2 px-2.5 rounded-lg text-xs font-bold font-mono flex items-center justify-between transition cursor-pointer ${
                          isOutOfQuota
                            ? 'bg-slate-950/60 border border-slate-800 text-slate-500 cursor-not-allowed'
                            : canAffordShift
                            ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 hover:from-amber-500/35 hover:to-orange-500/35 border border-amber-400/60 text-amber-300'
                            : 'bg-slate-950/60 border border-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            {lang === 'en' ? 'Scan Target (±2 Yrs)' : 'Pindai Target (±2 Thn)'}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-400/30">
                          <Coins className="w-3 h-3" />
                          <span>{timeShiftCost}</span>
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
