/**
 * Rule: @kunst/ui/no-raw-color-tokens
 *
 * Flags any string literal in packages/ui/src/** that contains a raw color value
 * (hex, rgb, hsl, oklch, oklab, lab, lch). The only allowed location is
 * src/styles/tokens.css (the token definitions themselves). Everywhere else
 * must reference tokens via CSS variables or cva class strings that map to
 * --color-<name> utilities.
 */

import { createRule } from '../util/create-rule.ts'

type MessageIds = 'rawColor'

const colorPattern =
  /#[0-9a-fA-F]{3,8}\b|rgb\(|rgba\(|hsl\(|hsla\(|oklch\(|oklab\(|\blab\(|\blch\(/

export default createRule<[], MessageIds>({
  name: 'no-raw-color-tokens',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid raw color values (hex, rgb, hsl, oklch, …) in library source. Use semantic tokens instead.',
    },
    schema: [],
    messages: {
      rawColor:
        'Raw color value "{{match}}". Reference a semantic token from rulesConfig.tokens.colors (e.g. var(--color-primary) or the bg-primary utility).',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename
    // tokens.css is allowed to contain raw values — it's the source of tokens.
    // This check intentionally matches the file anywhere in the path.
    if (filename.replace(/\\/g, '/').endsWith('/src/styles/tokens.css')) {
      return {}
    }

    return {
      Literal(node) {
        if (typeof node.value !== 'string') return
        const match = colorPattern.exec(node.value)
        if (!match) return
        context.report({
          node,
          messageId: 'rawColor',
          data: { match: match[0] },
        })
      },
      TemplateElement(node) {
        const raw = node.value.raw
        const match = colorPattern.exec(raw)
        if (!match) return
        context.report({
          node,
          messageId: 'rawColor',
          data: { match: match[0] },
        })
      },
    }
  },
})
