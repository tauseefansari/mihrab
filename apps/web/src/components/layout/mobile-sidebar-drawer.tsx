'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Icon, type IconName } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useMobileDrawer } from '@/components/layout/use-mobile-drawer';
import { handleArrowNavigation } from '@/shared/utils/keyboard-nav';
import { cn } from '@/shared/utils/cn';

interface DrawerNavItemProps {
  href: string;
  icon: IconName;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function DrawerNavItem({ href, icon, label, isActive, onClick }: DrawerNavItemProps) {
  const currentAttr = isActive ? { 'aria-current': 'page' as const } : {};
  return (
    <Link
      href={href}
      onClick={onClick}
      {...currentAttr}
      className={cn(
        'group gap-md px-md py-sm focus-visible:ring-primary focus-visible:ring-offset-surface flex items-center rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        isActive
          ? 'border-primary bg-primary/10 text-primary hover:bg-primary/20 dark:hover:bg-primary/20 border-s-4 font-bold'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-highest'
      )}
    >
      <Box as="div" className="transition-transform group-hover:scale-110">
        <Icon name={icon} size={22} />
      </Box>
      <Text as="span" variant="body-md">
        {label}
      </Text>
    </Link>
  );
}

function DrawerHeader({
  brandName,
  closeLabel,
  onClose,
}: {
  brandName: string;
  closeLabel: string;
  onClose: () => void;
}) {
  return (
    <Box
      as="div"
      className="border-outline-variant/20 px-md py-sm flex items-center justify-between border-b"
    >
      <Text as="h2" variant="headline-lg-mobile" className="text-primary tracking-tight">
        {brandName}
      </Text>
      <Button
        variant="ghost"
        size="icon"
        aria-label={closeLabel}
        onClick={onClose}
        className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-highest focus-visible:ring-primary focus-visible:ring-offset-surface rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Icon name="X" size={20} />
      </Button>
    </Box>
  );
}

function DrawerFooter() {
  return (
    <Box
      as="div"
      className="border-outline-variant/20 p-md gap-sm mt-auto flex items-center justify-between border-t"
    >
      <LanguageSwitcher />
      <ThemeSwitcher />
    </Box>
  );
}

function useDrawerEscape(isOpen: boolean, close: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);
}

interface DrawerNavListProps {
  isLinkActive: (href: string) => boolean;
  onClose: () => void;
  homeLabel: string;
  quranLabel: string;
  prayersLabel: string;
  libraryLabel: string;
  tasbeehLabel: string;
  qiblahLabel: string;
  zakatLabel: string;
  settingsLabel: string;
  navLabel: string;
}

function DrawerNavList({
  isLinkActive,
  onClose,
  homeLabel,
  quranLabel,
  prayersLabel,
  libraryLabel,
  tasbeehLabel,
  qiblahLabel,
  zakatLabel,
  settingsLabel,
  navLabel,
}: DrawerNavListProps) {
  return (
    <Box
      as="nav"
      aria-label={navLabel}
      onKeyDown={handleArrowNavigation}
      className="p-sm gap-xs flex flex-1 flex-col overflow-y-auto"
    >
      <DrawerNavItem
        href="/"
        icon="House"
        label={homeLabel}
        isActive={isLinkActive('/')}
        onClick={onClose}
      />
      <DrawerNavItem
        href="/quran"
        icon="BookOpen"
        label={quranLabel}
        isActive={isLinkActive('/quran')}
        onClick={onClose}
      />
      <DrawerNavItem
        href="/prayers"
        icon="Clock"
        label={prayersLabel}
        isActive={isLinkActive('/prayers')}
        onClick={onClose}
      />
      <DrawerNavItem
        href="/library"
        icon="Library"
        label={libraryLabel}
        isActive={isLinkActive('/library')}
        onClick={onClose}
      />
      <DrawerNavItem
        href="/tasbeeh"
        icon="Sun"
        label={tasbeehLabel}
        isActive={isLinkActive('/tasbeeh')}
        onClick={onClose}
      />
      <DrawerNavItem
        href="/qiblah"
        icon="Compass"
        label={qiblahLabel}
        isActive={isLinkActive('/qiblah')}
        onClick={onClose}
      />
      <DrawerNavItem
        href="/zakat"
        icon="Coins"
        label={zakatLabel}
        isActive={isLinkActive('/zakat')}
        onClick={onClose}
      />
      <DrawerNavItem
        href="/settings"
        icon="Settings"
        label={settingsLabel}
        isActive={isLinkActive('/settings')}
        onClick={onClose}
      />
    </Box>
  );
}

export function MobileSidebarDrawer() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const { isOpen, close } = useMobileDrawer();

  useDrawerEscape(isOpen, close);

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <Box
      as="div"
      className={cn(
        'fixed inset-0 z-50 transition-all duration-300 ease-in-out md:hidden',
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-300'
      )}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-label={t('navigationMenu')}
    >
      {/* Backdrop with smooth fade and blur */}
      <Box
        as="div"
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={close}
      />

      {/* Sliding Panel from start edge */}
      <Box
        as="div"
        className={cn(
          'bg-surface border-outline-variant/30 fixed inset-y-0 z-10 flex h-full w-72 flex-col border-e shadow-2xl transition-all duration-300 ease-out',
          isOpen ? 'start-0' : '-start-full'
        )}
      >
        <DrawerHeader brandName={t('brandName')} closeLabel={t('close')} onClose={close} />

        <DrawerNavList
          isLinkActive={isLinkActive}
          onClose={close}
          homeLabel={t('home')}
          quranLabel={t('quran')}
          prayersLabel={t('prayers')}
          libraryLabel={t('library')}
          tasbeehLabel={t('tasbeeh')}
          qiblahLabel={t('qiblah')}
          zakatLabel={t('zakat')}
          settingsLabel={t('settings')}
          navLabel={t('drawerNavigation')}
        />

        <DrawerFooter />
      </Box>
    </Box>
  );
}
