import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, CheckCircle2, RefreshCw, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { HERO_PRESETS } from '../data/mockData';
import { ScheduledTask } from '../types';

interface HeroSectionProps {
  onOpenTrial: (initialPrompt?: string) => void;
  lang: 'vi' | 'en';
}

const SAMPLE_WBS_TRANSFORMATION: ScheduledTask[] = [
  {
    id: 'hero-task-1',
    title: 'Phân tích yêu cầu & Bóc tách mô hình',
    durationMinutes: 75,
    startTime: '08:30',
    endTime: '09:45',
    dayOffset: 0,
    category: 'Chiến lược',
    priority: 'Urgent',
    color: '#4F46E5',
    energyRequirement: 'Deep Work (Tập trung tối đa)',
    isCompleted: true,
  },
  {
    id: 'hero-task-2',
    title: 'Phác thảo Wireframe & User Flow',
    durationMinutes: 90,
    startTime: '10:00',
    endTime: '11:30',
    dayOffset: 0,
    category: 'Thiết kế',
    priority: 'High',
    color: '#0284C7',
    energyRequirement: 'Sáng tạo cao',
    isCompleted: false,
  },
  {
    id: 'hero-task-3',
    title: 'Nghỉ trưa & Tái tạo năng lượng (Đệm an toàn)',
    durationMinutes: 90,
    startTime: '11:45',
    endTime: '13:15',
    dayOffset: 0,
    category: 'Nghỉ ngơi',
    priority: 'Low',
    color: '#059669',
    energyRequirement: 'Tái tạo năng lượng',
    isCompleted: false,
  },
  {
    id: 'hero-task-4',
    title: 'Soạn tài liệu PRD & Giao thức API',
    durationMinutes: 60,
    startTime: '13:30',
    endTime: '14:30',
    dayOffset: 0,
    category: 'Kỹ thuật',
    priority: 'Medium',
    color: '#D97706',
    energyRequirement: 'Logic & Phân tích',
    isCompleted: false,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTrial, lang }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [rawText, setRawText] = useState(HERO_PRESETS[0].prompt);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState<'input' | 'processing' | 'result'>('result');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play demo cycle to visually prove "nhập 1 cục to -> ra 1 lịch chi tiết"
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSelectedPresetIndex((prev) => {
        const next = (prev + 1) % HERO_PRESETS.length;
        setRawText(HERO_PRESETS[next].prompt);
        // Trigger subtle re-calculation effect
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 600);
        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSelectPreset = (index: number) => {
    setIsAutoPlaying(false);
    setSelectedPresetIndex(index);
    setRawText(HERO_PRESETS[index].prompt);
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 400);
  };

  const handleManualTry = () => {
    onOpenTrial(rawText);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-200/50 dark:bg-indigo-900/30 blur-[130px] rounded-full" />
        <div className="absolute top-96 -left-32 w-[400px] h-[400px] bg-blue-200/40 dark:bg-blue-900/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker - Anti-slop: clean unboxed metadata with separator */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 tracking-wide uppercase mb-6">
          <span>{lang === 'vi' ? 'Phương pháp WBS & Time-Blocking' : 'WBS & Time-Blocking Engine'}</span>
          <span aria-hidden="true">·</span>
          <span>{lang === 'vi' ? 'Trợ lý AI Thế Hệ Mới' : 'Next-Gen AI Scheduling'}</span>
        </div>

        {/* Hero Headline - Balanced, bold, high-intent */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] text-balance">
            {lang === 'vi' ? (
              <>
                Nhập <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">1 Cục Việc To</span>.
                <br />
                Nhận Ngay <span className="underline decoration-indigo-500/40 decoration-wavy underline-offset-8">Lịch Trình Chi Tiết</span> Từng Giờ.
              </>
            ) : (
              <>
                Dump <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Chaotic Big Tasks</span>.
                <br />
                Get An <span className="underline decoration-indigo-500/40 underline-offset-8">Hour-by-Hour Master Plan</span> In Seconds.
              </>
            )}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto text-balance">
            {lang === 'vi'
              ? 'Chronos AI tự động bóc tách các dự án phức tạp thành các bước hành động vi mô, né khung giờ bận và bảo vệ thời gian Deep Work của não bộ.'
              : 'Chronos AI automatically breaks down overwhelming work into micro-action packages, dodges busy meetings, and locks in peak focus blocks.'}
          </p>

          {/* Primary Action Zone */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenTrial(rawText)}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>{lang === 'vi' ? 'Thử phân rã việc của bạn miễn phí' : 'Try Task Breakdown Free'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
            >
              <Play className="w-4 h-4 fill-slate-700 dark:fill-slate-200 text-slate-700 dark:text-slate-200" />
              <span>{lang === 'vi' ? 'Xem cách hoạt động (2 phút)' : 'See How It Works'}</span>
            </a>
          </div>

          {/* Trust points - Clean unboxed text */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {lang === 'vi' ? 'Miễn phí, không cần thẻ tín dụng' : 'Free, no credit card required'}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {lang === 'vi' ? 'Đồng bộ tức thì Google Calendar' : 'Instant 2-way Google Calendar sync'}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {lang === 'vi' ? '120,000+ nhiệm vụ đã tối ưu' : '120k+ schedules deconstructed'}
            </span>
          </div>
        </div>

        {/* HERO INTERACTIVE SIMULATION & MOCKUP CONTAINER */}
        <div className="mt-10 max-w-5xl mx-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
          {/* Simulation Header Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'vi' ? 'Mô phỏng Trực Quan: Nhập 1 Cục Việc To ➔ Ra Lịch Trình' : 'Live Interactive Simulator: Raw Dump to Actionable Schedule'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                  isAutoPlaying
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {isAutoPlaying ? (lang === 'vi' ? 'Tự động chạy: Bật' : 'Auto-demo: ON') : (lang === 'vi' ? 'Tự động chạy: Tắt' : 'Auto-demo: PAUSED')}
              </button>
            </div>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap shrink-0">
              {lang === 'vi' ? 'Thử kịch bản mẫu:' : 'Try presets:'}
            </span>
            {HERO_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(idx)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium shrink-0 ${
                  selectedPresetIndex === idx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Simulation Split: Left Raw Input vs Right AI Calendar WBS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {/* Left: Raw Task Input Area */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-slate-50/40 dark:bg-slate-900/40">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {lang === 'vi' ? 'CỤC VIỆC TO (ĐẦU VÀO HỖN ĐỘN)' : 'RAW CHAOTIC DUMP'}
                  </span>
                  <span>{rawText.length} ký tự</span>
                </div>

                <div className="relative">
                  <textarea
                    rows={5}
                    value={rawText}
                    onChange={(e) => {
                      setIsAutoPlaying(false);
                      setRawText(e.target.value);
                    }}
                    placeholder={lang === 'vi' ? 'Nhập việc lộn xộn của bạn vào đây...' : 'Paste any chaotic task list here...'}
                    className="w-full p-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'vi'
                    ? 'Bạn có thể chỉnh sửa văn bản này hoặc bấm nút bên dưới để AI xếp lịch thực sự.'
                    : 'Edit text freely or test real AI deconstruction below.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <button
                  onClick={handleManualTry}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Phân rã & Lên lịch ngay' : 'Break Down With AI'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsProcessing(true);
                    setTimeout(() => setIsProcessing(false), 500);
                  }}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Mô phỏng lại / Re-simulate"
                >
                  <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin text-indigo-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Right: Deconstructed Actionable WBS Timeline */}
            <div className="lg:col-span-7 p-6 bg-white dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === 'vi' ? 'KẾT QUẢ WBS & TIME-BLOCKING TỰ ĐỘNG' : 'ACTIONABLE TIMELINE SCHEDULE'}
                  </span>
                  <span className="tabular-nums font-mono text-indigo-600 dark:text-indigo-400">
                    4 {lang === 'vi' ? 'khối việc' : 'blocks'} · 5.2h
                  </span>
                </div>

                {/* Timeline Cards Container */}
                <div className="space-y-2.5">
                  {SAMPLE_WBS_TRANSFORMATION.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isProcessing ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
                      } ${
                        task.isCompleted
                          ? 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {/* Time block badge */}
                          <div
                            className="w-1.5 self-stretch rounded-full shrink-0"
                            style={{ backgroundColor: task.color || '#4F46E5' }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                                {task.title}
                              </h4>
                              {task.isCompleted && (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                                  ✓ Xong
                                </span>
                              )}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-mono tabular-nums font-medium text-slate-700 dark:text-slate-300">
                                {task.startTime} – {task.endTime}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{task.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{task.energyRequirement}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {task.durationMinutes}m
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Insight Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  {lang === 'vi' ? 'Tự động chèn 15m đệm nghỉ chống cháy lịch' : '15m buffer auto-inserted'}
                </span>
                <button
                  onClick={handleManualTry}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  {lang === 'vi' ? 'Mở toàn bộ ngày' : 'Open full day plan'} &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
