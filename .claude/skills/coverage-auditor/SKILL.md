---
name: coverage-auditor
description: Audit unit test coverage to ensure >= 90% across branches, functions, lines, and statements with 1-test-per-file.
---

# Coverage Auditor Skill

Enforces unit testing standards across the monorepo:

## Guidelines

1. **90% Threshold:** Branches $\ge 90\%$, Functions $\ge 90\%$, Lines $\ge 90\%$, Statements $\ge 90\%$.
2. **Strict Co-location:** Exactly ONE test file per source file:
   - `foo.ts` $\rightarrow$ `__tests__/foo.test.ts`
   - `foo.tsx` $\rightarrow$ `__tests__/foo.test.tsx`
3. **Test Scope:** Test both sunny day paths and defensive error branches.
4. Run `pnpm run test:coverage` to verify threshold compliance.
