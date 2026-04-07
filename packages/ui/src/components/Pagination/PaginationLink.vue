<script setup lang="ts">
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<{
  class?: string
  isActive?: boolean
  disabled?: boolean
}>(), {
  isActive: false,
  disabled: false,
})

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-current="props.isActive ? 'page' : undefined"
    :disabled="props.disabled"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      props.isActive
        ? 'border border-input bg-background'
        : 'hover:bg-accent hover:text-accent-foreground',
      'h-8 w-8',
      props.class,
    )"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
