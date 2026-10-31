import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard } from '@/components/ui/glass-card';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <Box
      as="div"
      className="bg-background text-on-background flex min-h-96 w-full flex-1 items-center justify-center py-12"
    >
      <GlassCard className="gap-md p-lg border-outline-variant/30 flex w-full max-w-2xl flex-col items-center text-center backdrop-blur-xl">
        <Box
          as="div"
          className="bg-primary/10 text-primary p-md rounded-full transition-transform hover:scale-105"
        >
          <Icon name="Compass" size={48} />
        </Box>

        <Box as="div" className="space-y-xs">
          <Text as="h1" variant="display-lg" className="text-primary font-bold">
            404
          </Text>
          <Text as="h2" variant="headline-lg" className="text-on-background">
            {t('title')}
          </Text>
          <Text as="p" variant="body-md" className="text-on-surface-variant">
            {t('description')}
          </Text>
        </Box>

        <Link
          href="/"
          className="bg-primary text-on-primary hover:bg-primary-container dark:hover:bg-primary/90 focus-visible:ring-primary focus-visible:ring-offset-surface gap-xs px-lg py-sm mt-xs inline-flex items-center justify-center rounded-xl font-semibold shadow-sm transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
        >
          <Icon name="House" size={20} />
          <Text as="span">{t('backToHome')}</Text>
        </Link>
      </GlassCard>
    </Box>
  );
}
