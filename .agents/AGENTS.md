# Mihrab App - AI Agent Rules

These rules apply to any autonomous AI agent interacting with this repository.

## Architectural Constraints (Strictly Enforced)

- **SOLID Principles:** API Route Handlers / Server Actions must ONLY validate HTTP input and invoke isolated Service Layer classes (`src/core/services/*`). Never write raw SQL inside UI components or Route Handlers.
- **FSD (Feature-Sliced Design):** We use an adapted FSD model.
  - `src/components/ui/` is the ONLY place raw HTML tags (`<button>`, `<div>` for structural styling, `<input>`) can be used. All other directories must compose these UI components.
  - `src/features/` contains domain logic.
  - `src/core/services/` contains pure business logic.
- **Line Limit:** Maximum 80 lines per function.
- **Complexity:** Maximum cognitive complexity of 15 per function.
- **Parameters:** Maximum 4 parameters per function.
- **Strict Typing:** Never use `any`. Explicitly type every variable, prop, and API response.
- **Accessibility:** All interactive elements MUST have `aria-label` or visible labeled text for 100/100 Accessibility score.
- **Linting:** 0 warnings and 0 errors are allowed (`--max-warnings 0`).

## UI & Design System

- **Glassmorphic Minimalism:** Use the `.glass-panel` utility for floating surfaces.
- **Directionality (RTL/LTR):** DO NOT use physical directional Tailwind utilities (`pl-4`, `mr-2`, `text-left`, `text-right`). STRICTLY USE logical properties (`ps-4`, `me-2`, `text-start`, `text-end`).
- **Typography:** English uses `Inter`. Arabic uses `Noto Serif` with `text-end`.

## Testing

- **Coverage:** Minimum 90% unit test coverage required.
- **Co-location:** Tests must be located in `__tests__` directories immediately adjacent to the file being tested (e.g. `src/core/services/__tests__/service.test.ts`).
- **E2E:** Playwright E2E tests go in the `/e2e/` folder at the project root.

## Error Handling & Caching

- **Errors:** Use `error.tsx` and `global-error.tsx`.
- **Environment:** Access environment variables ONLY through `src/shared/config/env.ts`, never `process.env` directly.

## Advanced Restrictions

- **No ESLint Disable:** The use of `eslint-disable` or `eslint-enable` comments is STRICTLY FORBIDDEN. The linter runs with `--no-inline-config`.
- **Package Manager:** ONLY use `pnpm`. Do not use `npm` or `yarn`.
- **Translations & Text:** Hardcoded text is FORBIDDEN in components. All text MUST use `next-intl` translations (`useTranslations` or `getTranslations`).
- **Server-Side Rendering:** Data fetching MUST occur on the server (Server Components or Server Actions). Client-side data fetching (e.g., `fetch` or `axios` in `"use client"` components) is FORBIDDEN.
- **Framer Motion:** Framer Motion requires `"use client"`. Animations MUST be isolated to UI components in `src/components/ui/`, keeping features and pages as Server Components.
