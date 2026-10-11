'use client';

import { useState, type InputHTMLAttributes, type ChangeEvent, type Ref } from 'react';
import { cn } from '@/shared/utils/cn';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onValueChange?: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
}

export function Radio({
  className,
  checked,
  defaultChecked,
  onChange,
  onValueChange,
  disabled,
  ref,
  ...props
}: RadioProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
    if (e.target.checked && props.value) {
      onValueChange?.(props.value.toString());
    }
  };

  return (
    <div
      className={cn(
        'relative inline-flex cursor-pointer items-center',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        type="radio"
        ref={ref}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <div
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          isChecked
            ? 'border-primary'
            : 'border-outline peer-hover:border-primary-container peer-focus:border-primary'
        )}
      >
        {isChecked && <div className="bg-primary size-2.5 rounded-full" />}
      </div>
    </div>
  );
}
