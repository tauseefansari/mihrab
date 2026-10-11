import { describe, it, expect, vi } from 'vitest';
import RootLayout, { generateMetadata } from '@/app/layout';

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Noto_Kufi_Arabic: () => ({ variable: '--font-noto-serif' }),
}));

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn().mockResolvedValue('en'),
  getMessages: vi.fn().mockResolvedValue({}),
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="intl-provider">{children}</div>
  ),
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components/layout/app-shell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-shell">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders children within providers and shell in ltr mode', async () => {
    const layoutElement = await RootLayout({
      children: <div>Page Content</div>,
    });

    expect(layoutElement.props.lang).toBe('en');
    expect(layoutElement.props.dir).toBe('ltr');
  });

  it('renders with rtl direction when locale is arabic', async () => {
    const { getLocale } = await import('next-intl/server');
    vi.mocked(getLocale).mockResolvedValueOnce('ar');

    const layoutElement = await RootLayout({
      children: <div>Arabic Content</div>,
    });

    expect(layoutElement.props.lang).toBe('ar');
    expect(layoutElement.props.dir).toBe('rtl');
  });

  it('renders with rtl direction when locale is urdu', async () => {
    const { getLocale } = await import('next-intl/server');
    vi.mocked(getLocale).mockResolvedValueOnce('ur');

    const layoutElement = await RootLayout({
      children: <div>Urdu Content</div>,
    });

    expect(layoutElement.props.lang).toBe('ur');
    expect(layoutElement.props.dir).toBe('rtl');
  });

  it('generates dynamic metadata from translations', async () => {
    const meta = await generateMetadata();
    expect(meta.title).toBe('title');
    expect(meta.description).toBe('description');
  });
});
