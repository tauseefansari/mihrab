'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, defaultChecked, onChange, onCheckedChange, disabled, ...props }, ref) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <div
        className={cn(
          'relative inline-flex items-center',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        <div
          className={cn(
            'flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
            isChecked
              ? 'bg-primary'
              : 'bg-outline-variant peer-focus:ring-primary peer-focus:ring-2 peer-focus:ring-offset-2'
          )}
        >
          <motion.div
            layout
            initial={false}
            animate={{
              x: isChecked ? 20 : 2,
            }}
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            className={cn(
              'pointer-events-none block size-4 rounded-full shadow-sm ring-0 transition-transform',
              isChecked ? 'bg-on-primary' : 'bg-surface'
            )}
          />
        </div>
      </div>
    );
  }
);
Switch.displayName = 'Switch';
