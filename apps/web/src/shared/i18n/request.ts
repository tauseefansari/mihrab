import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, defaultLocale } from '@/shared/config/i18n';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = locales.includes(localeCookie as string) ? localeCookie : defaultLocale;

  const [common, nav, dashboard, qiblah] = await Promise.all([
    import(`./locales/${locale}/common.json`),
    import(`./locales/${locale}/nav.json`),
    import(`./locales/${locale}/dashboard.json`),
    import(`./locales/${locale}/qiblah.json`),
  ]);

  return {
    locale: locale as string,
    messages: {
      ...common.default,
      Nav: nav.default,
      Dashboard: dashboard.default,
      Qiblah: qiblah.default,
    },
  };
});
