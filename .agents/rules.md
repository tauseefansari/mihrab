# AI Agent Directives

@agent, you are generating code for the Mihrab App. You must strictly obey the following rules on every prompt:

1. **RTL / LTR Compliance:** NEVER output `ml-`, `mr-`, `pl-`, `pr-`, `text-left`, or `text-right`. You must exclusively use Tailwind logical properties: `ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`.
2. **Component Purity:** UI components (`src/components/ui`) must be "dumb". They only accept props and emit events. Do not embed fetch calls inside them.
3. **Data Fetching:** Use React Server Components (async components) to fetch data. Mutate data exclusively via Next.js Server Actions.
4. **Code Quality:** Ensure zero TypeScript errors. Follow the ESLint SonarQube rules defined in `eslint.config.mjs` (max 80 lines per function, max cognitive complexity 15, zero warnings).
5. **Alias Imports:** Use `@/...` absolute imports everywhere, including test files. Relative parent imports (`../`) are strictly forbidden.
6. **Named Imports Only:** Never use `React.<member>` (e.g. `React.useEffect`, `React.useState`). Import named symbols directly from `'react'`.
7. **Production data-testid Ban:** Never add `data-testid` in production code. It is only permitted in test files.
8. **Translations:** All user-facing strings must use `next-intl`. No hardcoded strings in JSX.
9. **Native React 19 Activity:** Import `Activity` directly from `'react'` (`import { Activity } from 'react'`); never wrap in custom non-standard components.
10. **React 19 Ref as a Prop:** NEVER use `forwardRef` or `displayName`. Function components receive `ref` directly as a prop.
11. **React Compiler (No useMemo / useCallback):** NEVER use `useMemo` or `useCallback`. React Compiler automatically optimizes calculations and callbacks.
12. **Context Checking:** Before proposing database changes, check `docs/TECHNICAL_DESIGN.md` and the existing Drizzle schema in `src/db/schema.ts`.
13. **Mandatory Browser Verification:** Every prompt/turn with UI changes must be verified in the browser for: 0 console errors, color & theme consistency (light & dark mode backgrounds), WCAG AA color contrast, interactivity (hover/focus/active states, active sidebar highlighting with `usePathname`), and responsiveness across Desktop, Tablet, and Mobile.
14. **Full-Width Canvas:** Main layout and page containers must use `w-full` without artificial `max-w-` width caps on layout canvases.
15. **Minimal Domain Constants & Constant Purity:** Do not hardcode domain values, sanctuary options, or coordinates in components. Use minimal feature-specific `*.constants.ts` files without creating unnecessary constant files. Constants files must STRICTLY contain constants only (primitives, readonly arrays, frozen objects). NEVER put functions or methods in constants files; place functions in dedicated utility files (`utils/*.ts` or `shared/utils/*.ts`).
16. **Default / Automatic Permissions:** Geolocation and sensor orientation must initialize automatically on mount when allowed; do not add redundant manual "use location" or "enable sensors" buttons in the UI.
17. **High-Contrast Text:** Interactive controls (buttons, chips, pills) must guarantee high-contrast, crystal-clear text across both light and dark themes (never dark/black text on dark green surfaces).
18. **Client Checking Helper:** NEVER write ad-hoc `typeof window === 'undefined'` or `typeof window !== 'undefined'` checks. ALWAYS use the shared `isClient()` helper from `@/shared/utils/is-client`.
19. **One E2E Test File Per Feature & Full-Page Snapshots:** Keep exactly one test file per feature in `/e2e/<feature>.spec.ts` (e.g. `e2e/qiblah.spec.ts`, `e2e/shell.spec.ts`, `e2e/dashboard.spec.ts`). Use necessary full-page snapshots (`fullPage: true`) only to cover multiple page elements and states comprehensively.
20. **Code Hygiene & Dead Code Elimination:** Unnecessary files, dead code, unused constants, orphaned translation keys, and unreferenced imports are STRICTLY FORBIDDEN. Regularly prune all unused artifacts across all locale files, components, and constant files.
