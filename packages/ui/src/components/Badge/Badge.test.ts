import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Badge from './Badge.vue'

describe('Badge', () => {
  it('renders with default variant', () => {
    const wrapper = mount(Badge, {
      slots: { default: 'Active' },
    })
    expect(wrapper.text()).toContain('Active')
    expect(wrapper.classes().join(' ')).toContain('bg-primary')
  })

  it('applies the secondary variant', () => {
    const wrapper = mount(Badge, {
      props: { variant: 'secondary' },
      slots: { default: 'Draft' },
    })
    expect(wrapper.classes().join(' ')).toContain('bg-secondary')
  })

  it('applies the destructive variant', () => {
    const wrapper = mount(Badge, {
      props: { variant: 'destructive' },
      slots: { default: 'Error' },
    })
    expect(wrapper.classes().join(' ')).toContain('bg-destructive')
  })

  it('applies the outline variant', () => {
    const wrapper = mount(Badge, {
      props: { variant: 'outline' },
      slots: { default: 'Info' },
    })
    expect(wrapper.classes().join(' ')).toContain('text-foreground')
    expect(wrapper.classes().join(' ')).not.toContain('bg-primary')
  })
})
