import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Select } from '@/components/ui/select';
import enCommon from '@/shared/i18n/locales/en/common.json';

describe('Select component', () => {
  it('renders trigger with placeholder and opens dropdown on click', () => {
    render(
      <Select placeholder="Choose city">
        <option value="makkah">Makkah</option>
        <option value="madinah">Madinah</option>
      </Select>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveTextContent('Choose city');

    fireEvent.click(trigger);
    const options = screen.getAllByRole('button');
    expect(options).toHaveLength(3);
    expect(screen.getByText('Madinah', { selector: 'span.truncate' })).toBeInTheDocument();
  });

  it('selects option on click and invokes onChange handler', () => {
    const handleChange = vi.fn();
    render(
      <Select defaultValue="makkah" onChange={handleChange}>
        <option value="makkah">Makkah</option>
        <option value="madinah">Madinah</option>
      </Select>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveTextContent('Makkah');

    fireEvent.click(trigger);
    const madinahBtn = screen.getByRole('button', { name: /Madinah/i });
    fireEvent.click(madinahBtn);

    expect(trigger).toHaveTextContent('Madinah');
    expect(handleChange).toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside area</div>
        <Select placeholder="Select option">
          <option value="1">Option 1</option>
        </Select>
      </div>
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getAllByRole('button')).toHaveLength(2);

    fireEvent.mouseDown(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });
  });

  it('respects disabled attribute and does not open when clicked', () => {
    render(
      <Select disabled placeholder="Disabled Select">
        <option value="1">Option 1</option>
      </Select>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
    fireEvent.click(trigger);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('falls back to translated selectOption when no placeholder is provided', () => {
    render(
      <Select>
        <option value="1">Option 1</option>
      </Select>
    );
    expect(screen.getByRole('button')).toHaveTextContent(enCommon.UI.selectOption);
  });

  it('supports ref forwarding via object ref and callback ref', () => {
    const refObj = createRef<HTMLSelectElement>();
    const refFn = vi.fn();
    const { unmount } = render(
      <Select ref={refObj}>
        <option value="1">Option 1</option>
      </Select>
    );
    expect(refObj.current).toBeInstanceOf(HTMLSelectElement);
    unmount();

    render(
      <Select ref={refFn}>
        <option value="1">Option 1</option>
      </Select>
    );
    expect(refFn).toHaveBeenCalledWith(expect.any(HTMLSelectElement));
  });

  it('does not close dropdown when clicking inside the container', () => {
    render(
      <Select placeholder="Test">
        <option value="1">Option 1</option>
      </Select>
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getAllByRole('button')).toHaveLength(2);

    fireEvent.mouseDown(trigger);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('applies error styling when error is true', () => {
    render(
      <Select error placeholder="Error state">
        <option value="1">Option 1</option>
      </Select>
    );
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveClass('border-error');
  });

  it('updates when controlled value changes', () => {
    const { rerender } = render(
      <Select value="1">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Option 1');

    rerender(
      <Select value="2">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Option 2');
  });
});
