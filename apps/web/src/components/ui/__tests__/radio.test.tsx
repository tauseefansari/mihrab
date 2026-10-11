import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '../radio';

describe('Radio component', () => {
  it('toggles radio button and emits value in uncontrolled mode', () => {
    const onValueChange = vi.fn();
    render(<Radio value="option1" aria-label="Option 1" onValueChange={onValueChange} />);
    const radio = screen.getByRole('radio', { name: 'Option 1' });
    expect(radio).not.toBeChecked();

    fireEvent.click(radio);
    expect(radio).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('option1');
  });

  it('respects controlled checked state', () => {
    const { rerender } = render(<Radio checked={false} aria-label="Radio" />);
    expect(screen.getByRole('radio', { name: 'Radio' })).not.toBeChecked();

    rerender(<Radio checked={true} aria-label="Radio" />);
    expect(screen.getByRole('radio', { name: 'Radio' })).toBeChecked();
  });

  it('renders disabled radio button', () => {
    render(<Radio disabled aria-label="Disabled radio" />);
    expect(screen.getByRole('radio', { name: 'Disabled radio' })).toBeDisabled();
  });

  it('supports defaultChecked and onChange callback in controlled/uncontrolled modes', () => {
    const handleChange = vi.fn();
    const { unmount } = render(<Radio defaultChecked aria-label="Default Checked" />);
    const radioChecked = screen.getByRole('radio', { name: 'Default Checked' });
    expect(radioChecked).toBeChecked();
    unmount();

    render(<Radio onChange={handleChange} aria-label="Unchecked Radio" />);
    const radio = screen.getByRole('radio', { name: 'Unchecked Radio' });
    expect(radio).not.toBeChecked();
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalled();
  });
});
