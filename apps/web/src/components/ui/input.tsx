import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
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
);
Input.displayName = 'Input';
