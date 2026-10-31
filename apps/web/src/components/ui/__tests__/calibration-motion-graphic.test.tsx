import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalibrationMotionGraphic } from '@/components/ui/calibration-motion-graphic';

describe('CalibrationMotionGraphic', () => {
  it('renders calibration figure-8 graphic with accessible role and label when ariaLabel provided', () => {
    render(<CalibrationMotionGraphic ariaLabel="Figure-8 calibration motion illustration" />);
    const graphic = screen.getByRole('img', {
      name: /figure-8 calibration motion illustration/i,
    });
    expect(graphic).toBeInTheDocument();
  });

  it('renders with aria-hidden when no ariaLabel is provided', () => {
    const { container } = render(<CalibrationMotionGraphic />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom size and className', () => {
    const { container } = render(
      <CalibrationMotionGraphic size={100} className="custom-calibration-graphic" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-calibration-graphic');

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '50');
  });
});
