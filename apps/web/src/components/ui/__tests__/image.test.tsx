import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Image } from '@/components/ui/image';

describe('Image component', () => {
  it('renders image with alt text and src', () => {
    render(<Image src="/test.jpg" alt="Test image" width={100} height={100} />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
  });

  it('handles empty fallback alt when none provided', () => {
    const { container } = render(<Image src="/test.jpg" alt="" width={100} height={100} />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('alt', '');
  });
});
