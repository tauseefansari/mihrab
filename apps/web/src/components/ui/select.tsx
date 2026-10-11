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
  type Ref,
  type RefObject,
} from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/components/ui/icon';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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
              'hover:bg-surface-container-high focus:bg-surface-container-high flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors focus:outline-none',
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
    <select ref={ref} className="hidden" {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
}

function SelectTrigger({
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
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      className={cn(
        'border-outline/50 placeholder:text-outline focus:border-primary flex h-10 w-full cursor-pointer items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-error text-error focus:border-error'
      )}
    >
      <span className={cn('truncate', !selectedOption && 'text-outline')}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <Icon
        name="ChevronDown"
        size={16}
        className={cn('opacity-50 transition-transform', isOpen && 'rotate-180')}
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
  ...props
}: SelectProps) {
  const t = useTranslations('UI');
  const resolvedPlaceholder = placeholder ?? t('selectOption');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const options = parseOptions(children);
  const selectedOption = options.find((opt) => opt.value === currentValue);

  useOutsideClick(containerRef, () => setIsOpen(false));

  const handleOptionClick = (optValue: string) => {
    if (!isControlled) setInternalValue(optValue);
    if (selectRef.current) {
      selectRef.current.value = optValue;
      selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      if (onChange) onChange({ target: { value: optValue } } as ChangeEvent<HTMLSelectElement>);
    }
    setIsOpen(false);
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
        placeholder={resolvedPlaceholder}
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
