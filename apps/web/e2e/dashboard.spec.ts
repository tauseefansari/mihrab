import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dashboard Feature E2E', () => {
  test('Desktop Dashboard: widgets, accessibility, and full-page snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Check dashboard header and welcome surface exist
    await expect(page.getByText(/As-salamu alaykum/i)).toBeVisible();
    await expect(page.getByText(/Welcome to Mihrab/i)).toBeVisible();

    // Verify Qiblah button hover state in light mode
    const qiblahBtn = page.getByRole('main').getByRole('link', { name: /Qiblah/i });
    await expect(qiblahBtn).toBeVisible();
    await qiblahBtn.hover();
    await page.screenshot({ path: 'test-results/home-qiblah-hover-light.png' });

    // Verify accessibility in light mode
    const lightA11y = await new AxeBuilder({ page }).analyze();
    expect(lightA11y.violations).toEqual([]);

    // Verify accessibility and hover in dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(200);
    await qiblahBtn.hover();
    await page.screenshot({ path: 'test-results/home-qiblah-hover-dark.png' });
    const darkA11y = await new AxeBuilder({ page }).analyze();
    expect(darkA11y.violations).toEqual([]);

    // Restore light mode for screenshot
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(200);

    // Full page desktop snapshot
    await page.screenshot({ path: 'test-results/desktop-dashboard.png', fullPage: true });

    // Verify keyboard navigation to Qiblah button
    await qiblahBtn.focus();
    await expect(qiblahBtn).toBeFocused();

    expect(consoleErrors).toHaveLength(0);
  });

  test('Mobile Dashboard: responsive layout, accessibility, and full-page snapshot', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Check header and welcome surface fit mobile layout
    await expect(page.getByText(/As-salamu alaykum/i)).toBeVisible();
    await expect(page.getByText(/Welcome to Mihrab/i)).toBeVisible();

    // Verify accessibility in mobile
    const mobileA11y = await new AxeBuilder({ page }).analyze();
    expect(mobileA11y.violations).toEqual([]);

    // Full page mobile snapshot
    await page.screenshot({ path: 'test-results/mobile-dashboard.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });
});
