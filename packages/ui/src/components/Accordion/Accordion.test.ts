import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionHeader from './AccordionHeader.vue'
import AccordionTrigger from './AccordionTrigger.vue'
import AccordionContent from './AccordionContent.vue'

function mountAccordion(extraProps: Record<string, unknown> = {}) {
  return mount(Accordion, {
    props: { type: 'single', collapsible: true, ...extraProps },
    slots: {
      default: () =>
        h(AccordionItem, { value: 'a' }, {
          default: () => [
            h(AccordionHeader, null, {
              default: () => h(AccordionTrigger, null, { default: () => 'Trigger A' }),
            }),
            h(AccordionContent, null, { default: () => 'Content A' }),
          ],
        }),
    },
  })
}

describe('Accordion', () => {
  it('renders the root with layout classes', () => {
    const wrapper = mountAccordion()
    expect(wrapper.classes().join(' ')).toMatch(/w-full/)
    expect(wrapper.text()).toContain('Trigger A')
  })

  it('merges consumer class on the root', () => {
    const wrapper = mountAccordion({ class: 'mt-4' })
    expect(wrapper.classes()).toContain('mt-4')
  })

  it('supports type="multiple"', () => {
    const wrapper = mount(Accordion, {
      props: { type: 'multiple' },
      slots: { default: '<div>body</div>' },
    })
    expect(wrapper.text()).toContain('body')
  })

  it('applies foreground token class on AccordionTrigger', () => {
    const wrapper = mountAccordion()
    const triggerClasses = wrapper.find('button').classes().join(' ')
    expect(triggerClasses).toMatch(/text-foreground/)
  })

  it('renders AccordionContent when the item is open', () => {
    const wrapper = mountAccordion({ defaultValue: 'a' })
    expect(wrapper.html()).toContain('Content A')
  })
})
