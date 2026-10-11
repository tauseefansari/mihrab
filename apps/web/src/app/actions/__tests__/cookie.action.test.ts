import { describe, it, expect, vi } from 'vitest';
import { setCookieAction } from '@/app/actions/cookie.action';
import { CookieService } from '@/core/services/cookie.service';

vi.mock('@/core/services/cookie.service', () => ({
  CookieService: {
    set: vi.fn(async () => Promise.resolve()),
  },
}));

describe('setCookieAction', () => {
  it('calls CookieService.set with valid parameters', async () => {
    await setCookieAction('test_key', 'test_value');
    expect(CookieService.set).toHaveBeenCalledWith('test_key', 'test_value');
  });

  it('throws error on invalid parameters', async () => {
    // @ts-expect-error invalid parameter type test
    await expect(setCookieAction(null, 'test_val')).rejects.toThrow('Invalid cookie parameters');
    // @ts-expect-error invalid parameter type test
    await expect(setCookieAction('key', 123)).rejects.toThrow('Invalid cookie parameters');
  });
});
