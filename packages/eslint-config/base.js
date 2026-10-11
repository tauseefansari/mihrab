import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';

/** @type {import('eslint').Linter.Config[]} */
export const baseConfig = [
  {
    plugins: {
      sonarjs: sonarjsPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      // SonarJS Rules (Clean Code & Cognitive Limits)
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-nested-template-literals': 'error',
      'sonarjs/prefer-immediate-return': 'error',

      // Strict Bans
      'no-var': 'error',
      'prefer-const': 'error',
      'no-warning-comments': ['error', { terms: ['eslint-disable'], location: 'anywhere' }],

      // Code Quality & SOLID Limits
      'max-lines-per-function': ['error', { max: 80, skipComments: true }],
      'max-params': ['error', 4],
      complexity: ['error', 15],
      eqeqeq: ['error', 'always'],

      // Unicorn Naming & Clean Rules
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            '^eslint.config.mjs$',
            '^next.config.ts$',
            '^postcss.config.mjs$',
            '^tailwind.config.ts$',
            '^vitest.config.ts$',
            '^vitest.setup.ts$',
            '^playwright.config.ts$',
            '^sw.ts$',
            '^__tests__$',
            '__tests__',
          ],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Strict Absolute Imports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message:
                'Usage of relative parent imports is not allowed. Use absolute imports starting with `@/` instead.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**', '**/*.test.*', '**/*.spec.*'],
    rules: {
      'max-lines-per-function': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'no-restricted-imports': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' },
      ],
    },
  },
];

export default baseConfig;
