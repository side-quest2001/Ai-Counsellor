import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ui/ParticleBackground';

const steps = [
  'Analysing your profile...',
  'Scanning knowledge base...',
  'Identifying weak areas...',
  'Filtering best courses...',
  'Crafting your study plan...',
  'Generating AI recommendations...',
];

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const analyzing = sessionStorage.getItem('analyzing');
    if (!analyzing) {
      navigate('/assessment');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-deep-purple flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Animated spinner */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{ borderTopColor: '#4F46E5', borderRightColor: '#7C3AED' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-3 rounded-full border-4 border-transparent"
            style={{ borderTopColor: '#06B6D4', borderLeftColor: '#7C3AED' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-6 rounded-full border-4 border-transparent"
            style={{ borderBottomColor: '#4F46E5', borderRightColor: '#06B6D4' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl"
            >
              🧠
            </motion.div>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-3"
        >
          Analysing your profile
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 mb-10"
        >
          Our AI is crafting a personalised JEE roadmap just for you
        </motion.p>

        {/* Steps list */}
        <div className="space-y-3 text-left">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.4 + 0.2 }}
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.4 + 0.1 }}
                className="text-slate-400 text-sm"
              >
                {step}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
