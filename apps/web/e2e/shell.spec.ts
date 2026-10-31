import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Layout Shell Feature E2E', () => {
  test('Desktop Shell: header is clean, sidebar contains theme and language switchers', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Header has NO theme switcher, NO language dropdown, NO notification icon
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByLabel(/toggle theme/i)).toHaveCount(0);
    await expect(header.getByLabel(/select language/i)).toHaveCount(0);
    await expect(header.getByLabel(/notification/i)).toHaveCount(0);
    await expect(header.getByRole('button', { name: /account/i })).toBeVisible();

    // Verify accessibility in light mode
    const lightA11y = await new AxeBuilder({ page }).analyze();
    expect(lightA11y.violations).toEqual([]);

    // Verify accessibility in dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(200);
    const darkA11y = await new AxeBuilder({ page }).analyze();
    expect(darkA11y.violations).toEqual([]);

    // Restore light mode for rest of test
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(200);

    // Desktop sidebar has switchers in footer
    const sidebar = page.locator('nav.sticky');
    await expect(sidebar).toBeVisible();

    // Verify active navigation link styling and hover in light mode
    const activeNav = sidebar.locator('a[aria-current="page"]');
    await expect(activeNav).toBeVisible();
    await activeNav.hover();
    await page.screenshot({ path: 'test-results/active-nav-hover-light.png' });

    // Verify active navigation link hover in dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(200);
    await activeNav.hover();
    await page.screenshot({ path: 'test-results/active-nav-hover-dark.png' });
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await page.waitForTimeout(200);

    // Verify keyboard arrow navigation in sidebar without outline cutoff
    await activeNav.focus();
    await expect(activeNav).toBeFocused();
    await page.screenshot({ path: 'test-results/sidebar-focus-home.png' });

    const quranNav = sidebar.getByRole('link', { name: /quran/i });
    const prayersNav = sidebar.getByRole('link', { name: /prayers/i });
    const settingsNav = sidebar.getByRole('link', { name: /settings/i });

    // Arrow down moves to next item
    await page.keyboard.press('ArrowDown');
    await expect(quranNav).toBeFocused();
    await page.screenshot({ path: 'test-results/sidebar-focus-quran.png' });

    await page.keyboard.press('ArrowDown');
    await expect(prayersNav).toBeFocused();

    // Arrow up moves to previous item
    await page.keyboard.press('ArrowUp');
    await expect(quranNav).toBeFocused();

    // End key moves to last item
    await page.keyboard.press('End');
    await expect(settingsNav).toBeFocused();

    // Arrow down on last item wraps to first item
    await page.keyboard.press('ArrowDown');
    await expect(activeNav).toBeFocused();

    // Verify inactive navigation link hover
    const qiblahNav = sidebar.getByRole('link', { name: /qiblah/i });
    await expect(qiblahNav).toBeVisible();
    await qiblahNav.hover();

    // Desktop sidebar has switchers in footer
    const langBtn = sidebar.getByLabel(/select language/i);
    const themeBtn = sidebar.getByLabel(/toggle theme/i);
    await expect(langBtn).toBeVisible();
    await expect(themeBtn).toBeVisible();

    // Open language switcher and verify options with script symbols
    await langBtn.click();
    const listbox = sidebar.getByRole('listbox');
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole('option', { name: /English/i })).toBeVisible();
    await expect(listbox.getByRole('option', { name: /العربية/i })).toBeVisible();
    await expect(listbox.getByRole('option', { name: /اردو/i })).toBeVisible();
    await expect(listbox.getByRole('option', { name: /हिन्दी/i })).toBeVisible();

    // Close dropdown
    await page.click('body');
    await expect(listbox).not.toBeVisible();

    // Full page desktop snapshot
    await page.screenshot({ path: 'test-results/desktop-shell.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Mobile Shell: clean header, animated drawer, and animated bottom nav', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Mobile header has brand name and hamburger button only
    const header = page.locator('header');
    await expect(header).toBeVisible();
    const menuBtn = header.getByRole('button', { name: /menu/i });
    await expect(menuBtn).toBeVisible();
    await expect(header.getByLabel(/toggle theme/i)).toHaveCount(0);
    await expect(header.getByLabel(/select language/i)).toHaveCount(0);

    // Mobile bottom navigation is fixed with 5 items
    const bottomNav = page.locator('nav.fixed.bottom-0');
    await expect(bottomNav).toBeVisible();
    await expect(bottomNav.getByRole('link')).toHaveCount(5);

    // Open mobile sidebar drawer
    await menuBtn.click();
    const drawer = page.getByRole('dialog', { name: /navigation/i });
    await expect(drawer).toBeVisible();
    await page.waitForTimeout(350);

    // Verify all 8 drawer nav links
    await expect(drawer.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /quran/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /prayers/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /library/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /tasbeeh/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /qiblah/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /zakat/i })).toBeVisible();
    await expect(drawer.getByRole('link', { name: /settings/i })).toBeVisible();

    // Drawer footer has language and theme switchers
    const drawerLang = drawer.getByLabel(/select language/i);
    const drawerTheme = drawer.getByLabel(/toggle theme/i);
    await expect(drawerLang).toBeVisible();
    await expect(drawerTheme).toBeVisible();

    // Verify mobile accessibility with drawer open
    const drawerA11y = await new AxeBuilder({ page }).analyze();
    expect(drawerA11y.violations).toEqual([]);

    // Capture snapshot with drawer open
    await page.screenshot({ path: 'test-results/mobile-drawer-open.png', fullPage: true });

    // Close drawer via close button
    const closeBtn = drawer.getByRole('button', { name: /close/i });
    await closeBtn.click();
    const hiddenDrawer = page.getByRole('dialog', { name: /navigation/i, includeHidden: true });
    await expect(hiddenDrawer).toHaveAttribute('aria-hidden', 'true');
    await page.waitForTimeout(350);

    // Full page mobile snapshot
    await page.screenshot({ path: 'test-results/mobile-shell.png', fullPage: true });

    expect(consoleErrors).toHaveLength(0);
  });

  test('Not Found (404) page: glassmorphic card, accessibility, and navigation to home', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('404')) {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/non-existent-route-404');

    // Verify 404 card elements
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Page Not Found/i })).toBeVisible();

    // Verify accessibility in light mode
    const lightA11y = await new AxeBuilder({ page }).analyze();
    expect(lightA11y.violations).toEqual([]);

    // Full page light snapshot
    await page.screenshot({ path: 'test-results/not-found-light.png', fullPage: true });

    // Verify accessibility in dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(200);
    const darkA11y = await new AxeBuilder({ page }).analyze();
    expect(darkA11y.violations).toEqual([]);

    // Full page dark snapshot
    await page.screenshot({ path: 'test-results/not-found-dark.png', fullPage: true });

    // Click Back to Home button and verify navigation
    const homeBtn = page.getByRole('link', { name: /Back to Home/i });
    await expect(homeBtn).toBeVisible();
    await homeBtn.hover();
    await homeBtn.click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/As-salamu alaykum/i)).toBeVisible();

    expect(consoleErrors).toHaveLength(0);
  });
});
