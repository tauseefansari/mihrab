import type { HTMLAttributes, ElementType } from 'react';
import { cn } from '@/shared/utils/cn';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
}

export function Box({ as: Component = 'div', className, ...props }: BoxProps) {
  return <Component className={cn(className)} {...props} />;
}
