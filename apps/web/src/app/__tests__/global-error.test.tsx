import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from '@/app/global-error';
import enCommon from '@/shared/i18n/locales/en/common.json';

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

describe('GlobalError', () => {
  it('renders fatal error message, calls reset when clicked, and provides home link', () => {
    const error = new Error('Test global error');
    const reset = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<GlobalError error={error} reset={reset} />);

    expect(screen.getByRole('heading', { name: enCommon.FatalError.title })).toBeInTheDocument();
    expect(screen.getByText(enCommon.FatalError.description)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: enCommon.FatalError.tryAgain });
    fireEvent.click(button);
    expect(reset).toHaveBeenCalledTimes(1);

    const homeLink = screen.getByRole('link', { name: enCommon.FatalError.backToHome });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    fireEvent.click(homeLink);
    expect(mockPush).toHaveBeenCalledWith('/');

    consoleSpy.mockRestore();
  });
});
