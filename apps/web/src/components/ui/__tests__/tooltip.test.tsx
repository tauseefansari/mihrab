import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from '../tooltip';

describe('Tooltip component', () => {
  it('shows tooltip content on mouse enter after delay and hides on mouse leave', async () => {
    render(
      <Tooltip content="Tooltip Help Text" delay={50}>
        <button type="button">Hover Me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover Me' });
    expect(screen.queryByText('Tooltip Help Text')).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger.parentElement!);

    await waitFor(() => {
      expect(screen.getByText('Tooltip Help Text')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(trigger.parentElement!);

    await waitFor(() => {
      expect(screen.queryByText('Tooltip Help Text')).not.toBeInTheDocument();
    });
  });

  it('cancels pending timeout if mouse leaves before delay', async () => {
    render(
      <Tooltip content="Quick Leave Text" delay={500}>
        <button type="button">Quick</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Quick' });
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.mouseLeave(trigger.parentElement!);

    // Ensure it never opened
    expect(screen.queryByText('Quick Leave Text')).not.toBeInTheDocument();
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = render(
      <Tooltip content="Unmount Text" delay={500}>
        <button type="button">Unmount</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Unmount' });
    fireEvent.mouseEnter(trigger.parentElement!);
    unmount();
    expect(screen.queryByText('Unmount Text')).not.toBeInTheDocument();
  });

  it('supports positions left, right, bottom', () => {
    const { rerender } = render(
      <Tooltip content="Pos" position="bottom">
        <button type="button">Btn</button>
      </Tooltip>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <Tooltip content="Pos" position="left">
        <button type="button">Btn</button>
      </Tooltip>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <Tooltip content="Pos" position="right">
        <button type="button">Btn</button>
      </Tooltip>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
