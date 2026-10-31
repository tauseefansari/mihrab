import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DesktopSidebar } from '@/components/layout/desktop-sidebar';

let mockPathname = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components/ui/theme-switcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

vi.mock('@/components/ui/language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

const ARIA_CURRENT = 'aria-current';

describe('DesktopSidebar', () => {
  it('renders brand name, navigation items, and sidebar footer switchers with home active', () => {
    mockPathname = '/';
    render(<DesktopSidebar />);

    expect(screen.getByText('brandName')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('quran')).toBeInTheDocument();
    expect(screen.getByText('prayers')).toBeInTheDocument();
    expect(screen.getByText('library')).toBeInTheDocument();
    expect(screen.getByText('tasbeeh')).toBeInTheDocument();
    expect(screen.getByText('qiblah')).toBeInTheDocument();
    expect(screen.getByText('zakat')).toBeInTheDocument();
    expect(screen.getByText('settings')).toBeInTheDocument();

    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveAttribute(ARIA_CURRENT, 'page');

    const qiblahLink = screen.getByRole('link', { name: /qiblah/i });
    expect(qiblahLink).toHaveAttribute('href', '/qiblah');
    expect(qiblahLink).not.toHaveAttribute(ARIA_CURRENT);
  });

  it('renders active state for qiblah route', () => {
    mockPathname = '/qiblah';
    render(<DesktopSidebar />);

    const qiblahLink = screen.getByRole('link', { name: /qiblah/i });
    expect(qiblahLink).toHaveAttribute(ARIA_CURRENT, 'page');

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).not.toHaveAttribute(ARIA_CURRENT);
  });
});
