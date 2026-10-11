import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from '@/app/global-error';
import enCommon from '@/shared/i18n/locales/en/common.json';

describe('GlobalError', () => {
  it('renders fatal error message and calls reset when clicked', () => {
    const error = new Error('Test global error');
    const reset = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<GlobalError error={error} reset={reset} />);

    expect(screen.getByText(enCommon.FatalError.title)).toBeInTheDocument();
    expect(screen.getByText(enCommon.FatalError.description)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: enCommon.FatalError.tryAgain });
    fireEvent.click(button);
    expect(reset).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });
});
