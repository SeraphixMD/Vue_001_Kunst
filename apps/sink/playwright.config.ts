import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for the sink's visual + a11y + SSR smoke suite.
 *
 * - Launches `pnpm preview` in the background (vite preview server on 4173)
 *   so tests run against the production build, not dev-server HMR output.
 * - Single desktop-chromium project. The library is framework-locked to
 *   Vue 3, so cross-browser matters less than cross-token (dark/light) and
 *   cross-composition (sink scenarios).
 * - Snapshots committed under `tests/e2e/**.spec.ts-snapshots/`.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      // Allow minor anti-alias drift between runs without failing the suite.
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env['CI'],
    timeout: 60_000,
  },
})
