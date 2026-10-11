import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from '../link';

describe('Link component', () => {
  it('renders internal link without hover:underline', () => {
    render(<Link href="/dashboard">Internal</Link>);
    const link = screen.getByRole('link', { name: 'Internal' });
    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).not.toHaveClass('hover:underline');
  });

  it('renders external link with hover:underline', () => {
    render(<Link href="https://example.com">External</Link>);
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveClass('hover:underline');
  });
});
