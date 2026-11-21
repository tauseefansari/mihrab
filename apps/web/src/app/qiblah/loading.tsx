import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { GlassCard } from '@/components/ui/glass-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';

export default function QiblahLoading() {
  const t = useTranslations('UI');

  return (
    <Box
      as="div"
      className="flex w-full flex-col items-center pt-16 pb-24 md:pt-0 md:pb-0"
      aria-busy="true"
      role="status"
    >
      <Text as="span" className="sr-only">
        {t('loading')}
      </Text>

      {/* Sanctuary Switcher Skeleton */}
      <GlassCard className="gap-xs p-xs mb-md flex w-full max-w-md backdrop-blur-xl">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 flex-1 rounded-xl" />
      </GlassCard>

      {/* Location Picker Skeleton */}
      <GlassCard className="px-md py-sm mb-md flex w-full max-w-md items-center justify-between backdrop-blur-xl">
        <Box as="div" className="gap-xs flex items-center">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </Box>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </GlassCard>

      {/* Compass Dial Card Skeleton */}
      <GlassCard className="gap-md p-lg flex w-full max-w-md flex-col items-center backdrop-blur-xl">
        <Skeleton className="h-72 w-72 rounded-full sm:h-80 sm:w-80" />
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-7 w-36 rounded-full" />
      </GlassCard>
    </Box>
  );
}
