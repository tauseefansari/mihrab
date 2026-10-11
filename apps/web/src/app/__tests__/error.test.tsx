import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/app/error';

const { mockUseTranslations } = vi.hoisted(() => ({
  mockUseTranslations: () => (key: string) => `trans_${key}`,
}));

vi.mock('next-intl', () => ({
  useTranslations: mockUseTranslations,
}));

describe('ErrorBoundary', () => {
  it('renders error message and allows reset action', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reset = vi.fn();
    const testError = new Error('Test failure');

    render(<ErrorBoundary error={testError} reset={reset} />);

    expect(screen.getByText('trans_title')).toBeInTheDocument();
    expect(screen.getByText('trans_description')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'trans_tryAgain' });
    fireEvent.click(button);
    expect(reset).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(testError);

    consoleErrorSpy.mockRestore();
  });
});
