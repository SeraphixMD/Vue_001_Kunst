/**
 * Rule: @kunst/ui/require-scenario-for-component
 *
 * Reads apps/sink/src/scenario-manifest.ts and asserts that every SCAFFOLDED
 * component listed in `rulesConfig.testing.requireScenarioFor` is referenced
 * in at least one scenario entry.
 *
 * "Scaffolded" means: the component has a folder under
 * `packages/ui/src/components/{Name}/`. Unscaffolded components are not yet
 * required to have scenarios — that's enforced in CI's `verify:full --strict`
 * pass, not on every lint run. This is what lets the substrate support
 * incremental scaffolding (one component at a time).
 */

import { existsSync, readdirSync, statSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

import { createRule } from '../util/create-rule.ts'
import { rulesConfig, type ComponentName } from '../util/load-rules-config.ts'

type MessageIds = 'manifestMissing' | 'componentNotInManifest'

function listScaffoldedComponents(repoRoot: string): Set<ComponentName> {
  const componentsDir = join(repoRoot, 'packages', 'ui', 'src', 'components')
  if (!existsSync(componentsDir)) return new Set()
  const result = new Set<ComponentName>()
  for (const entry of readdirSync(componentsDir)) {
    const full = join(componentsDir, entry)
    if (statSync(full).isDirectory() && entry in rulesConfig.components) {
      result.add(entry as ComponentName)
    }
  }
  return result
}

export default createRule<[], MessageIds>({
  name: 'require-scenario-for-component',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Every scaffolded component in rulesConfig.testing.requireScenarioFor must appear in apps/sink/src/scenario-manifest.ts.',
    },
    schema: [],
    messages: {
      manifestMissing:
        'Scenario manifest not found at {{path}}. Create apps/sink/src/scenario-manifest.ts.',
      componentNotInManifest:
        'Scaffolded component "{{name}}" is in rulesConfig.testing.requireScenarioFor but is not referenced in apps/sink/src/scenario-manifest.ts.',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename.replace(/\\/g, '/')
    if (!filename.endsWith('/scenario-manifest.ts')) return {}

    return {
      'Program:exit'(node) {
        const manifestPath = resolve(context.filename)
        if (!existsSync(manifestPath)) {
          context.report({
            node,
            messageId: 'manifestMissing',
            data: { path: rulesConfig.testing.scenarioManifestPath },
          })
          return
        }

        // Walk up from the manifest path to find the repo root (four levels up
        // from apps/sink/src/scenario-manifest.ts)
        const repoRoot = resolve(manifestPath, '..', '..', '..', '..')
        const scaffolded = listScaffoldedComponents(repoRoot)

        const content = readFileSync(manifestPath, 'utf8')
        for (const name of rulesConfig.testing.requireScenarioFor) {
          if (!scaffolded.has(name)) continue
          if (!content.includes(`'${name}'`) && !content.includes(`"${name}"`)) {
            context.report({
              node,
              messageId: 'componentNotInManifest',
              data: { name },
            })
          }
        }
      },
    }
  },
})
