import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useMobileDrawer } from '@/components/layout/use-mobile-drawer';

describe('useMobileDrawer', () => {
  beforeEach(() => {
    act(() => {
      useMobileDrawer.getState().close();
    });
  });

  it('initializes with isOpen = false', () => {
    expect(useMobileDrawer.getState().isOpen).toBe(false);
  });

  it('opens drawer via open()', () => {
    act(() => {
      useMobileDrawer.getState().open();
    });
    expect(useMobileDrawer.getState().isOpen).toBe(true);
  });

  it('closes drawer via close()', () => {
    act(() => {
      useMobileDrawer.getState().open();
      useMobileDrawer.getState().close();
    });
    expect(useMobileDrawer.getState().isOpen).toBe(false);
  });

  it('toggles drawer state via toggle()', () => {
    act(() => {
      useMobileDrawer.getState().toggle();
    });
    expect(useMobileDrawer.getState().isOpen).toBe(true);

    act(() => {
      useMobileDrawer.getState().toggle();
    });
    expect(useMobileDrawer.getState().isOpen).toBe(false);
  });
});
