import { createTranslationsMock } from '@/__mocks__/next-intl';

export const getTranslations = async (namespace?: string): Promise<(key: string) => string> =>
  createTranslationsMock(namespace);

export const getLocale = async (): Promise<string> => 'en';

export const getMessages = async (): Promise<Record<string, unknown>> => ({});
