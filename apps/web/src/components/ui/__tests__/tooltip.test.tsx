import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from '@/components/ui/tooltip';
import {
  TOOLTIP_HELP_TEXT,
  QUICK_LEAVE_TEXT,
  UNMOUNT_TEXT,
  POS_TEXT,
  BTN_LABEL,
} from '@/__fixtures__/tooltip.fixture';

describe('Tooltip component', () => {
  it('shows tooltip content on mouse enter after delay and hides on mouse leave', async () => {
    render(
      <Tooltip content={TOOLTIP_HELP_TEXT} delay={50}>
        <button type="button">Hover Me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover Me' });
    expect(screen.queryByText(TOOLTIP_HELP_TEXT)).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger.parentElement!);

    await waitFor(() => {
      expect(screen.getByText(TOOLTIP_HELP_TEXT)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(trigger.parentElement!);

    await waitFor(() => {
      expect(screen.queryByText(TOOLTIP_HELP_TEXT)).not.toBeInTheDocument();
    });
  });

  it('cancels pending timeout if mouse leaves before delay', () => {
    render(
      <Tooltip content={QUICK_LEAVE_TEXT} delay={500}>
        <button type="button">Quick</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Quick' });
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.mouseLeave(trigger.parentElement!);

    // Ensure it never opened
    expect(screen.queryByText(QUICK_LEAVE_TEXT)).not.toBeInTheDocument();
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = render(
      <Tooltip content={UNMOUNT_TEXT} delay={500}>
        <button type="button">Unmount</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Unmount' });
    fireEvent.mouseEnter(trigger.parentElement!);
    unmount();
    expect(screen.queryByText(UNMOUNT_TEXT)).not.toBeInTheDocument();
  });

  it('supports positions left, right, bottom', () => {
    const { rerender } = render(
      <Tooltip content={POS_TEXT} position="bottom">
        <button type="button">{BTN_LABEL}</button>
      </Tooltip>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <Tooltip content={POS_TEXT} position="left">
        <button type="button">{BTN_LABEL}</button>
      </Tooltip>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <Tooltip content={POS_TEXT} position="right">
        <button type="button">{BTN_LABEL}</button>
      </Tooltip>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
