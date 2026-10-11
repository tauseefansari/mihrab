import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QiblaWidget } from '../qibla-widget';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

describe('QiblaWidget component', () => {
  it('renders compass bearing and translated direction label', async () => {
    const Component = await QiblaWidget();
    render(Component);

    expect(screen.getByText('115° SE')).toBeInTheDocument();
    expect(screen.getByText('trans_qiblaDirection')).toBeInTheDocument();
  });
});
