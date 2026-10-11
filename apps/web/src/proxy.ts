import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/shared/config/i18n';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const parsedLocales = acceptLanguage.split(',').map((l) => {
    const parts = l.split(';');
    const firstPart = parts[0] ?? '';
    const tag = firstPart.trim().split('-')[0] ?? '';
    return tag.toLowerCase();
  });

  for (const locale of parsedLocales) {
    if (locales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has('NEXT_LOCALE')) {
    const locale = getLocale(request);
    response.cookies.set('NEXT_LOCALE', locale);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
