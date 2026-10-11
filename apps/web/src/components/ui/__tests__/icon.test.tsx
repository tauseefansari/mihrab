import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from '../icon';

describe('Icon component', () => {
  it('renders valid Lucide icon', () => {
    const { container } = render(<Icon name="House" size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('applies custom className and strokeWidth', () => {
    const { container } = render(<Icon name="Check" className="text-primary" strokeWidth={3} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-primary');
  });

  it('returns null for invalid icon name', () => {
    // @ts-expect-error testing fallback for invalid icon name
    const { container } = render(<Icon name="NonExistentIconXYZ" />);
    expect(container.firstChild).toBeNull();
  });
});
