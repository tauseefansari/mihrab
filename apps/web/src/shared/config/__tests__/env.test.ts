import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('env config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    process.env = originalEnv;
  });

  it('exports validated environment variables when DATABASE_URL is valid', async () => {
    process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/mihrab_test';
    const { env } = await import('@/shared/config/env');
    expect(env.DATABASE_URL).toBeDefined();
    expect(env.NODE_ENV).toBeDefined();
  });

  it('throws an error and logs when environment variables are invalid', async () => {
    process.env.DATABASE_URL = 'not-a-valid-url';
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(async () => {
      await import('@/shared/config/env');
    }).rejects.toThrow('Invalid environment variables');

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('uses development fallback for DATABASE_URL when omitted in development', async () => {
    delete process.env.DATABASE_URL;
    vi.stubEnv('NODE_ENV', 'development');

    const { env } = await import('@/shared/config/env');
    expect(env.DATABASE_URL).toBe('postgresql://user:password@localhost:5432/mihrab_db');
  });

  it('throws an error when DATABASE_URL is missing in production', async () => {
    delete process.env.DATABASE_URL;
    vi.stubEnv('NODE_ENV', 'production');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(async () => {
      await import('@/shared/config/env');
    }).rejects.toThrow('Invalid environment variables');

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
