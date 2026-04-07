# Component Contract

> This document is generated from `packages/ui/rules.config.ts` and `packages/ui/src/contracts/base.ts`. Do not edit by hand — run `pnpm --filter @kunst/ui generate:docs` after changing the source.

<!-- BEGIN:GENERATED -->

## Base types

Every library component must export a `{Name}Props` type that extends `BaseComponentProps` or `VariantComponentProps`. These live in `packages/ui/src/contracts/base.ts`:

```ts
interface BaseComponentProps {
  /** Layout-only utilities. Enforced at lint time, not type time. */
  class?: HTMLAttributes['class']
  /** Reka-UI escape hatch. Only components with supportsAsChild=true expose this. */
  asChild?: boolean
}

interface VariantComponentProps<V extends string, S extends string>
  extends BaseComponentProps {
  variant?: V
  size?: S
}
```

## Component catalog

| Component | Primitives | Variants | Sizes | asChild | Slots |
|---|---|---|---|---|---|
| **Button** | _(from-scratch)_ | default, destructive, outline, secondary, ghost, link | sm, default, lg, icon | yes | — |
| **Input** | _(from-scratch)_ | default | sm, default, lg | no | — |
| **Label** | Label | default | — | yes | — |
| **Card** | _(from-scratch)_ | default | — | no | header, title, description, content, footer |
| **Dialog** | DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose | default | sm, default, lg | yes | trigger, header, title, description, content, footer |
| **Accordion** | AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent | default | — | yes | item, trigger, content |
| **Avatar** | AvatarRoot, AvatarImage, AvatarFallback | default | sm, default, lg | no | image, fallback |
| **Spinner** | _(from-scratch)_ | default | xs, sm, default, lg | no | — |
| **Table** | _(from-scratch)_ | default | — | no | header, body, footer, row, head, cell, caption |
| **Select** | SelectRoot, SelectTrigger, SelectValue, SelectPortal, SelectContent, SelectViewport, SelectItem, SelectItemText, SelectItemIndicator, SelectGroup, SelectLabel, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton | default | — | yes | trigger, content, item, group, label, separator |
| **Tabs** | TabsRoot, TabsList, TabsTrigger, TabsContent, TabsIndicator | default | — | yes | list, trigger, content |
| **Toast** | ToastProvider, ToastViewport, ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose | default, destructive | — | no | title, description, action, close |
| **Popover** | PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent, PopoverClose, PopoverArrow | default | — | yes | trigger, content |

## Design tokens

Semantic tokens defined in `packages/ui/src/styles/tokens.css` and mirrored in `rulesConfig.tokens`:

**Colors** (light mode in `tokens.css`, dark overrides in `base.css`):

`--color-background` · `--color-foreground` · `--color-card` · `--color-card-foreground` · `--color-popover` · `--color-popover-foreground` · `--color-primary` · `--color-primary-foreground` · `--color-secondary` · `--color-secondary-foreground` · `--color-muted` · `--color-muted-foreground` · `--color-accent` · `--color-accent-foreground` · `--color-destructive` · `--color-destructive-foreground` · `--color-border` · `--color-input` · `--color-ring`

**Radii:** `--radius-sm` · `--radius` · `--radius-md` · `--radius-lg`

**Typography:** `--font-sans` · `--font-mono`

**Z-index:** `--z-dropdown` · `--z-sticky` · `--z-modal` · `--z-popover` · `--z-toast`

**Shadows:** `--shadow-sm` · `--shadow` · `--shadow-md` · `--shadow-lg`

## Layout utility whitelist

Enforced by `@kunst/ui/layout-utilities-only` on every library component usage in consumer code.

**Allowed prefixes:**

`flex` · `inline-flex` · `grid` · `inline-grid` · `contents` · `block` · `inline` · `inline-block` · `hidden` · `gap-` · `gap-x-` · `gap-y-` · `space-x-` · `space-y-` · `m-` · `mx-` · `my-` · `mt-` · `mr-` · `mb-` · `ml-` · `ms-` · `me-` · `p-` · `px-` · `py-` · `pt-` · `pr-` · `pb-` · `pl-` · `ps-` · `pe-` · `w-` · `min-w-` · `max-w-` · `aspect-` · `col-` · `row-` · `col-span-` · `row-span-` · `col-start-` · `col-end-` · `row-start-` · `row-end-` · `order-` · `basis-` · `grow` · `grow-` · `shrink` · `shrink-` · `flex-` · `items-` · `justify-` · `self-` · `place-` · `content-`

**Denied prefixes:**

`bg-` · `text-` · `from-` · `to-` · `via-` · `fill-` · `stroke-` · `border-` · `rounded-` · `divide-` · `outline-` · `font-` · `leading-` · `tracking-` · `uppercase` · `lowercase` · `capitalize` · `italic` · `h-` · `min-h-` · `max-h-` · `size-` · `shadow-` · `ring-` · `opacity-` · `backdrop-` · `blur-` · `brightness-`

## SSR safety

Module-scope references to the following identifiers are forbidden in `packages/ui/src/**`. Use `onMounted` or later lifecycle hooks:

`window` · `document` · `localStorage` · `sessionStorage` · `navigator` · `location`

<!-- END:GENERATED -->
