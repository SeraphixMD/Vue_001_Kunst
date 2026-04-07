import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/ui',
  'packages/eslint-plugin-ui',
  'apps/sink',
])
