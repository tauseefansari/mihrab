import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { GlassCard } from '@/components/ui/glass-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';

export default function Loading() {
  const t = useTranslations('UI');

  return (
    <Box as="div" className="w-full pt-16 pb-24 md:pt-0 md:pb-0" aria-busy="true" role="status">
      <Text as="span" className="sr-only">
        {t('loading')}
      </Text>

      {/* Header Skeleton */}
      <Box as="div" className="gap-xs mb-lg flex flex-col">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-5 w-32 rounded-lg" />
      </Box>

      {/* Hero Welcome Surface Skeleton */}
      <GlassCard className="gap-md p-lg border-outline-variant/30 flex w-full max-w-2xl flex-col items-start backdrop-blur-xl">
        <Skeleton className="h-14 w-14 rounded-2xl" />

        <Box as="div" className="gap-xs flex w-full flex-col">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-full max-w-md rounded-lg" />
          <Skeleton className="h-4 w-3/4 max-w-sm rounded-lg" />
        </Box>

        <Skeleton className="mt-xs h-11 w-36 rounded-xl" />
      </GlassCard>
    </Box>
  );
}
