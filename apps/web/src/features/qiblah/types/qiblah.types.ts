export type SanctuaryId = 'makkah' | 'madinah';

export type SanctuaryLabelKey = 'sanctuaries.makkah' | 'sanctuaries.madinah';

export interface SanctuaryOption {
  id: SanctuaryId;
  labelKey: SanctuaryLabelKey;
}
