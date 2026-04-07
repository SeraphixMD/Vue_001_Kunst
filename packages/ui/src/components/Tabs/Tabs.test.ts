import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Tabs from './Tabs.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'
import TabsContent from './TabsContent.vue'

describe('Tabs', () => {
  it('renders tabs with default value', () => {
    const wrapper = mount(Tabs, {
      props: { defaultValue: 'tab1' },
      slots: {
        default: () => [
          h(TabsList, null, {
            default: () => [
              h(TabsTrigger, { value: 'tab1' }, { default: () => 'Tab 1' }),
              h(TabsTrigger, { value: 'tab2' }, { default: () => 'Tab 2' }),
            ],
          }),
          h(TabsContent, { value: 'tab1' }, { default: () => 'Content 1' }),
          h(TabsContent, { value: 'tab2' }, { default: () => 'Content 2' }),
        ],
      },
    })
    expect(wrapper.text()).toContain('Tab 1')
    expect(wrapper.text()).toContain('Tab 2')
    expect(wrapper.text()).toContain('Content 1')
  })

  it('merges consumer class on the list', () => {
    const wrapper = mount(Tabs, {
      props: { defaultValue: 'a' },
      slots: {
        default: () => h(TabsList, { class: 'w-full' }, {
          default: () => h(TabsTrigger, { value: 'a' }, { default: () => 'A' }),
        }),
      },
    })
    const list = wrapper.find('[role="tablist"]')
    expect(list.element.classList.contains('w-full')).toBe(true)
  })
})
