import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QiblaWidget } from '@/features/dashboard/components/qibla-widget';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

describe('QiblaWidget component', () => {
  it('renders compass bearing, translated direction label, and links to /qiblah', async () => {
    const Component = await QiblaWidget();
    render(Component);

    expect(screen.getByText('trans_qiblaDegrees')).toBeInTheDocument();
    expect(screen.getByText('trans_qiblaDirection')).toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: /trans_qiblaDegrees - trans_qiblaDirection/i,
    });
    expect(link).toHaveAttribute('href', '/qiblah');
  });
});
