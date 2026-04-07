<script setup lang="ts">
import { AccordionTrigger as RekaAccordionTrigger } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  asChild?: boolean
}>()
</script>

<template>
  <RekaAccordionTrigger
    :as-child="props.asChild"
    :class="cn('flex flex-1 items-center justify-between py-4 text-sm font-medium text-foreground transition-all hover:underline', props.class)"
  >
    <slot />
  </RekaAccordionTrigger>
</template>
