import React, { useState } from 'react';
import { Mic, ArrowRight, CheckCircle2, Sparkles, Calendar, Layers, ShieldCheck } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

interface HowItWorksSectionProps {
  onOpenTrial: () => void;
  lang: 'vi' | 'en';
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenTrial, lang }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = HOW_IT_WORKS_STEPS[activeStepIndex];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            {lang === 'vi' ? 'CƠ CHẾ HOẠT ĐỘNG TINH GỌN' : 'HOW IT WORKS'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {lang === 'vi'
              ? '3 Bước Đơn Giản Để Có Lịch Trình Hoàn Hảo'
              : 'From Mental Clutter to an Ideal Schedule in 3 Steps'}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 text-balance">
            {lang === 'vi'
              ? 'Không cần học thêm phương pháp mới. Không cấu hình phức tạp. AI thực hiện toàn bộ các phép tính đau đầu nhất cho bạn.'
              : 'Zero complex setup, zero steep learning curves. Chronos turns your chaotic intentions into structured time blocks.'}
          </p>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 max-w-4xl mx-auto">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                activeStepIndex === idx
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  activeStepIndex === idx
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                0{step.stepNumber}
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {step.timeframe}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Split Showcase: Left Detail & Value vs Right Dynamic App Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-10 border border-slate-200 dark:border-slate-800">
          {/* Left Text Detail */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <span>{lang === 'vi' ? `BƯỚC ${activeStep.stepNumber}` : `STEP ${activeStep.stepNumber}`}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStep.timeframe}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {activeStep.title}
              </h3>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeStep.fullDesc}
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Không yêu cầu kiến thức quản lý dự án' : 'No PM experience needed'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Tự thích ứng theo nhịp sinh học cá nhân' : 'Adapts to your chronotype'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={onOpenTrial}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>{lang === 'vi' ? 'Trải nghiệm ngay bước này' : 'Try this step now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Dynamic App Mockup Screen */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md p-5 overflow-hidden transition-all duration-300 min-h-[380px] flex flex-col justify-between">
              {/* Mockup Top Window Chrome */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="ml-2 text-xs font-mono text-slate-400">chronos.ai/app/workspace</span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  {activeStep.mockupState === 'input' && (lang === 'vi' ? 'Màn hình Thu Thập' : 'Capture Mode')}
                  {activeStep.mockupState === 'breakdown' && (lang === 'vi' ? 'Mô hình WBS Engine' : 'WBS Engine')}
                  {activeStep.mockupState === 'calendar' && (lang === 'vi' ? 'Lịch Biểu Time-Block' : 'Time-block Calendar')}
                </span>
              </div>

              {/* MOCKUP STATE 1: Input Mode */}
              {activeStep.mockupState === 'input' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Đoạn chat / Voice dump</span>
                      <Mic className="w-4 h-4 text-indigo-500 animate-pulse" />
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                      "Mai phải nộp bài báo cáo thị trường quý 3 cho anh Hoàng, làm slide khoảng 15 trang, rà soát lại số liệu tài chính với Mai và đi gym lúc 6h chiều..."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <span className="text-slate-400 block text-[11px]">Đã nhận diện:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">3 nhiệm vụ lớn + 1 thói quen</span>
                    </div>
                    <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <span className="text-slate-400 block text-[11px]">Hạn chót cứng:</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">Trước 17:00 ngày mai</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>AI đã trích xuất không sót bất kỳ deadline tiềm ẩn nào.</span>
                  </div>
                </div>
              )}

              {/* MOCKUP STATE 2: WBS Breakdown */}
              {activeStep.mockupState === 'breakdown' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-1">
                    <span>Phân đoạn WBS tự động</span>
                    <span className="text-indigo-600 dark:text-indigo-400">Chuẩn hóa 45-75 phút</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">1. Rà soát & Đối chiếu dữ liệu tài chính</div>
                      <div className="text-[11px] text-slate-500">Đầu ra: Sheet sạch số liệu đã xác nhận</div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">45m</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">2. Soạn thảo cấu trúc báo cáo 15 slides</div>
                      <div className="text-[11px] text-slate-500">Khung năng lượng: Deep Work buổi sáng</div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">75m</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">3. Thiết kế hoàn thiện & Xuất file PDF</div>
                      <div className="text-[11px] text-slate-500">Đầu ra: File gửi sếp đúng deadline</div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">60m</span>
                  </div>
                </div>
              )}

              {/* MOCKUP STATE 3: Calendar Sync */}
              {activeStep.mockupState === 'calendar' && (
                <div className="space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs pb-1">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Google Calendar · Hôm nay</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Đồng bộ 2 chiều: Active</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span className="font-semibold text-slate-900 dark:text-white">08:30 - 09:45 · Soạn thảo Slide</span>
                    </div>
                    <span className="font-mono text-slate-500">Deep Work</span>
                  </div>

                  <div className="p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/50 text-[11px] text-amber-700 dark:text-amber-300 flex items-center justify-between">
                    <span>10:00 - 10:45 · Họp Team (Đã có sẵn trên Calendar)</span>
                    <span className="text-slate-400">Né họp</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="font-semibold text-slate-900 dark:text-white">11:00 - 11:45 · Rà soát số liệu</span>
                    </div>
                    <span className="font-mono text-slate-500">Tập trung</span>
                  </div>

                  <div className="p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                    <span>12:00 - 13:30 · Khoảng đệm trưa & Tái tạo</span>
                    <span className="font-medium">Tự động bảo vệ</span>
                  </div>
                </div>
              )}

              {/* Bottom State Switch Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Trực quan hóa luồng thuật toán</span>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeStepIndex === idx ? 'bg-indigo-600 w-5' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
