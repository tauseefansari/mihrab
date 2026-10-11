import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton component', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('bg-outline-variant/20');
  });
});
