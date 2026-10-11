import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-outline-variant/20 animate-pulse rounded-md', className)} {...props} />
  );
}
