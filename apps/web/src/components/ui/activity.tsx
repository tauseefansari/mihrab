'use client';

import React from 'react';

export interface ActivityProps {
  mode: 'visible' | 'hidden';
  children: React.ReactNode;
  className?: string;
}

/**
 * Activity Component (React 19 pattern).
 * Preserves component state and DOM when hidden, enabling off-screen backgrounding.
 */
export function Activity({ mode, children, className }: ActivityProps) {
  const isHidden = mode === 'hidden';

  return (
    <div
      hidden={isHidden}
      aria-hidden={isHidden}
      style={{ display: isHidden ? 'none' : undefined }}
      className={className}
    >
      {children}
    </div>
  );
}
