import type { AnchorHTMLAttributes, ReactNode, Ref } from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/shared/utils/cn';

export interface LinkProps
  extends NextLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  children: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

export function Link({ className, children, ref, ...props }: LinkProps) {
  const isExternal =
    typeof props.href === 'string' &&
    (props.href.startsWith('http') || props.href.startsWith('mailto:'));

  return (
    <NextLink
      ref={ref}
      className={cn(
        'cursor-pointer underline-offset-4 transition-colors',
        !className?.includes('text-') &&
          'text-primary hover:text-primary-container dark:hover:text-primary',
        isExternal && 'hover:underline',
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
