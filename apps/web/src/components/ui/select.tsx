import {
  useState,
  useRef,
  useEffect,
  Children,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type SelectHTMLAttributes,
  type ChangeEvent,
  type KeyboardEvent,
  type Ref,
  type RefObject,
} from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/components/ui/icon';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { handleArrowNavigation } from '@/shared/utils/keyboard-nav';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  placeholder?: string | undefined;
  error?: boolean | undefined;
  ref?: Ref<HTMLSelectElement>;
}

type OptionType = { value: string; label: string };

function parseOptions(children: ReactNode): OptionType[] {
  const options: OptionType[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === 'option') {
      const element = child as ReactElement<{
        value?: string | number;
        children?: ReactNode;
      }>;
      options.push({
        value: element.props.value?.toString() ?? '',
        label: element.props.children?.toString() ?? '',
      });
    }
  });
  return options;
}

interface DropdownListProps {
  options: OptionType[];
  currentValue: string;
  onSelect: (val: string) => void;
  onClose: () => void;
}

function DropdownList({ options, currentValue, onSelect, onClose }: DropdownListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const active =
      listRef.current.querySelector<HTMLButtonElement>('button[aria-current="true"]') ??
      listRef.current.querySelector<HTMLButtonElement>('button');
    active?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'Tab') {
      onClose();
      return;
    }
    handleArrowNavigation(e, 'button');
  };

  return (
    <motion.div
      ref={listRef}
      role="listbox"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className="glass-panel border-outline/20 bg-surface-container-lowest focus-visible:ring-primary focus-visible:ring-offset-surface absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border p-1.5 shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="space-y-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-current={opt.value === currentValue ? 'true' : undefined}
            onClick={() => onSelect(opt.value)}
            className={cn(
              'hover:bg-surface-container-high focus:bg-surface-container-high dark:hover:bg-surface-container-highest dark:focus:bg-surface-container-highest focus-visible:ring-primary focus-visible:ring-offset-surface flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              opt.value === currentValue
                ? 'text-primary font-semibold'
                : 'text-on-surface hover:text-on-surface'
            )}
          >
            <span className="flex size-4 items-center justify-center">
              {opt.value === currentValue && <Icon name="Check" size={14} />}
            </span>
            <span className="truncate">{opt.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

interface HiddenSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string | undefined;
  ref?: Ref<HTMLSelectElement>;
}

function HiddenSelect({ placeholder, children, ref, ...props }: HiddenSelectProps) {
  return (
    <select ref={ref} aria-hidden="true" tabIndex={-1} className="hidden" {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
}

interface SelectTriggerProps {
  disabled?: boolean | undefined;
  isOpen: boolean;
  onToggle: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  error?: boolean | undefined;
  selectedOption: OptionType | undefined;
  placeholder: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  ariaLabel?: string | undefined;
}

function SelectTrigger({
  disabled,
  isOpen,
  onToggle,
  onKeyDown,
  error,
  selectedOption,
  placeholder,
  triggerRef,
  ariaLabel,
}: SelectTriggerProps) {
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-label={ariaLabel ?? (selectedOption ? selectedOption.label : placeholder)}
      disabled={disabled}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      className={cn(
        'border-outline/50 placeholder:text-outline focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-offset-surface flex h-10 w-full cursor-pointer items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-error text-error focus-visible:border-error focus-visible:ring-error'
      )}
    >
      <span className={cn('truncate', !selectedOption && 'text-outline')}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <Icon
        name="ChevronDown"
        size={16}
        className={cn('opacity-50 transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
}

function useOutsideClick(ref: RefObject<HTMLDivElement | null>, onOutside: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutside]);
}

interface SelectDropdownProps {
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
  disabled?: boolean | undefined;
  error?: boolean | undefined;
  selectedOption: OptionType | undefined;
  placeholder: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  ariaLabel?: string | undefined;
  options: OptionType[];
  currentValue: string;
  onSelect: (val: string) => void;
}

function SelectDropdown({
  isOpen,
  setIsOpen,
  disabled,
  error,
  selectedOption,
  placeholder,
  triggerRef,
  ariaLabel,
  options,
  currentValue,
  onSelect,
}: SelectDropdownProps) {
  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <>
      <SelectTrigger
        triggerRef={triggerRef}
        disabled={disabled}
        isOpen={isOpen}
        onToggle={handleToggle}
        onKeyDown={handleKeyDown}
        error={error}
        selectedOption={selectedOption}
        placeholder={placeholder}
        ariaLabel={ariaLabel}
      />
      <AnimatePresence>
        {isOpen && (
          <DropdownList
            options={options}
            currentValue={currentValue}
            onSelect={onSelect}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function Select({
  className,
  children,
  placeholder,
  error,
  value,
  defaultValue,
  onChange,
  disabled,
  ref,
  'aria-label': ariaLabel,
  ...props
}: SelectProps) {
  const t = useTranslations('UI');
  const resolvedPlaceholder = placeholder ?? t('selectOption');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');

  const isControlled = value !== undefined;
  const currentValue = (isControlled ? value : internalValue) as string;
  const options = parseOptions(children);
  const selectedOption = options.find((opt) => opt.value === currentValue);

  useOutsideClick(containerRef, () => setIsOpen(false));

  const handleOptionSelect = (optValue: string) => {
    if (!isControlled) setInternalValue(optValue);
    if (selectRef.current) {
      selectRef.current.value = optValue;
      selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      if (onChange) onChange({ target: { value: optValue } } as ChangeEvent<HTMLSelectElement>);
    }
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleSelectRef = (node: HTMLSelectElement) => {
    selectRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: HTMLSelectElement | null }).current = node;
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', disabled && 'cursor-not-allowed opacity-50', className)}
    >
      <HiddenSelect
        ref={handleSelectRef}
        placeholder={resolvedPlaceholder}
        value={currentValue}
        onChange={onChange ?? (() => {})}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </HiddenSelect>
      <SelectDropdown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        disabled={disabled}
        error={error}
        selectedOption={selectedOption}
        placeholder={resolvedPlaceholder}
        triggerRef={triggerRef}
        ariaLabel={ariaLabel}
        options={options}
        currentValue={currentValue}
        onSelect={handleOptionSelect}
      />
    </div>
  );
}
