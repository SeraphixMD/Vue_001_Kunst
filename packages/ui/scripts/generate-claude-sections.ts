#!/usr/bin/env tsx
/**
 * Layer 3 doc generator.
 *
 * Reads packages/ui/rules.config.ts and regenerates the sections of Layer 3
 * documentation that mirror Layer 1 data:
 *
 *   - docs/component-contract.md           (full file, regenerated)
 *   - CLAUDE.md                            (between <!-- BEGIN:GENERATED --> markers)
 *   - packages/ui/CLAUDE.md                (between <!-- BEGIN:GENERATED --> markers)
 *
 * Every run is deterministic: same rulesConfig in, same bytes out. Hand-edits
 * between the generated markers are lost. If you need to change generated
 * content, change `rules.config.ts` and re-run.
 *
 * Usage:
 *   pnpm --filter @kunst/ui generate:docs
 *   (automatically invoked by verify:quick via the PostToolUse hook on
 *   rules.config.ts)
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import rulesConfig, { type ComponentName } from '../rules.config.ts'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const pkgRoot = resolve(scriptDir, '..')
const repoRoot = resolve(pkgRoot, '..', '..')

// Scoped marker names — the suffix after GENERATED: identifies which section.
// Unscoped `BEGIN:GENERATED` without a suffix is reserved for full-file rewrites
// (docs/component-contract.md).
const CONTRACT_BEGIN = '<!-- BEGIN:GENERATED -->'
const CONTRACT_END = '<!-- END:GENERATED -->'
const RULES_BEGIN = '<!-- BEGIN:GENERATED:rules -->'
const RULES_END = '<!-- END:GENERATED:rules -->'

/* ----------------------- docs/component-contract.md ---------------------- */

function renderComponentContract(): string {
  const lines: string[] = []
  lines.push('# Component Contract')
  lines.push('')
  lines.push(
    '> This document is generated from `packages/ui/rules.config.ts` and `packages/ui/src/contracts/base.ts`. Do not edit by hand — run `pnpm --filter @kunst/ui generate:docs` after changing the source.',
  )
  lines.push('')
  lines.push(CONTRACT_BEGIN)
  lines.push('')
  lines.push('## Base types')
  lines.push('')
  lines.push('Every library component must export a `{Name}Props` type that extends `BaseComponentProps` or `VariantComponentProps`. These live in `packages/ui/src/contracts/base.ts`:')
  lines.push('')
  lines.push('```ts')
  lines.push('interface BaseComponentProps {')
  lines.push('  /** Layout-only utilities. Enforced at lint time, not type time. */')
  lines.push("  class?: HTMLAttributes['class']")
  lines.push('  /** Reka-UI escape hatch. Only components with supportsAsChild=true expose this. */')
  lines.push('  asChild?: boolean')
  lines.push('}')
  lines.push('')
  lines.push('interface VariantComponentProps<V extends string, S extends string>')
  lines.push('  extends BaseComponentProps {')
  lines.push('  variant?: V')
  lines.push('  size?: S')
  lines.push('}')
  lines.push('```')
  lines.push('')
  lines.push('## Component catalog')
  lines.push('')
  lines.push('| Component | Primitives | Variants | Sizes | asChild | Slots |')
  lines.push('|---|---|---|---|---|---|')
  for (const name of Object.keys(rulesConfig.components) as ComponentName[]) {
    const c = rulesConfig.components[name]
    const primitives = c.primitives.length > 0 ? c.primitives.join(', ') : '_(from-scratch)_'
    const variants = c.variants.length > 0 ? c.variants.join(', ') : '—'
    const sizes = c.sizes.length > 0 ? c.sizes.join(', ') : '—'
    const slots = c.slots.length > 0 ? c.slots.join(', ') : '—'
    lines.push(
      `| **${name}** | ${primitives} | ${variants} | ${sizes} | ${c.supportsAsChild ? 'yes' : 'no'} | ${slots} |`,
    )
  }
  lines.push('')
  lines.push('## Design tokens')
  lines.push('')
  lines.push('Semantic tokens defined in `packages/ui/src/styles/tokens.css` and mirrored in `rulesConfig.tokens`:')
  lines.push('')
  lines.push('**Colors** (light mode in `tokens.css`, dark overrides in `base.css`):')
  lines.push('')
  lines.push(rulesConfig.tokens.colors.map((c) => `\`--color-${c}\``).join(' · '))
  lines.push('')
  lines.push('**Radii:** ' + rulesConfig.tokens.radii.map((r) => `\`--${r}\``).join(' · '))
  lines.push('')
  lines.push(
    '**Typography:** ' + rulesConfig.tokens.typography.map((t) => `\`--${t}\``).join(' · '),
  )
  lines.push('')
  lines.push('**Z-index:** ' + rulesConfig.tokens.zIndex.map((z) => `\`--${z}\``).join(' · '))
  lines.push('')
  lines.push('**Shadows:** ' + rulesConfig.tokens.shadows.map((s) => `\`--${s}\``).join(' · '))
  lines.push('')
  lines.push('## Layout utility whitelist')
  lines.push('')
  lines.push('Enforced by `@kunst/ui/layout-utilities-only` on every library component usage in consumer code.')
  lines.push('')
  lines.push('**Allowed prefixes:**')
  lines.push('')
  lines.push(rulesConfig.layoutUtilities.allowedPrefixes.map((p) => `\`${p}\``).join(' · '))
  lines.push('')
  lines.push('**Denied prefixes:**')
  lines.push('')
  lines.push(rulesConfig.layoutUtilities.deniedPrefixes.map((p) => `\`${p}\``).join(' · '))
  lines.push('')
  lines.push('## SSR safety')
  lines.push('')
  lines.push(
    'Module-scope references to the following identifiers are forbidden in `packages/ui/src/**`. Use `onMounted` or later lifecycle hooks:',
  )
  lines.push('')
  lines.push(rulesConfig.ssr.disallowedModuleScopeAccess.map((x) => `\`${x}\``).join(' · '))
  lines.push('')
  lines.push(CONTRACT_END)
  lines.push('')
  return lines.join('\n')
}

