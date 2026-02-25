import { motion } from 'framer-motion';

interface Props {
  actions: string[];
  weakTips: Record<string, string>;
  motivationalNote: string;
  delay?: number;
}

export default function ActionItemCard({ actions, weakTips, motivationalNote, delay = 0 }: Props) {
  return (
    <div className="space-y-6">
      {/* Immediate Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="glass p-6 rounded-2xl"
      >
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <span className="text-2xl">⚡</span> Immediate Actions
        </h3>
        <div className="space-y-3">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + i * 0.1 }}
              className="flex gap-3 p-3 rounded-xl bg-white/3 border border-white/5"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
              >
                {i + 1}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{action}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weak Area Tips */}
      {Object.keys(weakTips).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="glass p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Weak Area Tips
          </h3>
          <div className="space-y-4">
            {Object.entries(weakTips).map(([topic, tip], i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.2 + i * 0.1 }}
                className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/5"
              >
                <div className="font-semibold text-violet-300 mb-1 text-sm">{topic}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Motivational Note */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
        className="p-6 rounded-2xl border border-cyan-500/30 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(79,70,229,0.1))' }}
      >
        <div className="text-4xl mb-3">💫</div>
        <p className="text-cyan-200 italic text-lg leading-relaxed font-medium">"{motivationalNote}"</p>
        <div className="text-slate-500 text-xs mt-3">— JEE Guru AI</div>
      </motion.div>
    </div>
  );
}
