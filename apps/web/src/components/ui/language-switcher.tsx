'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { setCookieAction } from '@/app/actions/cookie.action';
import {
  LANGUAGE_OPTIONS,
  DEFAULT_LANGUAGE_OPTION,
  type LanguageOption,
} from '@/shared/constants/language.constants';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/shared/utils/cn';

interface LanguageOptionItemProps {
  opt: LanguageOption;
  isSelected: boolean;
  label: string;
  onSelect: (opt: LanguageOption) => void;
}

function LanguageOptionItem({ opt, isSelected, label, onSelect }: LanguageOptionItemProps) {
  return (
    <button
      role="option"
      aria-selected={isSelected}
      type="button"
      onClick={() => onSelect(opt)}
      className={cn(
        'gap-xs focus-visible:ring-primary flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none',
        isSelected
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-on-surface hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container-highest dark:hover:text-primary'
      )}
    >
      <div className="gap-xs flex items-center">
        <span
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs leading-none font-bold',
            isSelected
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-primary border-outline-variant/30 border'
          )}
        >
          {opt.scriptSymbol}
        </span>
        <span className="font-medium">{label}</span>
        <span className="text-on-surface-variant text-xs opacity-75">({opt.nativeLabel})</span>
      </div>
      {isSelected && <Icon name="Check" size={14} className="text-primary" />}
    </button>
  );
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('UI');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === locale) ?? DEFAULT_LANGUAGE_OPTION;

  const handleLanguageChange = async (option: LanguageOption) => {
    setIsOpen(false);
    if (option.code === locale) return;
    await setCookieAction('NEXT_LOCALE', option.code);
    router.refresh();
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn('relative inline-block text-start', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${currentOption.nativeLabel}, ${t('selectLanguage')}`}
        className="bg-surface-container dark:bg-surface-container-low border-outline-variant/30 text-on-surface hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container-highest dark:hover:border-primary/40 focus-visible:ring-primary focus-visible:ring-offset-surface flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Icon name="Languages" size={16} className="text-primary shrink-0" />
        <span className="truncate">{currentOption.nativeLabel}</span>
        <Icon
          name="ChevronDown"
          size={14}
          className={cn(
            'text-on-surface-variant transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-label={t('selectLanguage')}
            className="glass-panel border-outline-variant/30 bg-surface-container-lowest absolute start-0 bottom-full z-50 mb-1 min-w-44 rounded-xl border p-1 shadow-xl backdrop-blur-xl"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <LanguageOptionItem
                key={opt.code}
                opt={opt}
                isSelected={opt.code === locale}
                label={t(opt.labelKey)}
                onSelect={handleLanguageChange}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
