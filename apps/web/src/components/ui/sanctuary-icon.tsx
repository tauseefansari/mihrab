import type { SanctuaryId } from '@/features/qiblah/types/qiblah.types';

export interface SanctuaryIconProps {
  sanctuary: SanctuaryId;
  size?: number | undefined;
  className?: string | undefined;
}

interface IconProps {
  size?: number | undefined;
  className?: string | undefined;
}

function KaabaIcon({ size = 18, className }: IconProps) {
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
      <rect x="4" y="6" width="16" height="14" rx="2" className="fill-current" />
      <line x1="4" y1="10" x2="20" y2="10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <rect x="13" y="12" width="4" height="6" rx="0.75" fill="#f59e0b" />
    </svg>
  );
}

function MadinahIcon({ size = 18, className }: IconProps) {
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
      <path
        d="M6 14C6 8.5 12 5.5 12 5.5C12 5.5 18 8.5 18 14H6Z"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="1"
      />
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
      <rect x="4" y="14" width="16" height="6" rx="1" className="fill-current opacity-90" />
      <path
        d="M8 20V17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17V20M14 20V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V20"
        stroke="var(--surface-container-lowest, #0c0f0c)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function SanctuaryIcon({ sanctuary, size = 18, className }: SanctuaryIconProps) {
  if (sanctuary === 'madinah') {
    return <MadinahIcon size={size} className={className} />;
  }
  return <KaabaIcon size={size} className={className} />;
}
