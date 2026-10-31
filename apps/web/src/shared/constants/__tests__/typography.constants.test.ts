import { describe, it, expect } from 'vitest';
import { TYPOGRAPHY_VARIANTS } from '@/shared/constants/typography.constants';

describe('typography.constants', () => {
  it('contains all required typography scale variants', () => {
    expect(TYPOGRAPHY_VARIANTS).toContain('display-lg');
    expect(TYPOGRAPHY_VARIANTS).toContain('headline-lg');
    expect(TYPOGRAPHY_VARIANTS).toContain('headline-lg-mobile');
    expect(TYPOGRAPHY_VARIANTS).toContain('body-md');
    expect(TYPOGRAPHY_VARIANTS).toContain('arabic-display');
    expect(TYPOGRAPHY_VARIANTS).toContain('arabic-body');
    expect(TYPOGRAPHY_VARIANTS).toContain('label-sm');
  });

  it('is an array of non-empty string constants', () => {
    expect(Array.isArray(TYPOGRAPHY_VARIANTS)).toBe(true);
    expect(TYPOGRAPHY_VARIANTS.length).toBe(7);
    TYPOGRAPHY_VARIANTS.forEach((variant) => {
      expect(typeof variant).toBe('string');
      expect(variant.length).toBeGreaterThan(0);
    });
  });
});
