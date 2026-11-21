'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Icon, type IconName } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { cn } from '@/shared/utils/cn';

interface MobileNavItemProps {
  href: string;
  icon: IconName;
  label: string;
  isActive?: boolean;
}

function MobileNavItem({ href, icon, label, isActive }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group focus-visible:ring-primary focus-visible:ring-offset-surface relative flex flex-1 flex-col items-center justify-center rounded-xl py-1 transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-90',
        isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
      )}
    >
      <Box
        as="div"
        className={cn(
          'flex items-center justify-center rounded-full px-3.5 py-1 transition-all duration-300 ease-out',
          isActive
            ? 'bg-primary/15 text-primary scale-110 shadow-sm'
            : 'group-hover:bg-surface-container-high dark:group-hover:bg-surface-container-highest group-hover:scale-105'
        )}
      >
        <Icon
          name={icon}
          size={20}
          className={cn(
            'transition-transform duration-300 ease-out',
            isActive ? 'scale-110' : 'group-hover:scale-110'
          )}
        />
      </Box>
      <Text
        as="span"
        variant="label-sm"
        className={cn(
          'mt-0.5 max-w-16 truncate text-center transition-all duration-300 ease-out',
          isActive ? 'scale-100 font-bold opacity-100' : 'scale-95 opacity-80'
        )}
      >
        {label}
      </Text>
    </Link>
  );
}

export function MobileBottomNav() {
  const t = useTranslations('Nav');
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <Box
      as="nav"
      aria-label={t('navigationMenu')}
      className="border-outline-variant/30 bg-surface/90 dark:bg-surface/95 fixed inset-x-0 bottom-0 z-40 flex h-16 w-full items-center justify-around border-t shadow-lg backdrop-blur-xl md:hidden"
    >
      <MobileNavItem href="/" icon="House" label={t('home')} isActive={isLinkActive('/')} />
      <MobileNavItem
        href="/quran"
        icon="BookOpen"
        label={t('quran')}
        isActive={isLinkActive('/quran')}
      />
      <MobileNavItem
        href="/prayers"
        icon="Clock"
        label={t('prayers')}
        isActive={isLinkActive('/prayers')}
      />
      <MobileNavItem
        href="/qiblah"
        icon="Compass"
        label={t('qiblah')}
        isActive={isLinkActive('/qiblah')}
      />
      <MobileNavItem
        href="/library"
        icon="Library"
        label={t('library')}
        isActive={isLinkActive('/library')}
      />
    </Box>
  );
}
