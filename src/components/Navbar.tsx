import React from 'react';
import { Calendar, Moon, Sun, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenTrial: () => void;
  onToggleAppMode: () => void;
  isAppMode: boolean;
  isDark: boolean;
  onToggleDark: () => void;
  lang: 'vi' | 'en';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrial,
  onToggleAppMode,
  isAppMode,
  isDark,
  onToggleDark,
  lang,
  onToggleLang,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#"
          onClick={(e) => {
            if (isAppMode) {
              e.preventDefault();
              onToggleAppMode();
            }
          }}
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Calendar className="w-4 h-4" />
          </div>
          <span>Chronos<span className="text-indigo-600 dark:text-indigo-400">AI</span></span>
        </a>

        {/* Zone 2: Navigation Links (single-line, clean text) */}
        {!isAppMode ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#pain-points" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'vi' ? 'Vấn đề' : 'Problem'}
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'vi' ? 'Cơ chế hoạt động' : 'How It Works'}
            </a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'vi' ? 'Tính năng cốt lõi' : 'Features'}
            </a>
            <a href="#social-proof" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'vi' ? 'Đánh giá' : 'Reviews'}
            </a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'vi' ? 'Bảng giá' : 'Pricing'}
            </a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>{lang === 'vi' ? 'Chế độ Trải nghiệm Ứng dụng Thực tế' : 'Live Interactive App Mode'}</span>
            <span aria-hidden="true">·</span>
            <span>WBS Engine v2.4</span>
          </div>
        )}

        {/* Zone 3: Primary Action & Preferences */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium"
            title="Đổi ngôn ngữ / Switch language"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Sáng / Tối"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Switch to workspace or open trial */}
          <button
            onClick={onToggleAppMode}
            className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {isAppMode
              ? (lang === 'vi' ? 'Về Landing Page' : 'Back to Landing')
              : (lang === 'vi' ? 'Mở App Thực tế' : 'Open Live Workspace')}
          </button>

          {/* Primary CTA button */}
          <button
            onClick={onOpenTrial}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            {lang === 'vi' ? 'Dùng thử AI miễn phí' : 'Try AI Free'}
          </button>
        </div>
      </div>
    </header>
  );
};
