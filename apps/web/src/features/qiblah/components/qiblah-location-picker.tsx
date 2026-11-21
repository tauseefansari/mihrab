'use client';

import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { SanctuaryIcon } from '@/components/ui/sanctuary-icon';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { SANCTUARY_OPTIONS } from '@/features/qiblah/constants/qiblah.constants';
import { formatCoordinates } from '@/features/qiblah/utils/qiblah.utils';
import type { SanctuaryId } from '@/features/qiblah/types/qiblah.types';
import { cn } from '@/shared/utils/cn';

export interface QiblahLocationPickerProps {
  currentCity: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
  selectedSanctuary?: SanctuaryId | undefined;
  onSelectSanctuary?: ((sanctuary: SanctuaryId) => void) | undefined;
  className?: string | undefined;
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

      <ToggleGroup<SanctuaryId>
        ariaLabel={t('selectSanctuary')}
        value={selectedSanctuary}
        onValueChange={(val) => onSelectSanctuary?.(val)}
        options={SANCTUARY_OPTIONS.map((option) => ({
          value: option.id,
          label: t(option.labelKey),
          icon: <SanctuaryIcon sanctuary={option.id} size={22} />,
          ariaLabel: t(option.labelKey),
        }))}
        className="w-full"
      />
    </Box>
  );
}
