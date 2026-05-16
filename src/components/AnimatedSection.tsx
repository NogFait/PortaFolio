import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

const getVariants = (direction: string) => {
  switch (direction) {
    case 'up':
      return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
    case 'down':
      return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
    case 'left':
      return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
    case 'right':
      return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
    case 'scale':
      return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
    case 'fade':
    default:
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  }
};

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.section>
  );
}
