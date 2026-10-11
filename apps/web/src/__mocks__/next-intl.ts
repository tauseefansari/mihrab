import type { ReactNode } from 'react';
import enCommon from '@/shared/i18n/locales/en/common.json';
import enNav from '@/shared/i18n/locales/en/nav.json';
import enDashboard from '@/shared/i18n/locales/en/dashboard.json';

const messagesMap: Record<string, Record<string, unknown>> = {
  ...enCommon,
  Nav: enNav,
  Dashboard: enDashboard,
  UI: enCommon.UI,
  FatalError: enCommon.FatalError,
  Error: enCommon.Error,
  Index: enCommon.Index,
  Tooltip: enCommon.Tooltip,
};

function resolveKey(obj: unknown, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export const createTranslationsMock =
  (namespace?: string) =>
  (key: string): string => {
    const scope = namespace ? messagesMap[namespace] : undefined;
    if (scope) {
      const val = resolveKey(scope, key);
      if (val !== undefined) return val;
    }
    const globalVal = resolveKey(messagesMap, key);
    if (globalVal !== undefined) return globalVal;
    return key;
  };

export const useTranslations = (namespace?: string): ((key: string) => string) =>
  createTranslationsMock(namespace);

export const useLocale = (): string => 'en';

export function NextIntlClientProvider({ children }: { children: ReactNode }): ReactNode {
  return children;
}
