import type enCommon from '@/shared/i18n/locales/en/common.json';
import type enNav from '@/shared/i18n/locales/en/nav.json';
import type enDashboard from '@/shared/i18n/locales/en/dashboard.json';
import type enQiblah from '@/shared/i18n/locales/en/qiblah.json';

type Messages = typeof enCommon & {
  Nav: typeof enNav;
  Dashboard: typeof enDashboard;
  Qiblah: typeof enQiblah;
};

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
  }
}

declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
