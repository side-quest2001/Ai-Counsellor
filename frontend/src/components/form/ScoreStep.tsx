import { motion } from 'framer-motion';

interface Props {
  subject: string;
  emoji: string;
  color: string;
  value?: number;
  onChange: (v: number) => void;
}

const labels = ['', 'Very Weak', 'Weak', 'Below Average', 'Average', 'Above Average', 'Good', 'Very Good', 'Strong', 'Excellent', 'Master Level'];

export default function ScoreStep({ subject, emoji, color, value = 5, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {emoji} How strong is your {subject}?
      </h2>
      <p className="text-slate-400 mb-8">Be honest — this helps us give you the most accurate plan</p>

      <div className="glass p-8 rounded-2xl">
        <div className="text-center mb-8">
          <motion.div
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-8xl font-black gradient-text mb-2"
          >
            {value}
          </motion.div>
          <div className="text-xl font-semibold text-slate-300">{labels[value]}</div>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
          className="w-full mb-6"
          style={{ accentColor: color }}
        />

        <div className="flex justify-between text-xs text-slate-500">
          <span>1 — Very Weak</span>
          <span>5 — Average</span>
          <span>10 — Expert</span>
        </div>

        {/* Score pills */}
        <div className="flex gap-2 mt-6 flex-wrap justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <motion.button
              key={n}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(n)}
              className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                value === n
                  ? 'text-white shadow-lg'
                  : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
              style={value === n ? { background: `linear-gradient(135deg, ${color}, #06B6D4)` } : {}}
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
