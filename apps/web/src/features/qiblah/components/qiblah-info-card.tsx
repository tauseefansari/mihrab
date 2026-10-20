import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/glass-card';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export interface QiblahInfoCardProps {
  bearing: number;
  cardinal: string;
  distanceKm: number;
  className?: string;
}

export function QiblahInfoCard({ bearing, cardinal, distanceKm, className }: QiblahInfoCardProps) {
  const t = useTranslations('Qiblah');
  const formattedDistance = new Intl.NumberFormat().format(distanceKm);

  return (
    <Box as="div" className={`gap-md grid w-full max-w-md grid-cols-2 ${className ?? ''}`}>
      {/* Angle Metadata Card */}
      <GlassCard className="p-md flex flex-col items-center justify-center rounded-xl text-center">
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
