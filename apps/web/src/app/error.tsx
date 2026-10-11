'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if configured later
    console.error(error);
  }, [error]);

  const t = useTranslations('Error');

  return (
    <Box className="bg-background p-md text-on-background flex min-h-screen flex-col items-center justify-center">
      <Text as="h2" variant="headline-lg" className="mb-sm text-error">
        {t('title')}
      </Text>
      <Text as="p" variant="body-md" className="mb-md text-on-surface-variant max-w-md text-center">
        {t('description')}
      </Text>
      <Button variant="primary" onClick={() => reset()}>
        {t('tryAgain')}
      </Button>
    </Box>
  );
}
