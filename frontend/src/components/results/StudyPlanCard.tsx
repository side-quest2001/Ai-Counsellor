import { motion } from 'framer-motion';
import type { StudyPlanHighlight } from '../../types';

interface Props {
  phases: StudyPlanHighlight[];
  delay?: number;
}

const phaseColors = [
  { dot: '#4F46E5', line: 'rgba(79,70,229,0.3)' },
  { dot: '#7C3AED', line: 'rgba(124,58,237,0.3)' },
  { dot: '#06B6D4', line: 'rgba(6,182,212,0.3)' },
  { dot: '#10B981', line: 'rgba(16,185,129,0.3)' },
];

export default function StudyPlanCard({ phases, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass p-6 rounded-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">📅</span> Your Study Plan
      </h3>

      <div className="relative">
        {phases.map((phase, i) => {
          const colors = phaseColors[i % phaseColors.length];
          return (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + i * 0.15 }}
              className="flex gap-4 mb-6 last:mb-0"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: delay + i * 0.15 + 0.1 }}
                  className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: colors.dot, boxShadow: `0 0 10px ${colors.dot}` }}
                />
                {i < phases.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ backgroundColor: colors.line, minHeight: '40px' }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-white">{phase.phase}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: `${colors.dot}22`, color: colors.dot, border: `1px solid ${colors.dot}44` }}
                  >
                    {phase.duration}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{phase.focus}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Daily:</span>
                  <span className="text-xs text-cyan-400 font-medium">{phase.daily_target}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
