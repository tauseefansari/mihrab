import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/app/error';

const { mockUseTranslations } = vi.hoisted(() => ({
  mockUseTranslations: () => (key: string) => `trans_${key}`,
}));

vi.mock('next-intl', () => ({
  useTranslations: mockUseTranslations,
}));

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@/components/ui/link', () => ({
  Link: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe('ErrorBoundary', () => {
  it('renders error message, allows reset action, and provides link to home', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reset = vi.fn();
    const testError = new Error('Test failure');

    render(<ErrorBoundary error={testError} reset={reset} />);

    expect(screen.getByText('trans_title')).toBeInTheDocument();
    expect(screen.getByText('trans_description')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /trans_tryAgain/i });
    fireEvent.click(button);
    expect(reset).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(testError);

    const homeLink = screen.getByRole('link', { name: /trans_backToHome/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    fireEvent.click(homeLink);
    expect(mockPush).toHaveBeenCalledWith('/');

    consoleErrorSpy.mockRestore();
  });
});
