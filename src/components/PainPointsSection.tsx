import React from 'react';
import { AlertCircle, Clock, ZapOff, CalendarX } from 'lucide-react';
import { PAIN_POINTS } from '../data/mockData';

interface PainPointsSectionProps {
  lang: 'vi' | 'en';
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({ lang }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'AlertCircle':
        return <AlertCircle className="w-6 h-6 text-rose-500" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-amber-500" />;
      case 'ZapOff':
        return <ZapOff className="w-6 h-6 text-indigo-500" />;
      case 'CalendarX':
        return <CalendarX className="w-6 h-6 text-violet-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-rose-500" />;
    }
  };

  return (
    <section id="pain-points" className="py-20 md:py-28 bg-slate-100/70 dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Unboxed kicker */}
          <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 tracking-wider uppercase mb-3">
            {lang === 'vi' ? 'THỰC TRẠNG & NỖI ĐAU QUẢN LÝ THỜI GIAN' : 'THE SCHEDULING PARADOX'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {lang === 'vi'
              ? 'Tại sao hầu hết mọi người đều thất bại với To-Do List & Lịch thủ công?'
              : 'Why 88% of Traditional To-Do Lists and Manual Calendars Fail'}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 text-balance">
            {lang === 'vi'
              ? 'Vấn đề không nằm ở sự lười biếng của bạn. Vấn đề là não người không được sinh ra để phân giải các khối việc khổng lồ và tính toán thời gian đa biến trong đầu.'
              : 'The failure is cognitive, not personal. Human working memory is terrible at holding vague, massive goals without micro-structured action plans.'}
          </p>
        </div>

        {/* 4 Empathetic Cards Grid - Subtle hover transitions, hairline borders, no thick left border */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PAIN_POINTS.map((item, index) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                {/* Header row with icon and quantitative stat */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-xs font-mono tabular-nums font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-md">
                    {item.stat}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {index + 1}. {item.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom symptom quote box with subtle hairline border */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2 italic">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 not-italic shrink-0">
                    {lang === 'vi' ? 'Hệ quả:' : 'Impact:'}
                  </span>
                  <span>{item.symptom}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note: Strictly NO CTA button in this section as per BA/CRO specifications */}
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
          <span>{lang === 'vi' ? 'Cuộn xuống để xem giải pháp giải phóng 15 giờ mỗi tuần' : 'Scroll down to discover the automated AI solution'}</span>
          <span className="inline-block ml-1 animate-bounce">&darr;</span>
        </div>
      </div>
    </section>
  );
};
