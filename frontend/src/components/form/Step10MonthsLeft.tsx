import { motion } from 'framer-motion';

interface Props {
  value?: number;
  onChange: (v: number) => void;
}

const presets = [1, 2, 3, 4, 6, 8, 10, 12, 18, 24];

export default function Step10MonthsLeft({ value = 6, onChange }: Props) {
  const urgency = value <= 3 ? 'critical' : value <= 6 ? 'focused' : value <= 12 ? 'comfortable' : 'early';

  const urgencyConfig = {
    critical: { label: 'Critical — intensive mode required', color: '#EF4444', bg: 'bg-red-500/20 border-red-500/40' },
    focused: { label: 'Focused preparation window', color: '#F59E0B', bg: 'bg-yellow-500/20 border-yellow-500/40' },
    comfortable: { label: 'Good preparation time', color: '#10B981', bg: 'bg-green-500/20 border-green-500/40' },
    early: { label: 'Excellent early start!', color: '#06B6D4', bg: 'bg-cyan-500/20 border-cyan-500/40' },
  };

  const conf = urgencyConfig[urgency];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">📅 Months remaining for JEE?</h2>
      <p className="text-slate-400 mb-8">How many months until your next JEE Mains attempt?</p>

      <div className="glass p-6 rounded-2xl mb-6">
        <div className="text-center mb-6">
          <motion.div key={value} initial={{ scale: 0.7 }} animate={{ scale: 1 }} className="text-7xl font-black gradient-text">
            {value}
          </motion.div>
          <div className="text-slate-300 text-lg font-medium">{value === 1 ? 'month' : 'months'} remaining</div>
        </div>

        <input
          type="range"
          min={1}
          max={24}
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
          className="w-full mb-4"
        />

        <div className="flex justify-between text-xs text-slate-500 mb-4">
          <span>1 month</span>
          <span>12 months</span>
          <span>24 months</span>
        </div>
      </div>

      {/* Quick presets */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-3">Quick select:</p>
        <div className="flex flex-wrap gap-2">
          {presets.map(m => (
            <motion.button
              key={m}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(m)}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                value === m
                  ? 'text-white'
                  : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
              style={value === m ? { background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' } : {}}
            >
              {m}m
            </motion.button>
          ))}
        </div>
      </div>

      {/* Urgency indicator */}
      <motion.div
        key={urgency}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl border-2 ${conf.bg}`}
      >
        <div className="font-semibold text-sm" style={{ color: conf.color }}>{conf.label}</div>
      </motion.div>
    </div>
  );
}
