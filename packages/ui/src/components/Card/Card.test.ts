import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Card from './Card.vue'
import CardHeader from './CardHeader.vue'
import CardTitle from './CardTitle.vue'
import CardDescription from './CardDescription.vue'
import CardContent from './CardContent.vue'
import CardFooter from './CardFooter.vue'

describe('Card', () => {
  it('renders the root with card token classes', () => {
    const wrapper = mount(Card, {
      slots: { default: 'hello' },
    })
    expect(wrapper.text()).toContain('hello')
    expect(wrapper.classes().join(' ')).toMatch(/bg-card/)
    expect(wrapper.classes().join(' ')).toMatch(/text-card-foreground/)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('merges consumer class on the root', () => {
    const wrapper = mount(Card, {
      props: { class: 'mt-4' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('mt-4')
  })

  it('renders CardHeader as a div with padding classes', () => {
    const wrapper = mount(CardHeader, {
      slots: { default: 'header' },
    })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.text()).toContain('header')
    expect(wrapper.classes().join(' ')).toMatch(/p-6/)
  })

  it('renders CardTitle as an h3', () => {
    const wrapper = mount(CardTitle, {
      slots: { default: 'title' },
    })
    expect(wrapper.element.tagName).toBe('H3')
    expect(wrapper.text()).toContain('title')
  })

  it('renders CardDescription as a p with muted-foreground', () => {
    const wrapper = mount(CardDescription, {
      slots: { default: 'desc' },
    })
    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.classes().join(' ')).toMatch(/text-muted-foreground/)
  })

  it('renders CardContent as a div', () => {
    const wrapper = mount(CardContent, {
      slots: { default: 'body' },
    })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.text()).toContain('body')
  })

  it('renders CardFooter as a flex row', () => {
    const wrapper = mount(CardFooter, {
      slots: { default: 'footer' },
    })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes().join(' ')).toMatch(/flex/)
    expect(wrapper.classes().join(' ')).toMatch(/items-center/)
  })

  it('composes the full compound anatomy', () => {
    const wrapper = mount(Card, {
      slots: {
        default: () => [
          h(CardHeader, null, {
            default: () => [
              h(CardTitle, null, { default: () => 'Title' }),
              h(CardDescription, null, { default: () => 'Description' }),
            ],
          }),
          h(CardContent, null, { default: () => 'Content' }),
          h(CardFooter, null, { default: () => 'Footer' }),
        ],
      },
    })
    expect(wrapper.text()).toContain('Title')
    expect(wrapper.text()).toContain('Description')
    expect(wrapper.text()).toContain('Content')
    expect(wrapper.text()).toContain('Footer')
  })
})
