# Mihrab Product Roadmap (GSD Spec-Driven)

This roadmap tracks high-level milestones for Mihrab as a premium, offline-capable Islamic application built with Next.js 15/16 App Router, Turborepo, and Tailwind CSS.

---

## Milestone 1: Monorepo Foundation & Quality Engineering [COMPLETED]

- [x] **Turborepo Monorepo Architecture**: Root workspace with `apps/web` and config packages (`@mihrab/eslint-config`, `@mihrab/typescript-config`, `@mihrab/prettier-config`, `@mihrab/vitest-config`).
- [x] **SonarJS Clean Code**: Cognitive complexity $\le 15$, single exported component per file, strict `??` nullish coalescing.
- [x] **Logical CSS Properties**: 100% adherence to `ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`.
- [x] **Testing & 90% Coverage**: Co-located `__tests__/` with 1 test file per source file exceeding 90% across statements, branches, functions, and lines.
- [x] **Cross-Agent Sync & Anti-AI Hooks**: Conventional commit hook with Gitmoji, zero AI trailers, multi-agent directives across Claude, Cursor, and Antigravity.

---

## Milestone 2: Core Islamic Features (In Progress)

- [ ] **Prayer Times & Dashboard**:
  - [x] Base widget UI with next prayer calculation and location display.
  - [ ] Dynamic GPS/geocoding and offline calculation cache.
- [ ] **Tasbeeh (Digital Counter)**:
  - [ ] Tactile 3D neumorphic counter with micro-haptics / audio feedback.
  - [ ] Local storage sync and daily dhikr goal tracking.
- [ ] **Quran Reader**:
  - [ ] Surah/Ayah distraction-free reader with dual-language alignment (Arabic RTL, translation LTR/RTL).
  - [ ] Font scaling, audio recitations, and bookmarking.
- [ ] **Qiblah Compass**:
  - [ ] Device orientation API integration with visual compass rose.
  - [ ] Kaaba bearing calculation based on current coordinates.
- [ ] **Zakaat Calculator**:
  - [ ] Gold, silver, cash, and investment asset valuation against nisab thresholds.

---

## Milestone 3: Authentication & Cloud Sync

- [ ] Firebase Phone Auth / OTP verification.
- [ ] User profile and settings sync with PostgreSQL via Drizzle ORM.
- [ ] Encrypted cloud backup for bookmarks and dhikr logs.

---

## Milestone 4: Progressive Web App (PWA) & Offline Parity

- [ ] Service worker caching for offline prayer times, Quran text, and Tasbeeh.
- [ ] Push notifications for Athan / prayer reminders.
- [ ] 100/100 Lighthouse score for PWA, Performance, and Accessibility.
