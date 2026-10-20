import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import type { CityPreset } from '@/features/qiblah/types/qiblah.types';

export const POPULAR_CITIES: CityPreset[] = [
  { id: 'makkah', name: 'Makkah', latitude: 21.4225, longitude: 39.8262 },
  { id: 'madinah', name: 'Madinah', latitude: 24.4686, longitude: 39.6142 },
  { id: 'cairo', name: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
  { id: 'london', name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { id: 'new-york', name: 'New York', latitude: 40.7128, longitude: -74.006 },
  { id: 'dubai', name: 'Dubai', latitude: 25.2048, longitude: 55.2708 },
  { id: 'istanbul', name: 'Istanbul', latitude: 41.0082, longitude: 28.9784 },
  { id: 'karachi', name: 'Karachi', latitude: 24.8607, longitude: 67.0011 },
];

export interface QiblahLocationPickerProps {
  currentCity: string;
  onSelectCity: (preset: CityPreset) => void;
  onDetectGps: () => void;
  isDetectingGps?: boolean;
}

export function QiblahLocationPicker({
  currentCity,
  onSelectCity,
  onDetectGps,
  isDetectingGps = false,
}: QiblahLocationPickerProps) {
  const t = useTranslations('Qiblah');

  return (
    <Box as="div" className="gap-sm flex w-full max-w-md flex-col">
      {/* GPS Detector Bar */}
      <Box as="div" className="gap-xs flex items-center justify-between">
        <Box as="div" className="gap-xs text-on-surface-variant flex items-center">
          <Icon name="MapPin" size={16} className="text-primary" />
          <Text as="span" variant="body-md" className="font-medium">
            {currentCity}
          </Text>
        </Box>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDetectGps}
          disabled={isDetectingGps}
          aria-label={t('detectLocation')}
          className="gap-xs flex items-center"
        >
          <Icon name="Navigation" size={14} />
          {t('detectLocation')}
        </Button>
      </Box>

      {/* Preset Cities Chips */}
      <Box as="div" className="hide-scrollbar gap-xs flex w-full overflow-x-auto py-1">
        {POPULAR_CITIES.map((city) => {
          const isSelected = city.name === currentCity;
          return (
            <Button
              key={city.id}
              size="sm"
              variant={isSelected ? 'primary' : 'ghost'}
              onClick={() => onSelectCity(city)}
              aria-label={`${t('selectCity')}: ${city.name}`}
              className="text-label-sm shrink-0 rounded-full whitespace-nowrap"
            >
              {city.name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
