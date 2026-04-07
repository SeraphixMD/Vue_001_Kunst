import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ToastProvider from './ToastProvider.vue'
import ToastViewport from './ToastViewport.vue'
import { toastVariants } from './Toast.variants.ts'

describe('Toast', () => {
  it('renders the provider and viewport without error', () => {
    const wrapper = mount(ToastProvider, {
      slots: {
        default: () => h(ToastViewport),
      },
    })
    expect(wrapper.find('[role="region"]').exists()).toBe(true)
  })

  it('default variant produces correct classes', () => {
    const classes = toastVariants({ variant: 'default' })
    expect(classes).toContain('bg-background')
    expect(classes).toContain('text-foreground')
  })

  it('destructive variant produces correct classes', () => {
    const classes = toastVariants({ variant: 'destructive' })
    expect(classes).toContain('bg-destructive')
    expect(classes).toContain('text-destructive-foreground')
  })
})
