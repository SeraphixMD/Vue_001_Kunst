/**
 * Public entry for @kunst/ui.
 *
 * Components are re-exported from this file as they are scaffolded via the
 * `new-component` skill. Do not add exports by hand — the skill manages this
 * file, inserting exports between the markers below.
 */

// @kunst/ui:components-start
export * from './components/Accordion/index.ts'
export * from './components/Avatar/index.ts'
export * from './components/Button/index.ts'
export * from './components/Card/index.ts'
export * from './components/Dialog/index.ts'
export * from './components/Input/index.ts'
export * from './components/Label/index.ts'
// @kunst/ui:components-end

export { cn } from './utils/cn.ts'
export type {
  BaseComponentProps,
  VariantComponentProps,
  ExposedRef,
} from './contracts/base.ts'