/* ------------------------- CLAUDE.md rule table -------------------------- */

function renderClaudeRuleTable(): string {
  const lines: string[] = []
  lines.push(
    `1. **No appearance utilities on library components.** \`@kunst/ui/layout-utilities-only\` enforces that \`class\` attributes on components imported from \`${rulesConfig.packageName}\` contain only layout utilities. Allowed prefix count: ${rulesConfig.layoutUtilities.allowedPrefixes.length}. Denied prefix count: ${rulesConfig.layoutUtilities.deniedPrefixes.length}. See \`docs/component-contract.md\` for the full lists.`,
  )
  lines.push(
    `2. **No raw color values in library source.** \`@kunst/ui/no-raw-color-tokens\` forbids hex, rgb, hsl, oklch, oklab, lab, lch literals anywhere under \`packages/ui/src/**\` except inside \`packages/ui/src/styles/tokens.css\`. Reference semantic tokens via CSS variables or \`bg-primary\` / \`text-foreground\` utilities. Available color tokens: ${rulesConfig.tokens.colors.length}.`,
  )
  lines.push(
    `3. **cva for all variants.** \`@kunst/ui/require-cva-for-variants\` enforces that components in \`rulesConfig.variants.required\` (${rulesConfig.variants.required.join(', ')}) define their variants in a sibling \`{Name}.variants.ts\` file via \`class-variance-authority\`. Hand-rolled class-string concatenation in SFCs is forbidden.`,
  )
  lines.push(
    `4. **Explicit component contract.** \`@kunst/ui/require-component-contract\` requires every \`packages/ui/src/components/*/index.ts\` to re-export a \`{Name}Props\` type and have a sibling \`{Name}.contract.ts\` file.`,
  )
  lines.push(
    `5. **Colocated tests.** \`@kunst/ui/require-test-colocation\` requires every \`{Name}.vue\` to have a sibling \`{Name}.test.ts\` in the same folder.`,
  )
  lines.push(
    `6. **Scenarios for all components.** \`@kunst/ui/require-scenario-for-component\` requires every component in \`rulesConfig.testing.requireScenarioFor\` (${rulesConfig.testing.requireScenarioFor.length} components) to appear in \`${rulesConfig.testing.scenarioManifestPath}\`.`,
  )
  lines.push(
    `7. **SSR safety.** No module-scope access to ${rulesConfig.ssr.disallowedModuleScopeAccess.map((x) => `\`${x}\``).join(', ')} in \`packages/ui/src/**\`. DOM access must happen inside \`onMounted\` or later lifecycle hooks.`,
  )
  lines.push('')
  return lines.join('\n')
}

/* ---------------- Replace content between markers in a file -------------- */

function replaceBetweenMarkers(
  filePath: string,
  beginMarker: string,
  endMarker: string,
  replacement: string,
): boolean {
  if (!existsSync(filePath)) return false
  const content = readFileSync(filePath, 'utf8')
  const beginIdx = content.indexOf(beginMarker)
  const endIdx = content.indexOf(endMarker)
  if (beginIdx < 0 || endIdx < 0) return false
  if (endIdx < beginIdx) return false
  const before = content.slice(0, beginIdx + beginMarker.length)
  const after = content.slice(endIdx)
  const next = `${before}\n${replacement}\n${after}`
  if (next === content) return false
  writeFileSync(filePath, next, 'utf8')
  return true
}

/* ------------------------------ Entry point ----------------------------- */

const docsDir = resolve(repoRoot, 'docs')
const componentContractPath = resolve(docsDir, 'component-contract.md')
const rootClaude = resolve(repoRoot, 'CLAUDE.md')

// docs/component-contract.md — full rewrite
writeFileSync(componentContractPath, renderComponentContract(), 'utf8')
console.log(`  wrote ${componentContractPath}`)

// CLAUDE.md — replace between the scoped rules markers
const ruleTable = renderClaudeRuleTable()
const claudeChanged = replaceBetweenMarkers(
  rootClaude,
  RULES_BEGIN,
  RULES_END,
  ruleTable,
)
console.log(
  claudeChanged
    ? `  updated ${rootClaude} (rules section)`
    : `  ${rootClaude} — no changes`,
)

console.log('generate:docs OK')
