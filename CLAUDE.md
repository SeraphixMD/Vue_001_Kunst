# @kunst/ui Contributor Guide

You are editing a Vue 3 component library published to npm as `@kunst/ui`. Components ship with a locked visual design — consumers use `variant` and `size` props, not Tailwind classes, to change appearance. Tailwind in consumer code is restricted to layout composition only (flex/grid/gap/margin/padding/sizing).

**This project's rules are machine-verifiable. Prose rules without a corresponding machine check are disallowed.** Before you add a rule to any document, add the check that enforces it. Before you trust a rule, run the check.

## The four-layer rule model

Every rule lives in four places that must stay in sync:

| Layer | Where | Role |
|---|---|---|
| **1. Canonical spec** | `packages/ui/rules.config.ts` | Single source of truth. TypeScript data, frozen at module load. |
| **2. Machine enforcement** | `packages/eslint-plugin-ui/src/rules/*.ts` + `packages/ui/scripts/verify-rule-coverage.ts` | Custom ESLint rules read from Layer 1 and fail on drift. The meta-verifier asserts every layer matches. |
| **3. Human documentation** | This file, `packages/ui/CLAUDE.md`, `docs/design-language.md`. Sections between the generated markers are regenerated from Layer 1 by `scripts/generate-claude-sections.ts` and MUST NOT be edited by hand. |
| **4. Reproducible actions** | `.claude/skills/**/SKILL.md` | Step-by-step procedures that scaffold code from templates. Claude invokes skills instead of writing structural code freeform. |

## Non-negotiables

<!-- BEGIN:GENERATED:rules -->
1. **No appearance utilities on library components.** `@kunst/ui/layout-utilities-only` enforces that `class` attributes on components imported from `@kunst/ui` contain only layout utilities. Allowed prefix count: 56. Denied prefix count: 28. See `docs/component-contract.md` for the full lists.
2. **No raw color values in library source.** `@kunst/ui/no-raw-color-tokens` forbids hex, rgb, hsl, oklch, oklab, lab, lch literals anywhere under `packages/ui/src/**` except inside `packages/ui/src/styles/tokens.css`. Reference semantic tokens via CSS variables or `bg-primary` / `text-foreground` utilities. Available color tokens: 19.
3. **cva for all variants.** `@kunst/ui/require-cva-for-variants` enforces that components in `rulesConfig.variants.required` (Button, Input, Dialog, Avatar) define their variants in a sibling `{Name}.variants.ts` file via `class-variance-authority`. Hand-rolled class-string concatenation in SFCs is forbidden.
4. **Explicit component contract.** `@kunst/ui/require-component-contract` requires every `packages/ui/src/components/*/index.ts` to re-export a `{Name}Props` type and have a sibling `{Name}.contract.ts` file.
5. **Colocated tests.** `@kunst/ui/require-test-colocation` requires every `{Name}.vue` to have a sibling `{Name}.test.ts` in the same folder.
6. **Scenarios for all components.** `@kunst/ui/require-scenario-for-component` requires every component in `rulesConfig.testing.requireScenarioFor` (12 components) to appear in `apps/sink/src/scenario-manifest.ts`.
7. **SSR safety.** No module-scope access to `window`, `document`, `localStorage`, `sessionStorage`, `navigator`, `location` in `packages/ui/src/**`. DOM access must happen inside `onMounted` or later lifecycle hooks.

<!-- END:GENERATED:rules -->

## Before editing

1. Read the scoped `CLAUDE.md` for the package you're editing:
   - `packages/ui/CLAUDE.md` — library source rules
   - `apps/sink/CLAUDE.md` — dev-harness rules (looser — any Tailwind allowed on non-library elements)
2. If you are creating a component, **invoke the `new-component` skill**. Do not hand-write component files. The skill scaffolds from templates and runs verification.
3. If you are modifying existing code, run `pnpm verify:quick` first to establish a clean baseline, and again before you finish.

## Package topology

```
packages/
  ui/                 — the library (@kunst/ui)
  eslint-plugin-ui/   — custom ESLint rules (@kunst/eslint-plugin-ui)
apps/
  sink/               — Vite SPA dev harness + visual regression corpus
  nuxt-sink/          — Nuxt 3 SSR harness
.claude/
  skills/             — library-dev skills (new-component, add-variant, …)
  settings.json       — hook configuration enforcing per-edit verification
scripts/
  verify-file.ts      — single-file lint (used by PostToolUse hook)
  verify-quick.sh     — fast full-repo verification (used by Stop hook and pre-commit)
  ci/*.sh             — portable CI logic (thin shell wrappers called by GH Actions)
```

## Reference documentation

- `.claude/reka-ui-llms.txt` - Reka UI component and utility index. Read this file when wrapping Reka primitives to find the correct component names, props, and guides (styling, composition, SSR, animation).

## Commands

- `pnpm verify:quick` — fast gate: lint + typecheck + rule-coverage (under 15s)
- `pnpm verify:full` — full suite: quick + tests + e2e + release-check
- `pnpm --filter @kunst/ui test` — component unit tests in Vitest browser mode
- `pnpm --filter @kunst/eslint-plugin-ui test` — ESLint rule unit tests
- `pnpm --filter @kunst/ui generate:docs` — regenerate Layer 3 from Layer 1
- `pnpm changeset` — record a change for the next release

## Forbidden actions

- **Editing between the generated markers by hand.** These are regenerated from `rules.config.ts`.
- **Hand-writing component files.** Use the `new-component` skill. The skill enforces naming, structure, and produces self-verifying output.
- **Adding a rule only to CLAUDE.md without a corresponding ESLint rule or verify-rule-coverage check.** Prose rules without enforcement are disallowed.
- **Downgrading a dependency to dodge a peer conflict.** Upgrade the peer instead. If the ecosystem genuinely can't support the newer version yet, report that and ask.
- **Commenting out failing checks or using `eslint-disable` / `// @ts-ignore` to bypass rules.** Fix the underlying issue. If the rule itself is wrong, fix the rule and add a regression test.

## If a rule fires on your code

Read the error message. Every rule's error message cites the rulesConfig field or principle that failed. Trace that field back to the corresponding check, understand why it fired, and fix the code (not the rule). If you genuinely believe the rule is wrong, the correct response is to update the rule AND add a RuleTester test case that exercises the previously-wrong behavior.
