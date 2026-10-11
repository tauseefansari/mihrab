# Technical Design & Architecture

## 1. Technology Stack

- **Framework:** Next.js 15 (App Router, React Server Components).
- **Language:** TypeScript (Strict Mode).
- **Styling:** Tailwind CSS v4, Framer Motion for micro-animations.
- **Database:** PostgreSQL.
- **ORM:** Drizzle ORM.
- **Authentication:** Firebase Auth (Phone/OTP) syncing to PostgreSQL.
- **i18n:** `next-intl` (Dynamic routing `/[locale]/...`).

## 2. Architectural Principles

- **Feature-Sliced Design:** Code is grouped by domain (e.g., `src/features/quran`, `src/features/auth`) rather than file type.
- **SOLID & DRY:**
  - UI components are pure and decoupled from data fetching.
  - Server Actions handle all database mutations.
  - Reusable logic (date parsing, prayer calculations) lives in `src/core/utils`.
- **Dynamic Directionality:** Strict usage of Tailwind logical properties (`ps-`, `me-`, `text-start`, `text-end`) to support automatic LTR/RTL flipping based on the locale.

## 3. Database Schema (Drizzle ORM)

- **`users`:** `id` (UUID), `phone` (Unique), `name`, `created_at`.
- **`user_settings`:** `user_id` (FK), `theme`, `language`, `madhab`, `calculation_method`.
- **`tasbeeh_logs`:** `id`, `user_id` (FK), `dhikr_key`, `count`, `last_updated`.
- **`bookmarks`:** `id`, `user_id` (FK), `surah_number`, `ayah_number`.
