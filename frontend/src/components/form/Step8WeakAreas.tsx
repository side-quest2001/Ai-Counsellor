import { motion } from 'framer-motion';
import { WEAK_AREAS_OPTIONS, SUBJECT_COLORS } from '../../constants/formOptions';

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

export default function Step8WeakAreas({ value, onChange }: Props) {
  const toggle = (area: string) => {
    if (value.includes(area)) {
      onChange(value.filter(a => a !== area));
    } else {
      onChange([...value, area]);
    }
  };

  const grouped = {
    Physics: WEAK_AREAS_OPTIONS.filter(o => o.subject === 'Physics'),
    Chemistry: WEAK_AREAS_OPTIONS.filter(o => o.subject === 'Chemistry'),
    Maths: WEAK_AREAS_OPTIONS.filter(o => o.subject === 'Maths'),
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">😰 Weak areas?</h2>
      <p className="text-slate-400 mb-2">Select all topics you struggle with (or skip if none)</p>
      {value.length > 0 && (
        <p className="text-indigo-400 text-sm mb-6 font-medium">{value.length} topic{value.length !== 1 ? 's' : ''} selected</p>
      )}
      {value.length === 0 && <div className="mb-6" />}

      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-1">
        {(Object.entries(grouped) as [keyof typeof grouped, typeof WEAK_AREAS_OPTIONS[0][]][]).map(([subject, options]) => (
          <div key={subject}>
            <div className={`text-xs font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded-lg inline-block bg-gradient-to-r ${SUBJECT_COLORS[subject]}`}>
              {subject}
            </div>
            <div className="flex flex-wrap gap-2">
              {options.map((opt, i) => (
                <motion.button
                  key={opt.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggle(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all flex items-center gap-2 ${
                    value.includes(opt.value)
                      ? 'border-indigo-500 bg-indigo-500/25 text-white'
                      : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{opt.emoji}</span>
                  {opt.value}
                  {value.includes(opt.value) && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-indigo-400">✓</motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
