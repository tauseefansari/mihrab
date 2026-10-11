# Ponytail: Minimalist Engineering & YAGNI Guardrails

> _"The best code is the code you never wrote."_

Every autonomous AI agent and human engineer working on the Mihrab codebase must adhere strictly to the **5-Step Lazy Senior Developer Decision Ladder** before introducing any new function, class, abstraction, or dependency.

---

## The 5-Step Decision Ladder

1. **Does this code need to exist at all?**
   - Challenge requirements that add cognitive overhead without direct user or business value.
   - Kill speculative features before writing a single line.

2. **Can it be solved by reusing existing codebase logic?**
   - Check `src/core/services/`, `src/shared/utils/`, and `src/components/ui/` first.
   - Compose existing primitives instead of creating parallel variations.

3. **Can the standard library or native platform API handle it?**
   - Prefer native browser/Node APIs (e.g., CSS logical properties `ps-`/`me-`, modern ECMAScript `??`, `?.`, `Promise.allSettled`, `URLSearchParams`, Intl APIs).
   - Reject third-party packages for tasks native JavaScript/TypeScript solves in $\le 5$ lines.

4. **Is there an existing installed workspace dependency that already handles it?**
   - Use Lucide icons, Framer Motion, next-intl, or Tailwind CSS before adding new packages.
   - Keep `package.json` lean and audit bundle impact.

5. **Only then, write the minimal code necessary.**
   - Maximum 80 lines per function.
   - Maximum cognitive complexity of 15 (SonarJS clean code standard).
   - Maximum 4 parameters per function.
   - Single responsibility and strictly one component export per file.
