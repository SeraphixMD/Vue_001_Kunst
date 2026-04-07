/**
 * Shared AST utilities used across rules. Most rules traverse Vue SFC templates
 * via vue-eslint-parser's extended AST, so we centralize the helpers that
 * resolve component identifiers back to their import source and tokenize
 * class attribute values.
 */

import type { TSESTree } from '@typescript-eslint/utils'
import type { AST as VueAST } from 'vue-eslint-parser'

/**
 * Tokenize a static class attribute value the way Tailwind sees it:
 * whitespace-separated tokens, ignoring empty strings.
 */
export function tokenizeClassString(value: string): string[] {
  return value
    .split(/\s+/u)
    .map((t) => t.trim())
    .filter(Boolean)
}

/**
 * Check whether a class token matches any of the `allowed` prefixes AND none
 * of the `denied` prefixes. Prefix matching is "starts-with" — a prefix like
 * `bg-` matches `bg-red-500`, `bg-primary`, etc.
 *
 * Exact-match entries (no trailing `-`) require the token to equal the entry
 * exactly (used for `flex`, `grid`, `hidden`, `contents`, `grow`, `shrink`, etc.).
 */
export function isLayoutUtility(
  token: string,
  allowed: readonly string[],
  denied: readonly string[],
): boolean {
  // Strip responsive/state variants: `md:flex` → `flex`, `hover:bg-red-500` → `bg-red-500`
  const colonIdx = token.lastIndexOf(':')
  const bare = colonIdx >= 0 ? token.slice(colonIdx + 1) : token

  // Deny list takes priority
  for (const deny of denied) {
    if (deny.endsWith('-')) {
      if (bare.startsWith(deny)) return false
    } else if (bare === deny || bare.startsWith(`${deny}-`)) {
      return false
    }
  }

  // Allow list — at least one match required
  for (const allow of allowed) {
    if (allow.endsWith('-')) {
      if (bare.startsWith(allow)) return true
    } else if (bare === allow || bare.startsWith(`${allow}-`)) {
      return true
    }
  }

  return false
}

/**
 * Walk up a Vue template element to collect its tag name. Returns the raw
 * name as written (e.g. "Button", "DialogTrigger", "button", "div").
 */
export function getElementName(element: VueAST.VElement): string {
  return element.rawName
}

/**
 * Returns true if the tag name is a PascalCase component reference (vs an HTML element).
 */
export function isComponentName(name: string): boolean {
  return /^[A-Z]/.test(name)
}

/**
 * Given a script setup block's AST, find the import source for a given local
 * identifier. Returns the module specifier string or null if not imported.
 */
export function findImportSource(
  scriptBody: TSESTree.ProgramStatement[],
  localName: string,
): string | null {
  for (const node of scriptBody) {
    if (node.type !== 'ImportDeclaration') continue
    for (const specifier of node.specifiers) {
      if (specifier.local.name === localName) {
        return node.source.value
      }
    }
  }
  return null
}
