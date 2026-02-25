export type CurrentClass = '10th' | '11th' | '12th' | 'Dropper';
export type StudyHours = '<2h' | '2-4h' | '4-6h' | '6-8h' | '8h+';
export type Target = 'IIT_TOP_7' | 'ANY_IIT' | 'NIT_TOP_IIIT' | 'ANY_ENGINEERING';
export type PrepMode = 'SELF_STUDY' | 'OFFLINE_COACHING' | 'ONLINE_COACHING';
export type MockPercentile = 'NONE' | 'BELOW_50' | '50_75' | '75_90' | '90_95' | '95_99' | '99_PLUS';

export interface StudentProfile {
  currentClass: CurrentClass;
  physicsScore: number;
  chemistryScore: number;
  mathsScore: number;
  dailyStudyHours: StudyHours;
  target: Target;
  prepMode: PrepMode;
  weakAreas: string[];
  mockPercentile: MockPercentile;
  monthsRemaining: number;
}

export interface CourseRecommendation {
  name: string;
  platform: string;
  url: string;
  price: string;
  rating: number;
  topics_covered: string[];
  why_recommended: string;
  duration_weeks: number;
}

export interface StudyPlanHighlight {
  phase: string;
  duration: string;
  focus: string;
  daily_target: string;
}

export interface AnalysisResult {
  summary: string;
  preparedness_score: number;
  preparedness_label: string;
  immediate_actions: string[];
  course_recommendations: CourseRecommendation[];
  study_plan_highlights: StudyPlanHighlight[];
  weak_subject_tips: Record<string, string>;
  motivational_note: string;
}

export interface ApiResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export interface FormState {
  currentStep: number;
  direction: number;
  profile: Partial<StudentProfile>;
}
