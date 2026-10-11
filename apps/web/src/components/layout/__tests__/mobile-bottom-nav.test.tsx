import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('MobileBottomNav', () => {
  it('renders mobile navigation links including active and inactive states', () => {
    render(<MobileBottomNav />);

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('quran')).toBeInTheDocument();
    expect(screen.getByText('prayers')).toBeInTheDocument();
    expect(screen.getByText('library')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
