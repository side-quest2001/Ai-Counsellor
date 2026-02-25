import { motion } from 'framer-motion';
import { STUDY_HOURS_OPTIONS } from '../../constants/formOptions';
import type { StudyHours } from '../../types';

interface Props {
  value?: StudyHours;
  onChange: (v: StudyHours) => void;
}

const hoursColors = ['bg-red-500/20 border-red-500/40', 'bg-orange-500/20 border-orange-500/40', 'bg-yellow-500/20 border-yellow-500/40', 'bg-green-500/20 border-green-500/40', 'bg-cyan-500/20 border-cyan-500/40'];

export default function Step5StudyHours({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">⏰ Daily study hours?</h2>
      <p className="text-slate-400 mb-8">How many hours do you genuinely study per day (excluding school)?</p>
      <div className="space-y-3">
        {STUDY_HOURS_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.value)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
              value === opt.value
                ? 'border-indigo-500 bg-indigo-500/20'
                : `border-white/10 ${hoursColors[i]} hover:border-white/30`
            }`}
          >
            <div>
              <div className="font-bold text-white">{opt.label}</div>
              <div className="text-xs text-slate-400">{opt.description}</div>
            </div>
            {value === opt.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
