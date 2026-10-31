import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SanctuaryIcon } from '@/components/ui/sanctuary-icon';

describe('SanctuaryIcon', () => {
  it('renders Kaaba SVG icon when sanctuary is makkah', () => {
    const { container } = render(<SanctuaryIcon sanctuary="makkah" size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    // Kaaba has line for kiswah
    expect(container.querySelector('line')).toBeInTheDocument();
  });

  it('renders Madinah Green Dome SVG icon when sanctuary is madinah', () => {
    const { container } = render(<SanctuaryIcon sanctuary="madinah" size={28} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '28');
    expect(svg).toHaveAttribute('height', '28');
    // Madinah dome has circle finial
    expect(container.querySelector('circle')).toBeInTheDocument();
  });

  it('applies custom className to the SVG element', () => {
    const { container } = render(
      <SanctuaryIcon sanctuary="makkah" className="custom-test-class" />
    );
    expect(container.querySelector('.custom-test-class')).toBeInTheDocument();
  });
});
