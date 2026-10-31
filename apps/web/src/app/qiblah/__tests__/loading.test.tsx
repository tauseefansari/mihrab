import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QiblahLoading from '@/app/qiblah/loading';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      loading: 'Loading...',
    };
    return messages[key] ?? key;
  },
}));

describe('QiblahLoading component', () => {
  it('renders compass dial skeleton, sanctuary skeleton, and status role', () => {
    render(<QiblahLoading />);

    const statusElement = screen.getByRole('status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
