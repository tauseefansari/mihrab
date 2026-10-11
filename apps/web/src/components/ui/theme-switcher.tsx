'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { setCookieAction } from '@/app/actions/cookie.action';

export function ThemeSwitcher() {
  const t = useTranslations('UI');
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    // Set the theme cookie asynchronously in the background via Server Action
    // We don't await this so it doesn't block the instant client-side transition
    setCookieAction('NEXT_THEME', newTheme).catch(console.error);

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at 50% 50%)`, `circle(150% at 50% 50%)`],
        },
        {
          duration: 600,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t('toggleTheme')}
      className="bg-surface-container text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
      onClick={toggleTheme}
    >
      <Icon name="Moon" size={20} className="block dark:hidden" />
      <Icon name="Sun" size={20} className="hidden dark:block" />
    </Button>
  );
}
