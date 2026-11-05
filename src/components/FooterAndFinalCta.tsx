import React from 'react';
import { Sparkles, ArrowRight, Shield, Lock, Award, Calendar } from 'lucide-react';

interface FooterAndFinalCtaProps {
  onOpenTrial: () => void;
  lang: 'vi' | 'en';
}

export const FooterAndFinalCta: React.FC<FooterAndFinalCtaProps> = ({ onOpenTrial, lang }) => {
  return (
    <div>
      {/* FINAL HIGH-CONVERSION CTA BANNER */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'vi' ? 'LƯỚI HỨNG CHUYỂN ĐỔI CUỐI CÙNG' : 'THE ULTIMATE PRODUCTIVITY LEAP'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            {lang === 'vi'
              ? 'Sẵn Sàng Giành Lại 15 Giờ Mỗi Tuần Với Chronos AI?'
              : 'Ready to Reclaim 15 Hours of Your Life Every Single Week?'}
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto text-balance leading-relaxed">
            {lang === 'vi'
              ? 'Đừng để thêm một ngày nào trôi qua trong cảm giác ngợp việc và trì hoãn. Nhập cục việc đầu tiên và nhận ngay lịch trình thông minh trong 30 giây.'
              : 'Stop letting chaos hijack your days. Turn your biggest mental burdens into clean, achievable steps now.'}
          </p>

          {/* Centered High-Contrast Primary CTA Button */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenTrial}
              className="w-full sm:w-auto px-9 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 whitespace-nowrap group"
            >
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>{lang === 'vi' ? 'Bắt đầu xếp lịch thông minh ngay' : 'Start Scheduling Intelligently Free'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Security & Guarantee Trust Seals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              {lang === 'vi' ? 'Bảo mật 256-bit AES' : '256-bit AES Encryption'}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              {lang === 'vi' ? 'Không yêu cầu thẻ tín dụng' : 'No credit card needed'}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              {lang === 'vi' ? 'Hoàn tiền 100% trong 14 ngày' : '14-day 100% guarantee'}
            </span>
          </div>

          {/* Mobile App Download Badges */}
          <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'vi' ? 'Hoặc tải ứng dụng di động:' : 'Or get the mobile app:'}
            </span>

            {/* Apple App Store Badge SVG */}
            <div className="h-10 px-4 py-2 bg-black/60 hover:bg-black border border-slate-700 rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .61-2.64 1.36-.57.65-1.06 1.73-.93 2.76 1.02.08 2.04-.51 2.65-1.25z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] text-slate-400 leading-none">Download on the</div>
                <div className="text-xs font-bold leading-tight">App Store</div>
              </div>
            </div>

            {/* Google Play Badge SVG */}
            <div className="h-10 px-4 py-2 bg-black/60 hover:bg-black border border-slate-700 rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.793 12 3.61 22.186c-.347-.324-.555-.806-.555-1.353V3.167c0-.547.208-1.03.554-1.353zm11.24 11.24l2.585 2.585-11.87 6.852 9.285-9.437zm0-2.108L5.564 1.509l11.87 6.852-2.585 2.585zm1.485 1.054l3.528 2.037c.806.463.806 1.22 0 1.685l-3.528 2.037-2.173-2.173 2.173-2.173z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] text-slate-400 leading-none">GET IT ON</div>
                <div className="text-xs font-bold leading-tight">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIET FOOTER */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1: Wordmark & Statement */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>Chronos<span className="text-indigo-600 dark:text-indigo-400">AI</span></span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'vi'
                  ? 'Hệ thống trợ lý AI phân rã công việc WBS và xếp lịch tự động theo chuẩn Business Analyst & CRO.'
                  : 'AI-powered WBS task deconstruction & time-blocking engine built for peak productivity.'}
              </p>
            </div>

            {/* Col 2: Sản phẩm */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                {lang === 'vi' ? 'Sản Phẩm' : 'Product'}
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#features" className="hover:text-indigo-600">WBS Deconstructor</a></li>
                <li><a href="#features" className="hover:text-indigo-600">Smart Time-Blocking</a></li>
                <li><a href="#features" className="hover:text-indigo-600">Dynamic Reschedule</a></li>
                <li><a href="#features" className="hover:text-indigo-600">Focus Defense Mode</a></li>
              </ul>
            </div>

            {/* Col 3: So sánh & Tích hợp */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                {lang === 'vi' ? 'Hệ Sinh Thái' : 'Ecosystem'}
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#pricing" className="hover:text-indigo-600">Google Calendar Sync</a></li>
                <li><a href="#pricing" className="hover:text-indigo-600">Microsoft Outlook Sync</a></li>
                <li><a href="#pricing" className="hover:text-indigo-600">Apple iCal Export</a></li>
                <li><a href="#pricing" className="hover:text-indigo-600">Slack & Teams Bot</a></li>
              </ul>
            </div>

            {/* Col 4: Pháp lý (Mandatory legal links for Google/Facebook Ads audit) */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                {lang === 'vi' ? 'Pháp Lý & Bảo Mật' : 'Legal & Trust'}
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Chính sách bảo mật dữ liệu tuân thủ GDPR và chuẩn mã hóa 256-bit AES.'); }} className="hover:text-indigo-600">Chính sách bảo mật (Privacy)</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert('Điều khoản dịch vụ tiêu chuẩn dành cho người dùng cá nhân và doanh nghiệp.'); }} className="hover:text-indigo-600">Điều khoản sử dụng (Terms)</a></li>
                <li><a href="#security" onClick={(e) => { e.preventDefault(); alert('Bảo mật dữ liệu đám mây: Dữ liệu công việc của bạn chỉ thuộc về bạn.'); }} className="hover:text-indigo-600">An toàn dữ liệu (Security)</a></li>
                <li><a href="#compliance" onClick={(e) => { e.preventDefault(); alert('Báo cáo tuân thủ tiêu chuẩn quản lý rủi ro và SLA 99.9%.'); }} className="hover:text-indigo-600">Tiêu chuẩn tuân thủ (SOC2)</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Chronos AI Inc. All rights reserved. Designed with Google Stitch standards.
            </div>
            <div className="flex items-center gap-4">
              <span>Hà Nội</span>
              <span aria-hidden="true">·</span>
              <span>TP. Hồ Chí Minh</span>
              <span aria-hidden="true">·</span>
              <span>San Francisco</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
