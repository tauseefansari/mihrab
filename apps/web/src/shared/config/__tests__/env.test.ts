import { describe, it, expect, beforeEach } from 'vitest';

describe('env config', () => {
  beforeEach(() => {
    process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/mihrab_test';
  });

  it('exports validated environment variables', async () => {
    const { env } = await import('../env');
    expect(env.DATABASE_URL).toBeDefined();
    expect(env.NODE_ENV).toBeDefined();
  });
});
