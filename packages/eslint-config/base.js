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
            '^__mocks__$',
            '__mocks__',
            '^__fixtures__$',
            '__fixtures__',
          ],
          checkDirectories: false,
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Strict Absolute Imports & React 19 Modern Hook Restrictions
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
          paths: [
            {
              name: 'react',
              importNames: ['forwardRef', 'useMemo', 'useCallback'],
              message:
                'React 19 & React Compiler: forwardRef is deprecated (use ref prop directly); useMemo and useCallback are obsolete under React Compiler.',
            },
          ],
        },
      ],

      // Named Imports Only (Ban React.<member>), Ban forwardRef call, Ban displayName assignment
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[object.name="React"]',
          message:
            'Direct React.<member> access is forbidden. Import named members directly from "react" (e.g. import { useState, useEffect } from "react"; or import type { ReactNode } from "react").',
        },
        {
          selector: 'CallExpression[callee.name="forwardRef"]',
          message:
            'In React 19, forwardRef is deprecated. Pass ref as a standard prop directly to the component.',
        },
        {
          selector: 'MemberExpression[property.name="displayName"]',
          message:
            'Explicit Component.displayName assignment is unnecessary for standard function components in React 19.',
        },
      ],
    },
  },
  {
    files: [
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/__mocks__/**',
      '**/__fixtures__/**',
    ],
    rules: {
      'max-lines-per-function': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' },
      ],
    },
  },
];

export default baseConfig;
