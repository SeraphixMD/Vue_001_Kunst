/**
 * Rule: @kunst/ui/require-cva-for-variants
 *
 * For components listed in `rulesConfig.variants.required`, asserts:
 *   1. A sibling `{Name}.variants.ts` file exists in the component folder.
 *   2. The .variants.ts file imports and calls `cva` from class-variance-authority.
 *   3. The component SFC does NOT hand-roll class string concatenation —
 *      no template literals containing Tailwind color/size/border tokens
 *      inside the <script setup> block (cva call sites are exempt).
 *
 * This rule fires per-file at the component SFC level. Path-based checks use
 * the filename from the ESLint context.
 */

import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { createRule } from '../util/create-rule.ts'
import { rulesConfig, type ComponentName } from '../util/load-rules-config.ts'

type MessageIds = 'missingVariantsFile' | 'missingCvaCall' | 'handRolledClasses'

const forbiddenClassPattern = /\b(bg-|text-|rounded-|border-|shadow-|from-|to-|via-)\S+/

export default createRule<[], MessageIds>({
  name: 'require-cva-for-variants',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Components listed in rulesConfig.variants.required must define variants via cva in a sibling .variants.ts file.',
    },
    schema: [],
    messages: {
      missingVariantsFile:
        'Component "{{name}}" is in rulesConfig.variants.required but has no sibling {{name}}.variants.ts file.',
      missingCvaCall:
        '{{name}}.variants.ts does not call cva(). Variants must be defined via class-variance-authority.',
      handRolledClasses:
        'Hand-rolled class string "{{match}}" in component source. Define variants via cva in {{name}}.variants.ts instead.',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename.replace(/\\/g, '/')
    const match = /\/packages\/ui\/src\/components\/([A-Z][A-Za-z0-9]*)\/\1\.vue$/.exec(filename)
    if (!match) return {}

    const name = match[1] as ComponentName
    if (!rulesConfig.variants.required.includes(name)) return {}

    const folder = dirname(context.filename)
    const variantsFile = join(folder, `${name}.variants.ts`)

    return {
      'Program:exit'(node) {
        if (!existsSync(variantsFile)) {
          context.report({
            node,
            messageId: 'missingVariantsFile',
            data: { name },
          })
          return
        }

        const variantsSource = readFileSync(variantsFile, 'utf8')
        if (!/\bcva\s*\(/.test(variantsSource)) {
          context.report({
            node,
            messageId: 'missingCvaCall',
            data: { name },
          })
        }
      },

      TemplateLiteral(node) {
        // Only flag template literals inside SFC <script setup>
        // (they appear as TemplateElement raw values). cva() call sites use
        // object-literal arguments, not template literals with tokens, so this
        // catches hand-rolled class strings specifically.
        for (const quasi of node.quasis) {
          const raw = quasi.value.raw
          const m = forbiddenClassPattern.exec(raw)
          if (!m) continue
          context.report({
            node: quasi,
            messageId: 'handRolledClasses',
            data: { match: m[0], name },
          })
        }
      },
    }
  },
})
