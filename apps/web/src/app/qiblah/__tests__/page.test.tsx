import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QiblahPage, { generateMetadata } from '@/app/qiblah/page';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

vi.mock('@/features/qiblah/components/qiblah-compass-card', () => ({
  QiblahCompassCard: () => (
    <div role="region" aria-label="Mock Qiblah Compass Card">
      Mock Qiblah Compass Card
    </div>
  ),
}));

describe('QiblahPage', () => {
  it('generates metadata containing localized title and description', async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toBe('trans_title');
    expect(metadata.description).toBe('trans_subtitle');
  });

  it('renders QiblahCompassCard inside layout container', () => {
    render(<QiblahPage />);

    expect(screen.getByRole('region', { name: 'Mock Qiblah Compass Card' })).toBeInTheDocument();
  });
});
