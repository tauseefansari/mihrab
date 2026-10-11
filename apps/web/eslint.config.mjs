import { defineConfig, globalIgnores } from 'eslint/config';
import nextConfig from '@mihrab/eslint-config/next';

const eslintConfig = defineConfig([
  ...nextConfig,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'public/**',
    'coverage/**',
    '.vitest-cache/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
