import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard } from '@/components/ui/glass-card';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';

export default async function HomePage() {
  const t = await getTranslations('Dashboard');
  const tCommon = await getTranslations('Index');
  const tNav = await getTranslations('Nav');

  return (
    <Box as="div" className="w-full pt-16 pb-24 md:pt-0 md:pb-0">
      {/* Page Header */}
      <Box as="div" className="mb-lg">
        <Text as="h2" variant="display-lg" className="mb-unit text-on-background">
          {t('greeting')}
        </Text>
        <Text as="p" variant="body-md" className="text-on-surface-variant">
          {t('date')}
        </Text>
      </Box>

      {/* Clean Welcome Surface */}
      <GlassCard className="gap-md p-lg border-outline-variant/30 flex w-full max-w-2xl flex-col items-start backdrop-blur-xl">
        <Box
          as="div"
          className="bg-primary/10 text-primary p-sm inline-flex items-center justify-center rounded-2xl"
        >
          <Icon name="Compass" size={32} />
        </Box>

        <Box as="div" className="space-y-xs">
          <Text as="h3" variant="headline-lg" className="text-on-background">
            {tCommon('title')}
          </Text>
          <Text as="p" variant="body-md" className="text-on-surface-variant">
            {tCommon('description')}
          </Text>
        </Box>

        <Link
          href="/qiblah"
          className="bg-primary text-on-primary hover:bg-primary-container dark:hover:bg-primary/90 focus-visible:ring-primary focus-visible:ring-offset-surface gap-xs px-md py-sm inline-flex items-center justify-center rounded-xl font-semibold shadow-sm transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
        >
          <Icon name="Compass" size={20} />
          <Text as="span">{tNav('qiblah')}</Text>
        </Link>
      </GlassCard>
    </Box>
  );
}
