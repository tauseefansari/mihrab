import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge component', () => {
  it('renders default badge variant', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
  });

  it('renders primary and error variants', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass('bg-primary-container');

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('bg-error-container');
  });

  it('merges custom className', () => {
    render(<Badge className="extra-class">Styled</Badge>);
    expect(screen.getByText('Styled')).toHaveClass('extra-class');
  });
});
