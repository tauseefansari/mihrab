import type { CSSProperties } from 'react';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/components/ui/icon';

export interface CompassLabels {
  north: string;
  south: string;
  west: string;
  east: string;
}

export interface CompassDialProps {
  needleAngle: number;
  isAligned?: boolean;
  className?: string;
  ariaLabel?: string;
  labels?: CompassLabels;
}

const DEFAULT_LABELS: CompassLabels = {
  north: 'N',
  south: 'S',
  west: 'W',
  east: 'E',
};

const ALIGNED_RING_STYLE: CSSProperties = {
  boxShadow: '0 0 40px rgba(0, 105, 72, 0.35), inset 0 0 20px rgba(0, 105, 72, 0.2)',
  transform: 'scale(1.02)',
};

function RoseMarkings({ labels }: { labels: CompassLabels }) {
  return (
    <div className="border-surface-dim/50 pointer-events-none absolute inset-4 flex items-center justify-center rounded-full border">
      <span className="font-label-sm text-label-sm text-on-surface-variant absolute top-2 font-semibold">
        {labels.north}
      </span>
      <span className="font-label-sm text-label-sm text-on-surface-variant absolute bottom-2 font-semibold">
        {labels.south}
      </span>
      <span className="font-label-sm text-label-sm text-on-surface-variant absolute start-2 font-semibold">
        {labels.west}
      </span>
      <span className="font-label-sm text-label-sm text-on-surface-variant absolute end-2 font-semibold">
        {labels.east}
      </span>
    </div>
  );
}

function CompassNeedle({ needleAngle }: { needleAngle: number }) {
  return (
    <div
      className="pointer-events-none absolute z-10 flex h-full w-full origin-center flex-col items-center justify-between py-6 transition-transform duration-150 ease-out"
      style={{ transform: `rotate(${needleAngle}deg)` }}
    >
      <div className="relative flex flex-1 flex-col items-center justify-start drop-shadow-md">
        <svg
          width="24"
          height="60"
          viewBox="0 0 24 60"
          className="overflow-visible"
          aria-hidden="true"
        >
          <polygon points="12,0 0,60 24,60" className="fill-primary" />
        </svg>
        <div className="bg-primary-container relative -mt-1 h-12 w-4 rounded-b-sm">
          <div className="bg-surface border-outline-variant/20 absolute start-1/2 -top-8 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border shadow-sm rtl:translate-x-1/2">
            <Icon name="Mosque" size={16} className="text-primary" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-end drop-shadow-sm">
        <div className="bg-surface-variant h-12 w-4 rounded-t-sm opacity-60" />
        <svg
          width="24"
          height="60"
          viewBox="0 0 24 60"
          className="overflow-visible opacity-60"
          aria-hidden="true"
        >
          <polygon points="12,60 0,0 24,0" className="fill-surface-variant" />
        </svg>
      </div>
    </div>
  );
}

export function CompassDial({
  needleAngle,
  isAligned = false,
  className,
  ariaLabel = 'Compass dial pointing toward Qiblah',
  labels = DEFAULT_LABELS,
}: CompassDialProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'relative flex h-72 w-72 items-center justify-center select-none md:h-96 md:w-96',
        className
      )}
    >
      <div
        style={isAligned ? ALIGNED_RING_STYLE : undefined}
        className={cn(
          'glass-panel border-outline-variant/30 absolute inset-0 rounded-full border transition-all duration-500 ease-out',
          isAligned && 'border-primary/60'
        )}
      />

      <RoseMarkings labels={labels} />

      <div className="bg-primary border-surface z-20 h-4 w-4 rounded-full border-2 shadow-sm" />

      <CompassNeedle needleAngle={needleAngle} />
    </div>
  );
}
