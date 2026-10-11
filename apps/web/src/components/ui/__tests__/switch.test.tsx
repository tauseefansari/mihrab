import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '@/components/ui/switch';

describe('Switch component', () => {
  it('toggles switch state in uncontrolled mode', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Toggle notifications" onCheckedChange={onCheckedChange} />);
    const switchEl = screen.getByRole('switch', { name: 'Toggle notifications' });
    expect(switchEl).not.toBeChecked();

    fireEvent.click(switchEl);
    expect(switchEl).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('respects controlled checked state', () => {
    const { rerender } = render(<Switch checked={true} aria-label="Mode" />);
    const switchEl = screen.getByRole('switch', { name: 'Mode' });
    expect(switchEl).toBeChecked();

    rerender(<Switch checked={false} aria-label="Mode" />);
    expect(switchEl).not.toBeChecked();
  });

  it('prevents toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    render(<Switch disabled aria-label="Disabled switch" onCheckedChange={onCheckedChange} />);
    const switchEl = screen.getByRole('switch', { name: 'Disabled switch' });
    expect(switchEl).toBeDisabled();

    fireEvent.click(switchEl);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
