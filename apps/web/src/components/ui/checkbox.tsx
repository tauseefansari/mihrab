'use client';

import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/components/ui/icon';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onChange, onCheckedChange, disabled, ...props }, ref) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        <div
          className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors',
            isChecked
              ? 'border-primary bg-primary text-on-primary'
              : 'border-outline peer-hover:border-primary-container peer-focus:border-primary bg-transparent'
          )}
        >
          {isChecked && <Icon name="Check" size={14} strokeWidth={3} />}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
