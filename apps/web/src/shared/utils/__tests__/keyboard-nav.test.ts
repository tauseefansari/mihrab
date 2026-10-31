import { describe, it, expect, vi } from 'vitest';
import type { KeyboardEvent } from 'react';
import { handleArrowNavigation } from '@/shared/utils/keyboard-nav';

describe('handleArrowNavigation', () => {
  const createMockContainer = () => {
    const container = document.createElement('nav');
    const link1 = document.createElement('a');
    link1.href = '/home';
    const link2 = document.createElement('a');
    link2.href = '/quran';
    const link3 = document.createElement('a');
    link3.href = '/settings';
    container.appendChild(link1);
    container.appendChild(link2);
    container.appendChild(link3);
    document.body.appendChild(container);
    return { container, link1, link2, link3 };
  };

  const createEvent = (key: string, currentTarget: HTMLElement): KeyboardEvent<HTMLElement> => {
    return {
      key,
      currentTarget,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent<HTMLElement>;
  };

  it('ignores non-navigation keys', () => {
    const { container } = createMockContainer();
    const event = createEvent('Tab', container);

    handleArrowNavigation(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    document.body.removeChild(container);
  });

  it('returns early if no focusable elements are found', () => {
    const container = document.createElement('nav');
    document.body.appendChild(container);
    const event = createEvent('ArrowDown', container);

    handleArrowNavigation(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    document.body.removeChild(container);
  });

  it('returns early if activeElement is not among focusable items', () => {
    const { container } = createMockContainer();
    const outsideBtn = document.createElement('button');
    document.body.appendChild(outsideBtn);
    outsideBtn.focus();

    const event = createEvent('ArrowDown', container);
    handleArrowNavigation(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    document.body.removeChild(container);
    document.body.removeChild(outsideBtn);
  });

  it('navigates forward with ArrowDown and ArrowRight, wrapping at end', () => {
    const { container, link1, link2, link3 } = createMockContainer();
    link1.focus();

    const eventDown = createEvent('ArrowDown', container);
    handleArrowNavigation(eventDown);
    expect(eventDown.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toBe(link2);

    const eventRight = createEvent('ArrowRight', container);
    handleArrowNavigation(eventRight);
    expect(document.activeElement).toBe(link3);

    // Wrap to first
    const eventWrap = createEvent('ArrowDown', container);
    handleArrowNavigation(eventWrap);
    expect(document.activeElement).toBe(link1);

    document.body.removeChild(container);
  });

  it('navigates backward with ArrowUp and ArrowLeft, wrapping at start', () => {
    const { container, link1, link2, link3 } = createMockContainer();
    link2.focus();

    const eventUp = createEvent('ArrowUp', container);
    handleArrowNavigation(eventUp);
    expect(eventUp.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toBe(link1);

    // Wrap to last
    const eventWrap = createEvent('ArrowLeft', container);
    handleArrowNavigation(eventWrap);
    expect(document.activeElement).toBe(link3);

    document.body.removeChild(container);
  });

  it('navigates to first item with Home and last item with End', () => {
    const { container, link1, link2, link3 } = createMockContainer();
    link2.focus();

    const eventHome = createEvent('Home', container);
    handleArrowNavigation(eventHome);
    expect(eventHome.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toBe(link1);

    const eventEnd = createEvent('End', container);
    handleArrowNavigation(eventEnd);
    expect(eventEnd.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toBe(link3);

    document.body.removeChild(container);
  });

  it('filters out disabled and aria-hidden elements', () => {
    const container = document.createElement('nav');
    const link1 = document.createElement('a');
    link1.href = '/1';
    const linkDisabled = document.createElement('a');
    linkDisabled.href = '/disabled';
    linkDisabled.setAttribute('disabled', 'true');
    const linkHidden = document.createElement('a');
    linkHidden.href = '/hidden';
    linkHidden.setAttribute('aria-hidden', 'true');
    const link2 = document.createElement('a');
    link2.href = '/2';

    container.appendChild(link1);
    container.appendChild(linkDisabled);
    container.appendChild(linkHidden);
    container.appendChild(link2);
    document.body.appendChild(container);

    link1.focus();
    const event = createEvent('ArrowDown', container);
    handleArrowNavigation(event);

    expect(document.activeElement).toBe(link2);
    document.body.removeChild(container);
  });

  it('focuses first item on ArrowDown/Home and last item on ArrowUp/End when container has focus', () => {
    const { container, link1, link3 } = createMockContainer();
    container.tabIndex = -1;
    container.focus();

    const eventDown = createEvent('ArrowDown', container);
    handleArrowNavigation(eventDown);
    expect(eventDown.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toBe(link1);

    container.focus();
    const eventUp = createEvent('ArrowUp', container);
    handleArrowNavigation(eventUp);
    expect(eventUp.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toBe(link3);

    document.body.removeChild(container);
  });

  it('supports custom selectors such as button elements', () => {
    const container = document.createElement('div');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    container.appendChild(btn1);
    container.appendChild(btn2);
    document.body.appendChild(container);

    btn1.focus();
    const event = createEvent('ArrowDown', container);
    handleArrowNavigation(event, 'button');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(document.activeElement).toBe(btn2);

    document.body.removeChild(container);
  });
});
