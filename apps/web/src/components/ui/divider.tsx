import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ className, orientation = 'horizontal', ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        'bg-outline-variant/30 shrink-0 border-none',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  );
}
