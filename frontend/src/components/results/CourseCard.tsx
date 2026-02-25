import { motion } from 'framer-motion';
import { Star, ExternalLink, Clock } from 'lucide-react';
import type { CourseRecommendation } from '../../types';

interface Props {
  course: CourseRecommendation;
  index: number;
}

const platformColors: Record<string, string> = {
  'Physics Wallah': 'from-orange-500 to-yellow-500',
  'YouTube / Physics Wallah': 'from-red-500 to-orange-500',
  'Unacademy': 'from-cyan-500 to-blue-500',
  'ALLEN Career Institute': 'from-green-500 to-emerald-500',
  'Vedantu': 'from-purple-500 to-pink-500',
  'Motion Education': 'from-blue-500 to-indigo-500',
};

export default function CourseCard({ course, index }: Props) {
  const gradientClass = platformColors[course.platform] ?? 'from-indigo-500 to-purple-500';
  const isFree = course.price.toLowerCase() === 'free';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass p-6 rounded-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${gradientClass} text-white mb-2`}>
            {course.platform}
          </div>
          <h3 className="text-white font-bold text-lg leading-tight">{course.name}</h3>
        </div>
        {isFree ? (
          <span className="ml-3 px-3 py-1 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold flex-shrink-0">
            FREE
          </span>
        ) : (
          <span className="ml-3 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold flex-shrink-0">
            {course.price}
          </span>
        )}
      </div>

      {/* Stars + Duration */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(n => (
            <Star
              key={n}
              size={14}
              className={n <= Math.round(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
            />
          ))}
          <span className="text-slate-400 text-xs ml-1">{course.rating}/5</span>
        </div>
        {course.duration_weeks > 0 && (
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <Clock size={12} />
            {course.duration_weeks}w
          </div>
        )}
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {course.topics_covered.slice(0, 4).map(t => (
          <span key={t} className="px-2 py-0.5 rounded-lg bg-white/5 text-slate-400 text-xs border border-white/10">
            {t}
          </span>
        ))}
        {course.topics_covered.length > 4 && (
          <span className="px-2 py-0.5 rounded-lg bg-white/5 text-slate-500 text-xs border border-white/10">
            +{course.topics_covered.length - 4} more
          </span>
        )}
      </div>

      {/* Why recommended */}
      <p className="text-slate-400 text-sm italic leading-relaxed flex-1 mb-5">
        "{course.why_recommended}"
      </p>

      {/* CTA */}
      <motion.a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-white text-sm"
        style={{ background: `linear-gradient(135deg, #4F46E5, #06B6D4)` }}
      >
        Explore Course <ExternalLink size={14} />
      </motion.a>
    </motion.div>
  );
}
