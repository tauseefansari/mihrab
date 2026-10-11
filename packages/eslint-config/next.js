import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import { baseConfig } from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export const nextConfig = [
  ...nextVitals,
  ...nextTs,
  ...baseConfig,
  {
    plugins: {
      tailwindcss: tailwindPlugin,
    },
    settings: {
      tailwindcss: {
        config: 'src/app/globals.css',
        callees: ['cn', 'cva'],
      },
    },
    rules: {
      // React & Next.js Rules
      'react-hooks/exhaustive-deps': 'error',

      // Tailwind Logical Utilities Enforcement
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      'tailwindcss/enforces-shorthand': 'off',
      'tailwindcss/no-arbitrary-value': 'error',

      // Strict UI Text via next-intl
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXText[value=/[a-zA-Z]/]',
          message:
            'Hardcoded text is forbidden. Use next-intl useTranslations or getTranslations instead.',
        },
      ],
    },
  },
  {
    files: [
      'src/app/**/*.tsx',
      'src/features/**/*.tsx',
      'src/core/**/*.tsx',
      'src/shared/**/*.tsx',
    ],
    ignores: ['src/app/layout.tsx', 'src/app/global-error.tsx', '**/__tests__/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXElement[openingElement.name.type='JSXIdentifier'][openingElement.name.name=/^[a-z]+$/]",
          message:
            'Raw HTML elements are forbidden outside of src/components/ui/. Use reusable components (like Box, Text, Button) instead.',
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**', '**/*.test.*', '**/*.spec.*'],
    rules: {
      'no-restricted-syntax': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'max-lines-per-function': 'off',
      'no-restricted-imports': 'off',
    },
  },
];

export default nextConfig;
