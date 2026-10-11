import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '../label';

describe('Label component', () => {
  it('renders label with children', () => {
    render(<Label htmlFor="test-id">Full Name</Label>);
    const label = screen.getByText('Full Name');
    expect(label).toHaveAttribute('for', 'test-id');
    expect(label).toHaveClass('font-medium');
  });

  it('merges custom className', () => {
    render(<Label className="custom-label">Label</Label>);
    expect(screen.getByText('Label')).toHaveClass('custom-label');
  });
});
