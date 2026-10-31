import type { HTMLAttributes, ElementType } from 'react';
import { cn } from '@/shared/utils/cn';
import type { TypographyVariant } from '@/shared/constants/typography.constants';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: ElementType;
  variant?: TypographyVariant;
}

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  'display-lg': 'text-display-lg leading-tight font-bold tracking-tight font-sans',
  'headline-lg': 'text-headline-lg leading-tight font-semibold tracking-tight font-sans',
  'headline-lg-mobile': 'text-headline-lg-mobile leading-tight font-semibold font-sans',
  'body-md': 'text-body-md leading-relaxed font-normal font-sans',
  'arabic-display': 'text-arabic-display leading-loose font-normal font-arabic',
  'arabic-body': 'text-arabic-body leading-loose font-normal font-arabic',
  'label-sm': 'text-label-sm leading-none font-medium tracking-wide font-sans',
};

export function Text({ as: Component = 'p', variant = 'body-md', className, ...props }: TextProps) {
  return <Component className={cn(VARIANT_CLASSES[variant], className)} {...props} />;
}
