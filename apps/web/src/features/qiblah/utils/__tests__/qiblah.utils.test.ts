import { describe, it, expect } from 'vitest';
import { formatCoordinates } from '@/features/qiblah/utils/qiblah.utils';

describe('qiblah.utils', () => {
  it('formats positive latitude and longitude as North and East', () => {
    expect(formatCoordinates(19.076, 72.8777)).toBe('19.08° N, 72.88° E');
  });

  it('formats negative latitude and longitude as South and West', () => {
    expect(formatCoordinates(-33.8688, -151.2093)).toBe('33.87° S, 151.21° W');
  });

  it('handles equator and prime meridian zero coordinates', () => {
    expect(formatCoordinates(0, 0)).toBe('0.00° N, 0.00° E');
  });
});
