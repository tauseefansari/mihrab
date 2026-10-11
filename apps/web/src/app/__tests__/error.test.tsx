import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../error';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `trans_${key}`,
}));

describe('ErrorBoundary', () => {
  it('renders error message and allows reset action', () => {
    const reset = vi.fn();
    const testError = new Error('Test failure');

    render(<ErrorBoundary error={testError} reset={reset} />);

    expect(screen.getByText('trans_title')).toBeInTheDocument();
    expect(screen.getByText('trans_description')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'trans_tryAgain' });
    fireEvent.click(button);
    expect(reset).toHaveBeenCalled();
  });
});
