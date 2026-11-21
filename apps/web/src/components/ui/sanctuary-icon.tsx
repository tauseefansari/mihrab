import type { SanctuaryId } from '@/features/qiblah/types/qiblah.types';
import KaabaSvg from '@/shared/assets/icons/kaaba.svg';
import MadinahSvg from '@/shared/assets/icons/madinah.svg';

export interface SanctuaryIconProps {
  sanctuary: SanctuaryId;
  size?: number | undefined;
  className?: string | undefined;
}

export function SanctuaryIcon({ sanctuary, size = 18, className }: SanctuaryIconProps) {
  if (sanctuary === 'madinah') {
    return <MadinahSvg width={size} height={size} className={className} aria-hidden="true" />;
  }
  return <KaabaSvg width={size} height={size} className={className} aria-hidden="true" />;
}
