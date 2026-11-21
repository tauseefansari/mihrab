import type { KeyboardEvent } from 'react';

const NAV_KEYS = new Set(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End']);

function computeNextIndex(key: string, currentIndex: number, total: number): number {
  if (key === 'ArrowDown' || key === 'ArrowRight') {
    return (currentIndex + 1) % total;
  }
  if (key === 'ArrowUp' || key === 'ArrowLeft') {
    return (currentIndex - 1 + total) % total;
  }
  if (key === 'Home') {
    return 0;
  }
  if (key === 'End') {
    return total - 1;
  }
  return currentIndex;
}

function computeInitialIndex(key: string, total: number): number {
  if (key === 'ArrowUp' || key === 'ArrowLeft' || key === 'End') {
    return total - 1;
  }
  return 0;
}

/**
 * Handles keyboard arrow navigation across focusable elements within a container.
 */
export function handleArrowNavigation(e: KeyboardEvent<HTMLElement>, selector = 'a[href]'): void {
  if (!NAV_KEYS.has(e.key)) {
    return;
  }

  const container = e.currentTarget;
  const elements = Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  );

  if (elements.length === 0) {
    return;
  }

  const currentIndex = elements.findIndex((el) => el === document.activeElement);
  if (currentIndex === -1) {
    if (container.contains(document.activeElement)) {
      e.preventDefault();
      elements[computeInitialIndex(e.key, elements.length)]?.focus();
    }
    return;
  }

  const nextIndex = computeNextIndex(e.key, currentIndex, elements.length);
  e.preventDefault();
  elements[nextIndex]?.focus();
}
