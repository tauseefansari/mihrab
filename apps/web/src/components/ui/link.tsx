import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/shared/utils/cn';
import React from 'react';

export interface LinkProps
  extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  children: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    const isExternal =
      typeof props.href === 'string' &&
      (props.href.startsWith('http') || props.href.startsWith('mailto:'));

    return (
      <NextLink
        ref={ref}
        className={cn(
          'text-primary hover:text-primary-container underline-offset-4 transition-colors',
          isExternal && 'hover:underline',
          className
        )}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);
Link.displayName = 'Link';
