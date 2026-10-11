import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export function Input({ className, error, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn(
        'border-outline/50 placeholder:text-outline focus:border-primary flex h-10 w-full border-b bg-transparent px-3 py-2 text-sm focus:border-b-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-error text-error placeholder:text-error/50 focus:border-error',
        className
      )}
      {...props}
    />
  );
}
