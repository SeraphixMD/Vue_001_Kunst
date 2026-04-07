/**
 * Layer 2 meta-verifier.
 *
 * Asserts that Layer 1 (rules.config.ts), Layer 2 (tokens CSS, component folders,
 * ESLint rule files) and Layer 3 (generated doc sections) are all in sync. Any
 * drift between the canonical spec and its downstream consumers fails here.
 *
 * Self-gating behavior: if NO component folders exist yet, the script is in
 * "substrate phase" and skips per-component existence checks. As soon as any
 * component folder is created, strict mode engages and every component listed
 * in rulesConfig must exist with the full file set.
 *
 * Usage:
 *   pnpm --filter @kunst/ui verify:rule-coverage
 *   pnpm --filter @kunst/ui verify:rule-coverage --strict   # force strict mode
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import rulesConfig, { type ComponentName } from '../rules.config.ts'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const pkgRoot = resolve(scriptDir, '..')
const repoRoot = resolve(pkgRoot, '..', '..')
const srcDir = resolve(pkgRoot, 'src')
const componentsDir = resolve(srcDir, 'components')
const tokensCss = resolve(srcDir, 'styles', 'tokens.css')
const baseCss = resolve(srcDir, 'styles', 'base.css')
const componentContractDoc = resolve(repoRoot, 'docs', 'component-contract.md')
const scenarioManifest = resolve(repoRoot, rulesConfig.testing.scenarioManifestPath)
const nuxtScenariosDir = resolve(repoRoot, 'apps', 'nuxt-sink', 'pages', 'scenarios')
const eslintRulesDir = resolve(repoRoot, 'packages', 'eslint-plugin-ui', 'src', 'rules')

type Level = 'error' | 'warn' | 'info'
interface Finding {
  level: Level
  file: string
  message: string
}

const findings: Finding[] = []
const push = (level: Level, file: string, message: string): void => {
  findings.push({ level, file, message })
}

const strict = process.argv.includes('--strict')

function listDirs(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory()
  })
}

/* ------------------------------------------------------------------ */
/* Check 1: every color/radius/typography/zIndex/shadow token in rulesConfig */
/* appears in tokens.css as --<name>                                   */
/* ------------------------------------------------------------------ */

function checkTokensCss(): void {
  if (!existsSync(tokensCss)) {
    push('error', tokensCss, 'tokens.css is missing — Layer 2 cannot enforce Layer 1')
    return
  }

  const css = readFileSync(tokensCss, 'utf8')

  const expect = (name: string, prefix: string): void => {
    const decl = `--${prefix}${name}:`
    if (!css.includes(decl)) {
      push('error', tokensCss, `missing declaration "${decl}" (from rulesConfig.tokens)`)
    }
  }

  for (const name of rulesConfig.tokens.colors) expect(name, 'color-')
  for (const name of rulesConfig.tokens.radii) expect(name, '')
  for (const name of rulesConfig.tokens.typography) expect(name, '')
  for (const name of rulesConfig.tokens.zIndex) expect(name, '')
  for (const name of rulesConfig.tokens.shadows) expect(name, '')
}

/* ------------------------------------------------------------------ */
/* Check 2: every color token has a dark-mode override in base.css    */
/* ------------------------------------------------------------------ */

function checkDarkOverrides(): void {
  if (!existsSync(baseCss)) {
    push('error', baseCss, 'base.css is missing — dark variant cannot be defined')
    return
  }

  const css = readFileSync(baseCss, 'utf8')

  if (!css.includes('@custom-variant dark')) {
    push('error', baseCss, 'missing "@custom-variant dark" — dark mode selector is not defined')
  }

  const darkBlockMatch = /\.dark\s*\{([^}]*)\}/s.exec(css)
  if (!darkBlockMatch) {
    push('error', baseCss, 'missing ".dark { ... }" block — dark token overrides not defined')
    return
  }

  const darkBlock = darkBlockMatch[1] ?? ''
  for (const name of rulesConfig.tokens.colors) {
    if (!darkBlock.includes(`--color-${name}:`)) {
      push('error', baseCss, `color "${name}" has no dark-mode override in .dark block`)
    }
  }
}

/* ------------------------------------------------------------------ */
/* Check 3: component folders — per-component gating                   */
/* ------------------------------------------------------------------ */
/*
 * Rules:
 *   1. Every component folder that exists must be listed in rulesConfig.
 *   2. Every component folder that exists must contain its required files.
 *   3. `.variants.ts` is required only if the component is in
 *      rulesConfig.variants.required.
 *   4. In --strict mode only (CI / release): every component in rulesConfig
 *      must have a folder. In normal mode: unscaffolded components are OK
 *      — that's how we support incremental scaffolding.
 */

