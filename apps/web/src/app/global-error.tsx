'use client';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import enCommon from '@/shared/i18n/locales/en/common.json';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Global error caught:', error);

  const { title, description, tryAgain } = enCommon.FatalError;

  return (
    <html lang="en">
      <body>
        <Box className="bg-background p-md text-on-background flex min-h-screen flex-col items-center justify-center">
          <Text as="h2" variant="headline-lg" className="mb-sm text-error">
            {title}
          </Text>
          <Text
            as="p"
            variant="body-md"
            className="mb-md text-on-surface-variant max-w-md text-center"
          >
            {description}
          </Text>
          <Button variant="primary" onClick={() => reset()}>
            {tryAgain}
          </Button>
        </Box>
      </body>
    </html>
  );
}
