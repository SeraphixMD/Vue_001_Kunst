/**
 * Shared RuleCreator for all @kunst/eslint-plugin-ui rules. Uses typescript-eslint's
 * ESLintUtils factory so rules get typed messageIds, options, and docs URLs.
 */

import { ESLintUtils } from '@typescript-eslint/utils'

export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/kunst/ui/blob/main/packages/eslint-plugin-ui/src/rules/${name}.ts`,
)
