import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const QIBLAH_ROUTE = '/qiblah';
const COMPASS_DIAL_SELECTOR = '[role="img"]';

test.describe('Qiblah Feature E2E', () => {
  test('Desktop Qiblah: sanctuary selection, compass dial, and full-page snapshot', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(QIBLAH_ROUTE);

    // Verify main page elements
    await expect(page.getByRole('heading', { name: /Qiblah/i, level: 1 })).toBeVisible();

    // Verify sanctuary switcher at top
    const makkahBtn = page.getByRole('radio', { name: 'Makkah' });
    const madinahBtn = page.getByRole('radio', { name: 'Madinah' });
    await expect(makkahBtn).toBeVisible();
    await expect(madinahBtn).toBeVisible();

    // Verify accessibility in light mode
    const lightA11y = await new AxeBuilder({ page }).analyze();
    expect(lightA11y.violations).toEqual([]);

    // Verify accessibility in dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(200);
    const darkA11y = await new AxeBuilder({ page }).analyze();
    expect(darkA11y.violations).toEqual([]);

    // Restore light mode for screenshot
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(200);

    // Verify compass dial
    const dial = page.locator(COMPASS_DIAL_SELECTOR);
    await expect(dial).toBeVisible();

    // Verify Qiblah info card details (bearing, distance, cardinal direction)
    await expect(page.getByText(/Distance/i)).toBeVisible();
    await expect(page.getByText(/km/i)).toBeVisible();

    // Full page snapshot for Makkah sanctuary on desktop
    await page.screenshot({ path: 'test-results/desktop-qiblah-makkah.png', fullPage: true });

    // Switch to Madinah
    await madinahBtn.click();
    await expect(madinahBtn).toHaveAttribute('aria-checked', 'true');
    await expect(makkahBtn).toHaveAttribute('aria-checked', 'false');
    await expect(madinahBtn).toHaveClass(/bg-primary/);
    await expect(makkahBtn).not.toHaveClass(/bg-primary/);
    await expect(page.getByText(/towards Madinah/i)).toBeVisible();

    // Full page snapshot for Madinah sanctuary on desktop
    await page.screenshot({ path: 'test-results/desktop-qiblah-madinah.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Mobile Qiblah: layout, independent scroll clearance, and full-page snapshot', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(QIBLAH_ROUTE);

    // Verify header is clean and sticky
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByRole('button', { name: /menu/i })).toBeVisible();

    // Verify independent scroll container clears bottom nav (has pb-28)
    const scrollContainer = page.locator('main .overflow-y-auto');
    await expect(scrollContainer).toBeVisible();
    await expect(scrollContainer).toHaveClass(/pb-28/);

    // Verify compass dial and sanctuary switcher on mobile
    await expect(page.getByRole('radio', { name: 'Makkah' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Madinah' })).toBeVisible();
    await expect(page.locator(COMPASS_DIAL_SELECTOR)).toBeVisible();

    // Bottom navigation is fixed at bottom
    const bottomNav = page.locator('nav.fixed.bottom-0');
    await expect(bottomNav).toBeVisible();

    // Full page snapshot on mobile
    await page.screenshot({ path: 'test-results/mobile-qiblah-makkah.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Qiblah Compass Permission Flow: request permission, denied state, and full-page snapshot', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Mock DeviceOrientationEvent.requestPermission and navigator.permissions.query
    await page.addInitScript(() => {
      const mockConstructor = function () {};
      (
        mockConstructor as unknown as { requestPermission: () => Promise<string> }
      ).requestPermission = () => Promise.resolve('denied');
      (window as unknown as { DeviceOrientationEvent: unknown }).DeviceOrientationEvent =
        mockConstructor;

      if (navigator.permissions) {
        navigator.permissions.query = () =>
          Promise.resolve({
            state: 'prompt',
            name: 'accelerometer',
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          } as unknown as PermissionStatus);
      }
    });

    await page.goto(QIBLAH_ROUTE);

    // The enable compass button must be visible when permission is required
    const enableBtn = page.getByRole('button', { name: /enable compass/i });
    await expect(enableBtn).toBeVisible();

    // Click enable compass to trigger permission flow
    await enableBtn.click();

    // Denied notice must be displayed
    await expect(page.getByText(/Sensor permission is blocked/i)).toBeVisible();

    // Full page snapshot of permission denied state
    await page.screenshot({ path: 'test-results/qiblah-permission-denied.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Qiblah Compass Alignment: facing sanctuary displays aligned success state', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(QIBLAH_ROUTE);
    await expect(page.locator(COMPASS_DIAL_SELECTOR)).toBeVisible();

    // Default Mumbai bearing to Makkah is 280 degrees. Emit orientation matching bearing (alpha = 360 - 280 = 80)
    await page.evaluate(() => {
      const emit = () => {
        const event = new DeviceOrientationEvent('deviceorientation', {
          alpha: 80,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      };
      emit();
      const interval = setInterval(emit, 50);
      (window as unknown as { _orientationInterval?: NodeJS.Timeout })._orientationInterval =
        interval;
    });

    // Verify aligned status pill is visible
    await expect(page.getByText(/Aligned with Qiblah/i)).toBeVisible();

    // Clean up interval
    await page.evaluate(() => {
      const interval = (window as unknown as { _orientationInterval?: NodeJS.Timeout })
        ._orientationInterval;
      if (interval) clearInterval(interval);
    });

    // Full page snapshot of aligned state
    await page.screenshot({ path: 'test-results/qiblah-aligned-success.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Compass Calibration & Sound Controls: open guide, toggle sound, and full-page snapshot', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(QIBLAH_ROUTE);

    // Sound toggle control
    const soundToggleBtn = page.getByRole('button', { name: /sound off/i });
    await expect(soundToggleBtn).toBeVisible();

    await soundToggleBtn.click();
    await expect(page.getByRole('button', { name: /sound on/i })).toBeVisible();

    // Calibration control
    const calibrateBtn = page.getByRole('button', { name: /calibrate/i });
    await expect(calibrateBtn).toBeVisible();

    await calibrateBtn.click();

    // Verify calibration banner with figure-8 illustration
    await expect(page.getByText(/Calibrate Compass/i)).toBeVisible();
    await expect(
      page.getByRole('img', { name: /figure-8 calibration motion illustration/i })
    ).toBeVisible();

    // Full page snapshot of calibration guide on mobile
    await page.screenshot({ path: 'test-results/qiblah-calibration-banner.png', fullPage: true });

    // Dismiss calibration banner
    const doneButtons = page.getByRole('button', { name: /done/i });
    await doneButtons.first().click();
    await expect(page.getByText(/Calibrate Compass/i)).not.toBeVisible();

    expect(consoleErrors).toHaveLength(0);
  });
});
