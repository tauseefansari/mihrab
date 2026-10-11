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
    primary: 'bg-primary text-on-primary hover:bg-primary-container',
    secondary: 'bg-secondary text-on-secondary hover:bg-secondary-container',
    ghost:
      'bg-transparent text-primary hover:bg-surface-dim border border-outline/20 hover:border-outline/40',
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
        'focus-visible:ring-primary inline-flex cursor-pointer items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as unknown as HTMLMotionProps<'button'>)}
    />
  );
}
