import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Popover from './Popover.vue'
import PopoverTrigger from './PopoverTrigger.vue'
import PopoverContent from './PopoverContent.vue'

describe('Popover', () => {
  it('renders the trigger', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: () => [
          h(PopoverTrigger, null, { default: () => 'Open popover' }),
          h(PopoverContent, null, { default: () => 'Popover body' }),
        ],
      },
    })
    expect(wrapper.text()).toContain('Open popover')
  })

  it('merges consumer class on trigger content', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: () => h(PopoverTrigger, null, { default: () => 'Trigger' }),
      },
    })
    expect(wrapper.text()).toContain('Trigger')
  })
})
