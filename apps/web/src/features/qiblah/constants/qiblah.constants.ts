import type { Coordinates } from '@/core/services/qiblah.service';
import type { SanctuaryId, SanctuaryOption } from '@/features/qiblah/types/qiblah.types';

export const SANCTUARY_OPTIONS: readonly SanctuaryOption[] = [
  { id: 'makkah', labelKey: 'sanctuaries.makkah' },
  { id: 'madinah', labelKey: 'sanctuaries.madinah' },
] as const;

export const SANCTUARY_TARGETS: Record<SanctuaryId, Coordinates> = {
  makkah: {
    latitude: 21.4225,
    longitude: 39.8262,
  },
  madinah: {
    latitude: 24.4686,
    longitude: 39.6142,
  },
} as const;

export const DEFAULT_USER_LOCATION = {
  latitude: 19.076,
  longitude: 72.8777,
  cityKey: 'defaultCity',
} as const;
