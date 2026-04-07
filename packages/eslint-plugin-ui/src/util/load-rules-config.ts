/**
 * Loads the canonical rules.config.ts from @kunst/ui.
 *
 * During monorepo development we import directly from the source file via a
 * tsconfig path alias. After publish, consumers get the compiled @kunst/ui
 * package which re-exports the same module under `@kunst/ui/rules-config`.
 * The interface is identical; only the import source differs.
 */

import rulesConfig from '@kunst/ui/rules-config'

export { rulesConfig }
export type { ComponentName, ComponentSpec, RulesConfig } from '@kunst/ui/rules-config'
