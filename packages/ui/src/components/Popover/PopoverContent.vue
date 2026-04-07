<script setup lang="ts">
import { PopoverContent as RekaPopoverContent, PopoverPortal } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<{
  class?: string
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
}>(), {
  align: 'center',
  sideOffset: 4,
  side: 'bottom',
})
</script>

<template>
  <PopoverPortal>
    <RekaPopoverContent
      :align="props.align"
      :side="props.side"
      :side-offset="props.sideOffset"
      :class="cn('z-popover w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none', props.class)"
    >
      <slot />
    </RekaPopoverContent>
  </PopoverPortal>
</template>
