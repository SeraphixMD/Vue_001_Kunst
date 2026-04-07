<script setup lang="ts">
import { computed } from 'vue'
import { AccordionRoot } from 'reka-ui'
import type { AccordionProps } from './Accordion.contract.ts'
import { cn } from '../../utils/cn.ts'

type Props = AccordionProps & {
  type: 'single' | 'multiple'
  collapsible?: boolean
  disabled?: boolean
  modelValue?: string | string[]
  defaultValue?: string | string[]
}

const props = defineProps<Props>()

const rootProps = computed(() => {
  const forwarded: Record<string, unknown> = { type: props.type }
  if (props.collapsible !== undefined) forwarded.collapsible = props.collapsible
  if (props.disabled !== undefined) forwarded.disabled = props.disabled
  if (props.modelValue !== undefined) forwarded.modelValue = props.modelValue
  if (props.defaultValue !== undefined) forwarded.defaultValue = props.defaultValue
  if (props.asChild !== undefined) forwarded.asChild = props.asChild
  return forwarded
})
</script>

<template>
  <AccordionRoot
    v-bind="rootProps"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </AccordionRoot>
</template>
