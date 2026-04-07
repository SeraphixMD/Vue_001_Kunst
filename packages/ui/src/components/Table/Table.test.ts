import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Table from './Table.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableRow from './TableRow.vue'
import TableHead from './TableHead.vue'
import TableCell from './TableCell.vue'
import TableCaption from './TableCaption.vue'

describe('Table', () => {
  it('renders a table element', () => {
    const wrapper = mount(Table, {
      slots: { default: 'content' },
    })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('renders a full table composition', () => {
    const wrapper = mount(Table, {
      slots: {
        default: () => [
          h(TableCaption, null, { default: () => 'A list of items' }),
          h(TableHeader, null, {
            default: () => h(TableRow, null, {
              default: () => h(TableHead, null, { default: () => 'Name' }),
            }),
          }),
          h(TableBody, null, {
            default: () => h(TableRow, null, {
              default: () => h(TableCell, null, { default: () => 'Item 1' }),
            }),
          }),
        ],
      },
    })
    expect(wrapper.find('th').text()).toBe('Name')
    expect(wrapper.find('td').text()).toBe('Item 1')
    expect(wrapper.find('caption').text()).toBe('A list of items')
  })

  it('merges consumer class on the wrapper', () => {
    const wrapper = mount(Table, {
      props: { class: 'mt-4' },
      slots: { default: 'x' },
    })
    expect(wrapper.element.classList.contains('mt-4')).toBe(true)
  })
})
