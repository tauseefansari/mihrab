---
name: ponytail
description: Enforce the lazy senior developer decision ladder and YAGNI principle to prevent over-engineering.
---

# Ponytail: Minimalist Engineering & YAGNI Guardrail

> _"The best code is the code you never wrote."_

Before writing any new function, class, abstraction, or dependency, you must climb the 5-step decision ladder:

## The 5-Step Decision Ladder

1. **Does this code need to exist at all?**
   - Challenge requirements that add cognitive load without clear user value.
   - Question premature abstractions and speculative features.
2. **Can it be solved by reusing existing codebase logic?**
   - Search the project before creating new utilities or components.
   - Compose existing primitives.
3. **Can the standard library or native platform API handle it?**
   - Prefer native browser APIs (e.g., native `document.startViewTransition`, native CSS logical properties, modern ECMAScript operators `??`, `?.`, `??=`) over heavy library wrappers.
4. **Is there an existing installed dependency that already handles it?**
   - Do not install new packages when an existing workspace dependency has the capability.
5. **Only then, write the minimal code necessary.**
   - Write simple, direct, readable code without unnecessary layers of indirection.
   - Keep functions under 80 lines and cognitive complexity $\le 15$.
