# Technical Design & Architecture

## 1. Monorepo Architecture (Turborepo + pnpm)

The project is organized as a high-performance **Turborepo monorepo**:

```text
mihrab/
├── apps/
│   └── web/                           # Next.js 16 App Router application (@mihrab/web)
├── packages/
│   ├── eslint-config/                 # Flat config (SonarJS, TS ?? enforcement, React Compiler)
│   ├── typescript-config/             # Ultra-strict TypeScript configs (base.json, nextjs.json)
│   ├── prettier-config/               # Prettier with tailwindcss plugin
│   └── vitest-config/                 # Standalone Vitest config (strict 90% coverage threshold)
```

---

## 2. Technology Stack

- **Framework:** Next.js 16 (App Router, React Server Components, React Compiler).
- **Core Library:** React 19 (`import { Activity } from 'react'`, ref as a prop, Server Actions, `useActionState`, React Compiler auto-memoization).
- **Language:** TypeScript 5+ (Strict Mode with `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`).
- **Styling:** Tailwind CSS with strict logical CSS properties (`ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`).
- **Micro-Animations:** Framer Motion (isolated to client UI primitives in `src/components/ui/`).
- **Database & ORM:** PostgreSQL (Neon serverless) with Drizzle ORM.
- **Authentication:** Firebase Auth syncing to PostgreSQL via Next.js Server Actions.
- **i18n:** `next-intl` (supporting `en`, `ar`, `ur`, `hi` with zero hardcoded UI strings).
- **Service Worker / PWA:** Serwist (`@serwist/next`).

---

## 3. Architectural Principles & Constraints

- **Feature-Sliced Design (FSD):**
  - `src/components/ui/`: Strictly pure, dumb UI primitives. This is the **only** directory where raw HTML elements (`<button>`, `<div>`, `<input>`) may be used directly for structural styling.
  - `src/components/layout/`: Global layout components (`AppShell`, `DesktopSidebar`, `MobileBottomNav`, `TopBar`).
  - `src/features/`: Domain-specific components and bento widgets (`src/features/dashboard/components/*`).
  - `src/core/services/`: Isolated business logic services (e.g. `CookieService`).
  - `src/shared/`: Shared utilities (`cn`), configs (`env`, `i18n`), and translation dictionaries.
- **React 19 Ref as a Prop:** Function components receive `ref` directly as a prop (`ref?: Ref<...>`). `forwardRef` and `Component.displayName` assignments are deprecated and strictly forbidden.
- **React Compiler Auto-Memoization:** Manual `useMemo` and `useCallback` are obsolete and forbidden. The React Compiler optimizes all component derivations and callbacks automatically.
- **Single Export Principle:** Exactly **one exported component per file** matching the kebab-case file name. Private helper sub-components are permitted **only** if they are unexported and used exclusively within that file.
- **Strict Alias Imports:** Absolute `@/...` imports are required across **all** files (including tests in `__tests__/`). Relative parent imports (`../`) are banned by ESLint.
- **Named Imports Only:** Never use `React.<member>` namespace access (e.g. `React.useEffect`, `React.useState`). Import named symbols directly from `'react'`.
- **Production `data-testid` Ban:** `data-testid` is forbidden in production code and allowed only in `*.test.tsx`.
- **Zero Coverage Exclusion:** All source files must be tested with $\ge 90\%$ coverage across statements, branches, functions, and lines.

---

## 4. Database Schema (Drizzle ORM)

- **`users`:** `id` (UUID, PK), `phone` (Unique), `name`, `avatarUrl`, `createdAt`, `updatedAt`.
- **`userSettings`:** `userId` (FK -> `users.id`), `calculationMethod`, `madhab`, `theme`, `language`, `latitude`, `longitude`, `city`, `country`, `updatedAt`.
- **`tasbeehLogs`:** `id` (UUID, PK), `userId` (FK -> `users.id`), `dhikrKey`, `count`, `target`, `lastUpdated`.
- **`bookmarks`:** `id` (UUID, PK), `userId` (FK -> `users.id`), `surahNumber`, `ayahNumber`, `createdAt`.
