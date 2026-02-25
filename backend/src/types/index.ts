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

export interface Course {
  id: string;
  name: string;
  platform: string;
  url: string;
  price_inr: number;
  price_display: string;
  rating: number;
  total_reviews: number;
  topics_covered: string[];
  subjects: string[];
  suitable_for: CurrentClass[];
  target_audience: Target[];
  duration_weeks: number;
  mode: 'online' | 'offline' | 'hybrid';
  instructor: string;
  highlights: string[];
  is_free: boolean;
}

export interface Topic {
  name: string;
  subject: 'Physics' | 'Chemistry' | 'Maths';
  weightage_percent: number;
  adv_weightage_percent: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  avg_questions_mains: number;
  is_high_yield: boolean;
  prerequisite_topics: string[];
  typical_study_weeks: number;
}

export interface StudyPhase {
  phase_number: number;
  name: string;
  duration_weeks: number;
  focus: string;
  daily_hours_recommended: number;
  subjects_priority: string[];
  key_milestones: string[];
  daily_target: string;
}

export interface StudyPlan {
  id: string;
  label: string;
  suitable_for_months: { min: number; max: number };
  suitable_for_class: CurrentClass[];
  phases: StudyPhase[];
}

export interface Institute {
  id: string;
  name: string;
  type: 'offline' | 'online' | 'hybrid';
  locations: string[];
  annual_fee_range: string;
  jee_advanced_selection_rate: string;
  notable_batches: string[];
  pros: string[];
  cons: string[];
  best_for: Target[];
  website: string;
}

export interface Resource {
  topic: string;
  subject: string;
  books: { title: string; author: string; level: string }[];
  youtube_channels: { name: string; url: string; specialty: string }[];
  free_platforms: { name: string; url: string; description: string }[];
  practice_sources: string[];
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

export interface AnalysisContext {
  profile: StudentProfile;
  preparednessScore: number;
  criticalWeakAreas: string[];
  filteredCourses: Course[];
  selectedStudyPlan: StudyPlan | null;
  relevantResources: Resource[];
  topicWeightageContext: Topic[];
}
