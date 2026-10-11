import { resolve } from 'path';
import { mergeConfig } from 'vitest/config';
import { reactVitestConfig } from '@mihrab/vitest-config/react';

export default mergeConfig(reactVitestConfig, {
  test: {
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
});
