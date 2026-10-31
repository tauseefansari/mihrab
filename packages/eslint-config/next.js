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

      // Strict UI Text, Production data-testid Ban, Named Imports & React 19 Modern Rules
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXText[value=/[a-zA-Z]/]',
          message:
            'Hardcoded text is forbidden. Use next-intl useTranslations or getTranslations instead.',
        },
        {
          selector: 'JSXAttribute[name.name="data-testid"]',
          message:
            'data-testid is forbidden in production code; it is only allowed in test files (*.test.tsx).',
        },
        {
          selector: 'MemberExpression[object.name="React"]',
          message:
            'Direct React.<member> access is forbidden. Import named members directly from "react" (e.g. import { useState, useEffect } from "react"; or import type { ReactNode } from "react";).',
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
        {
          selector: 'Literal[value=/(?:^|\\s)(?:pl-|pr-|ml-|mr-|text-left|text-right)(?:\\S*)/]',
          message:
            'Physical directional utility classes (pl-, pr-, ml-, mr-, text-left, text-right) are forbidden. Exclusively use logical properties (ps-, pe-, ms-, me-, text-start, text-end).',
        },
        {
          selector:
            'TemplateElement[value.raw=/(?:^|\\s)(?:pl-|pr-|ml-|mr-|text-left|text-right)(?:\\S*)/]',
          message:
            'Physical directional utility classes (pl-, pr-, ml-, mr-, text-left, text-right) are forbidden. Exclusively use logical properties (ps-, pe-, ms-, me-, text-start, text-end).',
        },
        {
          selector:
            'Literal[value=/(?:^|\\s)(?:bg|text|border|ring|fill|stroke)-(?:red|blue|green|amber|yellow|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-/]',
          message:
            'Raw Tailwind palette colors are forbidden. You must strictly use design system tokens (primary, surface, on-surface, secondary, tertiary, error, outline, etc.).',
        },
        {
          selector:
            'TemplateElement[value.raw=/(?:^|\\s)(?:bg|text|border|ring|fill|stroke)-(?:red|blue|green|amber|yellow|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-/]',
          message:
            'Raw Tailwind palette colors are forbidden. You must strictly use design system tokens (primary, surface, on-surface, secondary, tertiary, error, outline, etc.).',
        },
        {
          selector:
            'JSXAttribute[name.name="style"] Property[key.name=/^(color|backgroundColor|background|boxShadow|textShadow|borderColor|fill|stroke|fontSize|fontFamily)/]',
          message:
            'Inline styles for colors, backgrounds, shadows, and typography are forbidden. Use design system tokens and Tailwind utility classes instead.',
        },
        {
          selector: 'JSXAttribute[name.name="style"] Literal[value=/(?:#|rgb|hsl|rgba|hsla)/]',
          message:
            'Hardcoded color values (hex, rgb, hsl) in inline styles are forbidden. Use design system tokens instead.',
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
    ignores: [
      'src/app/layout.tsx',
      'src/app/global-error.tsx',
      '**/__tests__/**',
      '**/__mocks__/**',
      '**/__fixtures__/**',
    ],
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
    files: [
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/__mocks__/**',
      '**/__fixtures__/**',
    ],
    rules: {
      'no-restricted-syntax': 'off',
      'max-lines-per-function': 'off',
    },
  },
];

export default nextConfig;
