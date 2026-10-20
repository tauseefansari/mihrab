import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DesktopSidebar } from '@/components/layout/desktop-sidebar';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('DesktopSidebar', () => {
  it('renders brand name and all desktop navigation items', () => {
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

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');

    const qiblahLink = screen.getByRole('link', { name: /qiblah/i });
    expect(qiblahLink).toHaveAttribute('href', '/qiblah');

    const settingsLink = screen.getByRole('link', { name: /settings/i });
    expect(settingsLink).toHaveAttribute('href', '/settings');
  });
});
