import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QiblahLocationPicker } from '@/features/qiblah/components/qiblah-location-picker';

const SANCTUARY_MAKKAH = 'sanctuaries.makkah';
const SANCTUARY_MADINAH = 'sanctuaries.madinah';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('QiblahLocationPicker', () => {
  it('renders current city and sanctuary toggle group options', () => {
    render(<QiblahLocationPicker currentCity="London" />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: 'selectSanctuary' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: SANCTUARY_MAKKAH })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: SANCTUARY_MADINAH })).toBeInTheDocument();
  });

  it('triggers onSelectSanctuary when clicking Madinah radio option', () => {
    const handleSanctuary = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        selectedSanctuary="makkah"
        onSelectSanctuary={handleSanctuary}
      />
    );

    const madinahRadio = screen.getByRole('radio', { name: SANCTUARY_MADINAH });
    fireEvent.click(madinahRadio);
    expect(handleSanctuary).toHaveBeenCalledWith('madinah');
  });

  it('triggers onSelectSanctuary when clicking Makkah radio option', () => {
    const handleSanctuary = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        selectedSanctuary="madinah"
        onSelectSanctuary={handleSanctuary}
      />
    );

    const makkahRadio = screen.getByRole('radio', { name: SANCTUARY_MAKKAH });
    fireEvent.click(makkahRadio);
    expect(handleSanctuary).toHaveBeenCalledWith('makkah');
  });

  it('applies high-contrast text-on-primary class to the active sanctuary radio option', () => {
    render(<QiblahLocationPicker currentCity="London" selectedSanctuary="madinah" />);

    const madinahRadio = screen.getByRole('radio', { name: SANCTUARY_MADINAH });
    const makkahRadio = screen.getByRole('radio', { name: SANCTUARY_MAKKAH });

    expect(madinahRadio).toHaveAttribute('aria-checked', 'true');
    expect(makkahRadio).toHaveAttribute('aria-checked', 'false');
    expect(madinahRadio.className).toContain('text-on-primary');
    expect(makkahRadio.className).not.toContain('text-on-primary');
  });

  it('renders coordinates alongside current city when latitude and longitude provided', () => {
    render(<QiblahLocationPicker currentCity="Mumbai" latitude={19.076} longitude={72.8777} />);

    expect(screen.getByText('Mumbai')).toBeInTheDocument();
    expect(screen.getByText('(19.08° N, 72.88° E)')).toBeInTheDocument();
  });
});
