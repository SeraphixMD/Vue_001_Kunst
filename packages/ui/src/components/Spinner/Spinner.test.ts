import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Spinner from './Spinner.vue'

describe('Spinner', () => {
  it('renders an svg with role="status"', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.element.tagName).toBe('svg')
    expect(wrapper.attributes('role')).toBe('status')
  })

  it('has a default aria-label of Loading', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.attributes('aria-label')).toBe('Loading')
  })

  it('accepts a custom label', () => {
    const wrapper = mount(Spinner, {
      props: { label: 'Saving' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Saving')
  })

  it('applies default size class', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.classes()).toContain('size-4')
  })

  it('applies xs size', () => {
    const wrapper = mount(Spinner, { props: { size: 'xs' } })
    expect(wrapper.classes()).toContain('size-3')
  })

  it('applies lg size', () => {
    const wrapper = mount(Spinner, { props: { size: 'lg' } })
    expect(wrapper.classes()).toContain('size-6')
  })
})
