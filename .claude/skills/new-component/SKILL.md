---
name: new-component
description: Scaffold a new library component from templates. Reads rules.config.ts, creates the component folder + 5 files, wires exports, runs verification. Use this whenever you are asked to create or add a component to @kunst/ui.
triggers:
  - create a new component
  - add a component
  - scaffold {ComponentName}
  - new component
---

# Skill: new-component

You are scaffolding a new library component in `packages/ui/src/components/`. **Do not write component files freeform.** Follow this skill exactly. Every step has a verification check; do not proceed past a failing check.

## 0. Preconditions

Before you start:

1. Read `packages/ui/CLAUDE.md` if you haven't already this session. It contains the cva pattern, SFC template conventions, and SSR rules you'll be applying.
2. Read `packages/ui/rules.config.ts` and locate the `ComponentSpec` for the component you're scaffolding. If the component name is **not** listed in the `components` record, **stop**: you cannot scaffold components that aren't pre-declared in Layer 1. Report this to the user and ask them to add the component to `rulesConfig.components` first.
3. Run `pnpm verify:quick` to confirm the substrate is green before you start. If it fails, fix what's broken before scaffolding; never scaffold on top of a red baseline.

## 1. Determine what to scaffold

Extract from `rulesConfig.components[Name]`:

- `name` — PascalCase component name (e.g., `Button`)
- `primitives` — Reka UI imports, or `[]` for from-scratch
- `variants` — variant names for the `variant` prop, or `[]`
- `sizes` — size names for the `size` prop, or `[]`
- `supportsAsChild` — whether the component exposes Reka's `asChild` prop
- `slots` — named compound-component slots, or `[]`

Also check `rulesConfig.variants.required` — if the name is in this list, you MUST generate a `.variants.ts` file with a cva call.

## 2. Create the component folder

Create the directory:
```
packages/ui/src/components/{Name}/
```

`{Name}` is the exact PascalCase literal from `rulesConfig.components`. Do not pluralize, abbreviate, or casefold.

## 3. Create the five required files from the templates below

All five files must exist after this step. Do not skip any. `require-component-contract` and `require-test-colocation` will fail if any file is missing.

### Template: `{Name}.contract.ts`

**Use a `type` alias, not an `interface`.** The project's ESLint config enables `@typescript-eslint/no-empty-object-type`, which rejects `interface Foo extends Bar {}` with an empty body. `type Foo = Bar` does not trip the rule and is semantically identical for our use case. If you need to add component-specific props, extend with an intersection: `type FooProps = VariantComponentProps<...> & { label?: string }`.

For a variant component (Button, Input, Dialog, Avatar):

```ts
import type { VariantComponentProps } from '../../contracts/base.ts'

export type {Name}Props = VariantComponentProps<
  '{variant1}' | '{variant2}' | '...',
  '{size1}' | '{size2}' | '...'
>
```

For a single-variant component (Label, Card, Accordion — `variants: ['default']` and no meaningful sizes):

```ts
import type { BaseComponentProps } from '../../contracts/base.ts'

export type {Name}Props = BaseComponentProps
```

The literal union members for `variant` and `size` must come from `rulesConfig.components[Name].variants` and `.sizes`. If the component's `sizes` array is empty, omit the second generic parameter and rely on `VariantComponentProps`' default.

### Template: `{Name}.variants.ts` (required if Name is in `rulesConfig.variants.required`)

```ts
import { cva, type VariantProps } from 'class-variance-authority'

export const {name}Variants = cva(
  // Base classes: layout + state only. Appearance goes in the variant branches.
  'inline-flex items-center justify-center /* ... */',
  {
    variants: {
      variant: {
        // One entry per rulesConfig.components[Name].variants
        default: 'bg-primary text-primary-foreground',
        // ...
      },
      size: {
        // One entry per rulesConfig.components[Name].sizes
        default: 'h-10 px-4 py-2',
        // ...
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type {Name}VariantsProps = VariantProps<typeof {name}Variants>
```

