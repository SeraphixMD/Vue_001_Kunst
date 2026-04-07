import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Input from './Input.vue'

describe('Input', () => {
  it('renders with default variant and size', () => {
    const wrapper = mount(Input)
    expect(wrapper.element.tagName).toBe('INPUT')
    expect(wrapper.classes().join(' ')).toMatch(/bg-background/)
    expect(wrapper.classes().join(' ')).toMatch(/h-8/)
  })

  it('applies the sm size', () => {
    const wrapper = mount(Input, {
      props: { size: 'sm' },
    })
    expect(wrapper.classes().join(' ')).toContain('h-7')
  })

  it('applies the lg size', () => {
    const wrapper = mount(Input, {
      props: { size: 'lg' },
    })
    expect(wrapper.classes().join(' ')).toContain('h-9')
  })

  it('merges consumer class after cva output', () => {
    const wrapper = mount(Input, {
      props: { class: 'mt-4' },
    })
    expect(wrapper.classes()).toContain('mt-4')
  })
})
