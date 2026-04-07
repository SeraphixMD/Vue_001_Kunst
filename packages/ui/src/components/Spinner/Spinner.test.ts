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

  it('merges consumer class', () => {
    const wrapper = mount(Spinner, {
      props: { class: 'size-6' },
    })
    expect(wrapper.classes()).toContain('size-6')
  })
})
