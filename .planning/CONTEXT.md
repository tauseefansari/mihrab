# Architecture & Decision Context (GSD)

This document captures permanent architectural decisions, standards, and technical context for Mihrab.

---

## 1. Monorepo & Package Structure

- **Package Manager:** `pnpm` workspace (`pnpm-workspace.yaml`).
- **Build Orchestrator:** Turborepo (`turbo.json`) with cached pipelines for `build`, `lint`, `type:check`, `format:check`, `test`, and `test:coverage`.
- **Config Packages:**
  - `@mihrab/typescript-config`: Strict typing (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`).
  - `@mihrab/prettier-config`: Tailwind class sorting.
  - `@mihrab/eslint-config`: SonarJS, cognitive complexity $\le 15$, single component export, `??` enforcement.
  - `@mihrab/vitest-config`: JSDOM environment, React testing library, $\ge 90\%$ coverage thresholds on statements, branches, functions, and lines.

---

## 2. Component & Code Architecture

- **Feature-Sliced Design (FSD):**
  - `src/components/ui/`: Strictly pure, dumb UI primitives. This is the **only** directory where raw HTML elements (`<button>`, `<div>`, `<input>`) may be used directly for structural styling.
  - `src/components/layout/`: Global layouts, sidebars, navigation bars.
  - `src/features/`: Domain-specific components and widgets (e.g. `prayer-times-widget.tsx`).
  - `src/core/services/`: Isolated business logic services (e.g. `cookie.service.ts`).
  - `src/shared/utils/`: Shared generic utilities (e.g. `cn.ts`).
- **Single Export Principle:** Exactly **one exported component per file** matching the kebab-case file name. Private helper sub-components are permitted **only** if they are unexported, exclusively used within that file, and cognitive complexity remains $\le 15$.
- **Strict Alias Imports:** Absolute `@/...` imports are required everywhere, including inside `__tests__/` test files. Relative parent imports (`../`) are strictly forbidden.
- **Named Imports Only:** Never use `React.<member>` namespace access. Import named members directly from `'react'`.
- **Production data-testid Ban:** `data-testid` is forbidden in production code; permitted strictly in test files.
- **Native React 19 Activity:** Import `Activity` directly from `'react'` (`import { Activity } from 'react'`). Never create separate custom wrapper components.
- **Logical Tailwind Properties:** Physical directional classes (`pl-`, `pr-`, `ml-`, `mr-`, `text-left`, `text-right`) are strictly forbidden. Use `ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`.

---

## 3. Testing Standard

- **Co-location:** Every source file (`foo.ts` / `foo.tsx`) has exactly ONE co-located test file (`__tests__/foo.test.ts` / `__tests__/foo.test.tsx`) in an immediate parent `__tests__/` directory.
- **Zero Coverage Exclusion:** ZERO source files may be excluded from test coverage. All application source files are tested.
- **Coverage:** $\ge 90\%$ branch, function, line, and statement coverage across the entire test suite.

---

## 4. Git & Attribution Standards

- **Conventional Commits:** Standardized Gitmoji commit prefixes (`✨ feat:`, `🐛 fix:`, `♻️ refactor:`, `💄 style:`, `🏗️ arch:`, `🧪 test:`, `🔧 chore:`).
- **Anti-AI Policy & Configuration:**
  - Global and workspace `.claude/settings.json` configured with `"attribution": { "commit": "", "pr": "" }`.
  - Zero AI attribution or co-authorship trailers (`Co-authored-by: Cursor`, `Claude`, `Copilot`, etc.). Stripped automatically via `.githooks/commit-msg`.
