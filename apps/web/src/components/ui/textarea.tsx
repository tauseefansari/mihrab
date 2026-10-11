import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'border-outline/50 placeholder:text-outline focus:border-primary flex min-h-20 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error text-error placeholder:text-error/50 focus:border-error',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
