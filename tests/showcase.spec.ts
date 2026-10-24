import { expect, test } from '@playwright/test';

test('hydrates, switches tabs, and manages dialog keyboard focus', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Component showcase' })).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  await page.getByRole('tab', { name: 'Preview', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Details', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByText('Small pieces. Solid foundations.')).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Project name' }).fill('A new idea');
  const trigger = page.getByRole('button', { name: 'Preview project' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Ready when you are.' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('A new idea');
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab');
    await expect(dialog).toContainText('Keep exploring');
    expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('persists the selected color theme across reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle color theme' });
  await expect(toggle).toBeEnabled();
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.getByRole('region', { name: 'Component showcase' })).toHaveAttribute(
    'data-hydrated',
    'true',
  );
  await expect(page.locator('html')).toHaveClass(/dark/);
  await toggle.click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});
