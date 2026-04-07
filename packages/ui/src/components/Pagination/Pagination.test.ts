import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Pagination from './Pagination.vue'
import PaginationContent from './PaginationContent.vue'
import PaginationItem from './PaginationItem.vue'
import PaginationLink from './PaginationLink.vue'
import PaginationPrevious from './PaginationPrevious.vue'
import PaginationNext from './PaginationNext.vue'
import PaginationEllipsis from './PaginationEllipsis.vue'

describe('Pagination', () => {
  it('renders a nav with pagination role', () => {
    const wrapper = mount(Pagination, {
      slots: { default: 'content' },
    })
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('nav').attributes('aria-label')).toBe('pagination')
  })

  it('renders a full pagination composition', () => {
    const wrapper = mount(Pagination, {
      slots: {
        default: () => h(PaginationContent, null, {
          default: () => [
            h(PaginationItem, null, { default: () => h(PaginationPrevious, { disabled: true }) }),
            h(PaginationItem, null, { default: () => h(PaginationLink, { isActive: true }, { default: () => '1' }) }),
            h(PaginationItem, null, { default: () => h(PaginationLink, null, { default: () => '2' }) }),
            h(PaginationItem, null, { default: () => h(PaginationEllipsis) }),
            h(PaginationItem, null, { default: () => h(PaginationNext) }),
          ],
        }),
      },
    })
    expect(wrapper.find('[aria-current="page"]').exists()).toBe(true)
    expect(wrapper.find('[aria-current="page"]').text()).toBe('1')
    expect(wrapper.find('[aria-label="Go to previous page"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Go to next page"]').exists()).toBe(true)
  })
})
