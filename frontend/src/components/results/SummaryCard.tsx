import { motion } from 'framer-motion';

interface Props {
  summary: string;
  score: number;
  label: string;
  delay?: number;
}

const labelColors: Record<string, string> = {
  Beginner: '#EF4444',
  Developing: '#F97316',
  Intermediate: '#F59E0B',
  Advanced: '#10B981',
  'Exam Ready': '#06B6D4',
};

const labelEmojis: Record<string, string> = {
  Beginner: '🌱',
  Developing: '📈',
  Intermediate: '⚡',
  Advanced: '🔥',
  'Exam Ready': '🚀',
};

export default function SummaryCard({ summary, score, label, delay = 0 }: Props) {
  const color = labelColors[label] ?? '#4F46E5';
  const emoji = labelEmojis[label] ?? '⭐';
  const circumference = 2 * Math.PI * 54;
  const dashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass p-6 md:p-8 rounded-2xl"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Score ring */}
        <div className="relative flex-shrink-0">
          <svg width="130" height="130" viewBox="0 0 130 130">
            {/* Background ring */}
            <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            {/* Progress ring */}
            <motion.circle
              cx="65"
              cy="65"
              r="54"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashoffset }}
              transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
              transform="rotate(-90 65 65)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.5 }}
              className="text-3xl font-black text-white"
            >
              {score}
            </motion.span>
            <span className="text-xs text-slate-400">/100</span>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-2xl">{emoji}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4 }}
              className="text-2xl font-black"
              style={{ color }}
            >
              {label}
            </motion.span>
          </div>
          <p className="text-slate-300 leading-relaxed">{summary}</p>
        </div>
      </div>
    </motion.div>
  );
}
