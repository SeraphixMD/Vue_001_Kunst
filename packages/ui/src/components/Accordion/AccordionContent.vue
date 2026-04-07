<script setup lang="ts">
import { AccordionContent as RekaAccordionContent } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  asChild?: boolean
}>()
</script>

<template>
  <RekaAccordionContent
    :as-child="props.asChild"
    :class="cn('overflow-hidden text-sm text-foreground', props.class)"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </RekaAccordionContent>
</template>
