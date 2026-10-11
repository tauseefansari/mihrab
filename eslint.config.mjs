import { defineConfig, globalIgnores } from 'eslint/config';
import baseConfig from './packages/eslint-config/base.js';

const eslintConfig = defineConfig([
  ...baseConfig,
  globalIgnores(['apps/**', 'packages/**', 'node_modules/**', '.next/**', 'dist/**']),
]);

export default eslintConfig;
