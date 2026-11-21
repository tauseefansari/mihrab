import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { baseVitestConfig } from './base.js';

export const reactVitestConfig = mergeConfig(
  baseVitestConfig,
  defineConfig({
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          svgo: false,
        },
        include: '**/*.svg',
      }),
    ],
    test: {
      environment: 'jsdom',
    },
  })
);

export default reactVitestConfig;
