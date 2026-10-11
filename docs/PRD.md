# Product Requirements Document: Mihrab App

## 1. Product Overview

Mihrab is an enterprise-grade, offline-capable, high-performance Islamic application built on a modern **Turborepo monorepo** architecture. It provides Muslims globally with frictionless, spiritually uplifting tools for daily routines, completely free of intrusive ads or bloatware.

---

## 2. Target Audience & Localization

- **Primary Audience:** Global Muslim demographic requiring daily prayer tracking, Quran reading, Tasbeeh dhikr counting, and Qibla orientation.
- **Languages Supported (4 Locales):**
  - English (`en`, LTR)
  - Arabic (`ar`, RTL)
  - Urdu (`ur`, RTL)
  - Hindi (`hi`, LTR)
- **Localization Guarantee:** 100% DRY translation architecture powered by `next-intl`. Zero hardcoded user-facing strings anywhere in UI components.
- **Accessibility:** 100/100 Lighthouse target score, WCAG AAA contrast compliance, keyboard navigability, semantic ARIA roles, and screen-reader support.

---

## 3. Core User Journeys

1. **Frictionless Onboarding:** User enters phone number -> Receives OTP via SMS -> Enters OTP -> Enters Name -> Directed to Personalized Dashboard.
2. **Spiritual Dashboard:** Bento-grid dashboard presenting upcoming prayer times, active prayer highlight, current geolocation, daily Ayah in Arabic script with synchronized translation, and spiritual goal progress.
3. **Quran Reading:** Distraction-free Surah/Ayah reader with dual-language alignment (Arabic RTL, translations LTR/RTL), customizable font scaling, and cloud bookmarking.
4. **Tasbeeh Counter:** Tactile, micro-animated digital counter utilizing native React 19 state preservation with local persistence and daily Dhikr goal targets.
5. **Qiblah Compass:** Real-time orientation tracking via device compass APIs with animated bearing indicators toward Mecca.
6. **Zakaat Calculator:** Comprehensive asset and nisab calculation tool for gold, silver, investments, and savings.

---

## 4. Technical & Quality Guarantees

- **Turborepo Monorepo:** Modular package distribution (`apps/web`, `@mihrab/eslint-config`, `@mihrab/typescript-config`, `@mihrab/prettier-config`, `@mihrab/vitest-config`).
- **Performance:** Sub-second First Contentful Paint (FCP) utilizing Next.js React Server Components and Turborepo caching pipelines.
- **Offline Parity:** Serwist PWA service worker with offline caching for core widgets, prayer schedules, and Quran content.
- **Code Coverage:** Strictly enforced $\ge 90\%$ code coverage across lines, statements, functions, and branches with ZERO source files excluded.
- **Clean Code Standards:** SonarJS cognitive complexity $\le 15$, single exported component per file, strict nullish coalescing `??`, and zero inline ESLint suppressions.
