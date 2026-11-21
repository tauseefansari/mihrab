'use client';

import type { ButtonHTMLAttributes, Ref } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ref,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-primary text-on-primary hover:bg-primary-container dark:hover:bg-primary/90 hover:shadow-md',
    secondary:
      'bg-secondary text-on-secondary hover:bg-secondary/85 dark:hover:bg-secondary/90 hover:shadow-sm',
    ghost:
      'bg-transparent text-primary hover:bg-primary/10 dark:hover:bg-primary/15 border border-outline-variant/30 hover:border-primary/40 dark:hover:border-primary/50',
  };

  const sizes = {
    sm: 'px-sm py-xs text-label-sm rounded-sm',
    md: 'px-md py-sm text-body-md rounded-md',
    lg: 'px-lg py-md text-headline-lg-mobile rounded-lg',
    icon: 'p-xs rounded-full aspect-square',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'focus-visible:ring-primary focus-visible:ring-offset-surface inline-flex cursor-pointer items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as unknown as HTMLMotionProps<'button'>)}
    />
  );
}
