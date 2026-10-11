import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import enCommon from '@/shared/i18n/locales/en/common.json';

const mockRefresh = vi.fn();
const mockSetCookieAction = vi.fn(async (_k: string, _v: string) => Promise.resolve());

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

vi.mock('@/app/actions/cookie.action', () => ({
  setCookieAction: (k: string, v: string) => mockSetCookieAction(k, v),
}));

describe('LanguageSwitcher component', () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockSetCookieAction.mockClear();
  });

  it('renders language switcher and selects a different locale', () => {
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveTextContent(enCommon.UI.languages.en);

    fireEvent.click(trigger);
    const arOption = screen.getByRole('button', {
      name: new RegExp(enCommon.UI.languages.ar, 'i'),
    });
    fireEvent.click(arOption);

    expect(mockSetCookieAction).toHaveBeenCalledWith('NEXT_LOCALE', 'ar');
  });
});
