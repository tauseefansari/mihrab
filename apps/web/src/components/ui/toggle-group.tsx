import type { KeyboardEvent, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ToggleGroupOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode | undefined;
  ariaLabel?: string | undefined;
}

export interface ToggleGroupProps<T extends string = string> {
  options: readonly ToggleGroupOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel: string;
  className?: string | undefined;
}

interface ToggleGroupItemProps<T extends string> {
  option: ToggleGroupOption<T>;
  isSelected: boolean;
  onSelect: (value: T) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

function ToggleGroupItem<T extends string>({
  option,
  isSelected,
  onSelect,
  onKeyDown,
}: ToggleGroupItemProps<T>) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={option.ariaLabel ?? option.label}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onSelect(option.value)}
      onKeyDown={onKeyDown}
      className={cn(
        'gap-xs text-body-md focus-visible:ring-primary focus-visible:ring-offset-surface inline-flex h-12 flex-1 items-center justify-center rounded-xl font-semibold transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95',
        isSelected
          ? 'bg-primary text-on-primary hover:bg-primary-container dark:hover:bg-primary/90 ring-primary/40 shadow-sm ring-1'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 dark:hover:bg-surface-container-highest/60'
      )}
    >
      {option.icon && (
        <span
          className={cn(
            'inline-flex shrink-0 items-center transition-transform duration-200',
            isSelected && 'scale-110'
          )}
          aria-hidden="true"
        >
          {option.icon}
        </span>
      )}
      <span className="truncate">{option.label}</span>
    </button>
  );
}

export function ToggleGroup<T extends string = string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  className,
}: ToggleGroupProps<T>) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % options.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    }

    if (nextIndex >= 0) {
      e.preventDefault();
      const nextOption = options[nextIndex];
      if (nextOption) {
        onValueChange(nextOption.value);
        const buttons =
          e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
            'button[role="radio"]'
          );
        buttons?.[nextIndex]?.focus();
      }
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'bg-surface-container/70 border-outline-variant/30 flex w-full items-center gap-1 rounded-2xl border p-1 backdrop-blur-md',
        className
      )}
    >
      {options.map((option, idx) => (
        <ToggleGroupItem
          key={option.value}
          option={option}
          isSelected={value === option.value}
          onSelect={onValueChange}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
}
