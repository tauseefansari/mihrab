import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../checkbox';

describe('Checkbox component', () => {
  it('toggles internal checked state in uncontrolled mode', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Confirm" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Confirm' });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('respects controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} aria-label="Agree" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Agree' });
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked={true} aria-label="Agree" />);
    expect(checkbox).toBeChecked();
  });

  it('renders disabled state properly', () => {
    render(<Checkbox disabled aria-label="Disabled check" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Disabled check' });
    expect(checkbox).toBeDisabled();
  });
});
