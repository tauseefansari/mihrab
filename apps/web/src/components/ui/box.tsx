import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Box({ as: Component = 'div', className, ...props }: BoxProps) {
  return <Component className={cn(className)} {...props} />;
}
