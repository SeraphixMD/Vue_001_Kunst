import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      // Resolve @kunst/ui/rules-config to the source file during tests and dev.
      // In production (post-build), consumers resolve via the exports map to
      // ./dist/rules.config.js instead. Both paths point at the same module.
      '@kunst/ui/rules-config': fileURLToPath(
        new URL('../ui/rules.config.ts', import.meta.url),
      ),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
})
