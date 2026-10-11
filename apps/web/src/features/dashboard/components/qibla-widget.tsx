import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard } from '@/components/ui/glass-card';
import { Icon } from '@/components/ui/icon';

export async function QiblaWidget() {
  const t = await getTranslations('Dashboard');

  return (
    <GlassCard className="gap-md p-md hover:border-primary/20 hover:bg-surface/85 flex items-center transition-all md:col-span-6">
      <Box
        as="div"
        className="bg-surface-container relative flex h-16 w-16 items-center justify-center rounded-full"
      >
        <Icon
          name="Compass"
          size={32}
          className="text-primary absolute"
          style={{ transform: 'rotate(115deg)' }}
        />
        {/* Subtle pulse ring */}
        <Box
          as="div"
          className="border-primary/30 absolute inset-0 animate-pulse rounded-full border"
        />
      </Box>
      <Box as="div">
        <Text as="h3" variant="headline-lg-mobile" className="text-on-background">
          115° SE
        </Text>
        <Text as="p" variant="body-md" className="text-on-surface-variant">
          {t('qiblaDirection')}
        </Text>
      </Box>
    </GlassCard>
  );
}
