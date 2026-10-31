import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedViewSwitcher } from '@/components/ui/animated-view-switcher';

describe('AnimatedViewSwitcher', () => {
  it('renders active view content', () => {
    render(
      <AnimatedViewSwitcher activeKey="compass">
        <div>Compass Dial Content</div>
      </AnimatedViewSwitcher>
    );

    expect(screen.getByText('Compass Dial Content')).toBeInTheDocument();
  });

  it('updates view content when activeKey changes', async () => {
    const { rerender } = render(
      <AnimatedViewSwitcher activeKey="compass">
        <div>Compass Dial Content</div>
      </AnimatedViewSwitcher>
    );

    expect(screen.getByText('Compass Dial Content')).toBeInTheDocument();

    rerender(
      <AnimatedViewSwitcher activeKey="calibrate">
        <div>Calibration Guide Content</div>
      </AnimatedViewSwitcher>
    );

    expect(await screen.findByText('Calibration Guide Content')).toBeInTheDocument();
  });

  it('applies custom className to outer container', () => {
    const { container } = render(
      <AnimatedViewSwitcher activeKey="compass" className="custom-view-switcher">
        <div>Content</div>
      </AnimatedViewSwitcher>
    );

    expect(container.firstChild).toHaveClass('custom-view-switcher');
  });
});
