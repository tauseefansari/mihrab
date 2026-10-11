import { defineConfig } from 'vitest/config';

export const baseVitestConfig = defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'html'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
      exclude: [
        'node_modules/**',
        '.next/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/__fixtures__/**',
        '**/*.css',
      ],
    },
  },
});

export default baseVitestConfig;
