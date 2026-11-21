import { cn } from '@/shared/utils/cn';
import { SanctuaryIcon } from '@/components/ui/sanctuary-icon';
import NeedleNorthSvg from '@/shared/assets/icons/needle-north.svg';
import NeedleSouthSvg from '@/shared/assets/icons/needle-south.svg';

export interface CompassLabels {
  north: string;
  south: string;
  west: string;
  east: string;
}

export interface CompassDialProps {
  needleAngle: number;
  isAligned?: boolean | undefined;
  className?: string | undefined;
  ariaLabel?: string | undefined;
  labels?: CompassLabels | undefined;
  sanctuary?: 'makkah' | 'madinah' | undefined;
}

const DEFAULT_LABELS: CompassLabels = {
  north: 'N',
  south: 'S',
  west: 'W',
  east: 'E',
};

function AlignmentIndicator({ isAligned }: { isAligned: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-2 z-20 flex flex-col items-center"
    >
      <div
        className={cn(
          'transition-all duration-300',
          isAligned
            ? 'bg-primary ring-primary/80 h-3 w-1.5 animate-pulse rounded-full ring-2'
            : 'bg-outline-variant/60 h-2 w-1 rounded-full'
        )}
      />
    </div>
  );
}

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

function CompassNeedle({
  needleAngle,
  isAligned = false,
  sanctuary = 'makkah',
}: {
  needleAngle: number;
  isAligned?: boolean;
  sanctuary?: 'makkah' | 'madinah';
}) {
  return (
    <div
      className="pointer-events-none absolute z-10 flex h-full w-full origin-center flex-col items-center justify-between py-3 transition-transform duration-150 ease-out sm:py-5"
      style={{ transform: `rotate(${needleAngle}deg)` }}
    >
      {/* North / Qiblah Arrow (Glowing Emerald with 3D Facets) */}
      <div
        className={cn(
          'relative flex flex-1 flex-col items-center justify-start transition-all duration-300',
          isAligned ? 'scale-105 drop-shadow-xl' : 'drop-shadow-md'
        )}
      >
        <NeedleNorthSvg width="26" height="66" className="overflow-visible" aria-hidden="true" />

        {/* Sanctuary Badge (Kaaba for Makkah, Green Dome for Madinah) */}
        <div
          className={cn(
            'bg-surface-container-high relative -mt-4 flex h-9 w-9 items-center justify-center rounded-full border-2 backdrop-blur-md transition-all duration-300',
            isAligned
              ? 'border-primary ring-primary/40 shadow-xl ring-4'
              : 'border-primary/70 dark:border-primary/90 shadow-lg'
          )}
        >
          <SanctuaryIcon sanctuary={sanctuary} size={18} className="text-primary" />
        </div>
      </div>

      {/* South / Opposite Arrow (Luminous Platinum Silver with Crisp Visibility in Dark Mode) */}
      <div className="flex flex-1 flex-col items-center justify-end drop-shadow-md">
        <NeedleSouthSvg width="26" height="66" className="overflow-visible" aria-hidden="true" />
      </div>
    </div>
  );
}

export function CompassDial({
  needleAngle,
  isAligned = false,
  className,
  ariaLabel,
  labels = DEFAULT_LABELS,
  sanctuary = 'makkah',
}: CompassDialProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={cn(
        'relative flex h-60 w-60 items-center justify-center select-none sm:h-72 sm:w-72 md:h-80 md:w-80',
        className
      )}
    >
      <div
        className={cn(
          'glass-panel border-outline-variant/30 absolute inset-0 rounded-full border transition-all duration-500 ease-out',
          isAligned && 'border-primary/70 bg-primary/5 shadow-compass-glow scale-105'
        )}
      />

      {/* Target heading crown indicator at 12 o'clock */}
      <AlignmentIndicator isAligned={isAligned} />

      <RoseMarkings labels={labels} />

      {/* Center Jewel Pivot */}
      <div
        className={cn(
          'bg-primary border-surface-container-high z-20 h-4 w-4 rounded-full border-2 shadow-md transition-all duration-300',
          isAligned ? 'ring-primary/60 shadow-lg ring-4' : 'ring-primary/40 ring-2'
        )}
      />

      <CompassNeedle needleAngle={needleAngle} isAligned={isAligned} sanctuary={sanctuary} />
    </div>
  );
}
