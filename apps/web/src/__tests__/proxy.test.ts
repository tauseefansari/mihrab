import { describe, it, expect, vi } from 'vitest';
import { proxy, config } from '@/proxy';
import type { NextRequest } from 'next/server';

describe('proxy middleware', () => {
  it('has matcher configuration', () => {
    expect(config.matcher).toBeDefined();
    expect(config.matcher).toHaveLength(1);
  });

  it('sets NEXT_LOCALE cookie based on accept-language header when not set', () => {
    const mockRequest = {
      headers: new Headers({ 'accept-language': 'ar-SA,ar;q=0.9,en;q=0.8' }),
      cookies: {
        has: vi.fn().mockReturnValue(false),
      },
    } as unknown as NextRequest;

    const response = proxy(mockRequest);
    expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('ar');
  });

  it('falls back to defaultLocale when accept-language is missing or unknown', () => {
    const mockRequest = {
      headers: new Headers(),
      cookies: {
        has: vi.fn().mockReturnValue(false),
      },
    } as unknown as NextRequest;

    const response = proxy(mockRequest);
    expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('en');
  });

  it('falls back to defaultLocale when accept-language has only unsupported languages', () => {
    const mockRequest = {
      headers: new Headers({ 'accept-language': 'fr-FR,de;q=0.8' }),
      cookies: {
        has: vi.fn().mockReturnValue(false),
      },
    } as unknown as NextRequest;

    const response = proxy(mockRequest);
    expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('en');
  });

  it('does not overwrite NEXT_LOCALE if cookie is already present', () => {
    const mockRequest = {
      headers: new Headers({ 'accept-language': 'ar' }),
      cookies: {
        has: vi.fn().mockReturnValue(true),
      },
    } as unknown as NextRequest;

    const response = proxy(mockRequest);
    expect(response.cookies.get('NEXT_LOCALE')).toBeUndefined();
  });
});
