import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { KeyFeaturesSection } from './components/KeyFeaturesSection';
import { SocialProofSection } from './components/SocialProofSection';
import { PricingSection } from './components/PricingSection';
import { FooterAndFinalCta } from './components/FooterAndFinalCta';
import { TrialModal } from './components/TrialModal';
import { InteractiveAppWorkspace } from './components/InteractiveAppWorkspace';
import { SAMPLE_INITIAL_SCHEDULE } from './data/mockData';
import { ScheduledTask } from './types';

export default function App() {
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [trialInitialPrompt, setTrialInitialPrompt] = useState<string>('');
  const [isAppMode, setIsAppMode] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [currentTasks, setCurrentTasks] = useState<ScheduledTask[]>(SAMPLE_INITIAL_SCHEDULE);

  // Sync dark mode class with html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleOpenTrial = (initialPrompt?: string) => {
    if (initialPrompt) {
      setTrialInitialPrompt(initialPrompt);
    }
    setIsTrialOpen(true);
  };

  const handleSelectPricingTier = (tierId: string) => {
    if (tierId === 'starter') {
      setIsTrialOpen(true);
    } else {
      setIsTrialOpen(true);
    }
  };

  const handleOpenFullApp = (newTasks: ScheduledTask[]) => {
    setCurrentTasks(newTasks);
    setIsAppMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Universal 3-Zone Navigation */}
      <Navbar
        onOpenTrial={() => handleOpenTrial()}
        onToggleAppMode={() => setIsAppMode(!isAppMode)}
        isAppMode={isAppMode}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'vi' ? 'en' : 'vi')}
      />

      {isAppMode ? (
        /* Live Interactive Schedule Workspace */
        <InteractiveAppWorkspace
          tasks={currentTasks}
          onUpdateTasks={setCurrentTasks}
          onBackToLanding={() => setIsAppMode(false)}
          onOpenBreakdownModal={() => handleOpenTrial()}
          lang={lang}
        />
      ) : (
        /* High-Converting CRO & BA Landing Page */
        <main>
          {/* Section 1: Hero Section (First Fold Hook & Interactive Simulator) */}
          <HeroSection
            onOpenTrial={handleOpenTrial}
            lang={lang}
          />

          {/* Section 2: Pain Points (Agitate the problem, empathetic cards, strictly NO CTA) */}
          <PainPointsSection lang={lang} />

          {/* Section 3: How It Works (3-step interactive Stepper with synchronized App Mockup) */}
          <HowItWorksSection
            onOpenTrial={() => handleOpenTrial()}
            lang={lang}
          />

          {/* Section 4: Key Features (Z-Pattern layout, micro-demos, WBS, Dynamic Reschedule, Focus defense) */}
          <KeyFeaturesSection
            onOpenTrial={() => handleOpenTrial()}
            lang={lang}
          />

          {/* Section 5: Social Proof (Animated counters, testimonials with real portraits & metrics) */}
          <SocialProofSection lang={lang} />

          {/* Section 6: Pricing (Monthly/Annual toggle -25%, Decoy effect for Pro, FAQs) */}
          <PricingSection
            onSelectTier={handleSelectPricingTier}
            lang={lang}
          />

          {/* Section 7: Footer & Final Conversion CTA Banner */}
          <FooterAndFinalCta
            onOpenTrial={() => handleOpenTrial()}
            lang={lang}
          />
        </main>
      )}

      {/* Interactive AI Trial Modal */}
      <TrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
        initialPrompt={trialInitialPrompt}
        onOpenFullApp={handleOpenFullApp}
        lang={lang}
      />
    </div>
  );
}
