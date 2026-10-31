import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

const mockRefresh = vi.fn();
const mockSetCookieAction = vi.fn(async (_k: string, _v: string) => Promise.resolve());

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      selectLanguage: 'Select Language',
      'languages.en': 'English',
      'languages.ar': 'Arabic',
      'languages.ur': 'Urdu',
      'languages.hi': 'Hindi',
    };
    return translations[key] ?? key;
  },
}));

vi.mock('@/app/actions/cookie.action', () => ({
  setCookieAction: (k: string, v: string) => mockSetCookieAction(k, v),
}));

describe('LanguageSwitcher component', () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockSetCookieAction.mockClear();
  });

  it('renders language switcher trigger with English native label', () => {
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button', { name: /select language/i });
    expect(trigger).toHaveTextContent('English');
  });

  it('opens dropdown and selects a different locale', async () => {
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button', { name: /select language/i });
    fireEvent.click(trigger);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    const arOption = screen.getByRole('option', { name: /arabic/i });
    fireEvent.click(arOption);

    expect(mockSetCookieAction).toHaveBeenCalledWith('NEXT_LOCALE', 'ar');
    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it('does not re-set cookie when selecting already active locale', () => {
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button', { name: /select language/i });
    fireEvent.click(trigger);

    const enOption = screen.getByRole('option', { name: /english/i });
    fireEvent.click(enOption);

    expect(mockSetCookieAction).not.toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside Area</div>
        <LanguageSwitcher />
      </div>
    );

    const trigger = screen.getByRole('button', { name: /select language/i });
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('opens on ArrowDown key and navigates options with arrows, Home, End, and closes on Escape', async () => {
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button', { name: /select language/i });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);

    // Initial focus on the selected locale (English)
    expect(document.activeElement).toBe(options[0]);

    // ArrowDown moves to next option (Arabic)
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(options[1]);

    // End moves to last option (Hindi)
    fireEvent.keyDown(listbox, { key: 'End' });
    expect(document.activeElement).toBe(options[3]);

    // Home moves to first option (English)
    fireEvent.keyDown(listbox, { key: 'Home' });
    expect(document.activeElement).toBe(options[0]);

    // ArrowUp wraps to last option (Hindi)
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(options[3]);

    // Escape closes dropdown and restores focus to trigger
    fireEvent.keyDown(listbox, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
    expect(document.activeElement).toBe(trigger);
  });

  it('closes dropdown on Tab key and supports Escape on trigger', async () => {
    render(<LanguageSwitcher />);

    const trigger = screen.getByRole('button', { name: /select language/i });
    fireEvent.keyDown(trigger, { key: 'Enter' });
    const listbox = screen.getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'Tab' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
