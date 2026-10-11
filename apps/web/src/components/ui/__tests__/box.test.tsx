import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from '@/components/ui/box';

describe('Box component', () => {
  it('renders children with default div tag', () => {
    render(<Box>Box Content</Box>);
    const el = screen.getByText('Box Content');
    expect(el.tagName).toBe('DIV');
  });

  it('renders custom polymorphic HTML element', () => {
    render(<Box as="section">Section Content</Box>);
    const el = screen.getByText('Section Content');
    expect(el.tagName).toBe('SECTION');
  });

  it('merges custom class names', () => {
    render(<Box className="custom-box">Styled Box</Box>);
    const el = screen.getByText('Styled Box');
    expect(el).toHaveClass('custom-box');
  });
});
