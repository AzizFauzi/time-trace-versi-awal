import React, { useEffect, useState } from 'react';
import {
  X,
  Clock,
  Calendar,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Lightbulb,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { BlogArticle, BLOG_ARTICLES } from '../data/blogArticles';
import { Language } from '../utils/i18n';
import { soundManager } from '../utils/soundManager';

interface BlogReaderModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  lang: Language;
  onStartCampaign?: (levelNumber: number) => void;
  onSelectArticle?: (article: BlogArticle) => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  article,
  onClose,
  lang,
  onStartCampaign,
  onSelectArticle,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const isEn = lang === 'en';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const currentIdx = BLOG_ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIdx > 0 ? BLOG_ARTICLES[currentIdx - 1] : null;
  const nextArticle = currentIdx < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIdx + 1] : null;

  const content = isEn ? article.content.en : article.content.id;
  const title = isEn ? article.title.en : article.title.id;
  const category = isEn ? article.category.en : article.category.id;
  const authorRole = isEn ? article.author.role.en : article.author.role.id;

  const handleShare = () => {
    try {
      soundManager.playTick();
    } catch (_) {}

    const url = `${window.location.origin}?article=${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handlePlayRelated = () => {
    if (article.relatedLevel && onStartCampaign) {
      try {
        soundManager.playCorrect();
      } catch (_) {}
      onClose();
      onStartCampaign(article.relatedLevel);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#090f1d] border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 ring-1 ring-white/10"
      >
        {/* TOP BAR / HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a1122]/90 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{category}</span>
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{article.readTime}</span>
              <span className="text-slate-600">•</span>
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400/60 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              title={isEn ? 'Copy Article Link' : 'Salin Tautan Artikel'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{isEn ? 'Copied!' : 'Disalin!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Share' : 'Bagikan'}</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE ARTICLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-7 space-y-7 custom-scrollbar">
          {/* Main Title & Author Meta */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-sm">
              {title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-1 border-b border-slate-800/80 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl shrink-0 shadow-inner">
                {article.author.avatar}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-200 block leading-tight">
                  {article.author.name}
                </span>
                <span className="text-xs text-amber-400/90 font-medium">
                  {authorRole}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
            <img
              src={article.coverImage}
              alt={title}
              className="w-full h-full object-cover filter brightness-[1.03] contrast-[1.05]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/city-images/L1_Paris.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-mono font-medium text-amber-300 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-400 text-slate-200 text-sm sm:text-base leading-relaxed italic shadow-inner">
            &ldquo;{content.intro}&rdquo;
          </div>

          {/* Structured Body Sections */}
          <div className="space-y-6">
            {content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  <span>{sec.heading}</span>
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-sans">
                  {sec.body}
                </p>

                {/* Optional Highlight Tip Card */}
                {sec.tip && (
                  <div className="mt-2.5 p-3.5 rounded-xl bg-[#0e172a] border border-blue-500/30 flex items-start gap-3 text-xs sm:text-sm text-blue-200 shadow-md">
                    <div className="p-1 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-blue-300 font-bold block mb-0.5">
                        {isEn ? 'Field Detective Clue:' : 'Petunjuk Lapangan:'}
                      </strong>
                      <span className="text-slate-300">{sec.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 leading-relaxed">
            <strong className="text-white block mb-1">
              {isEn ? 'Investigative Conclusion:' : 'Kesimpulan Penyelidikan:'}
            </strong>
            <p>{content.conclusion}</p>
          </div>

          {/* PLAY RELATED LEVEL CTA BANNER */}
          {article.relatedLevel && onStartCampaign && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-indigo-950/40 border-2 border-amber-400/80 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Challenge Yourself in Game' : 'Tantang Diri Kamu di Game'}</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {isEn ? `Ready to test your instincts in Level ${article.relatedLevel}?` : `Siap uji instingmu di Kasus Level ${article.relatedLevel}?`}
                </h4>
                <p className="text-xs text-slate-300">
                  {isEn
                    ? 'Put these historical clues into practice on real panoramic archives.'
                    : 'Terapkan petunjuk sejarah ini secara langsung di arsip foto jalanan.'}
                </p>
              </div>

              <button
                onClick={handlePlayRelated}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition active:scale-98 shrink-0"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>{isEn ? 'Play This Case Now' : 'Mainkan Kasus Ini Sekarang'}</span>
              </button>
            </div>
          )}

          {/* PREVIOUS & NEXT ARTICLE NAVIGATION */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
            {prevArticle ? (
              <button
                onClick={() => onSelectArticle && onSelectArticle(prevArticle)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition cursor-pointer max-w-[45%]"
              >
                <ChevronLeft className="w-4 h-4 shrink-0 text-amber-400" />
                <div className="text-left truncate">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">{isEn ? 'Previous' : 'Sebelumnya'}</span>
                  <span className="font-bold truncate text-slate-200 block text-xs">
                    {isEn ? prevArticle.title.en : prevArticle.title.id}
                  </span>
                </div>
              </button>
            ) : <div />}

            {nextArticle ? (
              <button
                onClick={() => onSelectArticle && onSelectArticle(nextArticle)}
                className="flex items-center justify-end gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition cursor-pointer max-w-[45%]"
              >
                <div className="text-right truncate">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">{isEn ? 'Next' : 'Berikutnya'}</span>
                  <span className="font-bold truncate text-slate-200 block text-xs">
                    {isEn ? nextArticle.title.en : nextArticle.title.id}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 text-amber-400" />
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
};
