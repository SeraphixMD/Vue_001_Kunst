import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Avatar from './Avatar.vue'
import AvatarFallback from './AvatarFallback.vue'

describe('Avatar', () => {
  it('renders with default variant and size', () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: '<span>JD</span>',
      },
    })
    expect(wrapper.classes().join(' ')).toMatch(/bg-muted/)
    expect(wrapper.classes().join(' ')).toMatch(/h-10/)
    expect(wrapper.text()).toContain('JD')
  })

  it('applies the sm size', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'sm' },
    })
    expect(wrapper.classes().join(' ')).toContain('h-8')
  })

  it('applies the lg size', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'lg' },
    })
    expect(wrapper.classes().join(' ')).toContain('h-12')
  })

  it('merges consumer class after cva output', () => {
    const wrapper = mount(Avatar, {
      props: { class: 'mt-4' },
    })
    expect(wrapper.classes()).toContain('mt-4')
  })

  it('renders an AvatarFallback child', () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: () => h(AvatarFallback, null, { default: () => 'AB' }),
      },
    })
    expect(wrapper.text()).toContain('AB')
  })
})
