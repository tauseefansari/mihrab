'use client';

import { useRouter } from 'next/navigation';
import { Select } from '@/components/ui/select';
import { useLocale } from 'next-intl';
import { setCookieAction } from '@/app/actions/cookie.action';

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();

  const handleLanguageChange = async (value: string) => {
    await setCookieAction('NEXT_LOCALE', value);
    router.refresh();
  };

  const languages = [
    { label: 'EN', value: 'en' },
    { label: 'عربي', value: 'ar' },
    { label: 'اردو', value: 'ur' },
    { label: 'हिंदी', value: 'hi' },
  ];

  return (
    <div className="w-24">
      <Select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        placeholder="Lang"
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
