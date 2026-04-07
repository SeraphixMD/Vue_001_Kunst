import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import type { ComponentName } from '@kunst/ui/rules-config'

import scenarios from './scenario-manifest.ts'

import Index from './pages/Index.vue'

// Component pages — one route per component, showing variants × sizes.
const componentPageLoaders: Record<ComponentName, () => Promise<unknown>> = {
  Button: () => import('./pages/components/ButtonPage.vue'),
  Input: () => import('./pages/components/InputPage.vue'),
  Label: () => import('./pages/components/LabelPage.vue'),
  Card: () => import('./pages/components/CardPage.vue'),
  Dialog: () => import('./pages/components/DialogPage.vue'),
  Accordion: () => import('./pages/components/AccordionPage.vue'),
  Avatar: () => import('./pages/components/AvatarPage.vue'),
  Spinner: () => import('./pages/components/SpinnerPage.vue'),
  Table: () => import('./pages/components/TablePage.vue'),
  Select: () => import('./pages/components/SelectPage.vue'),
  Tabs: () => import('./pages/components/TabsPage.vue'),
  Toast: () => import('./pages/components/ToastPage.vue'),
  Popover: () => import('./pages/components/PopoverPage.vue'),
}

const componentRoutes: RouteRecordRaw[] = (
  Object.keys(componentPageLoaders) as ComponentName[]
).map((name) => ({
  path: `/components/${name.toLowerCase()}`,
  name: `component-${name}`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: componentPageLoaders[name] as any,
  meta: { kind: 'component', label: name },
}))

// Scenario pages — one per manifest entry.
const scenarioPageLoaders: Record<string, () => Promise<unknown>> = {
  'sign-in-form': () => import('./pages/scenarios/SignInForm.vue'),
  'settings-panel': () => import('./pages/scenarios/SettingsPanel.vue'),
  'confirm-delete-flow': () => import('./pages/scenarios/ConfirmDeleteFlow.vue'),
  'profile-card': () => import('./pages/scenarios/ProfileCard.vue'),
  'async-action': () => import('./pages/scenarios/AsyncAction.vue'),
  'data-table': () => import('./pages/scenarios/DataTable.vue'),
  'tabbed-settings': () => import('./pages/scenarios/TabbedSettings.vue'),
  'notifications': () => import('./pages/scenarios/Notifications.vue'),
}

const scenarioRoutes: RouteRecordRaw[] = scenarios
  .filter((s) => s.id in scenarioPageLoaders)
  .map((s) => ({
    path: s.path,
    name: `scenario-${s.id}`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: scenarioPageLoaders[s.id]! as any,
    meta: { kind: 'scenario', label: s.title, scenarioId: s.id },
  }))

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'index', component: Index },
    ...componentRoutes,
    ...scenarioRoutes,
  ],
})
