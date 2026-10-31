import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '@/app/loading';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      loading: 'Loading...',
    };
    return messages[key] ?? key;
  },
}));

describe('Loading component', () => {
  it('renders skeleton shapes and status role for accessibility', () => {
    render(<Loading />);

    const statusElement = screen.getByRole('status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
