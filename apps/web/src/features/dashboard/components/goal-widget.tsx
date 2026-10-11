import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard } from '@/components/ui/glass-card';

export async function GoalWidget() {
  const t = await getTranslations('Dashboard');

  return (
    <GlassCard className="p-md hover:border-primary/20 hover:bg-surface/85 flex flex-col justify-center transition-all md:col-span-6">
      <Box as="div" className="mb-sm flex items-center justify-between">
        <Text as="h3" variant="body-md" className="text-on-background font-medium">
          {t('dailyGoalProgress')}
        </Text>
        <Text
          as="span"
          variant="label-sm"
          className="bg-primary/10 px-xs py-unit text-primary rounded"
        >
          75%
        </Text>
      </Box>
      <Box
        as="div"
        className="mb-xs bg-surface-container-high h-2 w-full overflow-hidden rounded-full"
      >
        <Box as="div" className="bg-primary h-2 w-3/4 rounded-full" />
      </Box>
      <Text as="p" variant="label-sm" className="text-on-surface-variant">
        {t('tasksCompleted')}
      </Text>
    </GlassCard>
  );
}
