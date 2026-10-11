---
name: react-next-standards
description: Enforce latest React 19 and Next.js 15/16 App Router architectural rules, native primitives, ref as a prop, React Compiler rules, alias imports, and clean code standards.
---

# React 19 & Next.js Modern Standards

This skill guides development on Mihrab following modern React 19 and Next.js App Router conventions.

---

## 1. Native React 19 Primitives & Modern Patterns

- **`ref` as a Prop (No `forwardRef`):**
  - In React 19, `ref` is a standard prop on function components:
    ```tsx
    export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      ref?: Ref<HTMLButtonElement>;
    }

    export function Button({ ref, className, ...props }: ButtonProps) {
      return <button ref={ref} className={className} {...props} />;
    }
    ```
  - `forwardRef` is deprecated and strictly forbidden in ESLint (`no-restricted-imports` and `no-restricted-syntax`).
  - `Component.displayName` assignments are redundant and forbidden (`no-restricted-syntax`).
- **React Compiler (No `useMemo` / `useCallback`):**
  - With React Compiler enabled (`reactCompiler: true`), manual memoization via `useMemo` and `useCallback` is obsolete.
  - The compiler automatically memoizes expressions, values, and function handlers.
  - Manual `useMemo` and `useCallback` imports are forbidden (`no-restricted-imports`).
- **Native `<Activity>` Component:**
  - Always import directly from `'react'`: `import { Activity } from 'react';`.
  - Use `mode="visible" | "hidden"` to preserve component DOM and internal state when toggling views.
  - Never create separate wrapper components for `Activity`.
- **Modern Context & `use()` Hook:**
  - In React 19, render `<Context value={...}>` directly instead of `<Context.Provider value={...}>`.
  - Use `use(Context)` or `use(Promise)` for reading resources flexibly and conditionally.
- **React 19 Actions & Hooks:**
  - Use `useActionState` for managing Server Action state and pending indicators.
  - Use `useOptimistic` for instant UI state updates before server reconciliation.
  - Use `useFormStatus` inside form child components to read pending status.
- **Strict Named Imports:**
  - **Forbidden:** `React.useState`, `React.useEffect`, `React.useRef`, `React.ReactNode`.
  - **Required:** Import named members directly:
    ```tsx
    import { useState, useEffect, useRef, type ReactNode } from 'react';
    ```

---

## 2. Next.js App Router Architecture

- **Server-First Data Fetching:**
  - Fetch data exclusively inside React Server Components or Server Actions.
  - Never execute clientside `fetch()` inside `"use client"` components for core domain data.
- **Server Actions:**
  - Define mutations in `src/app/actions/` marked with `'use server'`.
  - Validate all inputs with Zod before invoking domain service layer classes (`src/core/services/`).

---

## 3. Import & Production Standards

- **Absolute Alias Imports Everywhere:**
  - All files—including tests in `__tests__/`—must exclusively use alias imports starting with `@/` (`@/components/...`, `@/core/...`, `@/shared/...`).
  - Relative parent imports (`../`, `../../`) are strictly forbidden by ESLint (`no-restricted-imports`).
- **Production `data-testid` Ban:**
  - Never include `data-testid` in production JSX components.
  - `data-testid` is strictly reserved for test files (`*.test.tsx`) when semantic queries (`getByRole`, `getByText`) are insufficient.
- **Internationalization (i18n):**
  - All user-facing text, accessibility labels, and tooltips must use `next-intl` (`useTranslations` / `getTranslations`).
  - Hardcoded strings in JSX are rejected by ESLint (`no-restricted-syntax`).
