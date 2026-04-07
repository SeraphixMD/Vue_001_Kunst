import { test, expect } from '@playwright/test'

import scenarios from '../../src/scenario-manifest.ts'

/**
 * Visual regression: for every scenario in the manifest, navigate to its
 * route and snapshot the main content area in both light and dark themes.
 *
 * First run writes baselines to tests/e2e/scenarios.spec.ts-snapshots/.
 * Subsequent runs diff against them and fail on any pixel delta beyond
 * `maxDiffPixelRatio` (set in playwright.config.ts).
 *
 * Baselines are committed. Regenerate with `pnpm --filter sink test:e2e:update`
 * when you deliberately change the rendered output of a scenario.
 */
for (const scenario of scenarios) {
  test.describe(`scenario: ${scenario.id}`, () => {
    test('light mode', async ({ page }) => {
      await page.goto(`/#${scenario.path}`)
      await page.waitForLoadState('networkidle')
      // Give animations (Dialog open, Accordion expand) one frame to settle.
      await page.waitForTimeout(200)
      await expect(page.locator('main')).toHaveScreenshot(
        `${scenario.id}-light.png`,
      )
    })

    test('dark mode', async ({ page }) => {
      await page.goto('/')
      // Toggle dark via the header button so the composable stays canonical.
      await page.getByRole('button', { name: 'Dark' }).click()
      await page.goto(`/#${scenario.path}`)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(200)
      await expect(page.locator('main')).toHaveScreenshot(
        `${scenario.id}-dark.png`,
      )
    })
  })
}
