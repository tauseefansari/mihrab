import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { QiblahCompassCard } from '@/features/qiblah/components/qiblah-compass-card';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Qiblah');
  return {
    title: t('title'),
    description: t('subtitle', { sanctuary: t('sanctuaries.makkah') }),
  };
}

export default function QiblahPage() {
  return (
    <Box as="div" className="flex w-full flex-col items-center py-2 md:py-6">
      <QiblahCompassCard />
    </Box>
  );
}
