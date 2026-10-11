import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { PrayerTimesWidget } from '@/features/dashboard/components/prayer-times-widget';
import { AyahWidget } from '@/features/dashboard/components/ayah-widget';
import { QiblaWidget } from '@/features/dashboard/components/qibla-widget';
import { GoalWidget } from '@/features/dashboard/components/goal-widget';

export default async function HomePage() {
  const t = await getTranslations('Dashboard');

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

      {/* Dashboard Bento Grid */}
      <Box
        as="div"
        className="gap-md grid grid-cols-1 md:grid-cols-12"
        style={{ gridAutoRows: 'minmax(180px, auto)' }}
      >
        <PrayerTimesWidget />
        <AyahWidget />
        <QiblaWidget />
        <GoalWidget />
      </Box>
    </Box>
  );
}
