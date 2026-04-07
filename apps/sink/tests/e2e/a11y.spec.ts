import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

import scenarios from '../../src/scenario-manifest.ts'

const componentRoutes = [
  'button',
  'input',
  'label',
  'card',
  'dialog',
  'accordion',
  'avatar',
]

/**
 * Accessibility gate: every sink route (component page + scenario page) must
 * report zero violations at severity >= serious. WCAG 2.1 AA rules are
 * applied. Any violation fails the suite with a human-readable dump of the
 * offending rule IDs, selectors, and help URLs.
 *
 * `moderate` and `minor` violations are allowed for v1 — they're worth
 * looking at during review but shouldn't block a merge. Raise the bar to
 * `serious` → `moderate` once the catalog is stable.
 */
async function runAxe(page: import('@playwright/test').Page, path: string) {
  await page.goto(`/#${path}`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(200)

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  const serious = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  )

  expect(
    serious,
    `Axe found ${serious.length} serious+ violation(s) on ${path}:\n` +
      serious.map((v) => `  - ${v.id}: ${v.help} (${v.helpUrl})`).join('\n'),
  ).toEqual([])
}

test.describe('component pages', () => {
  for (const name of componentRoutes) {
    test(`/components/${name}`, async ({ page }) => {
      await runAxe(page, `/components/${name}`)
    })
  }
})

test.describe('scenario pages', () => {
  for (const scenario of scenarios) {
    test(scenario.id, async ({ page }) => {
      await runAxe(page, scenario.path)
    })
  }
})
