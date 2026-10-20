import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { QiblahCompassCard } from '@/features/qiblah/components/qiblah-compass-card';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('QiblahCompassCard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders title, subtitle, compass dial, and metadata info cards', () => {
    render(<QiblahCompassCard />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('subtitle')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /compass dial pointing toward qiblah/i })
    ).toBeInTheDocument();
    expect(screen.getByText('angle')).toBeInTheDocument();
    expect(screen.getByText('distance')).toBeInTheDocument();
  });

  it('updates coordinates and recalculates bearing when city preset clicked', () => {
    render(<QiblahCompassCard />);

    const makkahBtn = screen.getByRole('button', { name: /Makkah/i });
    fireEvent.click(makkahBtn);

    // Kaaba coordinates -> distance should be 0
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles GPS geolocation detection successfully', () => {
    const mockGetCurrentPosition = vi.fn((success) => {
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      });
    });

    Object.defineProperty(global.navigator, 'geolocation', {
      value: { getCurrentPosition: mockGetCurrentPosition },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    const detectBtn = screen.getByRole('button', { name: /detectLocation/i });
    fireEvent.click(detectBtn);

    expect(mockGetCurrentPosition).toHaveBeenCalled();
    expect(screen.getByText('40.71°, -74.01°')).toBeInTheDocument();
  });

  it('handles GPS geolocation error gracefully', () => {
    const mockGetCurrentPosition = vi.fn((_success, error) => {
      error(new Error('Permission denied'));
    });

    Object.defineProperty(global.navigator, 'geolocation', {
      value: { getCurrentPosition: mockGetCurrentPosition },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    const detectBtn = screen.getByRole('button', { name: /detectLocation/i });
    fireEvent.click(detectBtn);

    expect(mockGetCurrentPosition).toHaveBeenCalled();
  });

  it('shows permission button if DeviceOrientationEvent.requestPermission is present', async () => {
    const mockRequestPermission = vi.fn(async () => 'granted');
    Object.defineProperty(window, 'DeviceOrientationEvent', {
      value: { requestPermission: mockRequestPermission },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    const permBtn = screen.getByRole('button', { name: /enableSensors/i });
    expect(permBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(permBtn);
    });

    expect(mockRequestPermission).toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: /enableSensors/i })).not.toBeInTheDocument();
  });

  it('responds to deviceorientation event and updates alignment', () => {
    const mockVibrate = vi.fn();
    Object.defineProperty(global.navigator, 'vibrate', {
      value: mockVibrate,
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    // Default city London bearing is 119
    // Simulate device orientation with heading 119 (aligned)
    act(() => {
      const event = new Event('deviceorientation') as unknown as {
        webkitCompassHeading: number;
      };
      event.webkitCompassHeading = 119;
      window.dispatchEvent(event as unknown as Event);
    });

    expect(screen.getByText('aligned')).toBeInTheDocument();
    expect(mockVibrate).toHaveBeenCalledWith([35]);
  });

  it('keeps permission button visible if permission request is denied', async () => {
    const mockRequestPermission = vi.fn(async () => 'denied');
    Object.defineProperty(window, 'DeviceOrientationEvent', {
      value: { requestPermission: mockRequestPermission },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    const permBtn = screen.getByRole('button', { name: /enableSensors/i });
    await act(async () => {
      fireEvent.click(permBtn);
    });

    expect(mockRequestPermission).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /enableSensors/i })).toBeInTheDocument();
  });

  it('handles geolocation absence gracefully when detect location is triggered', () => {
    const originalGeolocation = global.navigator.geolocation;
    // @ts-expect-error test absence of geolocation property
    delete global.navigator.geolocation;

    render(<QiblahCompassCard />);
    const detectBtn = screen.getByRole('button', { name: /detectLocation/i });
    fireEvent.click(detectBtn);

    // Restore
    Object.defineProperty(global.navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
      writable: true,
    });
  });

  it('does not crash when aligned and navigator.vibrate is not available', () => {
    const originalVibrate = global.navigator.vibrate;
    // @ts-expect-error test absence of vibrate property
    delete global.navigator.vibrate;

    render(<QiblahCompassCard />);

    act(() => {
      const event = new Event('deviceorientation') as unknown as {
        webkitCompassHeading: number;
      };
      event.webkitCompassHeading = 119;
      window.dispatchEvent(event as unknown as Event);
    });

    expect(screen.getByText('aligned')).toBeInTheDocument();

    // Restore
    Object.defineProperty(global.navigator, 'vibrate', {
      value: originalVibrate,
      configurable: true,
      writable: true,
    });
  });
});
