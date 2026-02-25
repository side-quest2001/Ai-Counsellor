import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Zap, Download } from 'lucide-react';
import type { AnalysisResult } from '../types';
import ParticleBackground from '../components/ui/ParticleBackground';
import SummaryCard from '../components/results/SummaryCard';
import CourseCard from '../components/results/CourseCard';
import StudyPlanCard from '../components/results/StudyPlanCard';
import ActionItemCard from '../components/results/ActionItemCard';

export default function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('analysis_result');
    if (!stored) {
      navigate('/assessment');
      return;
    }
    setResult(JSON.parse(stored) as AnalysisResult);
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-deep-purple relative">
      <ParticleBackground />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-6 py-4 border-b border-white/5 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
            >
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-white font-bold">JEE Guru</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sessionStorage.clear();
                navigate('/assessment');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-slate-300 text-sm font-medium"
            >
              <RefreshCw size={14} /> Retake
            </motion.button>
          </div>
        </motion.header>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 text-sm text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Analysis Complete
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Your JEE <span className="gradient-text">Roadmap</span>
            </h1>
            <p className="text-slate-400">Personalised recommendations based on your profile</p>
          </motion.div>

          {/* Summary */}
          <div className="mb-8">
            <SummaryCard
              summary={result.summary}
              score={result.preparedness_score}
              label={result.preparedness_label}
              delay={0.1}
            />
          </div>

          {/* Main grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Actions + Tips */}
            <ActionItemCard
              actions={result.immediate_actions}
              weakTips={result.weak_subject_tips}
              motivationalNote={result.motivational_note}
              delay={0.2}
            />

            {/* Study Plan */}
            <StudyPlanCard
              phases={result.study_plan_highlights}
              delay={0.3}
            />
          </div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🎓</span> Recommended Courses
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {result.course_recommendations.map((course, i) => (
                <CourseCard key={course.name} course={course} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center glass p-8 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">Start your journey today</h3>
            <p className="text-slate-400 text-sm mb-6">The best time to start was yesterday. The second best time is now.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass text-slate-300 font-medium text-sm"
              >
                <Download size={16} /> Save Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { sessionStorage.clear(); navigate('/'); }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)' }}
              >
                <Zap size={16} /> New Assessment
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
