import type { CurrentClass, StudyHours, Target, PrepMode, MockPercentile } from '../types';

export const CLASS_OPTIONS: { value: CurrentClass; label: string; description: string; icon: string }[] = [
  { value: '10th', label: 'Class 10th', description: 'Just starting the JEE journey early', icon: '🌱' },
  { value: '11th', label: 'Class 11th', description: 'Building fundamentals', icon: '📚' },
  { value: '12th', label: 'Class 12th', description: 'Full JEE preparation mode', icon: '🎯' },
  { value: 'Dropper', label: 'Dropper', description: 'Dedicated repeat year preparation', icon: '🔥' },
];

export const STUDY_HOURS_OPTIONS: { value: StudyHours; label: string; description: string }[] = [
  { value: '<2h', label: 'Less than 2 hours', description: 'Just getting started' },
  { value: '2-4h', label: '2 – 4 hours', description: 'Building a routine' },
  { value: '4-6h', label: '4 – 6 hours', description: 'Serious preparation' },
  { value: '6-8h', label: '6 – 8 hours', description: 'Intense focus' },
  { value: '8h+', label: '8+ hours', description: 'Full throttle mode' },
];

export const TARGET_OPTIONS: { value: Target; label: string; description: string; color: string }[] = [
  {
    value: 'IIT_TOP_7',
    label: 'IIT Top 7',
    description: 'IIT Bombay, Delhi, Madras, Kanpur, Kharagpur, Roorkee, Hyderabad',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    value: 'ANY_IIT',
    label: 'Any IIT',
    description: 'Any of the 23 IITs — JEE Advanced rank ~5000 or better',
    color: 'from-purple-500 to-pink-500',
  },
  {
    value: 'NIT_TOP_IIIT',
    label: 'NIT / Top IIIT',
    description: 'Top NITs & IIITs — JEE Mains rank ~10,000 or better',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    value: 'ANY_ENGINEERING',
    label: 'Any Engineering College',
    description: 'Good engineering college via JEE Mains',
    color: 'from-green-500 to-teal-500',
  },
];

export const PREP_MODE_OPTIONS: { value: PrepMode; label: string; description: string; icon: string }[] = [
  { value: 'SELF_STUDY', label: 'Self Study', description: 'Learning independently with online resources', icon: '💻' },
  { value: 'ONLINE_COACHING', label: 'Online Coaching', description: 'Enrolled in an online coaching platform', icon: '🌐' },
  { value: 'OFFLINE_COACHING', label: 'Offline Coaching', description: 'Attending physical coaching classes', icon: '🏫' },
];

export const MOCK_PERCENTILE_OPTIONS: { value: MockPercentile; label: string; description: string; color: string }[] = [
  { value: 'NONE', label: 'Not taken yet', description: 'Yet to attempt a full mock test', color: 'text-slate-400' },
  { value: 'BELOW_50', label: 'Below 50th %ile', description: 'Room for significant improvement', color: 'text-red-400' },
  { value: '50_75', label: '50th – 75th %ile', description: 'Developing — on the right track', color: 'text-orange-400' },
  { value: '75_90', label: '75th – 90th %ile', description: 'Good progress', color: 'text-yellow-400' },
  { value: '90_95', label: '90th – 95th %ile', description: 'Strong performance', color: 'text-lime-400' },
  { value: '95_99', label: '95th – 99th %ile', description: 'Excellent — NIT/IIT territory', color: 'text-green-400' },
  { value: '99_PLUS', label: 'Above 99th %ile', description: 'Top IIT material 🚀', color: 'text-cyan-400' },
];

export const WEAK_AREAS_OPTIONS: { value: string; subject: 'Physics' | 'Chemistry' | 'Maths'; emoji: string }[] = [
  // Physics
  { value: 'Mechanics', subject: 'Physics', emoji: '⚙️' },
  { value: 'Thermodynamics', subject: 'Physics', emoji: '🌡️' },
  { value: 'Electrostatics', subject: 'Physics', emoji: '⚡' },
  { value: 'Magnetism', subject: 'Physics', emoji: '🧲' },
  { value: 'Optics', subject: 'Physics', emoji: '🔭' },
  { value: 'Waves', subject: 'Physics', emoji: '〰️' },
  { value: 'Modern Physics', subject: 'Physics', emoji: '⚛️' },
  // Chemistry
  { value: 'Organic Chemistry', subject: 'Chemistry', emoji: '🧪' },
  { value: 'Inorganic Chemistry', subject: 'Chemistry', emoji: '🔬' },
  { value: 'Physical Chemistry', subject: 'Chemistry', emoji: '⚗️' },
  // Maths
  { value: 'Algebra', subject: 'Maths', emoji: '📐' },
  { value: 'Calculus', subject: 'Maths', emoji: '∫' },
  { value: 'Coordinate Geometry', subject: 'Maths', emoji: '📊' },
  { value: 'Vectors & 3D', subject: 'Maths', emoji: '↗️' },
  { value: 'Probability', subject: 'Maths', emoji: '🎲' },
  { value: 'Trigonometry', subject: 'Maths', emoji: '📏' },
];

export const SUBJECT_COLORS = {
  Physics: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
  Chemistry: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300',
  Maths: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300',
} as const;
