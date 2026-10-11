import { Icon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function TopBar() {
  const t = useTranslations('Nav');

  return (
    <Box
      as="header"
      className="border-outline-variant/30 bg-surface/80 px-margin-mobile pt-safe md:px-margin-desktop sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b backdrop-blur-xl md:pt-0"
    >
      <Box as="div" className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Menu"
          className="text-on-surface-variant hover:bg-primary/5 dark:text-on-secondary-container dark:hover:bg-primary-fixed/5 -ms-2 rounded-full transition-colors transition-transform active:scale-95 md:hidden"
        >
          <Icon name="Menu" size={24} />
        </Button>

        <Text
          as="h1"
          variant="headline-lg-mobile"
          className="text-primary dark:text-primary-fixed-dim tracking-tight md:hidden"
        >
          {t('brandName')}
        </Text>
      </Box>

      <Box as="div" className="gap-sm flex items-center">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Tooltip content="Notifications" position="bottom">
          <Button
            variant="ghost"
            size="icon"
            className="bg-surface-container text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
          >
            <Icon name="Bell" size={20} />
          </Button>
        </Tooltip>
        <Tooltip content="Profile" position="bottom">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Account"
            className="bg-surface-container text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
          >
            <Icon name="User" size={20} />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
