import { expect, test } from '@playwright/test';

const releases = [
  {
    label: 'March 2026 - Dify 1.13.3',
    path: '/docs/1.13.3/intro/',
    baseline: 'This documentation version targets the March 2026 Dify 1.13.3 compatibility release',
  },
  {
    label: 'September 2025 - Dify 1.9.1',
    path: '/docs/1.9.1/intro/',
    baseline: 'This documentation version targets the September 2025 Dify 1.9.1 legacy release',
  },
  {
    label: 'August 2026 - Dify 1.16.1',
    path: '/docs/intro/',
    baseline: 'The August 2026 workshop is frozen on Dify 1.16.1',
  },
];

test('header selector switches among Dify documentation versions', async ({ page }) => {
  await page.goto('/docs/intro/');

  for (const release of releases) {
    const selector = page.getByRole('button', { name: /Dify 1\.(?:16\.1|13\.3|9\.1)/ });
    await expect(selector).toBeVisible();
    await selector.click();
    await page.getByRole('link', { name: release.label, exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`${release.path.replaceAll('.', '\\.')}?$`));
    await expect(page.getByRole('blockquote').filter({ hasText: 'Workshop release baseline:' })).toContainText(release.baseline);
  }
});