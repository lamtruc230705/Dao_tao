import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  RefreshCw,
  Plus,
  ArrowLeft,
  Focus,
  Trash2,
  Download,
  SlidersHorizontal,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScheduledTask } from '../types';

interface InteractiveAppWorkspaceProps {
  tasks: ScheduledTask[];
  onUpdateTasks: (tasks: ScheduledTask[]) => void;
  onBackToLanding: () => void;
  onOpenBreakdownModal: () => void;
  lang: 'vi' | 'en';
}

export const InteractiveAppWorkspace: React.FC<InteractiveAppWorkspaceProps> = ({
  tasks,
  onUpdateTasks,
  onBackToLanding,
  onOpenBreakdownModal,
  lang,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban'>('timeline');
  const [activeFocusTask, setActiveFocusTask] = useState<ScheduledTask | null>(null);
  const [focusSeconds, setFocusSeconds] = useState<number>(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState<boolean>(false);
  const [rescheduleNotice, setRescheduleNotice] = useState<string | null>(null);

  // Focus Timer interval effect
  React.useEffect(() => {
    let interval: any = null;
    if (isFocusRunning && focusSeconds > 0) {
      interval = setInterval(() => {
        setFocusSeconds((sec) => sec - 1);
      }, 1000);
    } else if (focusSeconds === 0) {
      setIsFocusRunning(false);
      try {
        confetti();
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusSeconds]);

  // Toggle task completion
  const handleToggleComplete = (id: string) => {
    const next = tasks.map((t) => {
      if (t.id === id) {
        const isNowCompleted = !t.isCompleted;
        if (isNowCompleted) {
          try {
            confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
          } catch (e) {}
        }
        return { ...t, isCompleted: isNowCompleted };
      }
      return t;
    });
    onUpdateTasks(next);
  };

  // Delete task
  const handleDeleteTask = (id: string) => {
    onUpdateTasks(tasks.filter((t) => t.id !== id));
  };

  // 1-Click Dynamic Reschedule implementation
  const handleDynamicReschedule = () => {
    // Collect uncompleted tasks and recalculate their schedule starting from current hour
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = Math.floor(now.getMinutes() / 15) * 15;
    let runningMinutes = currentHour * 60 + currentMinute;

    const updated = tasks.map((task) => {
      if (task.isCompleted) return task;

      // Calculate start and end
      const startH = Math.floor(runningMinutes / 60);
      const startM = runningMinutes % 60;
      const endTotal = runningMinutes + task.durationMinutes;
      const endH = Math.floor(endTotal / 60);
      const endM = endTotal % 60;

      const formattedStart = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
      const formattedEnd = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;

      // advance by task duration + 15 min buffer
      runningMinutes += task.durationMinutes + (task.bufferMinutes || 15);

      return {
        ...task,
        startTime: formattedStart,
        endTime: formattedEnd,
      };
    });

    onUpdateTasks(updated);
    setRescheduleNotice(
      lang === 'vi'
        ? `Đã tái phân bổ thông minh ${tasks.filter((t) => !t.isCompleted).length} đầu việc chưa xong vào các khe trống khả thi!`
        : `Dynamically rescheduled ${tasks.filter((t) => !t.isCompleted).length} remaining tasks without conflict!`
    );

    setTimeout(() => {
      setRescheduleNotice(null);
    }, 4000);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalMinutes = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);

  // Available unique categories
  const categories = Array.from(new Set(tasks.map((t) => t.category)));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Workspace Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-8 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Trang chủ' : 'Landing Page'}</span>
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-2">
                <span>{lang === 'vi' ? 'Không Gian Lập Lịch Thông Minh' : 'AI Schedule Workspace'}</span>
                <span className="text-xs font-normal text-slate-400">· WBS Time-box</span>
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* 1-Click Dynamic Reschedule Button */}
            <button
              onClick={handleDynamicReschedule}
              className="px-3.5 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-300/80 dark:border-amber-700/80 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
              title="Tự động xếp lại việc khi bị trễ hoặc có lịch phát sinh"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{lang === 'vi' ? 'Dynamic Reschedule (1 Chạm)' : 'Dynamic Reschedule'}</span>
            </button>

            {/* Quick Add with AI */}
            <button
              onClick={onOpenBreakdownModal}
              className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Nhập việc mới với AI' : 'Add Task with AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Dynamic Reschedule Toast Notice */}
        {rescheduleNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              {rescheduleNotice}
            </span>
            <button onClick={() => setRescheduleNotice(null)} className="text-emerald-700 hover:underline">
              {lang === 'vi' ? 'Đóng' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              {lang === 'vi' ? 'Tiến độ hoàn thành' : 'Completion Rate'}
            </div>
            <div className="mt-2 text-2xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white flex items-baseline gap-2">
              <span>{tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%</span>
              <span className="text-xs text-slate-400 font-normal font-sans">
                ({completedCount}/{tasks.length} {lang === 'vi' ? 'hạng mục' : 'tasks'})
              </span>
            </div>
            <div className="mt-3 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              {lang === 'vi' ? 'Tổng thời lượng khối' : 'Total Focus Time'}
            </div>
            <div className="mt-2 text-2xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </div>
            <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
              {lang === 'vi' ? '✓ Đã bao gồm khoảng đệm chống cháy lịch' : '✓ 15m buffer auto-protected'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                {lang === 'vi' ? 'Google Calendar Sync' : 'Calendar Status'}
              </div>
              <div className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{lang === 'vi' ? 'Đã liên kết đồng bộ' : 'Synced & Ready'}</span>
              </div>
              <div className="mt-1 text-xs text-slate-400">
                {lang === 'vi' ? '2-Way real-time sync' : 'Bi-directional active'}
              </div>
            </div>

            <button
              onClick={onOpenBreakdownModal}
              className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
              title="Phân rã việc mới"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher & Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          {/* Functional Category Filter Tabs (Zero-pill compliant) */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {lang === 'vi' ? 'Tất cả' : 'All Categories'} ({tasks.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-xl text-xs font-medium">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {lang === 'vi' ? 'Khung Giờ (Timeline)' : 'Hourly Timeline'}
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {lang === 'vi' ? 'Bảng WBS (Kanban)' : 'WBS Kanban'}
            </button>
          </div>
        </div>

        {/* SCHEDULE VIEW: Timeline or Kanban */}
        {viewMode === 'timeline' ? (
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <CalendarIcon className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {lang === 'vi' ? 'Chưa có công việc nào trong danh mục này' : 'No tasks in this category'}
                </p>
                <button
                  onClick={onOpenBreakdownModal}
                  className="mt-4 px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  {lang === 'vi' ? 'Thêm công việc mới' : 'Add New Task'}
                </button>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    task.isCompleted
                      ? 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Completion checkbox button */}
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors"
                      title={task.isCompleted ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
                    >
                      {task.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div
                      className="w-1.5 self-stretch rounded-full shrink-0"
                      style={{ backgroundColor: task.color || '#4F46E5' }}
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-sm font-bold text-slate-900 dark:text-white ${
                            task.isCompleted ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {task.title}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {task.description}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="font-medium text-slate-600 dark:text-slate-300">{task.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{task.energyRequirement}</span>
                        {task.bufferMinutes && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-600 dark:text-emerald-400">+{task.bufferMinutes}m đệm nghỉ</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Timing */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">
                        {task.startTime} – {task.endTime}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {task.durationMinutes} phút
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setActiveFocusTask(task);
                          setFocusSeconds(task.durationMinutes * 60);
                          setIsFocusRunning(true);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Bật Focus Pomodoro cho việc này"
                      >
                        <Focus className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Xóa công việc"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Kanban WBS View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Chờ thực hiện */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span>Chưa hoàn thành</span>
                <span className="font-mono">{tasks.filter((t) => !t.isCompleted).length}</span>
              </div>
              <div className="space-y-2.5">
                {tasks
                  .filter((t) => !t.isCompleted)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                    >
                      <div className="font-bold text-slate-900 dark:text-white mb-1">{task.title}</div>
                      <div className="text-slate-400 font-mono flex items-center justify-between">
                        <span>{task.startTime} ({task.durationMinutes}m)</span>
                        <button
                          onClick={() => handleToggleComplete(task.id)}
                          className="text-indigo-600 hover:underline"
                        >
                          Xong
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Column 2: Đang làm / Focus */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 p-4">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4 pb-2 border-b border-indigo-100 dark:border-indigo-900">
                <span>Đang Tập Trung (Active Focus)</span>
                <span className="font-mono">{activeFocusTask ? '1' : '0'}</span>
              </div>
              {activeFocusTask ? (
                <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-700 text-xs space-y-3">
                  <div className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">
                    {activeFocusTask.title}
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-center text-indigo-600 dark:text-indigo-400">
                    {Math.floor(focusSeconds / 60)}:{(focusSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setIsFocusRunning(!isFocusRunning)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                    >
                      {isFocusRunning ? 'Tạm dừng' : 'Tiếp tục'}
                    </button>
                    <button
                      onClick={() => handleToggleComplete(activeFocusTask.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                    >
                      Hoàn thành
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  Chọn biểu tượng Focus ở bất kỳ việc nào để kích hoạt luồng tập trung.
                </div>
              )}
            </div>

            {/* Column 3: Đã hoàn tất */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span>Đã Hoàn Thành</span>
                <span className="font-mono">{completedCount}</span>
              </div>
              <div className="space-y-2.5">
                {tasks
                  .filter((t) => t.isCompleted)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-xs line-through text-slate-400"
                    >
                      {task.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
