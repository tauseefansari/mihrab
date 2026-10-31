import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { QiblahCompassCard } from '@/features/qiblah/components/qiblah-compass-card';

const ALIGN_TOWARDS_MAKKAH = 'alignTowards: sanctuaries.makkah';
const ALIGN_TOWARDS_MADINAH = 'alignTowards: sanctuaries.madinah';
const ALIGNED = 'aligned';
const DEVICE_ORIENTATION = 'deviceorientation';
const MUMBAI = 'Mumbai';
const ENABLE_COMPASS = 'enableCompass';
const PERMISSION_DENIED_NOTICE = 'permissionDeniedNotice';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { sanctuary?: string }) => {
    if (values?.sanctuary) {
      return `${key}: ${values.sanctuary}`;
    }
    return key;
  },
}));

describe('QiblahCompassCard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders title, subtitle, compass dial, and metadata info cards', () => {
    render(<QiblahCompassCard />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText(ALIGN_TOWARDS_MAKKAH)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /compass dial pointing toward qiblah/i })
    ).toBeInTheDocument();
    expect(screen.getByText('angle')).toBeInTheDocument();
    expect(screen.getByText('distance')).toBeInTheDocument();
  });

  it('updates coordinates and recalculates bearing when sanctuary preset clicked', () => {
    render(<QiblahCompassCard />);

    // Initially Mecca is selected from Mumbai (3,452 km, 280°)
    expect(screen.getByText(ALIGN_TOWARDS_MAKKAH)).toBeInTheDocument();
    expect(screen.getByText('3,452')).toBeInTheDocument();
    expect(screen.getByText('280°')).toBeInTheDocument();

    const madinahBtn = screen.getByRole('button', { name: 'sanctuaries.madinah' });
    fireEvent.click(madinahBtn);

    // Subtitle updates to Madinah and recalculates distance to Medina (3,478 km, 286°)
    expect(screen.getByText(ALIGN_TOWARDS_MADINAH)).toBeInTheDocument();
    expect(screen.getByText('3,478')).toBeInTheDocument();
    expect(screen.getByText('286°')).toBeInTheDocument();

    const makkahBtn = screen.getByRole('button', { name: 'sanctuaries.makkah' });
    fireEvent.click(makkahBtn);

    // Subtitle updates back to Mecca
    expect(screen.getByText(ALIGN_TOWARDS_MAKKAH)).toBeInTheDocument();
    expect(screen.getByText('3,452')).toBeInTheDocument();
    expect(screen.getByText('280°')).toBeInTheDocument();
  });

  it('automatically fetches GPS geolocation on mount when available', () => {
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

    expect(mockGetCurrentPosition).toHaveBeenCalled();
    expect(screen.getByText('40.71°, -74.01°')).toBeInTheDocument();
    expect(screen.getByText('(40.71° N, 74.01° W)')).toBeInTheDocument();
  });

  it('handles GPS geolocation error on mount gracefully', () => {
    const mockGetCurrentPosition = vi.fn((_success, error) => {
      error(new Error('Permission denied'));
    });

    Object.defineProperty(global.navigator, 'geolocation', {
      value: { getCurrentPosition: mockGetCurrentPosition },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    expect(mockGetCurrentPosition).toHaveBeenCalled();
    // Falls back to Mumbai default
    expect(screen.getByText(MUMBAI)).toBeInTheDocument();
    expect(screen.getByText('(19.08° N, 72.88° E)')).toBeInTheDocument();
  });

  it('handles geolocation absence gracefully on mount', () => {
    const originalGeolocation = global.navigator.geolocation;
    // @ts-expect-error test absence of geolocation property
    delete global.navigator.geolocation;

    render(<QiblahCompassCard />);
    expect(screen.getByText(MUMBAI)).toBeInTheDocument();
    expect(screen.getByText('(19.08° N, 72.88° E)')).toBeInTheDocument();

    Object.defineProperty(global.navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
      writable: true,
    });
  });

  it('shows permission button if DeviceOrientationEvent.requestPermission is present and triggers requestPermission', async () => {
    const mockRequestPermission = vi.fn(async () => 'granted');
    Object.defineProperty(window, 'DeviceOrientationEvent', {
      value: { requestPermission: mockRequestPermission },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    const permBtn = screen.getByRole('button', { name: ENABLE_COMPASS });
    expect(permBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(permBtn);
    });

    expect(mockRequestPermission).toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: ENABLE_COMPASS })).not.toBeInTheDocument();
  });

  it('keeps permission button visible if permission request is denied', async () => {
    const mockRequestPermission = vi.fn(async () => 'denied');
    Object.defineProperty(window, 'DeviceOrientationEvent', {
      value: { requestPermission: mockRequestPermission },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    const permBtn = screen.getByRole('button', { name: ENABLE_COMPASS });
    await act(async () => {
      fireEvent.click(permBtn);
    });

    expect(mockRequestPermission).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: ENABLE_COMPASS })).toBeInTheDocument();
    expect(screen.getByText(PERMISSION_DENIED_NOTICE)).toBeInTheDocument();
  });

  it('handles permission request rejection gracefully', async () => {
    const mockRequestPermission = vi.fn(async () => {
      throw new Error('Permission prompt rejected');
    });
    Object.defineProperty(window, 'DeviceOrientationEvent', {
      value: { requestPermission: mockRequestPermission },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    const permBtn = screen.getByRole('button', { name: ENABLE_COMPASS });
    await act(async () => {
      fireEvent.click(permBtn);
    });

    expect(mockRequestPermission).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: ENABLE_COMPASS })).toBeInTheDocument();
    expect(screen.getByText(PERMISSION_DENIED_NOTICE)).toBeInTheDocument();
  });

  it('hides permission button on mount when navigator.permissions reports granted', async () => {
    Object.defineProperty(window, 'DeviceOrientationEvent', {
      value: { requestPermission: vi.fn() },
      configurable: true,
      writable: true,
    });

    Object.defineProperty(global.navigator, 'permissions', {
      value: {
        query: vi.fn().mockResolvedValue({ state: 'granted' }),
      },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    await act(async () => {});

    expect(screen.queryByRole('button', { name: ENABLE_COMPASS })).not.toBeInTheDocument();
  });

  it('falls back to DeviceMotionEvent.requestPermission when present', async () => {
    const mockMotionRequestPermission = vi.fn(async () => 'granted');
    Object.defineProperty(window, 'DeviceOrientationEvent', {
      value: {},
      configurable: true,
      writable: true,
    });
    Object.defineProperty(window, 'DeviceMotionEvent', {
      value: { requestPermission: mockMotionRequestPermission },
      configurable: true,
      writable: true,
    });

    Object.defineProperty(global.navigator, 'permissions', {
      value: {
        query: vi.fn().mockResolvedValue({ state: 'denied' }),
      },
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    await act(async () => {});

    const permBtn = screen.getByRole('button', { name: ENABLE_COMPASS });
    await act(async () => {
      fireEvent.click(permBtn);
    });

    expect(mockMotionRequestPermission).toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: ENABLE_COMPASS })).not.toBeInTheDocument();
  });

  it('responds to deviceorientation event and updates alignment with haptic vibration', () => {
    const mockVibrate = vi.fn();
    Object.defineProperty(global.navigator, 'vibrate', {
      value: mockVibrate,
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    // Default city Mumbai bearing is 280
    // Simulate device orientation with heading 280 (aligned)
    act(() => {
      const event = new Event(DEVICE_ORIENTATION) as unknown as {
        webkitCompassHeading: number;
      };
      event.webkitCompassHeading = 280;
      window.dispatchEvent(event as unknown as Event);
    });

    expect(screen.getByText(ALIGNED)).toBeInTheDocument();
    expect(mockVibrate).toHaveBeenCalledWith([35]);
  });

  it('does not crash when aligned and navigator.vibrate is not available', () => {
    const originalVibrate = global.navigator.vibrate;
    // @ts-expect-error test absence of vibrate property
    delete global.navigator.vibrate;

    render(<QiblahCompassCard />);

    act(() => {
      const event = new Event(DEVICE_ORIENTATION) as unknown as {
        webkitCompassHeading: number;
      };
      event.webkitCompassHeading = 280;
      window.dispatchEvent(event as unknown as Event);
    });

    expect(screen.getByText(ALIGNED)).toBeInTheDocument();

    Object.defineProperty(global.navigator, 'vibrate', {
      value: originalVibrate,
      configurable: true,
      writable: true,
    });
  });

  it('responds to standard deviceorientation alpha event when webkitCompassHeading is absent', () => {
    render(<QiblahCompassCard />);

    act(() => {
      const event = new Event(DEVICE_ORIENTATION) as unknown as {
        alpha: number;
      };
      event.alpha = 80; // 360 - 80 = 280
      window.dispatchEvent(event as unknown as Event);
    });

    expect(screen.getByText(ALIGNED)).toBeInTheDocument();
  });

  it('updates dial without vibration when not aligned', () => {
    const mockVibrate = vi.fn();
    Object.defineProperty(global.navigator, 'vibrate', {
      value: mockVibrate,
      configurable: true,
      writable: true,
    });

    render(<QiblahCompassCard />);

    act(() => {
      const event = new Event(DEVICE_ORIENTATION) as unknown as {
        webkitCompassHeading: number;
      };
      event.webkitCompassHeading = 50;
      window.dispatchEvent(event as unknown as Event);
    });

    expect(screen.getByText('instruction')).toBeInTheDocument();
    expect(mockVibrate).not.toHaveBeenCalled();
  });
});
