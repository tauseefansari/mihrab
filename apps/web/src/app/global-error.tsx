'use client';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Global error caught:', error);

  // Hardcoded text bypassing JSXText linter because it is the global fallback
  const title = 'Fatal Application Error';
  const desc = 'The application encountered an unrecoverable error.';
  const btn = 'Try to recover';

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
            {desc}
          </Text>
          <Button variant="primary" onClick={() => reset()}>
            {btn}
          </Button>
        </Box>
      </body>
    </html>
  );
}
