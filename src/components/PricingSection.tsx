import React, { useState } from 'react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';
import { PRICING_TIERS, FAQS } from '../data/mockData';

interface PricingSectionProps {
  onSelectTier: (tierId: string) => void;
  lang: 'vi' | 'en';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier, lang }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
            {lang === 'vi' ? 'BẢNG GIÁ MINH BẠCH · KHÔNG PHÍ ẨN' : 'TRANSPARENT PRICING'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {lang === 'vi'
              ? 'Đầu Tư Vào Thời Gian Của Bạn Với Chi Phí Bằng 1 Ly Cà Phê'
              : 'Invest in Your Focus for Less Than the Cost of a Coffee'}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 text-balance">
            {lang === 'vi'
              ? 'Tiết kiệm 15+ giờ mỗi tuần. Dùng thử gói Pro 14 ngày miễn phí, không cần nhập thẻ tín dụng.'
              : 'Save 15+ hours weekly. Start with 14-day Pro trial without requiring payment details.'}
          </p>

          {/* Monthly / Annual Billing Toggle with Decoy incentive */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                !isAnnual
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {lang === 'vi' ? 'Thanh toán Hàng tháng' : 'Billed Monthly'}
            </button>

            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                isAnnual
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>{lang === 'vi' ? 'Thanh toán Hàng năm' : 'Billed Annually'}</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {lang === 'vi' ? 'Tiết kiệm 25%' : 'Save 25%'}
              </span>
            </button>
          </div>
        </div>

        {/* 3 PRICING TIERS (Decoy effect on Pro tier) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 ${
                  tier.isPopular
                    ? 'bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-xl lg:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {/* Popular Highlight Badge */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === 'vi' ? 'GÓI KHUYÊN DÙNG (84% CHỌN)' : 'MOST POPULAR · BEST VALUE'}</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                    {tier.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {price === 0 ? (lang === 'vi' ? '/trọn đời' : '/forever') : (lang === 'vi' ? '/tháng' : '/month')}
                    </span>
                  </div>

                  {isAnnual && price > 0 && (
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                      {lang === 'vi' ? `Thanh toán $${price * 12}/năm (Tiết kiệm $36)` : `Billed $${price * 12}/year (Save $36)`}
                    </div>
                  )}

                  {/* Feature List */}
                  <div className="mt-8 space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      {lang === 'vi' ? 'Quyền lợi bao gồm:' : 'Included Features:'}
                    </span>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}

                    {tier.excludedFeatures && tier.excludedFeatures.length > 0 && (
                      <div className="pt-2 space-y-2.5">
                        {tier.excludedFeatures.map((ex, exIdx) => (
                          <div key={exIdx} className="flex items-start gap-2.5 text-xs text-slate-400 dark:text-slate-500 line-through">
                            <X className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button with strict hierarchy: Pro is bigger & brighter */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onSelectTier(tier.id)}
                    className={`w-full py-3.5 px-4 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${
                      tier.isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 shadow-md hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                  </button>
                  <div className="mt-2 text-center text-[11px] text-slate-400">
                    {lang === 'vi' ? 'Hủy bất kỳ lúc nào chỉ với 1 click' : 'Cancel anytime with 1 click'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'vi' ? 'Câu Hỏi Thường Gặp (FAQ)' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {lang === 'vi' ? 'Giải đáp mọi thắc mắc trước khi bạn bắt đầu' : 'Everything you need to know before getting started'}
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 text-lg font-mono">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
