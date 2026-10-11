import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function GlassCard({ as: Component = 'div', className, ...props }: GlassCardProps) {
  return (
    <Component
      className={cn(
        'glass-panel p-md hover:border-outline/30 rounded-lg transition-colors',
        className
      )}
      {...props}
    />
  );
}
