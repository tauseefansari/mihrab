import { describe, it, expect } from 'vitest';
import { LANGUAGE_OPTIONS } from '@/shared/constants/language.constants';

describe('LANGUAGE_OPTIONS', () => {
  it('contains exactly 4 supported language options', () => {
    expect(LANGUAGE_OPTIONS).toHaveLength(4);
  });

  it('defines unique language codes matching i18n locales', () => {
    const codes = LANGUAGE_OPTIONS.map((lang) => lang.code);
    expect(codes).toEqual(['en', 'ar', 'ur', 'hi']);
  });

  it('assigns valid icons, script symbols, and native labels to all languages', () => {
    for (const option of LANGUAGE_OPTIONS) {
      expect(option.icon).toBe('Languages');
      expect(option.scriptSymbol).toBeDefined();
      expect(option.nativeLabel).toBeDefined();
      expect(option.labelKey).toContain('languages.');
    }
  });

  it('is frozen and immutable', () => {
    expect(Object.isFrozen(LANGUAGE_OPTIONS)).toBe(true);
  });
});
