import { motion } from 'framer-motion';
import { CLASS_OPTIONS } from '../../constants/formOptions';
import type { CurrentClass } from '../../types';

interface Props {
  value?: CurrentClass;
  onChange: (v: CurrentClass) => void;
}

export default function Step1Class({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What class are you in?</h2>
      <p className="text-slate-400 mb-8">This helps us tailor your preparation timeline</p>
      <div className="grid grid-cols-2 gap-4">
        {CLASS_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(opt.value)}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              value === opt.value
                ? 'border-indigo-500 bg-indigo-500/20'
                : 'border-white/10 glass hover:border-white/30'
            }`}
          >
            <div className="text-2xl mb-2">{opt.icon}</div>
            <div className="font-bold text-white">{opt.label}</div>
            <div className="text-xs text-slate-400 mt-1">{opt.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
