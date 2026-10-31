import React from 'react';
import { Calendar, HelpCircle, Car, Building2, Shirt, Sparkles, Hourglass, Zap, Coins, Lock, X } from 'lucide-react';
import { HistoricalPano } from '../data/challenges';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { sanitizeClue } from '../utils/sanitizeClue';
import { SHOP_ITEMS, ShopItem } from '../utils/gamification';
import { ChronoUsage } from '../utils/progress';

interface YearPickerTimelineProps {
  selectedYear: number;
  onYearSelect: (year: number) => void;
  disabled: boolean;
  actualYear?: number;
  revealed: boolean;
  challenge: HistoricalPano;
  lang: Language;
  // Chrono gear & shop items
  unlockedShopItems?: string[];
  activeFilter?: string;
  activeTheme?: string;
  activePerk?: string;
  chronoUsage?: ChronoUsage;
  onToggleItem?: (itemId: string, category: 'filter' | 'theme' | 'perk') => void;
  // Time shift activation
  isTimeShiftEquipped?: boolean;
  isTimeShiftActive?: boolean;
  timeShiftRange?: [number, number] | null;
  timeShiftCost?: number;
  playerCoins?: number;
  chronoUsesRemaining?: number;
  maxChronoUses?: number;
  onActivateTimeShift?: () => void;
  onOpenShop?: () => void;
  showHints?: boolean;
  onToggleHints?: () => void;
  showChronoGear?: boolean;
  onToggleChronoGear?: () => void;
}

