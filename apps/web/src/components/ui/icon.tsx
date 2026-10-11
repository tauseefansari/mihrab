import type { SVGAttributes, SVGProps } from 'react';
import { icons } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export type IconName = keyof typeof icons;

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  color?: string;
}

export function Icon({ name, size = 24, color = 'currentColor', className, ...props }: IconProps) {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      className={cn('inline-block', className)}
      {...(props as SVGProps<SVGSVGElement>)}
    />
  );
}
