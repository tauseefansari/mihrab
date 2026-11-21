'use client';

import { useState, type InputHTMLAttributes, type ChangeEvent, type Ref } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/components/ui/icon';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
  ref?: Ref<HTMLInputElement>;
}

export function Checkbox({
  className,
  checked,
  defaultChecked,
  onChange,
  onCheckedChange,
  disabled,
  ref,
  ...props
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
    onCheckedChange?.(e.target.checked);
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
          'flex size-5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors duration-150',
          isChecked
            ? 'border-primary bg-primary text-on-primary'
            : 'border-outline peer-hover:border-primary-container peer-focus:border-primary bg-transparent'
        )}
      >
        <AnimatePresence initial={false}>
          {isChecked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Icon name="Check" size={14} strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
