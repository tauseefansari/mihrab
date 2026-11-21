import { resolve } from 'path';
import { mergeConfig } from 'vitest/config';
import { reactVitestConfig } from '@mihrab/vitest-config/react';

export default mergeConfig(reactVitestConfig, {
  test: {
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**'],
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
});
