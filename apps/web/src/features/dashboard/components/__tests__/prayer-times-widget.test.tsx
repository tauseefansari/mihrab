import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PrayerTimesWidget } from '../prayer-times-widget';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

describe('PrayerTimesWidget component', () => {
  it('renders prayer times and current active prayer correctly', async () => {
    const Component = await PrayerTimesWidget();
    render(Component);

    expect(screen.getByText('trans_nextPrayer')).toBeInTheDocument();
    expect(screen.getByText('trans_location')).toBeInTheDocument();
    expect(screen.getByText('trans_fajr')).toBeInTheDocument();
    expect(screen.getByText('03:15 AM')).toBeInTheDocument();
    expect(screen.getByText('trans_dhuhr')).toBeInTheDocument();
    expect(screen.getByText('01:06 PM')).toBeInTheDocument();
    // trans_asr appears both in next prayer hero and in the list
    expect(screen.getAllByText('trans_asr').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('05:25 PM')).toBeInTheDocument();
    expect(screen.getByText('trans_maghrib')).toBeInTheDocument();
    expect(screen.getByText('trans_isha')).toBeInTheDocument();
  });
});
