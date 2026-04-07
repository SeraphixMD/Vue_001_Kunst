import { RuleTester } from '@typescript-eslint/rule-tester'
import * as vueParser from 'vue-eslint-parser'
import { afterAll, describe, it } from 'vitest'

import rule from '../../src/rules/layout-utilities-only.ts'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: {
    parser: vueParser,
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
})

ruleTester.run('layout-utilities-only', rule, {
  valid: [
    {
      name: 'layout utilities only (margin + padding)',
      code: `
<script setup lang="ts">
import { Button } from '@kunst/ui'
</script>
<template>
  <Button class="mt-4 px-2">Click</Button>
</template>
      `,
      filename: 'App.vue',
    },
    {
      name: 'flex + gap on library component',
      code: `
<script setup lang="ts">
import { Card } from '@kunst/ui'
</script>
<template>
  <Card class="flex gap-4 w-full">Content</Card>
</template>
      `,
      filename: 'App.vue',
    },
    {
      name: 'native HTML element with any class (not a library component)',
      code: `
<script setup lang="ts">
import { Button } from '@kunst/ui'
</script>
<template>
  <div class="bg-red-500 text-white">
    <Button>Click</Button>
  </div>
</template>
      `,
      filename: 'App.vue',
    },
    {
      name: 'component from non-library package (not enforced)',
      code: `
<script setup lang="ts">
import { SomeWidget } from 'other-library'
</script>
<template>
  <SomeWidget class="bg-red-500" />
</template>
      `,
      filename: 'App.vue',
    },
    {
      name: 'responsive variant with layout utility',
      code: `
<script setup lang="ts">
import { Button } from '@kunst/ui'
</script>
<template>
  <Button class="md:mt-8 w-full">Click</Button>
</template>
      `,
      filename: 'App.vue',
    },
  ],
  invalid: [
    {
      name: 'appearance utility (bg-)',
      code: `
<script setup lang="ts">
import { Button } from '@kunst/ui'
</script>
<template>
  <Button class="bg-red-500">Click</Button>
</template>
      `,
      filename: 'App.vue',
      errors: [{ messageId: 'forbiddenUtility' }],
    },
    {
      name: 'typography utility (font-bold)',
      code: `
<script setup lang="ts">
import { Button } from '@kunst/ui'
</script>
<template>
  <Button class="font-bold">Click</Button>
</template>
      `,
      filename: 'App.vue',
      errors: [{ messageId: 'forbiddenUtility' }],
    },
    {
      name: 'mixed: layout + appearance (only appearance fires)',
      code: `
<script setup lang="ts">
import { Button } from '@kunst/ui'
</script>
<template>
  <Button class="mt-4 shadow-lg">Click</Button>
</template>
      `,
      filename: 'App.vue',
      errors: [{ messageId: 'forbiddenUtility' }],
    },
    {
      name: 'dynamic :class binding',
      code: `
<script setup lang="ts">
import { Button } from '@kunst/ui'
const extra = 'mt-4'
</script>
<template>
  <Button :class="extra">Click</Button>
</template>
      `,
      filename: 'App.vue',
      errors: [{ messageId: 'dynamicClass' }],
    },
    {
      name: 'rounded utility',
      code: `
<script setup lang="ts">
import { Card } from '@kunst/ui'
</script>
<template>
  <Card class="rounded-xl">Content</Card>
</template>
      `,
      filename: 'App.vue',
      errors: [{ messageId: 'forbiddenUtility' }],
    },
  ],
})
