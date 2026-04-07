<script setup lang="ts">
import { AccordionHeader as RekaAccordionHeader } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  asChild?: boolean
}>()
</script>

<template>
  <RekaAccordionHeader
    :as-child="props.asChild"
    :class="cn('flex', props.class)"
  >
    <slot />
  </RekaAccordionHeader>
</template>
