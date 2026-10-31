'use client';

import { Icon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';
import { useMobileDrawer } from '@/components/layout/use-mobile-drawer';

export function TopBar() {
  const t = useTranslations('Nav');
  const { open } = useMobileDrawer();

  return (
    <Box
      as="header"
      className="border-outline-variant/30 bg-surface/85 px-margin-mobile md:px-margin-desktop sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between border-b backdrop-blur-xl"
    >
      <Box as="div" className="gap-xs flex items-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('menu')}
          onClick={open}
          className="text-on-surface-variant hover:text-on-surface hover:bg-primary/10 focus-visible:ring-primary focus-visible:ring-offset-surface rounded-full transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 md:hidden"
        >
          <Icon name="Menu" size={24} />
        </Button>

        <Text
          as="h1"
          variant="headline-lg-mobile"
          className="text-primary tracking-tight md:hidden"
        >
          {t('brandName')}
        </Text>
      </Box>

      {/* Desktop header utilities */}
      <Box as="div" className="gap-sm hidden items-center md:flex">
        <Tooltip content={t('profile')} position="bottom">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('account')}
            className="bg-surface-container dark:bg-surface-container-low text-on-surface hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container-highest focus-visible:ring-primary focus-visible:ring-offset-surface rounded-full transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Icon name="User" size={20} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
