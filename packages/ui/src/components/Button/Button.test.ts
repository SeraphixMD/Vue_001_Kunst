import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from './Button.vue'

describe('Button', () => {
  it('renders with default variant and size', () => {
    const wrapper = mount(Button, {
      slots: { default: 'hello' },
    })
    expect(wrapper.text()).toContain('hello')
    expect(wrapper.classes().join(' ')).toMatch(/bg-primary/)
    expect(wrapper.classes().join(' ')).toMatch(/h-10/)
  })

  it('applies the destructive variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'destructive' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('bg-destructive')
  })

  it('applies the outline variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'outline' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('border-input')
  })

  it('applies the secondary variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('bg-secondary')
  })

  it('applies the ghost variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'ghost' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('hover:bg-accent')
  })

  it('applies the link variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'link' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('underline-offset-4')
  })

  it('applies the sm size', () => {
    const wrapper = mount(Button, {
      props: { size: 'sm' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('h-9')
  })

  it('applies the lg size', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('h-11')
  })

  it('applies the icon size', () => {
    const wrapper = mount(Button, {
      props: { size: 'icon' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes().join(' ')).toContain('w-10')
  })

  it('merges consumer class after cva output', () => {
    const wrapper = mount(Button, {
      props: { class: 'mt-4' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('mt-4')
  })
})
