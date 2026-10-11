import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/shared/utils/cn';

export interface ImageProps extends NextImageProps {
  containerClassName?: string;
}

export function Image({ className, containerClassName, alt, ...props }: ImageProps) {
  return (
    <div className={cn('bg-surface-dim relative overflow-hidden rounded-md', containerClassName)}>
      <NextImage className={cn('object-cover', className)} alt={alt ?? ''} {...props} />
    </div>
  );
}
