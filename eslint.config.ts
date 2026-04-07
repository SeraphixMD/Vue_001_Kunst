/**
 * Root ESLint flat config for the monorepo.
 *
 * Applies the @kunst/eslint-plugin-ui `library-internal` preset to
 * packages/ui/src/** — all six custom rules fire here. apps/** and
 * packages/eslint-plugin-ui/** use looser configs because they are dev
 * harnesses and tooling, not library source.
 */

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import kunstUi from '@kunst/eslint-plugin-ui'

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Vue SFCs everywhere
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
  },

  // Library-internal enforcement: all six @kunst/ui rules against packages/ui/src
  {
    files: ['packages/ui/src/**/*.{ts,vue}'],
    plugins: {
      '@kunst/ui': kunstUi,
    },
    rules: {
      '@kunst/ui/layout-utilities-only': 'error',
      '@kunst/ui/no-raw-color-tokens': 'error',
      '@kunst/ui/require-cva-for-variants': 'error',
      '@kunst/ui/require-component-contract': 'error',
      '@kunst/ui/require-test-colocation': 'error',
      // Library components are single-word PascalCase by design (Button, Input, Card, …).
      // The ComponentName union in rules.config.ts is the source of truth for naming.
      'vue/multi-word-component-names': 'off',
    },
  },

  // The scenario manifest gets its own rule
  {
    files: ['apps/sink/src/scenario-manifest.ts'],
    plugins: {
      '@kunst/ui': kunstUi,
    },
    rules: {
      '@kunst/ui/require-scenario-for-component': 'error',
    },
  },

  // Consumer-facing enforcement in the sink apps (only the public-facing rules)
  {
    files: ['apps/sink/src/**/*.{ts,vue}', 'apps/nuxt-sink/**/*.{ts,vue}'],
    plugins: {
      '@kunst/ui': kunstUi,
    },
    rules: {
      '@kunst/ui/layout-utilities-only': 'error',
      // Sink pages use single-word names (Index, ButtonPage) — dev harness convention.
      'vue/multi-word-component-names': 'off',
    },
  },

  // Scripts, configs, tests — looser
  {
    files: ['**/*.config.{ts,js}', '**/scripts/**/*.ts', '**/tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
