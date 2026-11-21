import { describe, it, expect } from 'vitest';
import { isClient } from '@/shared/utils/is-client';

describe('isClient', () => {
  it('returns true when window is defined in browser/jsdom environment', () => {
    expect(isClient()).toBe(true);
  });

  it('returns false when window is undefined in SSR environment', () => {
    const originalWindow = global.window;
    // @ts-expect-error test undefined window in SSR
    delete global.window;

    expect(isClient()).toBe(false);

    global.window = originalWindow;
  });
});
