---
name: fsd-component-creator
description: Scaffold components following Feature-Sliced Design, single export principle, and logical CSS properties.
---

# FSD Component Creator Skill

When creating or modifying components:

## Rules

1. **Single Export Principle:** Exactly ONE component may be exported per file, matching the file name in kebab-case.
2. **Private Sub-components:** Unexported helper components are permitted within the same file if they are used exclusively inside that file.
3. **UI Purity:** Raw HTML tags (`<button>`, `<div>`, `<input>`) can ONLY exist inside `src/components/ui/`. Features and pages must compose these UI primitives.
4. **Logical Tailwind Utilities:** Strictly use `ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`. Physical utilities (`pl-`, `mr-`, etc.) are forbidden.
5. **No Hardcoded Text:** All user-facing strings must use `next-intl` translation keys.
6. **Strict Typing:** No `any`. Explicitly type all component props.
7. **No Inline SVGs & Separate SVG Files:** `<svg>` tags in JSX/TSX are strictly forbidden. All SVGs must be separate `.svg` files placed in `src/shared/assets/icons/` (or feature assets, never in `public/`) and imported directly as React components.
