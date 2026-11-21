import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleGroup } from '@/components/ui/toggle-group';

const SELECT_SANCTUARY = 'Select sanctuary';
const MADINAH_LABEL = 'Madinah Al-Munawwarah';

describe('ToggleGroup component', () => {
  const options = [
    { value: 'makkah', label: 'Makkah', icon: <span>🕋</span> },
    { value: 'madinah', label: 'Madinah', icon: <span>🕌</span>, ariaLabel: MADINAH_LABEL },
  ] as const;

  it('renders radiogroup container with accessible label and options', () => {
    const handleChange = vi.fn();
    render(
      <ToggleGroup
        ariaLabel={SELECT_SANCTUARY}
        value="makkah"
        onValueChange={handleChange}
        options={options}
      />
    );

    const group = screen.getByRole('radiogroup', { name: SELECT_SANCTUARY });
    expect(group).toBeInTheDocument();

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);

    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[0]).toHaveAttribute('tabindex', '0');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('tabindex', '-1');
    expect(radios[1]).toHaveAttribute('aria-label', MADINAH_LABEL);
  });

  it('fires onValueChange callback when clicking an option', () => {
    const handleChange = vi.fn();
    render(
      <ToggleGroup
        ariaLabel={SELECT_SANCTUARY}
        value="makkah"
        onValueChange={handleChange}
        options={options}
      />
    );

    const madinahRadio = screen.getByRole('radio', { name: MADINAH_LABEL });
    fireEvent.click(madinahRadio);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('madinah');
  });

  it('applies custom className and renders icons correctly', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <ToggleGroup
        ariaLabel={SELECT_SANCTUARY}
        value="makkah"
        onValueChange={handleChange}
        options={options}
        className="custom-toggle-group"
      />
    );

    expect(container.firstChild).toHaveClass('custom-toggle-group');
    expect(screen.getByText('🕋')).toBeInTheDocument();
    expect(screen.getByText('🕌')).toBeInTheDocument();
  });

  it('supports arrow key navigation between options', () => {
    const handleChange = vi.fn();
    render(
      <ToggleGroup
        ariaLabel={SELECT_SANCTUARY}
        value="makkah"
        onValueChange={handleChange}
        options={options}
      />
    );

    const makkahRadio = screen.getByRole('radio', { name: 'Makkah' });
    fireEvent.keyDown(makkahRadio, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith('madinah');

    fireEvent.keyDown(makkahRadio, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith('madinah');

    // Non-arrow keys do not trigger change
    fireEvent.keyDown(makkahRadio, { key: 'Tab' });
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});
