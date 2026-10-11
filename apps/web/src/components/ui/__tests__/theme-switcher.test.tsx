import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import {
  TOGGLE_THEME_LABEL,
  THEME_DARK,
  THEME_LIGHT,
  createViewTransitionMock,
} from '@/__fixtures__/theme.fixture';

const mockSetTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: THEME_LIGHT,
    setTheme: mockSetTheme,
  }),
}));

vi.mock('@/app/actions/cookie.action', () => ({
  setCookieAction: vi.fn(async () => Promise.resolve()),
}));

describe('ThemeSwitcher component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it('renders theme switcher toggle button', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: TOGGLE_THEME_LABEL });
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: TOGGLE_THEME_LABEL });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith(THEME_DARK);
  });

  it('triggers view transition when startViewTransition is supported', async () => {
    const { readyPromise, mockAnimate, mockTransition } = createViewTransitionMock();
    document.documentElement.animate = mockAnimate;
    // @ts-expect-error view transition polyfill mock
    document.startViewTransition = vi.fn((cb: () => void) => {
      cb();
      return mockTransition;
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: TOGGLE_THEME_LABEL });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith(THEME_DARK);
    await readyPromise;
    expect(mockAnimate).toHaveBeenCalled();

    // @ts-expect-error clean up mock
    delete document.startViewTransition;
  });
});
