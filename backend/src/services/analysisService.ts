import type {
  StudentProfile,
  Course,
  Topic,
  StudyPlan,
  Resource,
  AnalysisContext,
} from '../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const coursesData = require('../data/courses.json') as { courses: Course[] };
// eslint-disable-next-line @typescript-eslint/no-require-imports
const topicsData = require('../data/topics.json') as { topics: Topic[] };
// eslint-disable-next-line @typescript-eslint/no-require-imports
const studyPlansData = require('../data/studyPlans.json') as { studyPlans: StudyPlan[] };
// eslint-disable-next-line @typescript-eslint/no-require-imports
const resourcesData = require('../data/resources.json') as { resources: Resource[] };

const courses = coursesData.courses as Course[];
const topics = topicsData.topics as Topic[];
const studyPlans = studyPlansData.studyPlans as StudyPlan[];
const resources = resourcesData.resources as Resource[];

function computePreparednessScore(profile: StudentProfile): number {
  const { physicsScore, chemistryScore, mathsScore, dailyStudyHours, mockPercentile, monthsRemaining, weakAreas } = profile;

  // Subject avg → max 40 points
  const avg = (physicsScore + chemistryScore + mathsScore) / 3;
  const subjectPoints = (avg / 10) * 40;

  // Study hours → max 20 points
  const hoursMap: Record<string, number> = { '<2h': 0, '2-4h': 5, '4-6h': 10, '6-8h': 15, '8h+': 20 };
  const hoursPoints = hoursMap[dailyStudyHours] ?? 0;

  // Mock percentile → max 20 points
  const percentileMap: Record<string, number> = {
    NONE: 0, BELOW_50: 3, '50_75': 8, '75_90': 12, '90_95': 15, '95_99': 18, '99_PLUS': 20,
  };
  const percentilePoints = percentileMap[mockPercentile] ?? 0;

  // Time remaining bonus → max 10 points
  const timePoints = (Math.min(monthsRemaining, 12) / 12) * 10;

  // High-yield weak areas → penalty up to -10
  const highYieldTopics = new Set(topics.filter(t => t.is_high_yield).map(t => t.name));
  const criticalWeakCount = weakAreas.filter(a => highYieldTopics.has(a)).length;
  const weakPenalty = Math.min(criticalWeakCount, 10);

  const raw = subjectPoints + hoursPoints + percentilePoints + timePoints - weakPenalty;
  return Math.round(Math.max(0, Math.min(100, raw)));
}

function getPreparednessLabel(score: number): string {
  if (score <= 20) return 'Beginner';
  if (score <= 40) return 'Developing';
  if (score <= 60) return 'Intermediate';
  if (score <= 80) return 'Advanced';
  return 'Exam Ready';
}

function getCriticalWeakAreas(profile: StudentProfile): string[] {
  return topics
    .filter(t => t.is_high_yield && profile.weakAreas.includes(t.name))
    .sort((a, b) => b.weightage_percent - a.weightage_percent)
    .map(t => t.name);
}

function filterCourses(profile: StudentProfile, preparednessScore: number): Course[] {
  const { currentClass, target, prepMode } = profile;

  let filtered = courses.filter(course => {
    const classMatch = course.suitable_for.includes(currentClass);
    const targetMatch = course.target_audience.includes(target) || target === 'ANY_ENGINEERING';
    return classMatch && targetMatch;
  });

  // Mode preference
  if (prepMode === 'SELF_STUDY' || prepMode === 'ONLINE_COACHING') {
    const online = filtered.filter(c => c.mode === 'online');
    if (online.length >= 2) filtered = online;
  } else if (prepMode === 'OFFLINE_COACHING') {
    const offline = filtered.filter(c => c.mode === 'offline');
    if (offline.length >= 1) filtered = [...offline, ...filtered.filter(c => c.mode === 'online')];
  }

  // Score low → prefer free courses first
  if (preparednessScore < 30) {
    filtered = [
      ...filtered.filter(c => c.is_free),
      ...filtered.filter(c => !c.is_free),
    ];
  }

  // Sort: weak area coverage → rating
  filtered.sort((a, b) => {
    const aCovers = profile.weakAreas.filter(w => a.topics_covered.includes(w)).length;
    const bCovers = profile.weakAreas.filter(w => b.topics_covered.includes(w)).length;
    if (bCovers !== aCovers) return bCovers - aCovers;
    return b.rating - a.rating;
  });

  // Deduplicate by platform — pick best per platform
  const seen = new Set<string>();
  const deduped: Course[] = [];
  for (const c of filtered) {
    if (!seen.has(c.platform)) {
      seen.add(c.platform);
      deduped.push(c);
    }
  }

  return deduped.slice(0, 5);
}

