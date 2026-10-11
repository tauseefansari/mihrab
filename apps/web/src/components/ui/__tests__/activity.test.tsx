import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Activity } from '../activity';

describe('Activity component (React 19)', () => {
  it('renders visible children normally', () => {
    render(
      <Activity mode="visible">
        <span>Visible Content</span>
      </Activity>
    );
    const content = screen.getByText('Visible Content');
    expect(content).toBeVisible();
    expect(content.parentElement).not.toHaveAttribute('hidden');
  });

  it('hides children with display: none while preserving DOM tree', () => {
    render(
      <Activity mode="hidden">
        <span>Background Content</span>
      </Activity>
    );
    const content = screen.getByText('Background Content');
    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveAttribute('hidden');
    expect(content.parentElement).toHaveStyle({ display: 'none' });
  });
});
