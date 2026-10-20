import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  QiblahLocationPicker,
  POPULAR_CITIES,
} from '@/features/qiblah/components/qiblah-location-picker';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('QiblahLocationPicker', () => {
  it('renders current city and detect location button', () => {
    const handleSelect = vi.fn();
    const handleDetect = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        onSelectCity={handleSelect}
        onDetectGps={handleDetect}
      />
    );

    expect(screen.getAllByText('London').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /detectLocation/i })).toBeInTheDocument();
  });

  it('triggers onDetectGps when clicking detect location button', () => {
    const handleSelect = vi.fn();
    const handleDetect = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        onSelectCity={handleSelect}
        onDetectGps={handleDetect}
      />
    );

    const detectBtn = screen.getByRole('button', { name: /detectLocation/i });
    fireEvent.click(detectBtn);
    expect(handleDetect).toHaveBeenCalledTimes(1);
  });

  it('triggers onSelectCity when clicking a city preset', () => {
    const handleSelect = vi.fn();
    const handleDetect = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        onSelectCity={handleSelect}
        onDetectGps={handleDetect}
      />
    );

    const makkahBtn = screen.getByRole('button', { name: /Makkah/i });
    fireEvent.click(makkahBtn);

    const expectedCity = POPULAR_CITIES.find((c) => c.name === 'Makkah');
    expect(handleSelect).toHaveBeenCalledWith(expectedCity);
  });

  it('disables detect GPS button when isDetectingGps is true', () => {
    const handleSelect = vi.fn();
    const handleDetect = vi.fn();

    render(
      <QiblahLocationPicker
        currentCity="London"
        onSelectCity={handleSelect}
        onDetectGps={handleDetect}
        isDetectingGps={true}
      />
    );

    const detectBtn = screen.getByRole('button', { name: /detectLocation/i });
    expect(detectBtn).toBeDisabled();
  });
});
