import type { IconName } from '@/components/ui/icon';

export type LanguageCode = 'en' | 'ar' | 'hi' | 'ur';
export type LanguageLabelKey = `languages.${LanguageCode}`;

export interface LanguageOption {
  readonly code: LanguageCode;
  readonly labelKey: LanguageLabelKey;
  readonly nativeLabel: string;
  readonly scriptSymbol: string;
  readonly icon: IconName;
}

export const DEFAULT_LANGUAGE_OPTION: LanguageOption = Object.freeze({
  code: 'en',
  labelKey: 'languages.en',
  nativeLabel: 'English',
  scriptSymbol: 'EN',
  icon: 'Languages',
});

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = Object.freeze([
  DEFAULT_LANGUAGE_OPTION,
  {
    code: 'ar',
    labelKey: 'languages.ar',
    nativeLabel: 'العربية',
    scriptSymbol: 'ع',
    icon: 'Languages',
  },
  {
    code: 'ur',
    labelKey: 'languages.ur',
    nativeLabel: 'اردو',
    scriptSymbol: 'ارد',
    icon: 'Languages',
  },
  {
    code: 'hi',
    labelKey: 'languages.hi',
    nativeLabel: 'हिन्दी',
    scriptSymbol: 'हि',
    icon: 'Languages',
  },
] as const);
