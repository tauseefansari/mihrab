import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  variant?:
    | 'display-lg'
    | 'headline-lg'
    | 'headline-lg-mobile'
    | 'body-md'
    | 'arabic-display'
    | 'arabic-body'
    | 'label-sm';
}

export function Text({ as: Component = 'p', variant = 'body-md', className, ...props }: TextProps) {
  const variantClasses = {
    'display-lg': 'text-5xl leading-tight font-bold tracking-tight font-sans',
    'headline-lg': 'text-4xl leading-tight font-semibold tracking-tight font-sans',
    'headline-lg-mobile': 'text-2xl leading-tight font-semibold font-sans',
    'body-md': 'text-base leading-relaxed font-normal font-sans',
    'arabic-display': 'text-4xl leading-loose font-normal font-arabic',
    'arabic-body': 'text-xl leading-loose font-normal font-arabic',
    'label-sm': 'text-xs leading-none font-medium tracking-wide font-sans',
  };

  return <Component className={cn(variantClasses[variant], className)} {...props} />;
}
