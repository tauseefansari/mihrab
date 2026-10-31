import { describe, it, expect } from 'vitest';
import {
  SANCTUARY_OPTIONS,
  SANCTUARY_TARGETS,
  DEFAULT_USER_LOCATION,
} from '@/features/qiblah/constants/qiblah.constants';

describe('qiblah.constants', () => {
  it('defines sanctuary options for Makkah and Madinah only', () => {
    expect(SANCTUARY_OPTIONS).toHaveLength(2);
    expect(SANCTUARY_OPTIONS.map((opt) => opt.id)).toEqual(['makkah', 'madinah']);
    expect(SANCTUARY_OPTIONS[0]?.labelKey).toBe('sanctuaries.makkah');
    expect(SANCTUARY_OPTIONS[1]?.labelKey).toBe('sanctuaries.madinah');
  });

  it('defines valid target coordinates for sanctuaries', () => {
    expect(SANCTUARY_TARGETS.makkah.latitude).toBeCloseTo(21.4225, 4);
    expect(SANCTUARY_TARGETS.makkah.longitude).toBeCloseTo(39.8262, 4);
    expect(SANCTUARY_TARGETS.madinah.latitude).toBeCloseTo(24.4686, 4);
    expect(SANCTUARY_TARGETS.madinah.longitude).toBeCloseTo(39.6142, 4);
  });

  it('defines fallback default user location', () => {
    expect(DEFAULT_USER_LOCATION.cityKey).toBe('defaultCity');
    expect(DEFAULT_USER_LOCATION.latitude).toBeCloseTo(19.076, 3);
    expect(DEFAULT_USER_LOCATION.longitude).toBeCloseTo(72.8777, 4);
  });
});
