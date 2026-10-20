import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompassDial } from '@/components/ui/compass-dial';

describe('CompassDial', () => {
  it('renders with default accessibility role and label', () => {
    render(<CompassDial needleAngle={45} />);

    const dial = screen.getByRole('img', {
      name: /compass dial pointing toward qiblah/i,
    });
    expect(dial).toBeInTheDocument();
  });

  it('renders all cardinal rose direction indicators', () => {
    render(<CompassDial needleAngle={0} />);

    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
  });

  it('applies rotation transform to needle container', () => {
    const { container } = render(<CompassDial needleAngle={135} />);

    const needleContainer = container.querySelector('div[style*="transform: rotate(135deg)"]');
    expect(needleContainer).toBeInTheDocument();
  });

  it('applies alignment glow styling when isAligned is true', () => {
    const { container } = render(<CompassDial needleAngle={0} isAligned={true} />);

    const glowRing = container.querySelector('.border-primary\\/60');
    expect(glowRing).toBeInTheDocument();
  });

  it('accepts custom className and ariaLabel', () => {
    render(
      <CompassDial
        needleAngle={90}
        className="custom-compass-class"
        ariaLabel="Custom Qiblah Compass"
      />
    );

    const dial = screen.getByRole('img', { name: 'Custom Qiblah Compass' });
    expect(dial).toHaveClass('custom-compass-class');
  });
});
