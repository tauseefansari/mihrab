import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';

let mockPathname = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const ARIA_CURRENT = 'aria-current';

describe('MobileBottomNav', () => {
  it('renders mobile navigation links with home active by default', () => {
    mockPathname = '/';
    render(<MobileBottomNav />);

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('quran')).toBeInTheDocument();
    expect(screen.getByText('prayers')).toBeInTheDocument();
    expect(screen.getByText('qiblah')).toBeInTheDocument();
    expect(screen.getByText('library')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveAttribute(ARIA_CURRENT, 'page');

    const qiblahLink = screen.getByRole('link', { name: /qiblah/i });
    expect(qiblahLink).toHaveAttribute('href', '/qiblah');
    expect(qiblahLink).not.toHaveAttribute(ARIA_CURRENT);
  });

  it('renders active state for qiblah route', () => {
    mockPathname = '/qiblah';
    render(<MobileBottomNav />);

    const qiblahLink = screen.getByRole('link', { name: /qiblah/i });
    expect(qiblahLink).toHaveAttribute(ARIA_CURRENT, 'page');

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).not.toHaveAttribute(ARIA_CURRENT);
  });
});
