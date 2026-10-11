import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopBar } from '@/components/layout/top-bar';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components/ui/theme-switcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

vi.mock('@/components/ui/language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

describe('TopBar', () => {
  it('renders top bar brand and controls', () => {
    render(<TopBar />);

    expect(screen.getByText('brandName')).toBeInTheDocument();
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'menu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'notifications' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'account' })).toBeInTheDocument();
  });
});
