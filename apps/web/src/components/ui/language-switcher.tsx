'use client';

import { useRouter } from 'next/navigation';
import { Select } from '@/components/ui/select';
import { useLocale, useTranslations } from 'next-intl';
import { setCookieAction } from '@/app/actions/cookie.action';

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('UI');

  const handleLanguageChange = async (value: string) => {
    await setCookieAction('NEXT_LOCALE', value);
    router.refresh();
  };

  const languages = [
    { label: t('languages.en'), value: 'en' },
    { label: t('languages.ar'), value: 'ar' },
    { label: t('languages.ur'), value: 'ur' },
    { label: t('languages.hi'), value: 'hi' },
  ];

  return (
    <div className="w-24">
      <Select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        placeholder={t('selectLanguage')}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