`{name}` is camelCase (e.g., `buttonVariants`). `{Name}` is PascalCase (e.g., `ButtonVariants`).

**Class strings inside cva must reference semantic tokens only** — `bg-primary`, `text-foreground`, `ring-ring`, etc. Never `bg-blue-500`, never raw colors. `no-raw-color-tokens` enforces this.

### Template: `{Name}.vue`

For a from-scratch component (`primitives: []`):

```vue
<script setup lang="ts">
import { {name}Variants } from './{Name}.variants.ts'
import type { {Name}Props } from './{Name}.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<{Name}Props>(), {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <{tag} :class="cn({name}Variants({ variant: props.variant, size: props.size }), props.class)">
    <slot />
  </{tag}>
</template>
```

Replace `{tag}` with the appropriate HTML element: `button` for Button, `input` for Input (self-closing, no slot), `span` or `div` for Label/Card, etc.

For a Reka primitive wrapper (`primitives: ['DialogRoot', 'DialogContent', …]`), create one `.vue` file per primitive. The main file (`{Name}.vue`) wraps the Root primitive; siblings like `{Name}Trigger.vue`, `{Name}Content.vue`, etc., wrap the others. Use Reka UI imports directly:

```vue
<script setup lang="ts">
import { DialogRoot, type DialogRootProps } from 'reka-ui'
import type { {Name}Props } from './{Name}.contract.ts'
</script>

<template>
  <DialogRoot v-bind="$attrs">
    <slot />
  </DialogRoot>
</template>
```

### Template: `{Name}.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import {Name} from './{Name}.vue'

