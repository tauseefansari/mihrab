import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea component', () => {
  it('renders textarea with placeholder', () => {
    render(<Textarea placeholder="Write notes" />);
    expect(screen.getByPlaceholderText('Write notes')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} placeholder="Notes" />);
    const textarea = screen.getByPlaceholderText('Notes');
    fireEvent.change(textarea, { target: { value: 'Dhikr reflection' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies error styling when error is true', () => {
    render(<Textarea error placeholder="Error notes" />);
    expect(screen.getByPlaceholderText('Error notes')).toHaveClass('border-error');
  });
});
