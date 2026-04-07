import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // @tailwindcss/vite is required at the vite config level (not inside test)
  // so it intercepts CSS imports at transform time. The plugin processes
  // `@import "tailwindcss"` from the library's styles.css entry, applies the
  // @theme tokens, and scans component sources via the `@source` directive.
  plugins: [vue(), tailwindcss()],
  test: {
    include: ['src/**/*.test.ts'],
    // Runs once per worker before any test file. Loads the library's styles
    // entry, so browser-mode rendering shows actual styled components rather
    // than naked class attributes against a white background.
    setupFiles: ['./tests/setup.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      name: 'chromium',
    },
  },
})
