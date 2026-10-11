import { resolve } from 'path';
import { mergeConfig } from 'vitest/config';
import { reactVitestConfig } from '@mihrab/vitest-config/react';

export default mergeConfig(reactVitestConfig, {
  test: {
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
    coverage: {
      exclude: [
        'src/app/layout.tsx',
        'src/app/error.tsx',
        'src/app/global-error.tsx',
        'src/shared/config/env.ts',
      ],
    },
  },
});
