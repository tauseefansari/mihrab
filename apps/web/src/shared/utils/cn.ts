import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { TYPOGRAPHY_VARIANTS } from '@/shared/constants/typography.constants';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...TYPOGRAPHY_VARIANTS] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
