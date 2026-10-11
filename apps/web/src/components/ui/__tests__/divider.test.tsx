import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Divider } from '@/components/ui/divider';

describe('Divider component', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('h-px');
  });

  it('renders vertical divider with correct class', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('w-px');
  });
});
