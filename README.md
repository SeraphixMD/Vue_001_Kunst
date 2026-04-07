# @kunst/ui

Opinionated Vue 3 component library built on [Reka UI](https://reka-ui.com) + [Tailwind CSS v4](https://tailwindcss.com). Components ship with a locked visual design. Consumers use `variant` and `size` props, not Tailwind classes, to change appearance. Tailwind in consumer code is restricted to layout composition only.

## Architecture

Every design rule is machine-enforced through a four-layer system:

1. **`packages/ui/rules.config.ts`** - canonical spec (single source of truth)
2. **`packages/eslint-plugin-ui/`** - custom ESLint rules that read from Layer 1
3. **`docs/`** - human documentation, partially generated from Layer 1
4. **Scaffolding templates** - reproducible component creation

Every rule in the docs must have a corresponding check in the ESLint plugin. `pnpm verify:rule-coverage` enforces this at CI time.

## Layout

```
packages/
  ui/                 - the library itself
  eslint-plugin-ui/   - custom ESLint rules
apps/
  sink/               - Vite SPA dev harness + visual regression corpus
docs/
  design-language.md  - use-case catalog
  architecture.md     - the four-layer model
```

## Scripts

- `pnpm verify:quick` - fast gate: lint + typecheck + rule-coverage (under 15s)
- `pnpm verify:full` - full suite: quick + tests + e2e + release-check
- `pnpm dev` (from `apps/sink`) - start the Vite sink dev server
- `pnpm changeset` - record a change for the next release
