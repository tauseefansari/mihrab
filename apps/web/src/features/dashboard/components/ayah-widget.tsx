import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard } from '@/components/ui/glass-card';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export async function AyahWidget() {
  const t = await getTranslations('Dashboard');

  return (
    <GlassCard className="p-md hover:border-primary/20 hover:bg-surface/85 relative flex flex-col justify-between overflow-hidden transition-all md:col-span-4">
      <Box
        as="div"
        className="from-surface-container-low to-surface absolute inset-0 bg-gradient-to-br opacity-50"
      />
      <Box as="div" className="relative z-10">
        <Box as="div" className="mb-sm flex items-center justify-between">
          <Text
            as="h3"
            variant="label-sm"
            className="text-on-surface-variant tracking-wider uppercase"
          >
            {t('verseOfTheDay')}
          </Text>
          <Icon name="BookOpen" size={24} className="text-primary" />
        </Box>
        <Text
          as="p"
          variant="arabic-body"
          className="my-sm text-on-background text-end leading-loose"
          dir="rtl"
        >
          {t('verseArabic')}
        </Text>
        <Text as="p" variant="body-md" className="mt-sm text-on-surface-variant">
          {t('verseTranslation')}
        </Text>
      </Box>
      <Box
        as="div"
        className="mt-md border-outline-variant/20 pt-sm z-10 flex items-center justify-between border-t"
      >
        <Text as="span" variant="label-sm" className="text-secondary">
          {t('verseReference')}
        </Text>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('viewVerse')}
          className="text-primary hover:bg-primary/5 rounded-full transition-colors"
        >
          <Icon name="ArrowRight" size={20} />
        </Button>
      </Box>
    </GlassCard>
  );
}
