import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QiblahLocationPicker } from '@/features/qiblah/components/qiblah-location-picker';

const SANCTUARY_MAKKAH = 'sanctuaries.makkah';
const SANCTUARY_MADINAH = 'sanctuaries.madinah';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('QiblahLocationPicker', () => {
  it('renders current city and sanctuary options', () => {
    render(<QiblahLocationPicker currentCity="London" />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SANCTUARY_MAKKAH })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SANCTUARY_MADINAH })).toBeInTheDocument();
  });

  it('triggers onSelectSanctuary when clicking Madinah button', () => {
    const handleSanctuary = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        selectedSanctuary="makkah"
        onSelectSanctuary={handleSanctuary}
      />
    );

    const madinahBtn = screen.getByRole('button', { name: SANCTUARY_MADINAH });
    fireEvent.click(madinahBtn);
    expect(handleSanctuary).toHaveBeenCalledWith('madinah');
  });

  it('triggers onSelectSanctuary when clicking Makkah button', () => {
    const handleSanctuary = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        selectedSanctuary="madinah"
        onSelectSanctuary={handleSanctuary}
      />
    );

    const makkahBtn = screen.getByRole('button', { name: SANCTUARY_MAKKAH });
    fireEvent.click(makkahBtn);
    expect(handleSanctuary).toHaveBeenCalledWith('makkah');
  });

  it('applies high-contrast text-white class to the active sanctuary button', () => {
    render(<QiblahLocationPicker currentCity="London" selectedSanctuary="madinah" />);

    const madinahBtn = screen.getByRole('button', { name: SANCTUARY_MADINAH });
    const makkahBtn = screen.getByRole('button', { name: SANCTUARY_MAKKAH });

    expect(madinahBtn.className).toContain('text-white');
    expect(makkahBtn.className).not.toContain('text-white');
  });

  it('renders coordinates alongside current city when latitude and longitude provided', () => {
    render(<QiblahLocationPicker currentCity="Mumbai" latitude={19.076} longitude={72.8777} />);

    expect(screen.getByText('Mumbai')).toBeInTheDocument();
    expect(screen.getByText('(19.08° N, 72.88° E)')).toBeInTheDocument();
  });
});
