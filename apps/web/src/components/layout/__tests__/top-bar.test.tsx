import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopBar } from '@/components/layout/top-bar';
import { useMobileDrawer } from '@/components/layout/use-mobile-drawer';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('TopBar', () => {
  it('renders top bar brand and controls', () => {
    render(<TopBar />);

    expect(screen.getByText('brandName')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'menu' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'notifications' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'account' })).toBeInTheDocument();
  });

  it('triggers mobile drawer open on menu button click', () => {
    render(<TopBar />);

    const menuBtn = screen.getByRole('button', { name: 'menu' });
    fireEvent.click(menuBtn);

    expect(useMobileDrawer.getState().isOpen).toBe(true);
  });
});
