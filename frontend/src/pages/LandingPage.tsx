import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Target, BookOpen, Brain, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import ParticleBackground from '../components/ui/ParticleBackground';
import TypingText from '../components/ui/TypingText';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    desc: 'Deep assessment of your strengths, weaknesses, and learning patterns to craft a personalised roadmap.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Target,
    title: 'Personalised Study Plans',
    desc: 'Get a month-by-month plan tailored to your timeline, target IIT, and current preparation level.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BookOpen,
    title: 'Smart Course Picks',
    desc: 'We match you with the best courses from PW, ALLEN, Unacademy and more — based on your exact profile.',
    color: 'from-cyan-500 to-blue-500',
  },
];

const stats = [
  { icon: Users, value: '50,000+', label: 'Students Guided' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
  { icon: TrendingUp, value: '92%', label: 'Improvement Rate' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-purple relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        {/* Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-6 md:px-12 py-5"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">JEE Guru</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/assessment')}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 hover:border-indigo-400/60 transition-colors"
          >
            Start Free <ArrowRight size={14} />
          </motion.button>
        </motion.nav>

        {/* Hero */}
        <section className="px-6 md:px-12 pt-16 pb-20 text-center max-w-5xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-slate-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AI-powered JEE counselling — completely free
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Crack JEE with{' '}
              <span className="gradient-text">AI-Powered</span>
              <br />
              Guidance
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 mb-4 min-h-[2em]">
              <TypingText
                texts={[
                  'Personalised study plans for your timeline',
                  'Smart course recommendations',
                  'Weakness analysis & targeted tips',
                  'Your path to IIT, mapped by AI',
                ]}
                className="text-cyan-400 font-medium"
              />
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
              Answer 10 quick questions. Get a personalised counselling report with course picks, study plan, and actionable steps — powered by AI.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(79,70,229,0.6)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/assessment')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg animate-pulse-glow"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)' }}
              >
                Start Free Assessment <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg glass text-slate-300"
              >
                See how it works
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-12 py-10 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass p-5 rounded-2xl text-center"
              >
                <s.icon size={24} className="text-indigo-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Everything you need to{' '}
              <span className="gradient-text">crack JEE</span>
            </h2>
            <p className="text-slate-400 text-lg">From assessment to action plan in under 2 minutes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass p-6 rounded-2xl group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 md:px-12 py-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">How it works</h2>
            <p className="text-slate-400">Three simple steps to your personalised JEE plan</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Fill Assessment', desc: '10 quick questions about your current level, target, and weak areas' },
              { step: '02', title: 'AI Analyses', desc: 'Our AI cross-references your profile with a JEE knowledge base' },
              { step: '03', title: 'Get Your Plan', desc: 'Receive personalised course picks, study plan, and immediate action steps' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="glass p-6 rounded-2xl">
                  <div className="text-5xl font-black gradient-text mb-3">{item.step}</div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-indigo-500/50" />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong max-w-2xl mx-auto p-10 rounded-3xl"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Ready to crack JEE?</h2>
            <p className="text-slate-400 mb-8">Join thousands of students who got clarity on their JEE prep journey</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(79,70,229,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/assessment')}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-white font-bold text-lg"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)' }}
            >
              Start Your Assessment <ArrowRight size={20} />
            </motion.button>
            <p className="text-slate-500 text-sm mt-4">Free • Takes 2 minutes • No signup required</p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
