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

- **Coverage:** Minimum 90% unit test coverage required across branches, functions, lines, and statements.
- **Zero Exclusions:** ZERO source files may be excluded from test coverage. All app source files must be tested.
- **Co-location:** Tests must be located in `__tests__` directories immediately adjacent to the file being tested (1 test file per source file, e.g. `foo.ts` -> `__tests__/foo.test.ts`).
- **E2E:** Playwright E2E tests go in the `/e2e/` folder at the project root.
- **E2E Feature Scope:** Exactly ONE test file per feature in `/e2e/<feature>.spec.ts` (e.g. `e2e/qiblah.spec.ts`, `e2e/shell.spec.ts`, `e2e/dashboard.spec.ts`). Do NOT fragment feature tests into multiple spec files.
- **Full-Page Snapshots Only:** Use necessary full-page snapshots (`fullPage: true`) to comprehensively capture multiple states (desktop, mobile, drawer open, permission states, alignment states) without creating redundant element-level snapshots.

## Error Handling & Caching

- **Errors:** Use `error.tsx` and `global-error.tsx`.
- **Environment:** Access environment variables ONLY through `src/shared/config/env.ts`, never `process.env` directly.

## Advanced Restrictions

- **No ESLint Disable:** The use of `eslint-disable` or `eslint-enable` comments is STRICTLY FORBIDDEN. The linter runs with `--no-inline-config`.
- **Package Manager:** ONLY use `pnpm`. Do not use `npm` or `yarn`.
- **Alias Imports Everywhere:** STRICTLY USE `@/...` alias imports everywhere, including inside test files. Relative parent imports (`../`) are forbidden.
- **Named Imports Only:** Never use `React.<member>` (e.g., `React.useState`, `React.useEffect`, `React.useRef`). Import named symbols directly from `'react'`.
- **React 19 Ref as a Prop:** `forwardRef` is STRICTLY FORBIDDEN. Pass `ref?: Ref<...>` directly as a component prop. Explicit `Component.displayName` assignments are forbidden.
- **React Compiler (No useMemo / useCallback):** `useMemo` and `useCallback` are STRICTLY FORBIDDEN. React Compiler automatically memoizes functions and expressions.
- **No data-testid in Production:** `data-testid` attributes are STRICTLY FORBIDDEN in production code. They are only permitted in test files (`*.test.tsx`).
- **Native React 19 Activity:** Import `Activity` directly from `'react'` (`import { Activity } from 'react'`). Never wrap in custom components.
- **Single Component Export:** Exactly ONE exported component per file matching the kebab-case filename. Private helper components are allowed inside the file ONLY if they are unexported and used exclusively within that file.
- **Translations & Text:** Hardcoded text is FORBIDDEN in components. All text MUST use `next-intl` translations (`useTranslations` or `getTranslations`).
- **Server-Side Rendering:** Data fetching MUST occur on the server (Server Components or Server Actions). Client-side data fetching (e.g., `fetch` or `axios` in `"use client"` components) is FORBIDDEN.
- **Framer Motion:** Framer Motion requires `"use client"`. Animations MUST be isolated to UI components in `src/components/ui/`, keeping features and pages as Server Components.
- **Zero AI Attribution:** Git commits must strictly follow Conventional Commits with Gitmojis and NEVER include `Co-authored-by: Cursor`, `Claude`, or any AI attribution trailers.

- **Full-Width Canvas:** Main layout and page wrappers must occupy the full viewport width (`w-full`) without artificial max-width constraints (e.g., `max-w-screen-2xl`, `max-w-4xl`). Ensure responsive, fluid layouts across all screen sizes.
- **Minimal Domain Constants & Constant Purity:** Never hardcode domain values, presets, or coordinates in components or services. Keep minimal, feature-scoped constants files (`src/features/<feature>/constants/<feature>.constants.ts`). Constant files must STRICTLY contain constants only (primitives, readonly arrays, frozen objects). NEVER place functions, calculations, or methods in constants files; place functions in dedicated utility files (`utils/*.ts` or `shared/utils/*.ts`). Do NOT create unnecessary constant files.
- **Client Checking Helper:** NEVER write ad-hoc `typeof window === 'undefined'` or `typeof window !== 'undefined'` checks. ALWAYS use the shared `isClient()` helper from `@/shared/utils/is-client`.
- **Default Permission Ergonomics:** Features requiring browser permissions (geolocation, device orientation) must automatically initialize on mount when allowed, avoiding redundant manual "enable" or "detect" buttons in the UI. Fall back gracefully without breaking layouts.
- **High-Contrast Text:** Interactive controls (buttons, chips, pills) must guarantee high-contrast, crystal-clear text across both light and dark themes (never dark or black text on green/colored surfaces).
- **Code Hygiene & Dead Code:** Unnecessary files, dead code, unused constants, orphaned translation keys, and unreferenced imports are STRICTLY FORBIDDEN. Regularly prune all unused artifacts across all locale files, components, and constant files.

## Browser & Visual Verification (Mandatory on Every Turn)

- **Zero Console Errors:** Every page navigation, client transition, and component interaction in the browser MUST produce 0 console errors and 0 unhandled promise rejections.
- **Visual & Color Consistency:** Verify that all pages maintain a consistent theme background (`bg-background`, `text-on-background`, `bg-surface`) across ALL routes in BOTH light and dark modes. No route may have mismatched backgrounds or inverted theme tokens.
- **Accessibility & Contrast:** Color contrast must satisfy WCAG AA (minimum 4.5:1 for normal text, 3:1 for large text) across all themes. All interactive elements must have clear focus and active indicators.
- **Interactive & Hover States:** Every button, card, link, and input must be verified for hover, focus, active, and disabled states. Navigation components (DesktopSidebar, MobileBottomNav) must dynamically highlight the active route using `usePathname()`.
- **Responsive Viewports:** Every UI change must be verified and screenshotted across Desktop (1280x800), Tablet (768x1024), and Mobile (390x844).
