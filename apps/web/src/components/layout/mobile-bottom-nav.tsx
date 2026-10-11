import { useTranslations } from 'next-intl';
import { Icon, IconName } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface MobileNavItemProps {
  href: string;
  icon: IconName;
  label: string;
  isActive?: boolean;
}

const MobileNavItem = ({ href, icon, label, isActive }: MobileNavItemProps) => {
  if (isActive) {
    return (
      <Link
        href={href}
        className="text-primary dark:text-primary-fixed-dim hover:text-primary relative flex w-16 flex-col items-center justify-center gap-1 transition-colors transition-transform active:scale-90"
      >
        <Icon name={icon} size={24} />
        <Text as="span" variant="label-sm">
          {label}
        </Text>
        <Box
          as="span"
          className="bg-primary absolute -bottom-1 h-1 w-1 animate-pulse rounded-full"
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="text-on-surface-variant hover:text-primary dark:text-on-secondary-container flex w-16 flex-col items-center justify-center gap-1 transition-colors transition-transform active:scale-90"
    >
      <Icon name={icon} size={24} />
      <Text as="span" variant="label-sm">
        {label}
      </Text>
    </Link>
  );
};

export function MobileBottomNav() {
  const t = useTranslations('Nav');

  return (
    <Box
      as="nav"
      className="border-outline-variant/30 bg-surface/80 px-gutter pb-safe dark:bg-inverse-surface/80 fixed bottom-0 z-50 flex h-20 w-full items-center justify-around border-t shadow-lg backdrop-blur-xl md:hidden"
    >
      <MobileNavItem href="/" icon="House" label={t('home')} isActive />
      <MobileNavItem href="/quran" icon="BookOpen" label={t('quran')} />
      <MobileNavItem href="/prayers" icon="Clock" label={t('prayers')} />
      <MobileNavItem href="/library" icon="Library" label={t('library')} />
    </Box>
  );
}
