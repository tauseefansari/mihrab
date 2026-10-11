import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from '../theme-switcher';

const mockSetTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
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
    const button = screen.getByRole('button', { name: 'Toggle Theme' });
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: 'Toggle Theme' });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('triggers view transition when startViewTransition is supported', async () => {
    const mockAnimate = vi.fn();
    document.documentElement.animate = mockAnimate;
    const readyPromise = Promise.resolve();
    const mockTransition = {
      ready: readyPromise,
    };
    // @ts-expect-error view transition polyfill mock
    document.startViewTransition = vi.fn((cb: () => void) => {
      cb();
      return mockTransition;
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: 'Toggle Theme' });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    await readyPromise;
    expect(mockAnimate).toHaveBeenCalled();

    // @ts-expect-error clean up mock
    delete document.startViewTransition;
  });
});
