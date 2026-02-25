import { motion } from 'framer-motion';
import { TARGET_OPTIONS } from '../../constants/formOptions';
import type { Target } from '../../types';

interface Props {
  value?: Target;
  onChange: (v: Target) => void;
}

export default function Step6Target({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">🎯 What's your target?</h2>
      <p className="text-slate-400 mb-8">Dream big — your plan will be calibrated to this goal</p>
      <div className="space-y-4">
        {TARGET_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.value)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
              value === opt.value
                ? 'border-indigo-500 bg-indigo-500/20'
                : 'border-white/10 glass hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${opt.color} flex-shrink-0`} />
              <div>
                <div className="font-bold text-white text-lg">{opt.label}</div>
                <div className="text-sm text-slate-400 mt-0.5">{opt.description}</div>
              </div>
              {value === opt.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"
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
