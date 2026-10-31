'use client';

import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { SANCTUARY_OPTIONS } from '@/features/qiblah/constants/qiblah.constants';
import { formatCoordinates } from '@/features/qiblah/utils/qiblah.utils';
import type { SanctuaryId } from '@/features/qiblah/types/qiblah.types';
import { cn } from '@/shared/utils/cn';

export interface QiblahLocationPickerProps {
  currentCity: string;
  latitude?: number;
  longitude?: number;
  selectedSanctuary?: SanctuaryId;
  onSelectSanctuary?: (sanctuary: SanctuaryId) => void;
  className?: string;
}

export function QiblahLocationPicker({
  currentCity,
  latitude,
  longitude,
  selectedSanctuary = 'makkah',
  onSelectSanctuary,
  className,
}: QiblahLocationPickerProps) {
  const t = useTranslations('Qiblah');
  const formattedCoords =
    latitude !== undefined && longitude !== undefined
      ? formatCoordinates(latitude, longitude)
      : null;

  return (
    <Box as="div" className={cn('gap-sm flex w-full max-w-96 flex-col items-center', className)}>
      {/* City / Location Display */}
      <Box
        as="div"
        className="gap-xs text-on-surface-variant flex items-center justify-center py-1"
      >
        <Icon name="MapPin" size={16} className="text-primary shrink-0" />
        <Text as="span" variant="body-md" className="text-on-background font-medium">
          {currentCity}
        </Text>
        {formattedCoords && (
          <Text as="span" variant="label-sm" className="text-on-surface-variant">
            ({formattedCoords})
          </Text>
        )}
      </Box>

      {/* Preset Sanctuaries Chips */}
      <Box as="div" className="gap-xs flex w-full py-1">
        {SANCTUARY_OPTIONS.map((option) => {
          const isSelected = selectedSanctuary === option.id;
          return (
            <Button
              key={option.id}
              size="sm"
              variant={isSelected ? 'primary' : 'ghost'}
              onClick={() => onSelectSanctuary?.(option.id)}
              aria-label={t(option.labelKey)}
              className={cn(
                'text-label-sm flex-1 rounded-full whitespace-nowrap transition-all',
                isSelected
                  ? 'bg-primary dark:bg-primary-container dark:border-primary/30 font-medium text-white hover:text-white dark:border dark:text-white'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40'
              )}
            >
              {t(option.labelKey)}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