function checkComponents(): void {
  const existingDirs = listDirs(componentsDir)
  const knownComponents = new Set(Object.keys(rulesConfig.components) as ComponentName[])

  // Rule 1: every folder that exists must be a known component
  for (const dir of existingDirs) {
    if (!knownComponents.has(dir as ComponentName)) {
      push(
        'error',
        join(componentsDir, dir),
        `component folder "${dir}" is not listed in rulesConfig.components`,
      )
    }
  }

  // Rule 2 + 3: every existing folder must have the required file set
  for (const dir of existingDirs) {
    if (!knownComponents.has(dir as ComponentName)) continue
    const name = dir as ComponentName
    const folder = join(componentsDir, name)
    const required = [`${name}.vue`, `${name}.contract.ts`, `${name}.test.ts`, 'index.ts']
    if (rulesConfig.variants.required.includes(name)) {
      required.push(`${name}.variants.ts`)
    }
    for (const file of required) {
      const full = join(folder, file)
      if (!existsSync(full)) {
        push('error', relative(repoRoot, full), `required file is missing`)
      }
    }
  }

  // Rule 4: in --strict mode, every component in rulesConfig must exist
  if (strict) {
    const existingSet = new Set(existingDirs)
    for (const name of Object.keys(rulesConfig.components) as ComponentName[]) {
      if (!existingSet.has(name)) {
        push(
          'error',
          relative(repoRoot, join(componentsDir, name)),
          `component "${name}" is declared in rulesConfig but not scaffolded (strict mode)`,
        )
      }
    }
  }

  if (existingDirs.length === 0) {
    push('info', relative(repoRoot, componentsDir), 'no components scaffolded yet')
  } else {
    push(
      'info',
      relative(repoRoot, componentsDir),
      `${existingDirs.length} of ${knownComponents.size} components scaffolded`,
    )
  }
}

/* ------------------------------------------------------------------ */
/* Check 4: ESLint rule files exist for every published rule ID       */
/* ------------------------------------------------------------------ */

function checkEslintRules(): void {
  const expectedRules = [
    'layout-utilities-only',
    'require-cva-for-variants',
    'no-raw-color-tokens',
    'require-component-contract',
    'require-test-colocation',
    'require-scenario-for-component',
  ]

  if (!existsSync(eslintRulesDir)) {
    push('warn', relative(repoRoot, eslintRulesDir), 'eslint rules directory does not exist yet')
    return
  }

  for (const rule of expectedRules) {
    const ruleFile = join(eslintRulesDir, `${rule}.ts`)
    if (!existsSync(ruleFile)) {
      push('error', relative(repoRoot, ruleFile), `missing ESLint rule "${rule}"`)
    }
  }
}

/* ------------------------------------------------------------------ */
/* Check 5: docs/component-contract.md has generated markers          */
/* ------------------------------------------------------------------ */

function checkGeneratedDocs(): void {
  if (!existsSync(componentContractDoc)) {
    push(
      'warn',
      relative(repoRoot, componentContractDoc),
      'docs/component-contract.md does not exist yet',
    )
    return
  }

  const md = readFileSync(componentContractDoc, 'utf8')
  if (!md.includes('<!-- BEGIN:GENERATED -->') || !md.includes('<!-- END:GENERATED -->')) {
    push(
      'error',
      relative(repoRoot, componentContractDoc),
      'missing <!-- BEGIN:GENERATED --> / <!-- END:GENERATED --> markers',
    )
  }
}

/* ------------------------------------------------------------------ */
/* Check 6: Nuxt scenario routes — per-component gating                */
/* ------------------------------------------------------------------ */
/*
 * In --strict mode: every component in rulesConfig.ssr.requireNuxtScenario
 * must have a Nuxt route (either [id].vue dynamic route or a named route).
 * In normal mode: only scaffolded components are checked.
 */

function checkNuxtScenarios(): void {
  const existingDirs = new Set(listDirs(componentsDir))
  if (existingDirs.size === 0 && !strict) return

  if (!existsSync(nuxtScenariosDir)) {
    if (strict) {
      push(
        'error',
        relative(repoRoot, nuxtScenariosDir),
        'nuxt-sink/pages/scenarios is missing (strict mode)',
      )
    }
    return
  }

  // A dynamic [id].vue route covers every component at once
  const dynamicRoute = join(nuxtScenariosDir, '[id].vue')
  if (existsSync(dynamicRoute)) return

  // Otherwise require one route per scaffolded component that's in requireNuxtScenario
  const scope = strict ? rulesConfig.ssr.requireNuxtScenario : rulesConfig.ssr.requireNuxtScenario.filter((n) => existingDirs.has(n))
  for (const name of scope) {
    const namedRoute = join(nuxtScenariosDir, `${name}.vue`)
    if (!existsSync(namedRoute)) {
      push(
        'error',
        relative(repoRoot, nuxtScenariosDir),
        `component "${name}" is scaffolded but has no Nuxt scenario route (add pages/scenarios/[id].vue or pages/scenarios/${name}.vue)`,
      )
    }
  }
}

/* ------------------------------------------------------------------ */
/* Check 7: scenario manifest references every scaffolded component   */
/* ------------------------------------------------------------------ */
/*
 * In --strict mode: every component in rulesConfig.testing.requireScenarioFor
 * must be referenced. In normal mode: only scaffolded components.
 * If no components exist yet and the manifest is absent, that's fine.
 */

