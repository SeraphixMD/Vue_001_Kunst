<script setup lang="ts">
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string; disabled?: boolean }>()
const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    aria-label="Go to previous page"
    :disabled="props.disabled"
    :class="cn('inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3', props.class)"
    @click="emit('click')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ><path d="m15 18-6-6 6-6" /></svg>
    <span>Previous</span>
  </button>
</template>
