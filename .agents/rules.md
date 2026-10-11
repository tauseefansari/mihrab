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
