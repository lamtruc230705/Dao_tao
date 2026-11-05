export interface ScheduledTask {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "10:15"
  dayOffset: number; // 0: today, 1: tomorrow, etc.
  category: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  color?: string;
  energyRequirement?: string;
  bufferMinutes?: number;
  isCompleted?: boolean;
}

export interface BreakdownResult {
  rawInput: string;
  summary: string;
  totalEstimatedMinutes: number;
  efficiencyGainPercent: number;
  savedHours: number;
  tasks: ScheduledTask[];
  generatedWith: string;
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  stat: string;
  symptom: string;
  iconName: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  timeframe: string;
  mockupState: 'input' | 'breakdown' | 'calendar';
}

export interface KeyFeature {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  croBenefit: string;
  demoType: 'wbs' | 'timeblock' | 'reschedule' | 'focus';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  quote: string;
  metricHighlight: string;
  tag: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  isPopular?: boolean;
  ctaText: string;
  features: string[];
  excludedFeatures?: string[];
}
