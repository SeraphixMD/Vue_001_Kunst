import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Label from './Label.vue'

describe('Label', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Label, {
      slots: { default: 'hello' },
    })
    expect(wrapper.text()).toContain('hello')
    expect(wrapper.element.tagName).toBe('LABEL')
  })

  it('merges consumer class', () => {
    const wrapper = mount(Label, {
      props: { class: 'mt-4' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('mt-4')
  })

  it('forwards asChild to the Reka primitive', () => {
    const wrapper = mount(Label, {
      props: { asChild: true },
      slots: { default: '<span data-testid="child">x</span>' },
    })
    expect(wrapper.element.tagName).toBe('SPAN')
  })
})
