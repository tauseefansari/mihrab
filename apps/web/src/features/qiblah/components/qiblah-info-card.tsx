import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/glass-card';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { cn } from '@/shared/utils/cn';

export interface QiblahInfoCardProps {
  bearing: number;
  cardinal: string;
  distanceKm: number;
  isAligned?: boolean;
  className?: string;
}

export function QiblahInfoCard({
  bearing,
  cardinal,
  distanceKm,
  isAligned = false,
  className,
}: QiblahInfoCardProps) {
  const t = useTranslations('Qiblah');
  const formattedDistance = new Intl.NumberFormat().format(distanceKm);

  return (
    <Box as="div" className={`gap-md grid w-full max-w-96 grid-cols-2 ${className ?? ''}`}>
      {/* Angle Metadata Card */}
      <GlassCard
        className={cn(
          'p-md flex flex-col items-center justify-center rounded-xl text-center transition-all duration-300',
          isAligned && 'border-primary/50 bg-primary/10 ring-primary/40 shadow-lg ring-1'
        )}
      >
        <Text as="span" variant="label-sm" className="text-on-surface-variant mb-1 uppercase">
          {t('angle')}
        </Text>
        <Box as="div" className="gap-xs flex items-baseline">
          <Text as="span" variant="headline-lg" className="text-primary font-semibold">
            {bearing}°
          </Text>
          <Text as="span" variant="body-md" className="text-on-surface-variant font-medium">
            {cardinal}
          </Text>
        </Box>
      </GlassCard>

      {/* Distance Metadata Card */}
      <GlassCard className="p-md flex flex-col items-center justify-center rounded-xl text-center">
        <Text as="span" variant="label-sm" className="text-on-surface-variant mb-1 uppercase">
          {t('distance')}
        </Text>
        <Box as="div" className="gap-xs flex items-baseline">
          <Text as="span" variant="headline-lg" className="text-on-background font-semibold">
            {formattedDistance}
          </Text>
          <Text as="span" variant="body-md" className="text-on-surface-variant font-medium">
            {t('km')}
          </Text>
        </Box>
      </GlassCard>
    </Box>
  );
}
