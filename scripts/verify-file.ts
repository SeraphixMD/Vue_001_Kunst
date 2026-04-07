#!/usr/bin/env tsx
/**
 * Single-file verification used by the Claude `PostToolUse` hook.
 *
 * Runs ESLint (with the root flat config) on exactly one file and returns
 * its findings in a compact format. Target runtime: under 2 seconds.
 *
 * Usage:
 *   tsx scripts/verify-file.ts <absolute-or-relative-path>
 */

import { resolve } from 'node:path'
import { ESLint } from 'eslint'

const arg = process.argv[2]
if (!arg) {
  console.error('usage: verify-file.ts <path>')
  process.exit(2)
}

const target = resolve(arg)

const eslint = new ESLint({
  cwd: process.cwd(),
  errorOnUnmatchedPattern: false,
})

const results = await eslint.lintFiles([target])

const errorCount = results.reduce((acc, r) => acc + r.errorCount, 0)
const warningCount = results.reduce((acc, r) => acc + r.warningCount, 0)

if (errorCount === 0 && warningCount === 0) {
  console.log(`verify:file OK  ${target}`)
  process.exit(0)
}

const formatter = await eslint.loadFormatter('stylish')
const output = await formatter.format(results, { cwd: process.cwd(), rulesMeta: {} })
console.log(output)

process.exit(errorCount > 0 ? 1 : 0)