export const YearPickerTimeline: React.FC<YearPickerTimelineProps> = ({
  selectedYear,
  onYearSelect,
  disabled,
  actualYear,
  revealed,
  challenge,
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
  chronoUsesRemaining = 3,
  maxChronoUses = 3,
  onActivateTimeShift,
  onOpenShop,
  showHints: controlledShowHints,
  onToggleHints,
  showChronoGear = false,
  onToggleChronoGear,
}) => {
  const t = TRANSLATIONS[lang];
  const [internalShowHints, setInternalShowHints] = React.useState(false);
  const [activeHintTab, setActiveHintTab] = React.useState<'cars' | 'architecture' | 'culture'>('cars');

  const isHintsActive = controlledShowHints !== undefined ? controlledShowHints : internalShowHints;
  const toggleHints = onToggleHints || (() => setInternalShowHints(!internalShowHints));

  // Available year spectrum from Street View inception (2007) to modern era (2024)
  const minYear = 2007;
  const maxYear = 2024;
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  // Filter all items that have been purchased / unlocked
  const purchasedItems: ShopItem[] = SHOP_ITEMS.filter((item) => {
    return (
      unlockedShopItems.includes(item.id) ||
      (item.id === 'perk_time_shift' && isTimeShiftEquipped)
    );
  });

  // Active item names summary for quick status pill
  const activeItemsSummary: string[] = [];
  purchasedItems.forEach((item) => {
    const isActive =
      item.category === 'filter'
        ? activeFilter === item.id
        : item.category === 'theme'
        ? activeTheme === item.id
        : activePerk === item.id;
    if (isActive) {
      activeItemsSummary.push(`${item.icon} ${item.name[lang] || item.name.id}`);
    }
  });

  return (
    <div className="relative bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 shadow-xl text-white">
      {/* Top Bar with Title, Chrono Gear Button & Clue Detective Button */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold tracking-tight truncate">{t.guessYearTitle}</h4>
            <p className="text-[11px] text-slate-400 truncate">
              {t.guessYearDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Chrono Gear Toggle Button */}
          {onToggleChronoGear && (
            <button
              onClick={onToggleChronoGear}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                showChronoGear
                  ? 'bg-amber-500/25 border-amber-400/80 text-amber-300 ring-1 ring-amber-400/30'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title={lang === 'en' ? 'Open Chrono Gear in corner' : 'Buka Peralatan Chrono di sudut kiri bawah'}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'Gear' : 'Peralatan'}</span>
              {purchasedItems.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono bg-amber-500/30 text-amber-300 border border-amber-500/40">
                  {purchasedItems.length}
                </span>
              )}
            </button>
          )}

          {/* Forensic Clue Guide Button */}
          <button
            onClick={toggleHints}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
              isHintsActive
                ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHintsActive ? t.closeForensicGuide : t.forensicGuideBtn}</span>
          </button>
        </div>
      </div>

      {/* Fallback inline hints only if onToggleHints not provided */}
      {!onToggleHints && isHintsActive && (
        <div className="sm:absolute sm:right-[calc(100%+0.75rem)] sm:bottom-0 sm:w-80 md:w-88 mb-3 sm:mb-0 p-3.5 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-amber-500/40 shadow-2xl text-xs z-30 transition-all animate-in fade-in sm:slide-in-from-right-2">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-200">{t.forensicGuideTitle}</span>
            </div>
            <button
              onClick={() => setInternalShowHints(false)}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition cursor-pointer"
              title={lang === 'en' ? 'Close' : 'Tutup'}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-1.5 mb-2.5">
            <button
              onClick={() => setActiveHintTab('cars')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-[11px] font-medium transition cursor-pointer ${
                activeHintTab === 'cars'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Car className="w-3 h-3" /> {t.tabCars}
            </button>
            <button
              onClick={() => setActiveHintTab('architecture')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-[11px] font-medium transition cursor-pointer ${
                activeHintTab === 'architecture'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3 h-3" /> {t.tabArchitecture}
            </button>
            <button
              onClick={() => setActiveHintTab('culture')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-[11px] font-medium transition cursor-pointer ${
                activeHintTab === 'culture'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shirt className="w-3 h-3" /> {t.tabCulture}
            </button>
          </div>

          <div className="text-slate-300 text-xs bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 max-h-44 overflow-y-auto">
            {activeHintTab === 'cars' && (
              <p className="leading-relaxed">
                <strong className="text-amber-400">{t.labelCars} </strong>
                {sanitizeClue(challenge.hints.cars[lang], challenge.city, lang)}
              </p>
            )}
            {activeHintTab === 'architecture' && (
              <p className="leading-relaxed">
                <strong className="text-amber-400">{t.labelArchitecture} </strong>
                {sanitizeClue(challenge.hints.architecture[lang], challenge.city, lang)}
              </p>
            )}
            {activeHintTab === 'culture' && (
              <p className="leading-relaxed">
                <strong className="text-amber-400">{t.labelCulture} </strong>
                {sanitizeClue(challenge.hints.cultureOrFashion[lang], challenge.city, lang)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Compact Active Chrono Equipment Status Badge (Takes minimal vertical space) */}
      {!revealed && (activeItemsSummary.length > 0 || (isTimeShiftActive && timeShiftRange)) && (
        <div className="flex items-center justify-between text-[11px] font-mono px-2.5 py-1.5 mb-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">
              {activeItemsSummary.length > 0
                ? activeItemsSummary.join(' • ')
                : lang === 'en'
                ? 'Time Shift Active'
                : 'Pergeseran Waktu Aktif'}
            </span>
          </div>
          {isTimeShiftActive && timeShiftRange && (
            <span className="font-bold text-amber-200 bg-slate-950/80 px-1.5 py-0.5 rounded border border-amber-400/30 shrink-0 ml-1.5">
              {timeShiftRange[0]}–{timeShiftRange[1]}
            </span>
          )}
        </div>
      )}

      {/* Selected Year Display Header */}
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs uppercase font-mono text-slate-400">{t.selectedYearLabel}</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black font-mono text-amber-400 tracking-wider">
            {selectedYear}
          </span>
          {revealed && actualYear && (
            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              {t.targetYearLabel} {actualYear}
            </span>
          )}
        </div>
      </div>

      {/* Interactive Range Slider */}
      <div className="relative mb-3">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          step={1}
          value={selectedYear}
          disabled={disabled}
          onChange={(e) => onYearSelect(parseInt(e.target.value, 10))}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-60 transition"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 px-1">
          <span>{t.earlyLaunch}</span>
          <span>2015</span>
          <span>{t.modernEra}</span>
        </div>
      </div>

      {/* Quick Click Year Badges */}
      <div className="flex flex-wrap gap-1.5 justify-center max-h-24 overflow-y-auto pr-1">
        {years.map((year) => {
          const isSelected = selectedYear === year;
          const isActual = revealed && actualYear === year;
          const isInTimeShiftRange =
            isTimeShiftActive &&
            timeShiftRange &&
            year >= timeShiftRange[0] &&
            year <= timeShiftRange[1];

          let badgeStyle = 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700';

          if (isInTimeShiftRange) {
            badgeStyle =
              'bg-amber-500/20 text-amber-200 font-bold border-amber-400 ring-1 ring-amber-400/60 shadow-sm shadow-amber-500/20';
          }

          if (isSelected) {
            badgeStyle = 'bg-amber-500 text-slate-950 font-bold border-amber-400 ring-2 ring-amber-400/70 scale-105';
          }
          if (isActual) {
            badgeStyle = 'bg-emerald-500 text-white font-bold border-emerald-400 ring-2 ring-emerald-400/70 animate-pulse';
          }

          return (
            <button
              key={year}
              disabled={disabled}
              onClick={() => onYearSelect(year)}
              className={`relative px-2 py-1 rounded-md text-xs font-mono border transition active:scale-95 disabled:cursor-not-allowed cursor-pointer ${badgeStyle} ${
                isTimeShiftActive && timeShiftRange && !isInTimeShiftRange && !isActual && !isSelected
                  ? 'opacity-40 hover:opacity-80'
                  : ''
              }`}
            >
              {year}
              {isInTimeShiftRange && !isSelected && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-75" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
