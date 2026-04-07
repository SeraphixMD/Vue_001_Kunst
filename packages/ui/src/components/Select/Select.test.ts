import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Select from './Select.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'

describe('Select', () => {
  it('renders the trigger with placeholder', () => {
    const wrapper = mount(Select, {
      slots: {
        default: () => [
          h(SelectTrigger, null, {
            default: () => h(SelectValue, { placeholder: 'Pick one' }),
          }),
          h(SelectContent, null, {
            default: () => h(SelectItem, { value: 'a' }, { default: () => 'Option A' }),
          }),
        ],
      },
    })
    expect(wrapper.text()).toContain('Pick one')
  })

  it('merges consumer class on the trigger', () => {
    const wrapper = mount(Select, {
      slots: {
        default: () => h(SelectTrigger, { class: 'w-64' }, {
          default: () => h(SelectValue, { placeholder: 'x' }),
        }),
      },
    })
    const trigger = wrapper.find('[role="combobox"]')
    expect(trigger.element.classList.contains('w-64')).toBe(true)
  })
})
