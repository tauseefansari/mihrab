import { vi } from 'vitest';
import enCommon from '@/shared/i18n/locales/en/common.json';

export const TOGGLE_THEME_LABEL = enCommon.UI.toggleTheme;
export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';

export function createViewTransitionMock() {
  const readyPromise = Promise.resolve();
  const mockAnimate = vi.fn();
  const mockTransition = {
    ready: readyPromise,
  };

  return {
    readyPromise,
    mockAnimate,
    mockTransition,
  };
}
