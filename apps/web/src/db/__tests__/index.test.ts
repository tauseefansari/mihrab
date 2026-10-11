import { describe, it, expect, vi } from 'vitest';

vi.mock('@neondatabase/serverless', () => ({
  neon: vi.fn().mockReturnValue({}),
}));

vi.mock('drizzle-orm/neon-http', () => ({
  drizzle: vi.fn().mockReturnValue({ query: {} }),
}));

describe('db client initialization', () => {
  it('initializes drizzle database instance', async () => {
    const { db } = await import('@/db/index');
    expect(db).toBeDefined();
    expect(db.query).toBeDefined();
  });
});
