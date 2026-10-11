import { useTranslations } from 'next-intl';
import { Icon, IconName } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface NavItemProps {
  href: string;
  icon: IconName;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => {
  if (isActive) {
    return (
      <Link
        href={href}
        className="group gap-md border-primary bg-primary/10 px-md py-sm text-primary hover:bg-surface-container-highest flex items-center rounded-xl border-s-4 font-bold transition-all duration-200"
      >
        <Icon name={icon} size={24} />
        <Text as="span" variant="body-md">
          {label}
        </Text>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high flex items-center rounded-xl transition-all duration-200"
    >
      <Box as="div" className="transition-transform group-hover:translate-x-1">
        <Icon name={icon} size={24} />
      </Box>
      <Text as="span" variant="body-md">
        {label}
      </Text>
    </Link>
  );
};

export function DesktopSidebar() {
  const t = useTranslations('Nav');

  return (
    <Box
      as="nav"
      className="border-outline-variant/30 bg-surface p-md sticky top-0 z-50 hidden h-screen w-64 flex-col border-e md:flex"
    >
      <Box as="div" className="mb-xl px-sm">
        <Text as="h1" variant="headline-lg" className="text-primary tracking-tight">
          {t('brandName')}
        </Text>
      </Box>

      <Box as="div" className="hide-scrollbar space-y-unit flex-1 overflow-y-auto">
        <NavItem href="/" icon="House" label={t('home')} isActive />
        <NavItem href="/quran" icon="BookOpen" label={t('quran')} />
        <NavItem href="/prayers" icon="Clock" label={t('prayers')} />
        <NavItem href="/library" icon="Library" label={t('library')} />
        <NavItem href="/tasbeeh" icon="Sun" label={t('tasbeeh')} />
        <NavItem href="/qiblah" icon="Compass" label={t('qiblah')} />
        <NavItem href="/zakat" icon="Coins" label={t('zakat')} />
      </Box>

      <Box as="div" className="border-outline-variant/20 pt-md mt-auto border-t">
        <NavItem href="/settings" icon="Settings" label={t('settings')} />
      </Box>
    </Box>
  );
}
