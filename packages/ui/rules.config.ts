/**
 * Layer 1 — Canonical Spec
 *
 * This file is the single source of truth for every rule in the @kunst/ui library.
 * It is read by:
 *   - packages/eslint-plugin-ui (Layer 2 — machine enforcement)
 *   - packages/ui/scripts/verify-rule-coverage.ts (Layer 2 — meta-verifier)
 *   - packages/ui/scripts/generate-claude-sections.ts (Layer 3 — doc generator)
 *   - .claude/skills/**//*SKILL.md                      (Layer 4 — scaffolding)
 *
 * DO NOT hand-edit values without running `pnpm verify:rule-coverage` immediately.
 * Every field here maps to a machine check elsewhere. Drift is forbidden.
 */

export type ComponentName =
  | 'Button'
  | 'Input'
  | 'Label'
  | 'Card'
  | 'Dialog'
  | 'Accordion'
  | 'Avatar'
  | 'Spinner'
  | 'Table'
  | 'Select'
  | 'Tabs'
  | 'Toast'
  | 'Popover'
  | 'Pagination'
  | 'Badge'

export interface ComponentSpec {
  /** PascalCase display name, matches the component folder. */
  readonly name: ComponentName
  /** Reka UI primitive imports this component wraps. Empty array for from-scratch. */
  readonly primitives: readonly string[]
  /** Visual variants exposed via the `variant` prop. Empty array means single-variant. */
  readonly variants: readonly string[]
  /** Size variants exposed via the `size` prop. Empty array means size-less. */
  readonly sizes: readonly string[]
  /** Whether the component exposes Reka UI's `asChild` escape hatch. */
  readonly supportsAsChild: boolean
  /** Named slots in the compound component anatomy. Empty for single-element components. */
  readonly slots: readonly string[]
}

export interface RulesConfig {
  readonly version: '1.0.0'
  readonly packageName: '@kunst/ui'

  /**
   * Layout-only Tailwind utilities permitted on library components in consumer code.
   * Enforced by `@kunst/ui/layout-utilities-only`. A utility must match at least one
   * `allowedPrefixes` entry AND not match any `deniedPrefixes` entry to pass.
   */
  readonly layoutUtilities: {
    readonly allowedPrefixes: readonly string[]
    readonly deniedPrefixes: readonly string[]
  }

  /**
   * Semantic design tokens. Names must match `--<category>-<name>` CSS custom properties
   * in `packages/ui/src/styles/tokens.css` 1:1. `verify-rule-coverage.ts` asserts this.
   */
  readonly tokens: {
    readonly colors: readonly string[]
    readonly radii: readonly string[]
    readonly typography: readonly string[]
    readonly zIndex: readonly string[]
    readonly shadows: readonly string[]
  }

  /** Component specifications — every entry must have a matching folder under `src/components/`. */
  readonly components: Readonly<Record<ComponentName, ComponentSpec>>

  /** Components that must expose variants via cva (enforced by `require-cva-for-variants`). */
  readonly variants: {
    readonly required: readonly ComponentName[]
  }

  readonly testing: {
    readonly colocationPattern: '{component}.test.ts'
    readonly scenarioManifestPath: 'apps/sink/src/scenario-manifest.ts'
    readonly requireScenarioFor: readonly ComponentName[]
  }

  /** SSR safety rules enforced by the eslint plugin and verify-rule-coverage. */
  readonly ssr: {
    /** Identifiers forbidden at module scope in `packages/ui/src/**`. */
    readonly disallowedModuleScopeAccess: readonly string[]
    /** Components that must have a route in `apps/nuxt-sink/pages/scenarios/`. */
    readonly requireNuxtScenario: readonly ComponentName[]
  }

  readonly eslint: {
    readonly libraryPackageName: '@kunst/ui'
    readonly layoutWhitelistRuleId: '@kunst/ui/layout-utilities-only'
  }
}

