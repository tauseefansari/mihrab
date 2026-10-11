import { cookies } from 'next/headers';
import { env } from '@/shared/config/env';

export class CookieService {
  /**
   * Sets a cookie with strict production defaults.
   */
  public static async set(key: string, value: string): Promise<void> {
    const isProduction = env.NODE_ENV === 'production';
    const cookieStore = await cookies();

    cookieStore.set(key, value, {
      path: '/',
      maxAge: 31536000, // 1 year
      sameSite: 'lax',
      httpOnly: isProduction,
      secure: isProduction,
    });
  }
}
