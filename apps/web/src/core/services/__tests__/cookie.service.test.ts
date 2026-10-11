import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CookieService } from '../cookie.service';

const mockSet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    set: mockSet,
  })),
}));

vi.mock('@/shared/config/env', () => ({
  env: {
    NODE_ENV: 'development',
  },
}));

describe('CookieService', () => {
  beforeEach(() => {
    mockSet.mockClear();
  });

  it('sets a cookie with lax SameSite and 1-year max age', async () => {
    await CookieService.set('NEXT_THEME', 'dark');

    expect(mockSet).toHaveBeenCalledTimes(1);
    expect(mockSet).toHaveBeenCalledWith('NEXT_THEME', 'dark', {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
      httpOnly: false,
      secure: false,
    });
  });
});
