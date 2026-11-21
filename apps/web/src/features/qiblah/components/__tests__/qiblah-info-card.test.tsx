import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QiblahInfoCard } from '@/features/qiblah/components/qiblah-info-card';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('QiblahInfoCard', () => {
  it('renders bearing degrees and cardinal direction', () => {
    render(<QiblahInfoCard bearing={294} cardinal="NW" distanceKm={4281} />);

    expect(screen.getByText('angle')).toBeInTheDocument();
    expect(screen.getByText('294°')).toBeInTheDocument();
    expect(screen.getByText('NW')).toBeInTheDocument();
  });

  it('renders formatted distance and km unit', () => {
    render(<QiblahInfoCard bearing={119} cardinal="SE" distanceKm={4790} />);

    expect(screen.getByText('distance')).toBeInTheDocument();
    expect(screen.getByText('4,790')).toBeInTheDocument();
    expect(screen.getByText('km')).toBeInTheDocument();
  });

  it('applies glowing highlight styling when isAligned is true', () => {
    const { container } = render(
      <QiblahInfoCard bearing={280} cardinal="W" distanceKm={3452} isAligned={true} />
    );

    const highlightedCard = container.querySelector('.bg-primary\\/10');
    expect(highlightedCard).toBeInTheDocument();
  });
});
