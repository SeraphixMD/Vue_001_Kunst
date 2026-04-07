<script setup lang="ts">
import { AccordionItem as RekaAccordionItem } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  value: string
  disabled?: boolean
  asChild?: boolean
}>()
</script>

<template>
  <RekaAccordionItem
    :value="props.value"
    :disabled="props.disabled"
    :as-child="props.asChild"
    :class="cn('border-b border-border', props.class)"
  >
    <slot />
  </RekaAccordionItem>
</template>
