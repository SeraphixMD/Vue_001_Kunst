import type { ComponentName } from '@kunst/ui/rules-config'

/**
 * Scenario manifest — the single source of truth for sink scenarios.
 *
 * Read by:
 *   - apps/sink router (generates routes from entries)
 *   - @kunst/ui/require-scenario-for-component (validates coverage)
 *   - packages/ui/scripts/verify-rule-coverage.ts (meta-verifier)
 *   - apps/nuxt-sink pages/scenarios/[id].vue (mirror)
 *
 * Rules for this file:
 *   1. Every scaffolded component must appear in at least one scenario's
 *      `components` array (enforced by require-scenario-for-component).
 *   2. Scenarios represent real consumer compositions, not component smoke
 *      tests. The sink's /components/ routes cover per-component variants.
 *   3. Scenario `id` must be kebab-case and match the path suffix 1:1.
 */

export interface Scenario {
  id: string
  title: string
  path: string
  components: ComponentName[]
  tags: string[]
}

export const scenarios: Scenario[] = [
  {
    id: 'sign-in-form',
    title: 'Sign-in form',
    path: '/scenarios/sign-in-form',
    components: ['Card', 'Label', 'Input', 'Button'],
    tags: ['form', 'auth'],
  },
  {
    id: 'settings-panel',
    title: 'Settings panel',
    path: '/scenarios/settings-panel',
    components: ['Card', 'Label', 'Input', 'Accordion', 'Button'],
    tags: ['form', 'disclosure'],
  },
  {
    id: 'confirm-delete-flow',
    title: 'Confirm delete flow',
    path: '/scenarios/confirm-delete-flow',
    components: ['Dialog', 'Button'],
    tags: ['dialog', 'destructive'],
  },
  {
    id: 'profile-card',
    title: 'Profile card',
    path: '/scenarios/profile-card',
    components: ['Card', 'Avatar', 'Button'],
    tags: ['card', 'identity'],
  },
  {
    id: 'async-action',
    title: 'Async action',
    path: '/scenarios/async-action',
    components: ['Button', 'Spinner'],
    tags: ['loading', 'composition'],
  },
]

export default scenarios
