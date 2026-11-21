import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

vi.mock('@/components/ui/link', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('HomePage', () => {
  it('renders greeting header and welcome card with qiblah navigation', async () => {
    const Component = await HomePage();
    render(Component);

    expect(screen.getByText('trans_greeting')).toBeInTheDocument();
    expect(screen.getByText('trans_date')).toBeInTheDocument();
    expect(screen.getByText('trans_title')).toBeInTheDocument();
    expect(screen.getByText('trans_description')).toBeInTheDocument();

    const qiblahLink = screen.getByRole('link', { name: /trans_qiblah/i });
    expect(qiblahLink).toBeInTheDocument();
    expect(qiblahLink).toHaveAttribute('href', '/qiblah');
  });
});
