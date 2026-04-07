/**
 * Rule: @kunst/ui/layout-utilities-only
 *
 * In Vue SFC templates, for elements that resolve (via <script setup> imports)
 * to the @kunst/ui package, enforce that the `class` attribute only contains
 * layout-whitelisted Tailwind utilities. Appearance utilities (colors, borders,
 * typography, shadows, radii) are forbidden — consumers must use the `variant`
 * and `size` props instead.
 *
 * Dynamic `:class` bindings on library components are flagged as a hard error
 * because they cannot be statically verified.
 *
 * This rule is the primary enforcement mechanism for the library's
 * "no custom CSS on components" promise and is in the recommended consumer
 * config.
 */

import { createRule } from '../util/create-rule.ts'
import { rulesConfig } from '../util/load-rules-config.ts'
import { isLayoutUtility, tokenizeClassString } from '../util/ast-helpers.ts'

type MessageIds = 'forbiddenUtility' | 'dynamicClass' | 'emptyClass'

/**
 * vue-eslint-parser exposes template AST visitors only through
 * `parserServices.defineTemplateBodyVisitor(templateVisitor, scriptVisitor)`.
 * A plain return object never fires VElement handlers — that's the trap.
 * See https://github.com/vuejs/vue-eslint-parser
 */
interface VueParserServices {
  defineTemplateBodyVisitor?: (
    templateVisitor: Record<string, (node: never) => void>,
    scriptVisitor?: Record<string, (node: never) => void>,
  ) => Record<string, (node: never) => void>
}

export default createRule<[], MessageIds>({
  name: 'layout-utilities-only',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid appearance Tailwind utilities on @kunst/ui components; only layout utilities are permitted.',
    },
    schema: [],
    messages: {
      forbiddenUtility:
        '"{{token}}" is not a layout utility. @kunst/ui components only accept layout utilities (flex/grid/gap/margin/padding/sizing). Use the variant or size prop for appearance.',
      dynamicClass:
        'Dynamic :class binding on @kunst/ui component <{{name}}>. Use static layout utilities or component props for appearance.',
      emptyClass:
        'Empty class attribute on @kunst/ui component <{{name}}>. Remove it.',
    },
  },
  defaultOptions: [],
  create(context) {
    const libraryPackage = rulesConfig.eslint.libraryPackageName
    const { allowedPrefixes, deniedPrefixes } = rulesConfig.layoutUtilities

    // Imported library identifiers. Collected from the script block, consumed
    // during the template walk. Same context.create() call, so the set is
    // populated before VElement visitors run.
    const libraryImports = new Set<string>()

    const services = context.sourceCode.parserServices as VueParserServices
    if (typeof services.defineTemplateBodyVisitor !== 'function') {
      // Non-Vue file — rule is a no-op here
      return {}
    }

    return services.defineTemplateBodyVisitor(
      // Template visitor (VElement, VAttribute, etc.)
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        VElement(node: any) {
          const name: string = node.rawName
          if (!/^[A-Z]/.test(name)) return
          if (!libraryImports.has(name)) return

          for (const attr of node.startTag.attributes) {
            // Static `class="..."` attribute
            if (!attr.directive) {
              if (attr.key.name !== 'class') continue
              const value: string | undefined = attr.value?.value
              if (value === undefined) continue
              if (value.trim() === '') {
                context.report({ node: attr, messageId: 'emptyClass', data: { name } })
                continue
              }
              for (const token of tokenizeClassString(value)) {
                if (!isLayoutUtility(token, allowedPrefixes, deniedPrefixes)) {
                  context.report({
                    node: attr,
                    messageId: 'forbiddenUtility',
                    data: { token },
                  })
                }
              }
              continue
            }

            // Directive: only v-bind:class / :class matter
            const keyName = attr.key.name?.name
            if (keyName !== 'bind') continue
            const arg = attr.key.argument
            if (!arg || arg.type !== 'VIdentifier' || arg.name !== 'class') continue

            const expr = attr.value?.expression
            if (expr && expr.type === 'Literal' && typeof expr.value === 'string') {
              for (const token of tokenizeClassString(expr.value)) {
                if (!isLayoutUtility(token, allowedPrefixes, deniedPrefixes)) {
                  context.report({
                    node: attr,
                    messageId: 'forbiddenUtility',
                    data: { token },
                  })
                }
              }
              continue
            }

            context.report({ node: attr, messageId: 'dynamicClass', data: { name } })
          }
        },
      },
      // Script visitor — collects imports
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ImportDeclaration(node: any) {
          if (node.source.value !== libraryPackage) return
          for (const spec of node.specifiers) {
            if (
              spec.type === 'ImportSpecifier' ||
              spec.type === 'ImportDefaultSpecifier'
            ) {
              libraryImports.add(spec.local.name)
            }
          }
        },
      },
    ) as Record<string, (node: never) => void>
  },
})