export const rulesConfig: RulesConfig = {
  version: '1.0.0',
  packageName: '@kunst/ui',

  layoutUtilities: {
    allowedPrefixes: [
      // Flex and grid containers
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'contents',
      'block',
      'inline',
      'inline-block',
      'hidden',
      // Gap and spacing between children
      'gap-',
      'gap-x-',
      'gap-y-',
      'space-x-',
      'space-y-',
      // Margin (outer spacing — composition only)
      'm-',
      'mx-',
      'my-',
      'mt-',
      'mr-',
      'mb-',
      'ml-',
      'ms-',
      'me-',
      // Padding (outer spacing — composition only)
      'p-',
      'px-',
      'py-',
      'pt-',
      'pr-',
      'pb-',
      'pl-',
      'ps-',
      'pe-',
      // Sizing for layout (width only — height is component-internal via size prop)
      'w-',
      'min-w-',
      'max-w-',
      'aspect-',
      // Grid children
      'col-',
      'row-',
      'col-span-',
      'row-span-',
      'col-start-',
      'col-end-',
      'row-start-',
      'row-end-',
      'order-',
      // Flex children
      'basis-',
      'grow',
      'grow-',
      'shrink',
      'shrink-',
      'flex-',
      // Alignment
      'items-',
      'justify-',
      'self-',
      'place-',
      'content-',
    ],
    deniedPrefixes: [
      // Colors and theming — must use variant/size props
      'bg-',
      'text-', // note: text-left/center/right/justify are layout but we ban the whole prefix
      // and expose layout-specific alternatives via component props where needed
      'from-',
      'to-',
      'via-',
      'fill-',
      'stroke-',
      // Borders and shapes — locked by the library
      'border-',
      'rounded-',
      'divide-',
      'outline-',
      // Typography — locked by the library
      'font-',
      'leading-',
      'tracking-',
      'uppercase',
      'lowercase',
      'capitalize',
      'italic',
      // Sizing — height is component-internal via size prop
      'h-',
      'min-h-',
      'max-h-',
      'size-',
      // Effects — locked by the library
      'shadow-',
      'ring-',
      'opacity-',
      'backdrop-',
      'blur-',
      'brightness-',
    ],
  },

  tokens: {
    colors: [
      'background',
      'foreground',
      'card',
      'card-foreground',
      'popover',
      'popover-foreground',
      'primary',
      'primary-foreground',
      'secondary',
      'secondary-foreground',
      'muted',
      'muted-foreground',
      'accent',
      'accent-foreground',
      'destructive',
      'destructive-foreground',
      'border',
      'input',
      'ring',
    ],
    radii: ['radius-sm', 'radius', 'radius-md', 'radius-lg'],
    typography: ['font-sans', 'font-mono'],
    zIndex: [
      'z-dropdown',
      'z-sticky',
      'z-modal',
      'z-popover',
      'z-toast',
    ],
    shadows: ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg'],
  },

  components: {
    Button: {
      name: 'Button',
      primitives: [],
      variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      sizes: ['sm', 'default', 'lg', 'icon'],
      supportsAsChild: true,
      slots: [],
    },
    Input: {
      name: 'Input',
      primitives: [],
      variants: ['default'],
      sizes: ['sm', 'default', 'lg'],
      supportsAsChild: false,
      slots: [],
    },
    Label: {
      name: 'Label',
      primitives: ['Label'],
      variants: ['default'],
      sizes: [],
      supportsAsChild: true,
      slots: [],
    },
    Card: {
      name: 'Card',
      primitives: [],
      variants: ['default'],
      sizes: [],
      supportsAsChild: false,
      slots: ['header', 'title', 'description', 'content', 'footer'],
    },
    Dialog: {
      name: 'Dialog',
      primitives: [
        'DialogRoot',
        'DialogTrigger',
        'DialogPortal',
        'DialogOverlay',
        'DialogContent',
        'DialogTitle',
        'DialogDescription',
        'DialogClose',
      ],
      variants: ['default'],
      sizes: ['sm', 'default', 'lg'],
      supportsAsChild: true,
      slots: ['trigger', 'header', 'title', 'description', 'content', 'footer'],
    },
    Accordion: {
      name: 'Accordion',
      primitives: [
        'AccordionRoot',
        'AccordionItem',
        'AccordionHeader',
        'AccordionTrigger',
        'AccordionContent',
      ],
      variants: ['default'],
      sizes: [],
      supportsAsChild: true,
      slots: ['item', 'trigger', 'content'],
    },
    Avatar: {
      name: 'Avatar',
      primitives: ['AvatarRoot', 'AvatarImage', 'AvatarFallback'],
      variants: ['default'],
      sizes: ['sm', 'default', 'lg'],
      supportsAsChild: false,
      slots: ['image', 'fallback'],
    },
    Spinner: {
      name: 'Spinner',
      primitives: [],
      variants: ['default'],
      sizes: ['xs', 'sm', 'default', 'lg'],
      supportsAsChild: false,
      slots: [],
    },
    Table: {
      name: 'Table',
      primitives: [],
      variants: ['default'],
      sizes: [],
      supportsAsChild: false,
      slots: ['header', 'body', 'footer', 'row', 'head', 'cell', 'caption'],
    },
    Select: {
      name: 'Select',
      primitives: [
        'SelectRoot',
        'SelectTrigger',
        'SelectValue',
        'SelectPortal',
        'SelectContent',
        'SelectViewport',
        'SelectItem',
        'SelectItemText',
        'SelectItemIndicator',
        'SelectGroup',
        'SelectLabel',
        'SelectSeparator',
        'SelectScrollUpButton',
        'SelectScrollDownButton',
      ],
      variants: ['default'],
      sizes: [],
      supportsAsChild: true,
      slots: ['trigger', 'content', 'item', 'group', 'label', 'separator'],
    },
    Tabs: {
      name: 'Tabs',
      primitives: [
        'TabsRoot',
        'TabsList',
        'TabsTrigger',
        'TabsContent',
        'TabsIndicator',
      ],
      variants: ['default'],
      sizes: [],
      supportsAsChild: true,
      slots: ['list', 'trigger', 'content'],
    },
    Toast: {
      name: 'Toast',
      primitives: [
        'ToastProvider',
        'ToastViewport',
        'ToastRoot',
        'ToastTitle',
        'ToastDescription',
        'ToastAction',
        'ToastClose',
      ],
      variants: ['default', 'destructive'],
      sizes: [],
      supportsAsChild: false,
      slots: ['title', 'description', 'action', 'close'],
    },
    Popover: {
      name: 'Popover',
      primitives: [
        'PopoverRoot',
        'PopoverTrigger',
        'PopoverPortal',
        'PopoverContent',
        'PopoverClose',
        'PopoverArrow',
      ],
      variants: ['default'],
      sizes: [],
      supportsAsChild: true,
      slots: ['trigger', 'content'],
    },
    Pagination: {
      name: 'Pagination',
      primitives: [],
      variants: ['default'],
      sizes: [],
      supportsAsChild: false,
      slots: ['content', 'item', 'link', 'previous', 'next', 'ellipsis'],
    },
    Badge: {
      name: 'Badge',
      primitives: [],
      variants: ['default', 'secondary', 'destructive', 'outline'],
      sizes: [],
      supportsAsChild: false,
      slots: [],
    },
  },

  variants: {
    required: ['Button', 'Input', 'Dialog', 'Avatar', 'Badge'],
  },

  testing: {
    colocationPattern: '{component}.test.ts',
    scenarioManifestPath: 'apps/sink/src/scenario-manifest.ts',
    requireScenarioFor: ['Button', 'Input', 'Label', 'Card', 'Dialog', 'Accordion', 'Avatar', 'Table', 'Select', 'Tabs', 'Toast', 'Popover', 'Pagination', 'Badge'],
  },

  ssr: {
    disallowedModuleScopeAccess: [
      'window',
      'document',
      'localStorage',
      'sessionStorage',
      'navigator',
      'location',
    ],
    requireNuxtScenario: ['Button', 'Input', 'Label', 'Card', 'Dialog', 'Accordion', 'Avatar', 'Table', 'Select', 'Tabs', 'Toast', 'Popover', 'Pagination', 'Badge'],
  },

  eslint: {
    libraryPackageName: '@kunst/ui',
    layoutWhitelistRuleId: '@kunst/ui/layout-utilities-only',
  },
} as const

export default rulesConfig
