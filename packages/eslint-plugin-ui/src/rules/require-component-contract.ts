/**
 * Rule: @kunst/ui/require-component-contract
 *
 * For every index.ts under packages/ui/src/components/ *, asserts the file
 * exports a `{Name}Props` type. The v1 implementation is structural — it
 * verifies the export exists by name — rather than fully type-aware.
 *
 * A future enhancement will use parserServices to verify the type is assignable
 * to BaseComponentProps via the TypeScript checker. For now, the structural
 * check plus the sibling {Name}.contract.ts existence is enough to catch the
 * common failure mode (forgetting to wire up a component's public type).
 */

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { createRule } from '../util/create-rule.ts'

type MessageIds = 'missingPropsExport' | 'missingContractFile'

export default createRule<[], MessageIds>({
  name: 'require-component-contract',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Every component must export a Props type from its index.ts and have a sibling {Name}.contract.ts file.',
    },
    schema: [],
    messages: {
      missingPropsExport:
        'Component "{{name}}" index.ts does not re-export the "{{name}}Props" type. Re-export it from "./{{name}}.contract.ts".',
      missingContractFile:
        'Component "{{name}}" is missing sibling {{name}}.contract.ts (required for type contract verification).',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename.replace(/\\/g, '/')
    const match = /\/packages\/ui\/src\/components\/([A-Z][A-Za-z0-9]*)\/index\.ts$/.exec(filename)
    if (!match) return {}

    const name = match[1] as string
    const folder = dirname(context.filename)
    const contractFile = join(folder, `${name}.contract.ts`)

    let sawPropsExport = false

    return {
      ExportNamedDeclaration(node) {
        // Case: `export type { FooProps } from './Foo.contract.ts'`
        if (node.exportKind === 'type' && node.source) {
          for (const spec of node.specifiers) {
            const exportedName =
              spec.exported.type === 'Identifier' ? spec.exported.name : null
            if (exportedName === `${name}Props`) sawPropsExport = true
          }
        }
        // Case: `export type FooProps = ...` (locally declared)
        if (node.declaration?.type === 'TSTypeAliasDeclaration') {
          if (node.declaration.id.name === `${name}Props`) sawPropsExport = true
        }
        // Case: `export interface FooProps { ... }`
        if (node.declaration?.type === 'TSInterfaceDeclaration') {
          if (node.declaration.id.name === `${name}Props`) sawPropsExport = true
        }
      },

      'Program:exit'(node) {
        if (!existsSync(contractFile)) {
          context.report({
            node,
            messageId: 'missingContractFile',
            data: { name },
          })
        }
        if (!sawPropsExport) {
          context.report({
            node,
            messageId: 'missingPropsExport',
            data: { name },
          })
        }
      },
    }
  },
})
