import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  animate?: boolean;
}

export default function GlassCard({ children, className, hover = false, delay = 0, animate = true }: GlassCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.02, boxShadow: '0 0 40px rgba(79,70,229,0.3)' } : undefined}
      className={clsx(
        'glass p-6 rounded-2xl',
        hover && 'cursor-pointer transition-shadow',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
