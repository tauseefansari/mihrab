'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import enCommon from '@/shared/i18n/locales/en/common.json';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  console.error('Global error caught:', error);

  const { title, description, tryAgain, backToHome } = enCommon.FatalError;

  return (
    <html lang="en">
      <body className="bg-background text-on-background min-h-screen">
        <Box as="main" className="flex min-h-screen w-full items-center justify-center py-12">
          <GlassCard className="gap-md p-lg border-outline-variant/30 flex w-full max-w-2xl flex-col items-center text-center backdrop-blur-xl">
            <Box
              as="div"
              className="bg-error/10 text-error p-md rounded-full transition-transform hover:scale-105"
            >
              <Icon name="TriangleAlert" size={48} />
            </Box>

            <Box as="div" className="space-y-xs">
              <Text as="h1" variant="headline-lg" className="text-on-background">
                {title}
              </Text>
              <Text as="p" variant="body-md" className="text-on-surface-variant">
                {description}
              </Text>
            </Box>

            <Box as="div" className="gap-sm mt-xs flex flex-wrap items-center justify-center">
              <Button variant="primary" onClick={() => reset()} className="gap-xs">
                <Icon name="RotateCcw" size={18} />
                <Text as="span">{tryAgain}</Text>
              </Button>

              <Link
                href="/"
                onClick={() => {
                  reset();
                  router.push('/');
                }}
                className="border-outline-variant/40 bg-surface-container text-on-surface hover:text-on-surface dark:text-on-surface dark:hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-highest focus-visible:ring-primary focus-visible:ring-offset-surface gap-xs px-md py-sm inline-flex items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-200 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
              >
                <Icon name="House" size={18} />
                <Text as="span">{backToHome}</Text>
              </Link>
            </Box>
          </GlassCard>
        </Box>
      </body>
    </html>
  );
}
