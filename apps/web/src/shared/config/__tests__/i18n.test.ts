import { describe, it, expect } from 'vitest';
import { locales, defaultLocale } from '../i18n';

describe('i18n config', () => {
  it('defines supported locales and default locale', () => {
    expect(locales).toContain('en');
    expect(locales).toContain('ar');
    expect(locales).toContain('hi');
    expect(locales).toContain('ur');
    expect(defaultLocale).toBe('en');
  });
});
