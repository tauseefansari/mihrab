import { describe, it, expect, vi, beforeEach } from 'vitest';

let configCallback: (() => Promise<unknown>) | null = null;

vi.mock('next-intl/server', () => ({
  getRequestConfig: (cb: () => Promise<unknown>) => {
    configCallback = cb;
    return cb;
  },
}));

const mockGetCookie = vi.fn();
vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    get: mockGetCookie,
  })),
}));

describe('i18n request config', () => {
  beforeEach(async () => {
    mockGetCookie.mockReset();
    // import to register the mock callback
    await import('../request');
  });

  it('resolves messages with default locale when no cookie exists', async () => {
    mockGetCookie.mockReturnValue(undefined);
    expect(configCallback).not.toBeNull();
    const result = (await configCallback!()) as {
      locale: string;
      messages: Record<string, unknown>;
    };

    expect(result.locale).toBe('en');
    expect(result.messages).toBeDefined();
  });

  it('resolves messages with cookie locale when valid cookie exists', async () => {
    mockGetCookie.mockReturnValue({ value: 'ar' });
    const result = (await configCallback!()) as {
      locale: string;
      messages: Record<string, unknown>;
    };

    expect(result.locale).toBe('ar');
    expect(result.messages).toBeDefined();
  });
});
