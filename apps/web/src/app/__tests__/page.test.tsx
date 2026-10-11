import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

vi.mock('@/features/dashboard/components/prayer-times-widget', () => ({
  PrayerTimesWidget: () => <div data-testid="prayer-times-widget">PrayerTimes</div>,
}));

vi.mock('@/features/dashboard/components/ayah-widget', () => ({
  AyahWidget: () => <div data-testid="ayah-widget">Ayah</div>,
}));

vi.mock('@/features/dashboard/components/qibla-widget', () => ({
  QiblaWidget: () => <div data-testid="qibla-widget">Qibla</div>,
}));

vi.mock('@/features/dashboard/components/goal-widget', () => ({
  GoalWidget: () => <div data-testid="goal-widget">Goal</div>,
}));

describe('HomePage', () => {
  it('renders dashboard header and widgets', async () => {
    const Component = await HomePage();
    render(Component);

    expect(screen.getByText('trans_greeting')).toBeInTheDocument();
    expect(screen.getByText('trans_date')).toBeInTheDocument();
    expect(screen.getByTestId('prayer-times-widget')).toBeInTheDocument();
    expect(screen.getByTestId('ayah-widget')).toBeInTheDocument();
    expect(screen.getByTestId('qibla-widget')).toBeInTheDocument();
    expect(screen.getByTestId('goal-widget')).toBeInTheDocument();
  });
});
