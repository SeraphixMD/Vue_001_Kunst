import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

function bundleLibraryCSS(): Plugin {
  return {
    name: 'bundle-library-css',
    closeBundle() {
      const tokens = readFileSync(resolve(__dirname, 'src/styles/tokens.css'), 'utf-8')
      const base = readFileSync(resolve(__dirname, 'src/styles/base.css'), 'utf-8')
      const source = "@source './index.js';"
      const output = [tokens.trim(), base.trim(), source].join('\n\n')
      writeFileSync(resolve(__dirname, 'dist/styles.css'), output + '\n')
    },
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src', 'rules.config.ts'],
      exclude: ['src/**/*.test.ts'],
      rollupTypes: true,
    }),
    bundleLibraryCSS(),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'rules.config': resolve(__dirname, 'rules.config.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'reka-ui'],
    },
  },
})
