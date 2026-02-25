import { motion } from 'framer-motion';
import { PREP_MODE_OPTIONS } from '../../constants/formOptions';
import type { PrepMode } from '../../types';

interface Props {
  value?: PrepMode;
  onChange: (v: PrepMode) => void;
}

export default function Step7PrepMode({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">🏫 How are you preparing?</h2>
      <p className="text-slate-400 mb-8">This helps us recommend the right type of courses for you</p>
      <div className="space-y-4">
        {PREP_MODE_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.value)}
            className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
              value === opt.value
                ? 'border-indigo-500 bg-indigo-500/20'
                : 'border-white/10 glass hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{opt.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-white text-lg">{opt.label}</div>
                <div className="text-sm text-slate-400 mt-0.5">{opt.description}</div>
              </div>
              {value === opt.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"
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
