/**
 * @kunst/eslint-plugin-ui
 *
 * Custom ESLint rules enforcing the @kunst/ui design-language invariants.
 * All rules read from @kunst/ui/rules-config (Layer 1 canonical spec).
 *
 * Configs:
 *   - `recommended`      — for consumer projects (just the public-facing rules)
 *   - `library-internal` — for the monorepo itself (all six rules)
 */

import type { ESLint, Linter } from 'eslint'

import layoutUtilitiesOnly from './rules/layout-utilities-only.ts'
import noRawColorTokens from './rules/no-raw-color-tokens.ts'
import requireCvaForVariants from './rules/require-cva-for-variants.ts'
import requireComponentContract from './rules/require-component-contract.ts'
import requireTestColocation from './rules/require-test-colocation.ts'
import requireScenarioForComponent from './rules/require-scenario-for-component.ts'

const rules = {
  'layout-utilities-only': layoutUtilitiesOnly,
  'no-raw-color-tokens': noRawColorTokens,
  'require-cva-for-variants': requireCvaForVariants,
  'require-component-contract': requireComponentContract,
  'require-test-colocation': requireTestColocation,
  'require-scenario-for-component': requireScenarioForComponent,
}

/**
 * ESLint 10's `Plugin.rules` type became stricter in ways that typescript-eslint
 * 8.58 (current latest as of April 2026) hasn't caught up to — its RuleCreator
 * output lacks deprecated context methods the new interface still references.
 * Runtime behavior is correct (our rule tests pass); this is purely a
 * type-level ecosystem seam until typescript-eslint 9 ships.
 */
const plugin = {
  meta: {
    name: '@kunst/eslint-plugin-ui',
    version: '0.0.0',
  },
  rules,
  configs: {} as Record<string, Linter.Config | Linter.Config[]>,
} as unknown as ESLint.Plugin

/**
 * Consumer config — published for use in downstream apps. Only enables rules
 * that are meaningful in consumer code (not the library-internal structural
 * rules like require-test-colocation).
 */
const recommendedConfig: Linter.Config = {
  plugins: {
    '@kunst/ui': plugin,
  },
  rules: {
    '@kunst/ui/layout-utilities-only': 'error',
    '@kunst/ui/no-raw-color-tokens': 'error',
  },
}

/**
 * Library-internal config — used in the monorepo to enforce every rule against
 * packages/ui source. Never ship to consumers.
 */
const libraryInternalConfig: Linter.Config = {
  plugins: {
    '@kunst/ui': plugin,
  },
  rules: {
    '@kunst/ui/layout-utilities-only': 'error',
    '@kunst/ui/no-raw-color-tokens': 'error',
    '@kunst/ui/require-cva-for-variants': 'error',
    '@kunst/ui/require-component-contract': 'error',
    '@kunst/ui/require-test-colocation': 'error',
    '@kunst/ui/require-scenario-for-component': 'error',
  },
}

plugin.configs!['recommended'] = recommendedConfig
plugin.configs!['library-internal'] = libraryInternalConfig

export default plugin
export { rules }
