import type { HTMLAttributes } from 'react';
import CalibrationFigureEightSvg from '@/shared/assets/icons/calibration-figure-eight.svg';
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
      <CalibrationFigureEightSvg
        width={size}
        height={Math.round(size / 2)}
        className="overflow-visible"
      />
    </div>
  );
}
