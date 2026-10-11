import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'error';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-surface-dim text-on-surface',
    primary: 'bg-primary-container text-on-primary-container',
    secondary: 'bg-secondary-container text-on-secondary-container',
    error: 'bg-error-container text-on-error-container',
  };

  return (
    <div
      className={cn(
        'focus:ring-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