function selectStudyPlan(profile: StudentProfile): StudyPlan | null {
  const { monthsRemaining, currentClass } = profile;

  // Exact match
  const exact = studyPlans.find(
    p =>
      monthsRemaining >= p.suitable_for_months.min &&
      monthsRemaining <= p.suitable_for_months.max &&
      p.suitable_for_class.includes(currentClass),
  );
  if (exact) return exact;

  // Fallback: closest by months
  const byClass = studyPlans.filter(p => p.suitable_for_class.includes(currentClass));
  if (byClass.length === 0) return studyPlans[0] ?? null;

  return (
    byClass.reduce((closest, plan) => {
      const midCurrent = (plan.suitable_for_months.min + plan.suitable_for_months.max) / 2;
      const midBest = (closest.suitable_for_months.min + closest.suitable_for_months.max) / 2;
      return Math.abs(midCurrent - monthsRemaining) < Math.abs(midBest - monthsRemaining) ? plan : closest;
    }) ?? null
  );
}

function getRelevantResources(profile: StudentProfile): Resource[] {
  const subjectMap: Record<string, string> = {};
  for (const area of profile.weakAreas) {
    const topic = topics.find(t => t.name === area);
    if (topic) subjectMap[area] = topic.subject;
  }

  return resources.filter(r => profile.weakAreas.includes(r.topic)).slice(0, 4);
}

export function buildAnalysisContext(profile: StudentProfile): AnalysisContext {
  const preparednessScore = computePreparednessScore(profile);
  const criticalWeakAreas = getCriticalWeakAreas(profile);
  const filteredCourses = filterCourses(profile, preparednessScore);
  const selectedStudyPlan = selectStudyPlan(profile);
  const relevantResources = getRelevantResources(profile);
  const topicWeightageContext = topics.filter(t => profile.weakAreas.includes(t.name));

  return {
    profile,
    preparednessScore,
    criticalWeakAreas,
    filteredCourses,
    selectedStudyPlan,
    relevantResources,
    topicWeightageContext,
  };
}

export function generateMockResult(context: AnalysisContext): import('../types/index.js').AnalysisResult {
  const { profile, preparednessScore, criticalWeakAreas, filteredCourses, selectedStudyPlan } = context;
  const label = getPreparednessLabel(preparednessScore);

  const targetLabel: Record<string, string> = {
    IIT_TOP_7: 'Top 7 IITs',
    ANY_IIT: 'Any IIT',
    NIT_TOP_IIIT: 'Top NIT/IIIT',
    ANY_ENGINEERING: 'good engineering college',
  };

  const immediateActions = [
    `Start with the highest-weightage weak area first${criticalWeakAreas[0] ? ` — ${criticalWeakAreas[0]}` : ''}.`,
    'Take a baseline JEE Mains mock test within 3 days to establish your starting percentile.',
    'Set up a daily schedule: dedicate the first 90 minutes to your weakest subject.',
    'Complete NCERT exercises for all three subjects before moving to advanced books.',
    'Join a Telegram group or community for daily PYQ practice and motivation.',
  ];

  const courseRecs = filteredCourses.slice(0, 3).map(c => ({
    name: c.name,
    platform: c.platform,
    url: c.url,
    price: c.price_display,
    rating: c.rating,
    topics_covered: c.topics_covered.slice(0, 5),
    why_recommended: `Excellent fit for ${profile.currentClass} students targeting ${targetLabel[profile.target]}. ${c.highlights[0]}.`,
    duration_weeks: c.duration_weeks,
  }));

  const studyPlanHighlights =
    selectedStudyPlan?.phases.slice(0, 3).map(p => ({
      phase: `Phase ${p.phase_number}: ${p.name}`,
      duration: `${p.duration_weeks} weeks`,
      focus: p.focus,
      daily_target: p.daily_target,
    })) ?? [];

  const weakTips: Record<string, string> = {};
  for (const area of criticalWeakAreas.slice(0, 3)) {
    weakTips[area] = `Focus on ${area} — it carries high weightage in JEE. Start with NCERT, then move to standard problem books.`;
  }

  return {
    summary: `You are a ${profile.currentClass} student with ${profile.monthsRemaining} month(s) until JEE, currently at ${label} level. Your subject scores average ${((profile.physicsScore + profile.chemistryScore + profile.mathsScore) / 3).toFixed(1)}/10. ${criticalWeakAreas.length > 0 ? `Critical areas to address: ${criticalWeakAreas.slice(0, 2).join(', ')}.` : 'Your foundation is well-balanced.'}`,
    preparedness_score: preparednessScore,
    preparedness_label: label,
    immediate_actions: immediateActions,
    course_recommendations: courseRecs,
    study_plan_highlights: studyPlanHighlights,
    weak_subject_tips: weakTips,
    motivational_note:
      'Consistency beats intensity every time. Focus on the process, not the outcome — track daily habits and let the results follow.',
  };
}
