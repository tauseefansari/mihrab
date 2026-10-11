'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/components/ui/icon';
import { AnimatePresence, motion } from 'framer-motion';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  placeholder?: string | undefined;
  error?: boolean | undefined;
}

type OptionType = { value: string; label: string };

function parseOptions(children: React.ReactNode): OptionType[] {
  const options: OptionType[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === 'option') {
      const element = child as React.ReactElement<{
        value?: string | number;
        children?: React.ReactNode;
      }>;
      options.push({
        value: element.props.value?.toString() ?? '',
        label: element.props.children?.toString() ?? '',
      });
    }
  });
  return options;
}

function DropdownList({
  options,
  currentValue,
  onSelect,
}: {
  options: OptionType[];
  currentValue: string;
  onSelect: (val: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className="glass-panel border-outline/20 bg-surface-container-lowest absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-md"
    >
      <div className="p-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              'hover:bg-surface-dim hover:text-on-surface focus:bg-surface-dim relative flex w-full cursor-default items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none select-none',
              opt.value === currentValue && 'bg-primary/10 text-primary hover:bg-primary/20'
            )}
          >
            <span className="absolute start-2 flex size-3.5 items-center justify-center">
              {opt.value === currentValue && <Icon name="Check" size={14} />}
            </span>
            <span className="truncate">{opt.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

const HiddenSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { placeholder?: string | undefined }
>(({ placeholder, children, ...props }, ref) => (
  <select ref={ref} className="hidden" {...props}>
    {placeholder && (
      <option value="" disabled>
        {placeholder}
      </option>
    )}
    {children}
  </select>
));
HiddenSelect.displayName = 'HiddenSelect';

const SelectTrigger = ({
  disabled,
  isOpen,
  setIsOpen,
  error,
  selectedOption,
  placeholder,
}: {
  disabled?: boolean | undefined;
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
  error?: boolean | undefined;
  selectedOption: OptionType | undefined;
  placeholder?: string | undefined;
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={() => !disabled && setIsOpen(!isOpen)}
    className={cn(
      'border-outline/50 placeholder:text-outline focus:border-primary flex h-10 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-error text-error focus:border-error'
    )}
  >
    <span className={cn('truncate', !selectedOption && 'text-outline')}>
      {selectedOption ? selectedOption.label : (placeholder ?? 'Select an option')}
    </span>
    <Icon
      name="ChevronDown"
      size={16}
      className={cn('opacity-50 transition-transform', isOpen && 'rotate-180')}
    />
  </button>
);

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, children, placeholder, error, value, defaultValue, onChange, disabled, ...props },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const options = parseOptions(children);
    const selectedOption = options.find((opt) => opt.value === currentValue);

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node))
          setIsOpen(false);
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleOptionClick = (optValue: string) => {
      if (!isControlled) setInternalValue(optValue);
      if (selectRef.current) {
        selectRef.current.value = optValue;
        selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
        if (onChange)
          onChange({ target: { value: optValue } } as React.ChangeEvent<HTMLSelectElement>);
      }
      setIsOpen(false);
    };

    const handleSelectRef = (node: HTMLSelectElement) => {
      selectRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
    };

    return (
      <div
        ref={containerRef}
        className={cn('relative w-full', disabled && 'cursor-not-allowed opacity-50', className)}
      >
        <HiddenSelect
          ref={handleSelectRef}
          placeholder={placeholder}
          value={currentValue}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          {children}
        </HiddenSelect>
        <SelectTrigger
          disabled={disabled}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          error={error}
          selectedOption={selectedOption}
          placeholder={placeholder}
        />
        <AnimatePresence>
          {isOpen && (
            <DropdownList
              options={options}
              currentValue={currentValue as string}
              onSelect={handleOptionClick}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Select.displayName = 'Select';
