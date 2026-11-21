import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CompassCalibrationBanner } from '@/features/qiblah/components/compass-calibration-banner';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      calibrateTitle: 'Calibrate Compass',
      calibrateInstruction: 'Wave your device in a figure-8 motion to calibrate motion sensors.',
      calibrationDone: 'Done',
      calibrationIllustration: 'Figure-8 calibration motion illustration',
    };
    return translations[key] || key;
  },
}));

describe('CompassCalibrationBanner', () => {
  it('renders calibration title, instruction, and figure-8 graphic', () => {
    const onDismiss = vi.fn();
    render(<CompassCalibrationBanner onDismiss={onDismiss} />);

    expect(screen.getByText('Calibrate Compass')).toBeInTheDocument();
    expect(
      screen.getByText('Wave your device in a figure-8 motion to calibrate motion sensors.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /figure-8 calibration motion illustration/i })
    ).toBeInTheDocument();
  });

  it('triggers onDismiss when the primary Done button is clicked', () => {
    const onDismiss = vi.fn();
    render(<CompassCalibrationBanner onDismiss={onDismiss} />);

    const buttons = screen.getAllByRole('button', { name: 'Done' });
    expect(buttons[1]).toBeDefined();
    // Primary Done button is the bottom action button
    fireEvent.click(buttons[1] as HTMLElement);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('triggers onDismiss when the top close button is clicked', () => {
    const onDismiss = vi.fn();
    render(<CompassCalibrationBanner onDismiss={onDismiss} />);

    const buttons = screen.getAllByRole('button', { name: 'Done' });
    expect(buttons[0]).toBeDefined();
    // Top dismiss button is the first button
    fireEvent.click(buttons[0] as HTMLElement);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
