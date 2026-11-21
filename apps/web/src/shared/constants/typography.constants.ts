export const TYPOGRAPHY_VARIANTS = [
  'display-lg',
  'headline-lg',
  'headline-lg-mobile',
  'body-md',
  'arabic-display',
  'arabic-body',
  'label-sm',
] as const;

export type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number];
