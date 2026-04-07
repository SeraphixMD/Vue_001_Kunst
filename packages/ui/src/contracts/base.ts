/**
 * Layer 2 — Component Contract Types
 *
 * Every component in `src/components/*` exports a `Props` type that extends one of
 * these base interfaces. The ESLint rule `@kunst/ui/require-component-contract`
 * verifies type-level assignability against `BaseComponentProps`.
 *
 * Note: `class` is typed permissively here because TypeScript cannot narrow class
 * strings to a layout-utility whitelist. That check is enforced at lint time by
 * `@kunst/ui/layout-utilities-only`, not at compile time.
 */

import type { HTMLAttributes } from 'vue'

/**
 * The minimal shape every library component must satisfy.
 */
export interface BaseComponentProps {
  /**
   * Layout-only utility classes. Semantic appearance (colors, borders, shadows,
   * typography, radii) is NOT permitted — use `variant` and `size` props instead.
   * Enforced by the `@kunst/ui/layout-utilities-only` ESLint rule.
   */
  class?: HTMLAttributes['class']
  /**
   * Reka-UI escape hatch. Only components with `supportsAsChild: true` in
   * `rules.config.ts` expose this — the rest omit it from their Props type.
   */
  asChild?: boolean
}

/**
 * For components that expose the standard `variant` + `size` surface.
 * V and S should be literal unions matching the component's `rulesConfig.components[X].variants`
 * and `sizes` fields. Example: `VariantComponentProps<'default' | 'destructive', 'sm' | 'lg'>`.
 */
export interface VariantComponentProps<
  V extends string = string,
  S extends string = string,
> extends BaseComponentProps {
  variant?: V
  size?: S
}

/**
 * Shape exposed by a component's `defineExpose({ $el })` so parent refs work uniformly.
 */
export interface ExposedRef<E extends HTMLElement = HTMLElement> {
  $el: E
}
