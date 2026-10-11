import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard } from '@/components/ui/glass-card';
import { Icon } from '@/components/ui/icon';

function PrayerRow({ name, time, isActive }: { name: string; time: string; isActive?: boolean }) {
  if (isActive) {
    return (
      <Box
        as="div"
        className="-mx-sm border-primary bg-primary/10 px-sm py-xs flex items-center justify-between rounded-lg border-s-2"
      >
        <Text as="span" variant="body-md" className="text-primary font-bold">
          {name}
        </Text>
        <Text as="span" variant="body-md" className="text-primary font-bold">
          {time}
        </Text>
      </Box>
    );
  }
  return (
    <Box
      as="div"
      className="border-outline-variant/20 py-xs flex items-center justify-between border-b last:border-none"
    >
      <Text as="span" variant="body-md" className="text-on-surface-variant">
        {name}
      </Text>
      <Text as="span" variant="body-md" className="text-on-background">
        {time}
      </Text>
    </Box>
  );
}

export async function PrayerTimesWidget() {
  const t = await getTranslations('Dashboard');

  return (
    <GlassCard className="group p-md hover:border-primary/20 hover:bg-surface/85 relative flex flex-col overflow-hidden transition-all md:col-span-8">
      <Box
        as="div"
        className="bg-primary/5 pointer-events-none absolute end-0 top-0 -me-10 -mt-10 h-64 w-64 rounded-full blur-3xl"
      />
      <Box as="div" className="z-10 mb-auto flex items-start justify-between">
        <Box as="div">
          <Text
            as="h3"
            variant="label-sm"
            className="mb-unit text-on-surface-variant tracking-wider uppercase"
          >
            {t('nextPrayer')}
          </Text>
          <Box
            as="div"
            className="gap-sm font-headline-lg text-headline-lg text-primary flex items-center"
          >
            {t('asr')}{' '}
            <Text as="span" variant="body-md" className="text-on-surface-variant">
              {t('inTime')}
            </Text>
          </Box>
        </Box>
        <Box
          as="div"
          className="gap-xs bg-primary-container px-sm py-xs font-label-sm text-on-primary-container flex items-center rounded-full"
        >
          <Icon name="MapPin" size={16} />
          {t('location')}
        </Box>
      </Box>

      <Box as="div" className="mt-lg gap-unit z-10 flex w-full flex-col">
        <PrayerRow name={t('fajr')} time="03:15 AM" />
        <PrayerRow name={t('dhuhr')} time="01:06 PM" />
        <PrayerRow name={t('asr')} time="05:25 PM" isActive />
        <PrayerRow name={t('maghrib')} time="09:18 PM" />
        <PrayerRow name={t('isha')} time="10:45 PM" />
      </Box>
    </GlassCard>
  );
}
