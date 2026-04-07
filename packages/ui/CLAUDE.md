# packages/ui — Library Source Rules

You are editing source code inside the `@kunst/ui` library package. This file inherits from the root `CLAUDE.md` and adds package-specific rules. If anything here conflicts with the root, the root wins — but they shouldn't conflict.

## Component folder convention

Every component lives in its own folder under `packages/ui/src/components/{Name}/` with **exactly** these files:

```
packages/ui/src/components/Button/
├── Button.vue            — the SFC
├── Button.variants.ts    — cva variant definitions (required if in rulesConfig.variants.required)
├── Button.contract.ts    — the Props type (extends BaseComponentProps or VariantComponentProps)
├── Button.test.ts        — Vitest browser-mode unit test
└── index.ts              — re-exports the component and the Props type
```

The folder name, the SFC filename, and the `Name` prefix on the other files **must match the `ComponentName` literal in `rules.config.ts`**. No variations. The `require-component-contract` and `require-test-colocation` ESLint rules enforce this.

**Never hand-write these files.** Invoke the `new-component` skill (`.claude/skills/new-component/SKILL.md`), which scaffolds all five from templates and runs verification. Hand-writing produces subtly-wrong output that passes spot-reads but fails lint or rule-coverage.

## cva pattern (canonical example)

Variant definitions live in `{Name}.variants.ts` and look like this:

```ts
// Button.variants.ts
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base classes — applied to every variant. Layout + state only.
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

Inside the SFC, call `buttonVariants({ variant, size })` and pass the result to `cn()` along with the consumer's `class` prop:

```vue
<script setup lang="ts">
import { buttonVariants } from './Button.variants.ts'
import type { ButtonProps } from './Button.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <button :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)">
    <slot />
  </button>
</template>
```

Key rules:
- **All appearance classes live inside the cva call.** Never in the template, never in a `<style>` block.
- **Classes reference semantic tokens only.** `bg-primary`, `text-destructive-foreground`, `ring-ring` — never `bg-blue-500` or raw color values. `no-raw-color-tokens` enforces this.
- **The `cn()` helper merges cva output with the consumer's `class` prop.** Pass the consumer's class LAST so their layout utilities win on collisions.
- **Use `withDefaults` for default variant values.** The cva `defaultVariants` option is also used by the type system, but Vue's `withDefaults` ensures the runtime default is applied.

## Reka UI integration

Components whose `rulesConfig.components[X].primitives` field is non-empty wrap Reka UI primitives. The pattern is a slot-based compound component where each sub-component wraps one Reka primitive:

```ts
// Dialog/index.ts
export { default as Dialog } from './Dialog.vue'
export { default as DialogTrigger } from './DialogTrigger.vue'
export { default as DialogContent } from './DialogContent.vue'
export { default as DialogHeader } from './DialogHeader.vue'
export { default as DialogTitle } from './DialogTitle.vue'
export { default as DialogDescription } from './DialogDescription.vue'
export { default as DialogFooter } from './DialogFooter.vue'
export { default as DialogClose } from './DialogClose.vue'
export type { DialogProps } from './Dialog.contract.ts'
```

Every wrapper forwards `asChild` to its Reka primitive. Never bypass Reka's accessibility logic — if you're tempted to hand-roll keyboard handling, you're doing it wrong; use the primitive.

## Test colocation & browser mode

Every component SFC must have a sibling `{Name}.test.ts` that runs in Vitest browser mode (Playwright provider). Unit tests in jsdom are not acceptable for this library — jsdom misses CSS, focus management, and layout behavior, which are exactly the things components care about.

Minimum coverage per component:
1. Renders with default variant and size; class string matches the cva output.
2. Each variant × each size; class strings are distinct.
3. `asChild` rendering (when `supportsAsChild` is true).
4. Keyboard interaction (when applicable — Dialog ESC, Accordion arrow keys, etc.).
5. Component-scope axe smoke.

## SSR rules

`packages/ui/src/**` must be safe to evaluate at module load on the server. That means:

- **No module-scope references to `window`, `document`, `localStorage`, `sessionStorage`, `navigator`, `location`.** Move DOM access into `onMounted`, `onBeforeMount`, or later lifecycle hooks. `verify-rule-coverage.ts` scans for this and fails on violations.
- **Dialog's portal target** uses Reka UI's `<DialogPortal>`, which is SSR-safe (it renders the children in a placeholder on the server and teleports on hydration). Never hand-roll `document.body.appendChild`.
- **No `document.createElement` at module scope,** even for fallback detection. Use conditional logic inside a lifecycle hook.

## Skill map

| When you want to… | Invoke this skill |
|---|---|
| Create a new component | `.claude/skills/new-component/SKILL.md` |
| Add a variant to an existing component | `.claude/skills/add-variant/SKILL.md` _(deferred)_ |
| Add a scenario to the sink | `.claude/skills/new-scenario/SKILL.md` _(deferred)_ |
| Add a design token | `.claude/skills/add-token/SKILL.md` _(deferred)_ |
| Verify the library contracts before release | `.claude/skills/verify-contract/SKILL.md` _(deferred — use `pnpm verify:full` for now)_ |

Only the `new-component` skill is active in v1. The others are placeholders; for now, perform those tasks manually with the guidance of this file and the root `CLAUDE.md`, and add `pnpm verify:quick` as a gate before you declare done.
