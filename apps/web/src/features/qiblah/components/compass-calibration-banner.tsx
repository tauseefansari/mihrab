import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/glass-card';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { CalibrationMotionGraphic } from '@/components/ui/calibration-motion-graphic';
import { cn } from '@/shared/utils/cn';

export interface CompassCalibrationBannerProps {
  onDismiss: () => void;
  className?: string;
}

export function CompassCalibrationBanner({ onDismiss, className }: CompassCalibrationBannerProps) {
  const t = useTranslations('Qiblah');

  return (
    <GlassCard
      className={cn(
        'p-md border-primary/40 bg-surface-container/70 shadow-surface-elevated relative flex w-full max-w-96 flex-col items-center rounded-2xl border text-center backdrop-blur-md transition-all duration-300',
        className
      )}
    >
      <Box as="div" className="absolute end-3 top-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          aria-label={t('calibrationDone')}
          className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high h-8 w-8"
        >
          <Icon name="X" size={16} className="text-on-surface-variant" />
        </Button>
      </Box>

      <Box as="div" className="gap-xs mb-xs flex items-center justify-center">
        <Icon name="Compass" size={18} className="text-primary" />
        <Text as="h3" variant="body-md" className="text-on-surface font-semibold">
          {t('calibrateTitle')}
        </Text>
      </Box>

      <Text
        as="p"
        variant="label-sm"
        className="text-on-surface-variant mb-md px-sm w-full text-center"
      >
        {t('calibrateInstruction')}
      </Text>

      <CalibrationMotionGraphic
        size={84}
        className="mb-md"
        ariaLabel={t('calibrationIllustration')}
      />

      <Button
        variant="primary"
        size="sm"
        onClick={onDismiss}
        aria-label={t('calibrationDone')}
        className="gap-xs px-lg rounded-full font-medium"
      >
        <Icon name="Check" size={16} />
        {t('calibrationDone')}
      </Button>
    </GlassCard>
  );
}
