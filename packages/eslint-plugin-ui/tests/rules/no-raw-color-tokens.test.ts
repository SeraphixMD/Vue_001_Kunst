import { RuleTester } from '@typescript-eslint/rule-tester'
import * as tsParser from '@typescript-eslint/parser'
import { afterAll, describe, it } from 'vitest'

import rule from '../../src/rules/no-raw-color-tokens.ts'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tsParser,
  },
})

ruleTester.run('no-raw-color-tokens', rule, {
  valid: [
    {
      name: 'semantic token reference',
      code: `const className = 'bg-primary text-primary-foreground'`,
      filename: '/abs/packages/ui/src/components/Button/Button.variants.ts',
    },
    {
      name: 'no color in string',
      code: `const message = 'hello world'`,
      filename: '/abs/packages/ui/src/components/Button/Button.variants.ts',
    },
    {
      name: 'raw color allowed in tokens.css',
      code: `const x = 'oklch(0.5 0 0)'`,
      filename: '/abs/packages/ui/src/styles/tokens.css',
    },
  ],
  invalid: [
    {
      name: 'hex color in string literal',
      code: `const bg = '#ff0000'`,
      filename: '/abs/packages/ui/src/components/Button/Button.vue',
      errors: [{ messageId: 'rawColor' }],
    },
    {
      name: 'rgb in string literal',
      code: `const bg = 'rgb(255, 0, 0)'`,
      filename: '/abs/packages/ui/src/components/Button/Button.vue',
      errors: [{ messageId: 'rawColor' }],
    },
    {
      name: 'oklch in string literal outside tokens.css',
      code: `const bg = 'oklch(0.5 0.2 30)'`,
      filename: '/abs/packages/ui/src/components/Button/Button.variants.ts',
      errors: [{ messageId: 'rawColor' }],
    },
    {
      name: 'hex in template literal',
      code: 'const bg = `color: #abcdef`',
      filename: '/abs/packages/ui/src/components/Button/Button.vue',
      errors: [{ messageId: 'rawColor' }],
    },
  ],
})
