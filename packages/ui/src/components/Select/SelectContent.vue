<script setup lang="ts">
import { SelectContent as RekaSelectContent, SelectPortal, SelectViewport } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<{
  class?: string
  position?: 'item-aligned' | 'popper'
  sideOffset?: number
}>(), {
  position: 'popper',
  sideOffset: 4,
})
</script>

<template>
  <SelectPortal>
    <RekaSelectContent
      :position="props.position"
      :side-offset="props.sideOffset"
      :class="cn('relative z-modal max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md', props.position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', props.class)"
    >
      <SelectViewport :class="cn('p-1', props.position === 'popper' && 'h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)]')">
        <slot />
      </SelectViewport>
    </RekaSelectContent>
  </SelectPortal>
</template>
