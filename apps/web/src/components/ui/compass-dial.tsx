import type { CSSProperties } from 'react';
import { cn } from '@/shared/utils/cn';

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
  sanctuary?: 'makkah' | 'madinah';
}

const DEFAULT_LABELS: CompassLabels = {
  north: 'N',
  south: 'S',
  west: 'W',
  east: 'E',
};

const ALIGNED_RING_STYLE: CSSProperties = {
  boxShadow: '0 0 50px rgba(16, 185, 129, 0.4), inset 0 0 25px rgba(16, 185, 129, 0.25)',
  transform: 'scale(1.025)',
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

function KaabaIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Kaaba Cube Silhouette */}
      <rect x="4" y="6" width="16" height="14" rx="2" className="fill-current" />
      {/* Golden Kiswah Band */}
      <line x1="4" y1="10" x2="20" y2="10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      {/* Golden Kaaba Door */}
      <rect x="13" y="12" width="4" height="6" rx="0.75" fill="#f59e0b" />
    </svg>
  );
}

function MadinahIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Prophet's Mosque Green Dome */}
      <path
        d="M6 14C6 8.5 12 5.5 12 5.5C12 5.5 18 8.5 18 14H6Z"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="1"
      />
      {/* Golden Finial */}
      <line
        x1="12"
        y1="2.5"
        x2="12"
        y2="5.5"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="2" r="1" fill="#f59e0b" />
      {/* Base Wall & Arches */}
      <rect x="4" y="14" width="16" height="6" rx="1" className="fill-current opacity-90" />
      <path
        d="M8 20V17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17V20M14 20V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V20"
        stroke="var(--surface-container-lowest, #0c0f0c)"
        strokeWidth="1.2"
      />
    </svg>
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
        <svg
          width="26"
          height="66"
          viewBox="0 0 26 66"
          className="overflow-visible"
          aria-hidden="true"
        >
          {/* Left Facet: Vibrant primary mint in dark mode, deep emerald in light mode */}
          <polygon points="13,0 0,66 13,58" className="fill-primary" />
          {/* Right Facet: Slightly shaded for realistic 3D depth */}
          <polygon
            points="13,0 13,58 26,66"
            className="fill-primary/80 dark:fill-primary-container"
          />
          {/* Subtle center crease highlight */}
          <line x1="13" y1="0" x2="13" y2="58" className="stroke-white/50" strokeWidth="1" />
        </svg>

        {/* Sanctuary Badge (Kaaba for Makkah, Green Dome for Madinah) */}
        <div
          className={cn(
            'bg-surface-container-high relative -mt-4 flex h-9 w-9 items-center justify-center rounded-full border-2 backdrop-blur-md transition-all duration-300',
            isAligned
              ? 'border-primary ring-primary/40 shadow-xl ring-4'
              : 'border-primary/70 dark:border-primary/90 shadow-lg'
          )}
        >
          {sanctuary === 'madinah' ? (
            <MadinahIcon size={18} className="text-primary" />
          ) : (
            <KaabaIcon size={18} className="text-primary" />
          )}
        </div>
      </div>

      {/* South / Opposite Arrow (Luminous Platinum Silver with Crisp Visibility in Dark Mode) */}
      <div className="flex flex-1 flex-col items-center justify-end drop-shadow-md">
        <svg
          width="26"
          height="66"
          viewBox="0 0 26 66"
          className="overflow-visible"
          aria-hidden="true"
        >
          {/* Left Facet: Bright silver/white */}
          <polygon points="13,66 0,0 13,8" className="fill-slate-200 dark:fill-slate-100" />
          {/* Right Facet: Steel silver for 3D depth */}
          <polygon points="13,66 13,8 26,0" className="fill-slate-400 dark:fill-slate-300" />
          {/* Center crease line */}
          <line x1="13" y1="8" x2="13" y2="66" className="stroke-slate-500/40" strokeWidth="1" />
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
  sanctuary = 'makkah',
}: CompassDialProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'relative flex h-60 w-60 items-center justify-center select-none sm:h-72 sm:w-72 md:h-80 md:w-80',
        className
      )}
    >
      <div
        style={isAligned ? ALIGNED_RING_STYLE : undefined}
        className={cn(
          'glass-panel border-outline-variant/30 absolute inset-0 rounded-full border transition-all duration-500 ease-out',
          isAligned && 'border-primary/70 bg-primary/[0.04]'
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
