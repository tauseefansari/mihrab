import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompassDial } from '@/components/ui/compass-dial';

describe('CompassDial', () => {
  it('renders with accessibility role and label when ariaLabel provided', () => {
    render(<CompassDial needleAngle={45} ariaLabel="Compass dial pointing toward Qiblah" />);

    const dial = screen.getByRole('img', {
      name: /compass dial pointing toward qiblah/i,
    });
    expect(dial).toBeInTheDocument();
  });

  it('renders with aria-hidden when no ariaLabel is provided', () => {
    const { container } = render(<CompassDial needleAngle={45} />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
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

  it('applies alignment glow styling and active indicator crown when isAligned is true', () => {
    const { container } = render(<CompassDial needleAngle={0} isAligned={true} />);

    const glowRing = container.querySelector('.border-primary\\/70');
    expect(glowRing).toBeInTheDocument();

    const activeCrown = container.querySelector('.animate-pulse');
    expect(activeCrown).toBeInTheDocument();
  });

  it('renders dedicated Makkah Kaaba icon by default or when sanctuary is makkah', () => {
    const { container } = render(<CompassDial needleAngle={0} sanctuary="makkah" />);
    // Kaaba icon contains line with stroke="#f59e0b" for golden Kiswah
    const kiswah = container.querySelector('line[stroke="#f59e0b"]');
    expect(kiswah).toBeInTheDocument();
  });

  it('renders dedicated Madinah Green Dome icon when sanctuary is madinah', () => {
    const { container } = render(<CompassDial needleAngle={0} sanctuary="madinah" />);
    // Madinah Green Dome path has fill="#10b981"
    const dome = container.querySelector('path[fill="#10b981"]');
    expect(dome).toBeInTheDocument();
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
