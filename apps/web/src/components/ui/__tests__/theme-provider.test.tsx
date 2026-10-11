import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../theme-provider';

describe('ThemeProvider component', () => {
  it('renders children wrapped in next-themes provider', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div>Theme Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Theme Child')).toBeInTheDocument();
  });
});
