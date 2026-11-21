import type { HTMLAttributes, ElementType } from 'react';
import { cn } from '@/shared/utils/cn';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
}

export function GlassCard({ as: Component = 'div', className, ...props }: GlassCardProps) {
  return (
    <Component
      className={cn(
        'glass-panel p-md hover:border-outline/40 hover:shadow-surface-card rounded-lg transition-all duration-300 ease-out',
        className
      )}
      {...props}
    />
  );
}
