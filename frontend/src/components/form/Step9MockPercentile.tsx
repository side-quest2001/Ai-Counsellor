import { motion } from 'framer-motion';
import { MOCK_PERCENTILE_OPTIONS } from '../../constants/formOptions';
import type { MockPercentile } from '../../types';

interface Props {
  value?: MockPercentile;
  onChange: (v: MockPercentile) => void;
}

export default function Step9MockPercentile({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">📊 Mock test performance?</h2>
      <p className="text-slate-400 mb-8">Your best performance in any JEE Mains mock test</p>
      <div className="space-y-3">
        {MOCK_PERCENTILE_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.value)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
              value === opt.value
                ? 'border-indigo-500 bg-indigo-500/20'
                : 'border-white/10 glass hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold text-lg ${opt.color}`}>{opt.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">{opt.description}</span>
              {value === opt.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
