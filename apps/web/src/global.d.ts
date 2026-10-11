import type enCommon from '@/shared/i18n/locales/en/common.json';
import type enNav from '@/shared/i18n/locales/en/nav.json';
import type enDashboard from '@/shared/i18n/locales/en/dashboard.json';

type Messages = typeof enCommon & {
  Nav: typeof enNav;
  Dashboard: typeof enDashboard;
};

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
  }
}
