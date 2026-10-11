# Product Requirements Document: Mihrab App

## 1. Product Overview

Mihrab is a premium, scalable, offline-capable Islamic application. It provides Muslims globally with high-performance tools for their daily spiritual routines, offering a frictionless, personalized experience entirely free of intrusive ads or bloatware.

## 2. Target Audience & Localization

- **Primary Audience:** Global Muslim demographic requiring daily prayer tracking, Quran reading, and Dhikr.
- **Languages:** English (LTR), Arabic (RTL), Urdu (RTL).
- **Accessibility:** 100/100 Lighthouse score, WCAG AAA contrast, fully screen-reader compliant.

## 3. Core User Journeys

1. **Frictionless Onboarding:** User enters phone number -> Receives OTP via SMS -> Enters OTP -> Enters Name -> Directed to Dashboard.
2. **Daily Dashboard:** User opens the app and instantly sees the next prayer time, current location, and a daily Ayah/Hadith.
3. **Quran Reading:** User browses Surahs, adjusts font sizes, and reads distraction-free with dual-language alignment (Arabic right, translation left).
4. **Tasbeeh:** User tracks Dhikr using a highly tactile, micro-animated digital counter that saves state locally.
5. **Qiblah:** User opens the compass view to find the direction of Mecca based on geolocation.

## 4. Non-Functional Requirements

- **Performance:** Sub-second First Contentful Paint (FCP) using Next.js Partial Prerendering.
- **Offline Support:** PWA architecture enabling offline Quran reading and Tasbeeh counting.
- **Scalability:** Serverless backend with PostgreSQL capable of handling high concurrent traffic during Ramadan.
