import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, ArrowRight, CheckCircle2, RefreshCw, Zap, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HERO_PRESETS } from '../data/mockData';
import { BreakdownResult, ScheduledTask } from '../types';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onOpenFullApp: (tasks: ScheduledTask[]) => void;
  lang: 'vi' | 'en';
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  onOpenFullApp,
  lang,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt || HERO_PRESETS[0].prompt);
  const [startHour, setStartHour] = useState('08:30');
  const [workPreference, setWorkPreference] = useState('balanced');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BreakdownResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunAI = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/ai/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          startHour,
          workPreference,
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ AI');
      }

      const data: BreakdownResult = await response.json();
      setResult(data);

      // Trigger joyful celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Ignore if confetti fails in sandbox
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Đã có lỗi xảy ra. Đang kích hoạt thuật toán dự phòng.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportIcs = () => {
    if (!result || !result.tasks) return;

    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Chronos AI//WBS Task Schedule//EN\n`;
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

    result.tasks.forEach((t) => {
      const startClean = t.startTime.replace(':', '') + '00';
      const endClean = t.endTime.replace(':', '') + '00';
      icsContent += `BEGIN:VEVENT\nSUMMARY:${t.title}\nDESCRIPTION:${t.description || ''} - Category: ${t.category}\nDTSTART:${dateStr}T${startClean}\nDTEND:${dateStr}T${endClean}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });

    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Chronos_Schedule_${dateStr}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {lang === 'vi' ? 'Trải Nghiệm Trực Tiếp: Phân Rã Cục Việc Với AI' : 'Live Interactive Task Deconstructor'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'vi' ? 'Biến một mớ to-do lộn xộn thành lịch trình Time-blocking chuẩn WBS' : 'Turn chaotic raw inputs into an actionable time-boxed schedule'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!result ? (
            /* Input Form Screen */
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                  {lang === 'vi' ? 'Nhập việc to hoặc dán to-do lộn xộn của bạn vào đây:' : 'Paste your chaotic task dump here:'}
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ví dụ: Làm bài tập lớn Marketing, ôn thi Triết học 3 chương đầu, chuẩn bị slide thuyết trình cho thứ Sáu và đi tập gym 3 buổi..."
                  className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Preset buttons */}
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-2">
                  {lang === 'vi' ? 'Hoặc chọn nhanh kịch bản mẫu:' : 'Or choose a scenario:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {HERO_PRESETS.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setPrompt(preset.prompt)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences: Start Hour & Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    {lang === 'vi' ? 'Khung giờ bắt đầu trong ngày:' : 'Preferred start time:'}
                  </label>
                  <select
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="08:00">08:00 (Sáng sớm - Early Bird)</option>
                    <option value="08:30">08:30 (Tiêu chuẩn văn phòng)</option>
                    <option value="09:00">09:00 (Bắt đầu chuẩn)</option>
                    <option value="10:00">10:00 (Linh hoạt)</option>
                    <option value="13:30">13:30 (Khung giờ chiều)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    {lang === 'vi' ? 'Phong cách phân bổ thời gian:' : 'Pacing preference:'}
                  </label>
                  <select
                    value={workPreference}
                    onChange={(e) => setWorkPreference(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="balanced">Cân bằng (Đệm 15m, ưu tiên Deep Work sáng)</option>
                    <option value="high-focus">Tập trung cường độ cao (Khối 90m Pomodoro)</option>
                    <option value="steady">Nhẹ nhàng chia nhỏ (Khối 45m dễ nuốt)</option>
                  </select>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-700 dark:text-amber-300">
                  {errorMessage}
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 animate-fadeIn">
              {/* Top Result Banner */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      {lang === 'vi' ? 'CHIẾN LƯỢC PHÂN RÃ WBS' : 'AI DECONSTRUCTION STRATEGY'}
                    </span>
                    <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                      {result.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-slate-500 block">Thời lượng:</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {Math.floor(result.totalEstimatedMinutes / 60)}h {result.totalEstimatedMinutes % 60}m
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block">Tiết kiệm:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        +{result.savedHours || 4.5}h
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task list */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  {lang === 'vi' ? `KẾ HOẠCH TIME-BLOCKING (${result.tasks.length} HẠNG MỤC CHI TIẾT)` : `GENERATED SCHEDULE (${result.tasks.length} BLOCKS)`}
                </h4>

                <div className="space-y-2.5">
                  {result.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-1.5 self-stretch rounded-full shrink-0"
                          style={{ backgroundColor: task.color || '#4F46E5' }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {task.title}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {task.priority}
                            </span>
                          </div>
                          {task.description && (
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                              {task.description}
                            </p>
                          )}
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                            <span>{task.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{task.energyRequirement}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:self-center shrink-0">
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {task.startTime} – {task.endTime}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {task.durationMinutes} phút
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          {!result ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
              </button>

              <button
                onClick={handleRunAI}
                disabled={isLoading}
                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{lang === 'vi' ? 'AI đang phân rã WBS...' : 'Deconstructing WBS...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'vi' ? 'Phân rã & Lên lịch ngay với AI' : 'Deconstruct & Schedule Now'}</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Thử việc khác' : 'Try another task'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportIcs}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Tải file iCal (.ics)' : 'Export .ics'}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenFullApp(result.tasks);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>{lang === 'vi' ? 'Mở trong Không Gian Lịch' : 'Open in Interactive Workspace'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