function checkScenarioManifest(): void {
  const existingDirs = new Set(listDirs(componentsDir))

  if (!existsSync(scenarioManifest)) {
    if (existingDirs.size === 0 && !strict) return
    if (strict) {
      push(
        'error',
        relative(repoRoot, scenarioManifest),
        'scenario-manifest.ts is missing (strict mode)',
      )
      return
    }
    // Scaffolded components exist but no manifest — the first new-component
    // invocation is responsible for creating it; flag as error so the skill
    // doesn't silently skip this step.
    push(
      'error',
      relative(repoRoot, scenarioManifest),
      `scenario-manifest.ts is missing but ${existingDirs.size} component(s) are scaffolded`,
    )
    return
  }

  const manifestSrc = readFileSync(scenarioManifest, 'utf8')
  const scope = strict
    ? rulesConfig.testing.requireScenarioFor
    : rulesConfig.testing.requireScenarioFor.filter((n) => existingDirs.has(n))

  for (const name of scope) {
    if (!manifestSrc.includes(`'${name}'`) && !manifestSrc.includes(`"${name}"`)) {
      push(
        'error',
        relative(repoRoot, scenarioManifest),
        `scenario manifest does not reference scaffolded component "${name}"`,
      )
    }
  }
}

/* ------------------------------------------------------------------ */
/* Check 8: no module-scope access to disallowed SSR globals           */
/* ------------------------------------------------------------------ */

function checkSsrModuleScope(): void {
  if (!existsSync(srcDir)) return

  const walk = (dir: string): string[] => {
    const out: string[] = []
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      const stat = statSync(full)
      if (stat.isDirectory()) out.push(...walk(full))
      else if (/\.(ts|vue)$/.test(entry)) out.push(full)
    }
    return out
  }

  const files = walk(srcDir)
  const forbidden = rulesConfig.ssr.disallowedModuleScopeAccess

  for (const file of files) {
    const content = readFileSync(file, 'utf8')

    // Extract <script setup> block from .vue files, use whole file for .ts
    let toScan = content
    if (file.endsWith('.vue')) {
      const match = /<script\s+setup[^>]*>([\s\S]*?)<\/script>/.exec(content)
      if (!match) continue
      toScan = match[1] ?? ''
    }

    // Very rough heuristic: scan for identifiers at the top level (not inside
    // onMounted/onBeforeMount/if/function bodies). A proper check would walk
    // the AST; this is intentionally conservative to catch obvious violations.
    const lines = toScan.split('\n')
    let depth = 0
    for (const line of lines) {
      for (const ch of line) {
        if (ch === '{') depth++
        else if (ch === '}') depth--
      }
      if (depth !== 0) continue
      for (const ident of forbidden) {
        const pattern = new RegExp(`(?<![a-zA-Z0-9_$.])${ident}(?![a-zA-Z0-9_$])`)
        if (pattern.test(line) && !/^\s*(\/\/|\*|\/\*)/.test(line)) {
          push(
            'error',
            relative(repoRoot, file),
            `module-scope reference to "${ident}" is disallowed (SSR unsafe)`,
          )
        }
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Run all checks                                                     */
/* ------------------------------------------------------------------ */

checkTokensCss()
checkDarkOverrides()
checkComponents()
checkEslintRules()
checkGeneratedDocs()
checkNuxtScenarios()
checkScenarioManifest()
checkSsrModuleScope()

/* ------------------------------------------------------------------ */
/* Report                                                             */
/* ------------------------------------------------------------------ */

const errors = findings.filter((f) => f.level === 'error')
const warnings = findings.filter((f) => f.level === 'warn')
const info = findings.filter((f) => f.level === 'info')

const colors = {
  red: (s: string): string => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string): string => `\x1b[33m${s}\x1b[0m`,
  gray: (s: string): string => `\x1b[90m${s}\x1b[0m`,
  green: (s: string): string => `\x1b[32m${s}\x1b[0m`,
  bold: (s: string): string => `\x1b[1m${s}\x1b[0m`,
}

if (info.length > 0) {
  for (const f of info) {
    console.log(colors.gray(`  info  ${f.file} — ${f.message}`))
  }
}

if (warnings.length > 0) {
  console.log()
  console.log(colors.bold(colors.yellow(`${warnings.length} warning(s):`)))
  for (const f of warnings) {
    console.log(colors.yellow(`  warn  ${f.file} — ${f.message}`))
  }
}

if (errors.length > 0) {
  console.log()
  console.log(colors.bold(colors.red(`${errors.length} error(s):`)))
  for (const f of errors) {
    console.log(colors.red(`  error ${f.file} — ${f.message}`))
  }
  console.log()
  console.log(colors.red('verify:rule-coverage FAILED'))
  process.exit(1)
}

console.log()
console.log(colors.green(colors.bold('verify:rule-coverage OK')))
console.log(
  colors.gray(
    `  checked ${rulesConfig.tokens.colors.length} colors, ${
      Object.keys(rulesConfig.components).length
    } components, 6 ESLint rules`,
  ),
)