describe('{Name}', () => {
  it('renders with default variant and size', () => {
    const wrapper = mount({Name}, {
      slots: { default: 'hello' },
    })
    expect(wrapper.text()).toContain('hello')
    // The class string should contain the cva-generated default classes.
    expect(wrapper.classes().join(' ')).toMatch(/bg-primary|bg-background|bg-card/)
  })

  it('applies the destructive variant', () => {
    const wrapper = mount({Name}, {
      props: { variant: 'destructive' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('destructive')
  })

  // Add one `it(...)` block per variant × size combination that matters.
  // At minimum: cover every variant with a smoke test.
})
```

If the component accepts no variants (e.g., Label with `variants: ['default']` and no sizes), drop the variant test and keep only the default render.

### Template: `index.ts`

For a simple component:
```ts
export { default as {Name} } from './{Name}.vue'
export type { {Name}Props } from './{Name}.contract.ts'
```

For a compound component (multiple SFCs in the folder):
```ts
export { default as {Name} } from './{Name}.vue'
export { default as {Name}Trigger } from './{Name}Trigger.vue'
export { default as {Name}Content } from './{Name}Content.vue'
// ...one per SFC in the folder
export type { {Name}Props } from './{Name}.contract.ts'
```

## 4. Wire the component into the package barrel export

Open `packages/ui/src/index.ts`. Between the `// @kunst/ui:components-start` and `// @kunst/ui:components-end` markers, add a re-export line in PascalCase order:

```ts
export * from './components/{Name}/index.ts'
```

Do not add the export outside the markers. Do not reorder existing exports.

## 5. Add a scenario manifest entry (if the component is in `rulesConfig.testing.requireScenarioFor`)

Open `apps/sink/src/scenario-manifest.ts` (if it doesn't exist, create it using this template):

```ts
import type { ComponentName } from '@kunst/ui/rules-config'

export interface Scenario {
  id: string
  title: string
  path: string
  components: ComponentName[]
  tags: string[]
}

export const scenarios: Scenario[] = [
  // Add entries here.
  {
    id: '{name}-basic',
    title: '{Name} — basic',
    path: '/scenarios/{name}-basic',
    components: ['{Name}'],
    tags: ['basic'],
  },
]

export default scenarios
```

If the file already exists, append a new entry to the `scenarios` array referencing the new component.

The `require-scenario-for-component` rule uses a string search for `'{Name}'` inside this file — as long as the literal component name appears somewhere in the file, the rule is satisfied. The sink app routes will consume the manifest when it's wired in Task #9.

## 6. Run verification

Execute in order. **Do not proceed past a failing step — fix the issue first.**

```bash
# 1. Rule coverage (checks Layer 1 ↔ Layer 2 consistency)
pnpm verify:rule-coverage

# 2. Full fast suite (lint + typecheck + rule-coverage)
pnpm verify:quick

# 3. The component's unit tests — note the filter syntax
pnpm --filter @kunst/ui test {Name}
```

**About the test filter:** `vitest run` takes a positional filename filter directly. Write `pnpm --filter @kunst/ui test Button` (no double-dash). `pnpm ... test -- Button` passes `--` to vitest which terminates arg parsing and makes `Button` a no-op, so the whole suite runs silently instead of failing loudly on a missing filter.

**About test infrastructure:** Vitest runs in browser mode via the Playwright provider (see `packages/ui/vitest.config.ts`). On a fresh machine you may need to run `pnpm exec playwright install chromium` once to install the browser binary. If `pnpm --filter @kunst/ui test` errors with "Executable doesn't exist", that's the fix.

If any step fails:
- Read the error carefully. Every rule cites its `rulesConfig` origin.
- Fix the generated file (not the rule, not the template — the specific file you wrote).
- Re-run from the failing step.

**Do not suppress errors with `eslint-disable` or `// @ts-ignore`.** If you think the rule is wrong, stop and report it to the user — don't silently work around it.

## Known collisions (read before you hit them)

These are known ways the substrate can bite a fresh agent. All have been encountered in prior scaffolds and are listed here so you don't waste time debugging them:

1. **`@typescript-eslint/no-empty-object-type`** fires on `interface FooProps extends BarProps {}`. Use `type FooProps = BarProps` instead (step 3, contract template).

2. **`vue/multi-word-component-names`** is DISABLED for `packages/ui/src/**/*.vue` in `eslint.config.ts`. Single-word component names (Button, Input, Card) are by design — the `ComponentName` union in `rulesConfig` is the source of truth. If you see this rule firing on your component, it means you're editing outside `packages/ui/src/` — move the file to the correct location.

3. **`.vue` imports and `rewriteRelativeImportExtensions`:** The base tsconfig enables `rewriteRelativeImportExtensions: true` for `.ts` imports, but TS 5.7+ errors on `.vue` imports when this is on. `packages/ui/tsconfig.json` overrides it to `false` for this package and provides `src/shims-vue.d.ts`. Inside `packages/ui/src/`, just write `import Button from './Button.vue'` — it works. If vue-tsc errors with `TS2876`, verify the override is still in `packages/ui/tsconfig.json`.

4. **`exactOptionalPropertyTypes: true`** (base tsconfig) means if you forward a possibly-undefined prop to a Reka primitive that expects a concrete string, you'll get a type error. For `Label`'s `for` prop → Reka's `LabelRoot`, use `:for="props.for ?? ''"` or declare the prop without `?` to make it required. Do not `as any` your way out of this.

5. **Per-component substrate gate:** `verify-rule-coverage.ts` now uses a per-component check (updated after an earlier bug). You can scaffold one component at a time — existing folders must be complete, but unscaffolded components are OK in non-strict mode. CI runs `--strict` before release and will catch any missing components at that point.

## 7. Report

When all verification is green, report:

- The component name scaffolded
- The files created (5 for simple, more for compound)
- The scenario manifest entry added
- The verification output (last 10 lines, including the "OK" confirmations)

Do not report "done" until every verification step has exited zero.

## Substitutions cheatsheet

| Placeholder | Meaning | Example |
|---|---|---|
| `{Name}` | PascalCase component name | `Button` |
| `{name}` | camelCase component name | `button` |
| `{NAME}` | UPPER_CASE component name | `BUTTON` |
| `{tag}` | HTML element | `button`, `input`, `span`, `div` |
| `{variant1}`, `{size1}` | Literals from `rulesConfig.components[Name]` | `'default'`, `'destructive'` |
