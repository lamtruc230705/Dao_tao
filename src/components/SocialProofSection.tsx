import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

interface SocialProofSectionProps {
  lang: 'vi' | 'en';
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ lang }) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Counter states for smooth count-up feeling
  const [tasksCount, setTasksCount] = useState(115000);
  const [hoursCount, setHoursCount] = useState(14.8);
  const [onTimeRate, setOnTimeRate] = useState(97.9);

  useEffect(() => {
    // Count-up animation towards actual numbers
    const timer = setTimeout(() => {
      setTasksCount(128450);
      setHoursCount(15.4);
      setOnTimeRate(98.4);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentTestimonialIndex];

  return (
    <section id="social-proof" className="py-20 md:py-28 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase mb-3">
            {lang === 'vi' ? 'BẰNG CHỨNG XÃ HỘI & HIỆU QUẢ ĐÃ ĐƯỢC CHỨNG MINH' : 'PROVEN TRACK RECORD'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {lang === 'vi'
              ? 'Hơn 120,000 Nhiệm Vụ Đã Được Sắp Lịch & Hoàn Thành Đúng Hạn'
              : 'Trusted by Over 120,000 High-Achieving Professionals'}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 text-balance">
            {lang === 'vi'
              ? 'Từ các Product Lead tại các công ty kỳ lân đến các Freelancer sáng tạo độc lập, Chronos AI giúp họ giành lại quyền kiểm soát thời gian.'
              : 'From Product Managers at hyper-growth tech startups to independent creative consultants.'}
          </p>
        </div>

        {/* 4 Quantitative Metric Counters (Strict Tabular Numerals) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
              {tasksCount.toLocaleString()}+
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'vi' ? 'Nhiệm vụ đã tối ưu WBS' : 'Tasks Optimized'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {lang === 'vi' ? 'Trên 14 quốc gia' : 'Across 14 countries'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              {onTimeRate.toFixed(1)}%
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'vi' ? 'Tỷ lệ hoàn tất đúng hạn' : 'On-Time Completion'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {lang === 'vi' ? 'So với 42% lịch thủ công' : 'vs 42% manual calendar'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-blue-600 dark:text-blue-400">
              {hoursCount.toFixed(1)}h
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'vi' ? 'Tiết kiệm trung bình/tuần' : 'Avg Hours Saved/Wk'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {lang === 'vi' ? 'Quy đổi 60+ giờ mỗi tháng' : 'Equivalent to 60+ hrs/mo'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-amber-500">
              4.9/5
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'vi' ? 'Điểm đánh giá người dùng' : 'Customer Satisfaction'}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {lang === 'vi' ? 'Từ 4,200+ đánh giá xác thực' : 'From 4,200+ verified users'}
            </div>
          </div>
        </div>

        {/* TESTIMONIAL CAROUSEL CARD */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 relative overflow-hidden shadow-sm">
          <Quote className="absolute top-6 right-8 w-20 h-20 text-slate-200/50 dark:text-slate-800/40 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Real Avatar Photo from generate_image */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-md">
                <img
                  src={currentTestimonial.avatarUrl}
                  alt={currentTestimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {currentTestimonial.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentTestimonial.role}
                </p>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {currentTestimonial.company}
                </p>
              </div>

              <div className="mt-2 flex items-center gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote & Highlight */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-md mb-4">
                  <Award className="w-3.5 h-3.5" />
                  <span>{currentTestimonial.metricHighlight}</span>
                </div>

                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{currentTestimonial.quote}"
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonialIndex(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        currentTestimonialIndex === idx
                          ? 'w-6 bg-indigo-600'
                          : 'w-2 bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand logos / Trust banner */}
        <div className="mt-16 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            {lang === 'vi' ? 'ĐƯỢC TIN DÙNG BỞI CÁC THÀNH VIÊN ĐẾN TỪ' : 'USED BY INDIVIDUALS FROM FORWARD-THINKING TEAMS'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-bold text-slate-600 dark:text-slate-400">
            <span className="tracking-tight text-sm">Google Workspace</span>
            <span className="tracking-tight text-sm">Notion Labs</span>
            <span className="tracking-tight text-sm">Figma Community</span>
            <span className="tracking-tight text-sm">Linear</span>
            <span className="tracking-tight text-sm">VNG Tech</span>
          </div>
        </div>
      </div>
    </section>
  );
};
