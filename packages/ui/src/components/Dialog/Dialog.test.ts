import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import Dialog from './Dialog.vue'
import DialogContent from './DialogContent.vue'
import DialogTitle from './DialogTitle.vue'
import DialogDescription from './DialogDescription.vue'
import DialogTrigger from './DialogTrigger.vue'
import DialogClose from './DialogClose.vue'

function mountDialog(contentProps: Record<string, unknown> = {}, rootProps: Record<string, unknown> = {}) {
  return mount(Dialog, {
    props: { defaultOpen: true, ...rootProps },
    slots: {
      default: () => [
        h(DialogTrigger, null, { default: () => 'Open' }),
        h(DialogContent, contentProps, {
          default: () => [
            h(DialogTitle, null, { default: () => 'Title A' }),
            h(DialogDescription, null, { default: () => 'Description A' }),
            h(DialogClose, null, { default: () => 'Close' }),
          ],
        }),
      ],
    },
  })
}

describe('Dialog', () => {
  it('renders content with default variant and size when open', async () => {
    const wrapper = mountDialog()
    await nextTick()
    await flushPromises()
    const html = document.body.innerHTML
    expect(html).toContain('Title A')
    expect(html).toContain('Description A')
    expect(html).toMatch(/max-w-lg/)
    wrapper.unmount()
  })

  it('applies the sm size on DialogContent', async () => {
    const wrapper = mountDialog({ size: 'sm' })
    await nextTick()
    await flushPromises()
    expect(document.body.innerHTML).toMatch(/max-w-sm/)
    wrapper.unmount()
  })

  it('applies the lg size on DialogContent', async () => {
    const wrapper = mountDialog({ size: 'lg' })
    await nextTick()
    await flushPromises()
    expect(document.body.innerHTML).toMatch(/max-w-2xl/)
    wrapper.unmount()
  })

  it('merges consumer class on DialogContent', async () => {
    const wrapper = mountDialog({ class: 'mt-4' })
    await nextTick()
    await flushPromises()
    expect(document.body.innerHTML).toContain('mt-4')
    wrapper.unmount()
  })

  it('renders a DialogTrigger in the light DOM', () => {
    const wrapper = mountDialog()
    expect(wrapper.text()).toContain('Open')
    wrapper.unmount()
  })

  it('does not render content when closed', async () => {
    const wrapper = mountDialog({}, { defaultOpen: false })
    await nextTick()
    await flushPromises()
    expect(document.body.innerHTML).not.toContain('Title A')
    wrapper.unmount()
  })
})
