import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MobileSidebarDrawer } from '@/components/layout/mobile-sidebar-drawer';
import { useMobileDrawer } from '@/components/layout/use-mobile-drawer';

let mockPathname = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

vi.mock('@/components/ui/theme-switcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

vi.mock('@/components/ui/language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('MobileSidebarDrawer', () => {
  beforeEach(() => {
    mockPathname = '/';
    act(() => {
      useMobileDrawer.getState().close();
    });
  });

  it('renders hidden when drawer is closed', () => {
    const { container } = render(<MobileSidebarDrawer />);
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
    expect(dialog).toHaveClass('invisible');
  });

  it('renders drawer with brand, close button, and all navigation links when open', () => {
    act(() => {
      useMobileDrawer.getState().open();
    });

    render(<MobileSidebarDrawer />);

    expect(screen.getByRole('dialog', { name: 'navigationMenu' })).toBeInTheDocument();
    expect(screen.getByText('brandName')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /quran/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /prayers/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /library/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tasbeeh/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /qiblah/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /zakat/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
  });

  it('closes drawer when close button is clicked', () => {
    act(() => {
      useMobileDrawer.getState().open();
    });

    render(<MobileSidebarDrawer />);

    const closeBtn = screen.getByRole('button', { name: 'close' });
    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(useMobileDrawer.getState().isOpen).toBe(false);
  });

  it('closes drawer when Escape key is pressed', () => {
    act(() => {
      useMobileDrawer.getState().open();
    });

    render(<MobileSidebarDrawer />);

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    expect(useMobileDrawer.getState().isOpen).toBe(false);
  });

  it('closes drawer when navigation link is clicked', () => {
    act(() => {
      useMobileDrawer.getState().open();
    });

    render(<MobileSidebarDrawer />);

    const qiblahLink = screen.getByRole('link', { name: /qiblah/i });
    act(() => {
      fireEvent.click(qiblahLink);
    });

    expect(useMobileDrawer.getState().isOpen).toBe(false);
  });

  it('highlights active navigation item based on pathname', () => {
    mockPathname = '/qiblah';
    act(() => {
      useMobileDrawer.getState().open();
    });

    render(<MobileSidebarDrawer />);

    const qiblahLink = screen.getByRole('link', { name: /qiblah/i });
    expect(qiblahLink).toHaveAttribute('aria-current', 'page');
  });
});
