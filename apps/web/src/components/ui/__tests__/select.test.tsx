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

  it('opens dropdown via Enter, Space, or Arrow keys on trigger', async () => {
    const ARIA_EXPANDED = 'aria-expanded';
    render(
      <Select placeholder="Choose one">
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </Select>
    );
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute(ARIA_EXPANDED, 'false');

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(trigger).toHaveAttribute(ARIA_EXPANDED, 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
    expect(trigger).toHaveAttribute(ARIA_EXPANDED, 'false');

    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(trigger).toHaveAttribute(ARIA_EXPANDED, 'true');
  });

  it('navigates options via keyboard arrows, Home, End, and closes on Escape', async () => {
    render(
      <Select placeholder="Select fruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </Select>
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const listbox = screen.getByRole('listbox');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    const options = buttons.slice(1);

    // Initial focus on first option
    expect(document.activeElement).toBe(options[0]);

    // ArrowDown moves to next
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(options[1]);

    // End moves to last
    fireEvent.keyDown(listbox, { key: 'End' });
    expect(document.activeElement).toBe(options[2]);

    // Home moves to first
    fireEvent.keyDown(listbox, { key: 'Home' });
    expect(document.activeElement).toBe(options[0]);

    // ArrowUp wraps to last
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(options[2]);

    // Escape closes and restores focus to trigger
    fireEvent.keyDown(listbox, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
    expect(document.activeElement).toBe(trigger);
  });

  it('closes on Tab key press from within the listbox', async () => {
    render(
      <Select placeholder="Select fruit">
        <option value="apple">Apple</option>
      </Select>
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    const listbox = screen.getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'Tab' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
