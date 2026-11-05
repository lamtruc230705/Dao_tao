import React, { useState } from 'react';
import {
  ChevronDown,
  Sparkles,
  Calendar,
  RefreshCw,
  Focus,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  Brain,
} from 'lucide-react';
import { KEY_FEATURES } from '../data/mockData';

interface KeyFeaturesSectionProps {
  onOpenTrial: () => void;
  lang: 'vi' | 'en';
}

export const KeyFeaturesSection: React.FC<KeyFeaturesSectionProps> = ({ onOpenTrial, lang }) => {
  const [expandedFeatureId, setExpandedFeatureId] = useState<string | null>(KEY_FEATURES[0].id);

  // Mini demo interactive states
  const [rescheduleCount, setRescheduleCount] = useState(0);
  const [isFocusTimerActive, setIsFocusTimerActive] = useState(false);
  const [focusSecondsLeft, setFocusSecondsLeft] = useState(25 * 60);

  const toggleAccordion = (id: string) => {
    setExpandedFeatureId((prev) => (prev === id ? null : id));
  };

  const handleTriggerDemoReschedule = () => {
    setRescheduleCount((c) => c + 1);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            {lang === 'vi' ? 'VŨ KHÍ CẠNH TRANH ĐỘT PHÁ' : 'CORE CAPABILITIES'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {lang === 'vi'
              ? 'Tại Sao Chronos Vượt Trội So Với Lịch & To-Do Truyền Thống?'
              : 'Why Chronos Outperforms Google Calendar & Traditional To-Do Apps'}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 text-balance">
            {lang === 'vi'
              ? 'Google Calendar chỉ là một cuốn sổ trống. Todoist chỉ là một danh sách không ngày giờ. Chronos là bộ não chiến lược kết nối cả hai.'
              : 'Calendar is an empty grid; To-do apps are endless lists. Chronos is the intelligent cognitive bridge between intention and execution.'}
          </p>
        </div>

        {/* Z-PATTERN FEATURE SHOWCASE */}
        <div className="space-y-24">
          {KEY_FEATURES.map((feature, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedFeatureId === feature.id;

            return (
              <div
                key={feature.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content Column (Z-Pattern alternate) */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Clean unboxed editorial numbering */}
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
                    <span>{feature.number}. {lang === 'vi' ? 'TÍNH NĂNG CỐT LÕI' : 'CORE ENGINE'}</span>
                    <span aria-hidden="true">·</span>
                    <span>WBS METHODOLOGY</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-base font-medium text-indigo-600 dark:text-indigo-400">
                    {feature.subtitle}
                  </p>

                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bullet points */}
                  <div className="mt-6 space-y-2.5">
                    {feature.bulletPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Accordion / Expandable deep dive for non-intrusive details */}
                  <div className="mt-6">
                    <button
                      onClick={() => toggleAccordion(feature.id)}
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                    >
                      <span>{isExpanded ? (lang === 'vi' ? 'Thu gọn phân tích sâu' : 'Hide deep dive') : (lang === 'vi' ? 'Xem thêm chi tiết cơ chế & ROI' : 'Inspect mechanism & ROI')}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2 animate-fadeIn">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <TrendingUp className="w-4 h-4 shrink-0" />
                          <span>{lang === 'vi' ? 'Tác động chuyển đổi (CRO):' : 'Conversion Impact:'} {feature.croBenefit}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                          {lang === 'vi'
                            ? 'Cơ chế loại bỏ hoàn toàn ma sát nhận thức: Người dùng không phải quyết định thứ tự thực hiện, giảm hiện tượng mệt mỏi vì ra quyết định (Decision Fatigue).'
                            : 'Eliminates cognitive friction: Automatically removes decision paralysis so you flow straight from task inception to active execution.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Demo Column (Z-Pattern alternate) */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md p-6 relative overflow-hidden">
                    {/* Visual Anchor based on demoType */}
                    {feature.demoType === 'wbs' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                            <Brain className="w-4 h-4" />
                            {lang === 'vi' ? 'AI WBS Deconstructor Engine' : 'AI WBS Deconstructor Engine'}
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">Độ sâu: 3 Tầng</span>
                        </div>

                        <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60">
                          <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                            Mục tiêu lớn: "Tái cấu trúc hệ thống thanh toán Q4"
                          </div>
                          <div className="mt-1 text-[11px] text-indigo-700 dark:text-indigo-300">
                            Thời gian ước tính: 4 giờ 30 phút · Phân rã thành 4 gói khả thi
                          </div>
                        </div>

                        <div className="ml-4 space-y-2 border-l-2 border-indigo-200 dark:border-indigo-800 pl-3">
                          <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-800/80 text-xs flex items-center justify-between">
                            <span className="font-medium text-slate-800 dark:text-slate-200">1.1 Khảo sát cổng thanh toán MoMo & VNPAY</span>
                            <span className="font-mono text-slate-500">60m</span>
                          </div>
                          <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-800/80 text-xs flex items-center justify-between">
                            <span className="font-medium text-slate-800 dark:text-slate-200">1.2 Thiết kế sơ đồ kiến trúc dữ liệu Webhook</span>
                            <span className="font-mono text-slate-500">75m</span>
                          </div>
                          <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-800/80 text-xs flex items-center justify-between">
                            <span className="font-medium text-slate-800 dark:text-slate-200">1.3 Viết bài kiểm thử tự động (Unit Tests)</span>
                            <span className="font-mono text-slate-500">90m</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.demoType === 'timeblock' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                            <Calendar className="w-4 h-4" />
                            {lang === 'vi' ? 'Thuật Toán Né Trùng Lịch & Giờ Vàng' : 'Peak Energy Time-Blocking'}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">8:00 - 18:00</span>
                        </div>

                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center justify-between text-xs">
                            <span className="font-semibold text-rose-800 dark:text-rose-200">09:00 - 10:00 · Họp Ban Giám Đốc (Lịch họp cứng)</span>
                            <span className="text-[10px] bg-rose-200 dark:bg-rose-900 px-1.5 py-0.5 rounded text-rose-800 dark:text-rose-200">Đã né</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-700 flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-indigo-900 dark:text-indigo-200">10:15 - 11:45 · Deep Work: Viết tài liệu chiến lược</div>
                              <div className="text-[10px] text-indigo-600 dark:text-indigo-400">Tự động chèn sau khoảng nghỉ 15 phút</div>
                            </div>
                            <span className="font-mono font-semibold text-indigo-700 dark:text-indigo-300">90m</span>
                          </div>

                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-[11px] text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
                            <span>12:00 - 13:30 · Bảo vệ giờ nghỉ & Tái tạo tế bào</span>
                            <span className="font-medium">Khóa an toàn</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.demoType === 'reschedule' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                            <RefreshCw className="w-4 h-4" />
                            {lang === 'vi' ? 'Dynamic 1-Click Reschedule' : 'Dynamic 1-Click Reschedule'}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">Đã tái phân bổ: {rescheduleCount} lần</span>
                        </div>

                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs">
                          <div className="font-bold text-amber-900 dark:text-amber-200">
                            Tình huống: Cuộc họp 14:00 bị kéo dài thêm 45 phút!
                          </div>
                          <div className="mt-1 text-slate-600 dark:text-slate-400 text-[11px]">
                            Lịch ban đầu bị tràn sang 2 công việc quan trọng tiếp theo.
                          </div>
                        </div>

                        <button
                          onClick={handleTriggerDemoReschedule}
                          className="w-full py-2.5 px-4 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>{lang === 'vi' ? 'Bấm để AI tự dời & xếp lại ngày (Thử ngay)' : 'Simulate 1-Click Auto Reschedule'}</span>
                        </button>

                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 text-center font-medium">
                          ✓ {rescheduleCount > 0 ? (lang === 'vi' ? `AI đã tái cân bằng lại ${rescheduleCount * 3} đầu việc trong 0.4s!` : `AI dynamically re-balanced tasks in 0.4s!`) : (lang === 'vi' ? 'Thử bấm nút trên để xem phép màu xảy ra' : 'Click the button above to test')}
                        </div>
                      </div>
                    )}

                    {feature.demoType === 'focus' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400 font-bold">
                            <Focus className="w-4 h-4" />
                            {lang === 'vi' ? 'Pháo Đài Chống Xao Nhãng (Focus Mode)' : 'Focus Defense & Pomodoro'}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">Deep Flow State</span>
                        </div>

                        <div className="py-4 text-center rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                          <div className="text-4xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white tracking-wider">
                            {formatTimer(focusSecondsLeft)}
                          </div>
                          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {lang === 'vi' ? 'Đang bảo vệ: Soạn thảo chiến lược Q4' : 'Locked on: Q4 Strategic Pitch'}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsFocusTimerActive(!isFocusTimerActive)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                              isFocusTimerActive
                                ? 'bg-rose-600 text-white hover:bg-rose-700'
                                : 'bg-violet-600 text-white hover:bg-violet-700'
                            }`}
                          >
                            {isFocusTimerActive ? (lang === 'vi' ? 'Tạm dừng đồng hồ' : 'Pause Focus') : (lang === 'vi' ? 'Bắt đầu Focus Pomodoro' : 'Start Focus Pomodoro')}
                          </button>

                          <button
                            onClick={() => setFocusSecondsLeft(25 * 60)}
                            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA hook inside features */}
        <div className="mt-20 text-center">
          <button
            onClick={onOpenTrial}
            className="px-7 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Thử nghiệm toàn bộ tính năng này với dữ liệu của bạn' : 'Test all capabilities with your real tasks'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
