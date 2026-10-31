import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export interface CalibrationMotionGraphicProps extends HTMLAttributes<HTMLDivElement> {
  className?: string | undefined;
  size?: number | undefined;
  ariaLabel?: string | undefined;
}

export function CalibrationMotionGraphic({
  className,
  size = 72,
  ariaLabel,
  ...props
}: CalibrationMotionGraphicProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={cn('relative flex items-center justify-center', className)}
      {...props}
    >
      <svg
        width={size}
        height={Math.round(size / 2)}
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Figure-8 Background Track */}
        <path
          d="M60 30 C45 10 20 10 20 30 C20 50 45 50 60 30 C75 10 100 10 100 30 C100 50 75 50 60 30 Z"
          className="stroke-outline-variant/40"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated Directional Wave */}
        <path
          d="M60 30 C45 10 20 10 20 30 C20 50 45 50 60 30 C75 10 100 10 100 30 C100 50 75 50 60 30 Z"
          className="stroke-primary stroke-dash-wave"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="28 140"
        />

        {/* Orbiting Calibration Motion Node */}
        <circle cx="60" cy="30" r="4.5" className="fill-primary animate-pulse" />
      </svg>
    </div>
  );
}
