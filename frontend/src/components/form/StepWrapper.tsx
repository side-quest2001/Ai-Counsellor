import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StepWrapperProps {
  children: ReactNode;
  direction: number;
  stepKey: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '60px' : '-60px',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-60px' : '60px',
    opacity: 0,
  }),
};

export default function StepWrapper({ children, direction, stepKey }: StepWrapperProps) {
  return (
    <motion.div
      key={stepKey}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
