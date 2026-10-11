import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { baseVitestConfig } from './base.js';

export const reactVitestConfig = mergeConfig(
  baseVitestConfig,
  defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
    },
  })
);

export default reactVitestConfig;
