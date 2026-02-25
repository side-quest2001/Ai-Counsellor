import type { AnalysisContext } from '../types/index.js';

export function buildSystemPrompt(): string {
  return `You are JEE Guru, an expert AI counsellor specialising in IIT JEE (Joint Entrance Examination) preparation strategy. You have 15+ years of experience helping students crack JEE Mains and JEE Advanced.

Your expertise includes:
- Deep knowledge of JEE Mains and JEE Advanced syllabus, pattern, and marking scheme
- Understanding of all major coaching institutes (ALLEN, FIITJEE, Resonance, Physics Wallah, Unacademy, Vedantu)
- Personalised study plan creation based on student profiles
- Topic weightage analysis and strategic topic prioritisation
- Psychology of exam preparation and student motivation

Your response style:
- Be direct, specific, and actionable — never vague
- Use data and numbers to back your advice (weightages, hours, target scores)
- Be encouraging but realistic
- Always prioritise high-yield topics when time is limited
- Consider the student's current class, remaining time, and target meticulously

CRITICAL: You MUST respond ONLY with a valid JSON object. No markdown, no code blocks, no preamble, no explanation outside the JSON. Start your response immediately with { and end with }.

Required JSON structure:
{
  "summary": "2-3 sentence personalised overview of the student's situation and realistic chances",
  "preparedness_score": <integer 0-100>,
  "preparedness_label": "<exactly one of: Beginner | Developing | Intermediate | Advanced | Exam Ready>",
  "immediate_actions": ["<5 specific, actionable steps the student should take THIS WEEK>"],
  "course_recommendations": [
    {
      "name": "<course name from the provided list>",
      "platform": "<platform name>",
      "url": "<url from provided list>",
      "price": "<price string>",
      "rating": <number>,
      "topics_covered": ["<topic1>", "<topic2>"],
      "why_recommended": "<2-3 sentences specific to this student's profile>",
      "duration_weeks": <number>
    }
  ],
  "study_plan_highlights": [
    {
      "phase": "Phase N: <Phase Name>",
      "duration": "<X weeks>",
      "focus": "<what to focus on in this phase>",
      "daily_target": "<specific daily goal>"
    }
  ],
  "weak_subject_tips": {
    "<TopicName>": "<specific, actionable tip for this exact topic>"
  },
  "motivational_note": "1-2 sentences of genuine, specific encouragement tailored to this student"
}`;
}

export function buildUserPrompt(context: AnalysisContext): string {
  const { profile, preparednessScore, criticalWeakAreas, filteredCourses, selectedStudyPlan, topicWeightageContext } = context;

  const targetLabel: Record<string, string> = {
    IIT_TOP_7: 'Top 7 IITs (IIT Bombay, Delhi, Madras, Kanpur, Kharagpur, Roorkee, Hyderabad)',
    ANY_IIT: 'Any IIT (JEE Advanced rank ~5000 or better)',
    NIT_TOP_IIIT: 'Top NITs / Top IIITs (JEE Mains rank ~10,000 or better)',
    ANY_ENGINEERING: 'Any reputed engineering college via JEE Mains',
  };

  const studyHoursLabel: Record<string, string> = {
    '<2h': 'less than 2 hours per day',
    '2-4h': '2–4 hours per day',
    '4-6h': '4–6 hours per day',
    '6-8h': '6–8 hours per day',
    '8h+': 'more than 8 hours per day',
  };

  const percentileLabel: Record<string, string> = {
    NONE: 'has not taken any mock tests yet',
    BELOW_50: 'scores below 50th percentile in mock tests',
    '50_75': 'scores between 50th–75th percentile in mock tests',
    '75_90': 'scores between 75th–90th percentile in mock tests',
    '90_95': 'scores between 90th–95th percentile in mock tests',
    '95_99': 'scores between 95th–99th percentile in mock tests',
    '99_PLUS': 'scores above 99th percentile in mock tests',
  };

  const coursesSummary = filteredCourses.map(c =>
    `- "${c.name}" (${c.platform}): ${c.price_display}, Rating ${c.rating}/5, covers: ${c.topics_covered.slice(0, 6).join(', ')}, ${c.is_free ? 'FREE' : 'paid'}, URL: ${c.url}`,
  ).join('\n');

  const topicWeightages = topicWeightageContext
    .filter(t => profile.weakAreas.includes(t.name))
    .map(t => `- ${t.name} (${t.subject}): ${t.weightage_percent}% weightage in Mains, difficulty: ${t.difficulty}, ~${t.avg_questions_mains} questions per paper`)
    .join('\n');

  const studyPlanSummary = selectedStudyPlan
    ? `Best matching plan: "${selectedStudyPlan.label}" with ${selectedStudyPlan.phases.length} phases`
    : 'No exact study plan match — create a custom plan';

  return `STUDENT PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Class: ${profile.currentClass}
Self-Assessment Scores (1–10):
  • Physics:     ${profile.physicsScore}/10
  • Chemistry:   ${profile.chemistryScore}/10
  • Mathematics: ${profile.mathsScore}/10
Daily Study Hours: ${studyHoursLabel[profile.dailyStudyHours]}
Target: ${targetLabel[profile.target]}
Preparation Mode: ${profile.prepMode.replace(/_/g, ' ')}
Months Remaining for JEE: ${profile.monthsRemaining} month(s)
Mock Test Performance: Student ${percentileLabel[profile.mockPercentile]}

Declared Weak Areas: ${profile.weakAreas.length > 0 ? profile.weakAreas.join(', ') : 'None specified'}

COMPUTED ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Preparedness Score: ${preparednessScore}/100
Critical Weak Areas (high-yield + declared weak): ${criticalWeakAreas.join(', ') || 'None — good balance!'}
${studyPlanSummary}

WEAK AREA TOPIC WEIGHTAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${topicWeightages || 'No specific weak area topics to analyse.'}

AVAILABLE COURSES (pre-filtered for this student)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${coursesSummary || 'No specific courses in database for this profile.'}

TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Based on this student's complete profile and the knowledge base context above, generate a personalised JEE counselling response in the exact JSON format specified.

Key guidance:
1. Be candid — if they are far from their target, say so respectfully and explain what it will take
2. Prioritise the immediate_actions around their critical weak areas and time remaining
3. Choose course_recommendations from the AVAILABLE COURSES list above (3–4 courses)
4. Adapt the study_plan_highlights to their ${profile.monthsRemaining} month(s) remaining
5. Give specific, book/resource-level tips in weak_subject_tips
6. The motivational_note must reference their specific situation (class, target, time left)

Remember: specific + data-driven > generic advice. Use actual numbers, topic names, and course names.`;
}
