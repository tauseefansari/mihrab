import { test, expect } from '@playwright/test';

test.describe('Dashboard Feature E2E', () => {
  test('Desktop Dashboard: widgets and full-page snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Check dashboard widgets exist
    await expect(page.getByText(/As-salamu alaykum/i)).toBeVisible();
    await expect(page.getByText(/Next Prayer/i).first()).toBeVisible();

    // Full page desktop snapshot
    await page.screenshot({ path: 'test-results/desktop-dashboard.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Mobile Dashboard: responsive layout and full-page snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Check widgets fit mobile layout
    await expect(page.getByText(/As-salamu alaykum/i)).toBeVisible();
    await expect(page.getByText(/Next Prayer/i).first()).toBeVisible();

    // Full page mobile snapshot
    await page.screenshot({ path: 'test-results/mobile-dashboard.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });
});
