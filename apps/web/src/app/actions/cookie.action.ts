'use server';

import { CookieService } from '@/core/services/cookie.service';

/**
 * Server action to securely set a cookie from client components.
 */
export async function setCookieAction(key: string, value: string): Promise<void> {
  // Validate basic string inputs to prevent injection
  if (typeof key !== 'string' || typeof value !== 'string') {
    throw new Error('Invalid cookie parameters');
  }

  await CookieService.set(key, value);
}
