import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AppShell } from '@/components/layout/app-shell';
import '@/app/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  preload: false,
});

const notoArabic = Noto_Kufi_Arabic({
  variable: '--font-noto-serif',
  subsets: ['arabic'],
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Index');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === 'ar' || locale === 'ur' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoArabic.variable} bg-background text-on-background antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
