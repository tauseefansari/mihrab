import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AyahWidget } from '@/features/dashboard/components/ayah-widget';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => `trans_${key}`),
}));

describe('AyahWidget component', () => {
  it('renders translated verse content properly', async () => {
    const Component = await AyahWidget();
    render(Component);

    expect(screen.getByText('trans_verseOfTheDay')).toBeInTheDocument();
    expect(screen.getByText('trans_verseArabic')).toBeInTheDocument();
    expect(screen.getByText('trans_verseTranslation')).toBeInTheDocument();
    expect(screen.getByText('trans_verseReference')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'trans_viewVerse' })).toBeInTheDocument();
  });
});
