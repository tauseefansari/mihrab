import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassCard } from '@/components/ui/glass-card';

describe('GlassCard component', () => {
  it('renders with glass-panel utility class', () => {
    render(<GlassCard>Card Content</GlassCard>);
    const card = screen.getByText('Card Content');
    expect(card).toHaveClass('glass-panel');
    expect(card).toHaveClass('rounded-lg');
  });

  it('merges custom class names', () => {
    render(<GlassCard className="custom-card p-4">Custom</GlassCard>);
    expect(screen.getByText('Custom')).toHaveClass('custom-card');
  });
});
