/**
 * Rule: @kunst/ui/require-test-colocation
 *
 * For every {Name}.vue under packages/ui/src/components/{Name}/, asserts that
 * a sibling {Name}.test.ts file exists in the same folder. This enforces the
 * "every component has a colocated test" invariant from rulesConfig.testing.
 */

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { createRule } from '../util/create-rule.ts'

type MessageIds = 'missingTest'

export default createRule<[], MessageIds>({
  name: 'require-test-colocation',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Every component SFC must have a colocated {Name}.test.ts file in the same folder.',
    },
    schema: [],
    messages: {
      missingTest:
        'Component "{{name}}" is missing sibling {{name}}.test.ts. All library components must have a colocated test file.',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename.replace(/\\/g, '/')
    const match = /\/packages\/ui\/src\/components\/([A-Z][A-Za-z0-9]*)\/\1\.vue$/.exec(filename)
    if (!match) return {}

    const name = match[1] as string
    const folder = dirname(context.filename)
    const testFile = join(folder, `${name}.test.ts`)

    return {
      'Program:exit'(node) {
        if (!existsSync(testFile)) {
          context.report({
            node,
            messageId: 'missingTest',
            data: { name },
          })
        }
      },
    }
  },
})
