import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter username" />);
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('handles user input change', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');
    fireEvent.change(input, { target: { value: 'user@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies error styling when error prop is true', () => {
    render(<Input error placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveClass('border-error');
  });
});
