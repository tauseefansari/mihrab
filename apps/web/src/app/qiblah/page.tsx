import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Box } from '@/components/ui/box';
import { QiblahCompassCard } from '@/features/qiblah/components/qiblah-compass-card';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Qiblah');
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function QiblahPage() {
  return (
    <Box
      as="div"
      style={{ minHeight: 'calc(100vh - 8rem)' }}
      className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center"
    >
      <QiblahCompassCard />
    </Box>
  );
}
