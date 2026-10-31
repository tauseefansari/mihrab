'use client';

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

export interface AnimatedViewSwitcherProps {
  activeKey: string;
  children: ReactNode;
  className?: string;
}

const SWITCHER_VARIANTS = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -10 },
};

const SWITCHER_TRANSITION = {
  duration: 0.32,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function AnimatedViewSwitcher({
  activeKey,
  children,
  className,
}: AnimatedViewSwitcherProps) {
  return (
    <div className={cn('relative flex w-full flex-col items-center justify-center', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          variants={SWITCHER_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={SWITCHER_TRANSITION}
          className="flex w-full flex-col items-center justify-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
