# AI Agent Directives

@agent, you are generating code for the Mihrab App. You must strictly obey the following rules on every prompt:

1. **RTL / LTR Compliance:** NEVER output `ml-`, `mr-`, `pl-`, `pr-`, `text-left`, or `text-right`. You must exclusively use Tailwind logical properties: `ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`.
2. **Component Purity:** UI components (`src/components/ui`) must be "dumb". They only accept props and emit events. Do not embed fetch calls inside them.
3. **Data Fetching:** Use React Server Components (async components) to fetch data. Mutate data exclusively via Next.js Server Actions.
4. **Code Quality:** Ensure zero TypeScript errors. Follow the ESLint SonarQube rules defined in `eslint.config.mjs` (max 80 lines per function, max cognitive complexity 15).
5. **Context Checking:** Before proposing database changes, check `docs/TECHNICAL_DESIGN.md` and the existing Drizzle schema in `src/db/schema.ts`.
