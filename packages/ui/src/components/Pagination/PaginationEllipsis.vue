<script setup lang="ts">
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="cn('flex items-center justify-center h-8 w-8', props.class)"
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
    ><circle
      cx="12"
      cy="12"
      r="1"
    /><circle
      cx="19"
      cy="12"
      r="1"
    /><circle
      cx="5"
      cy="12"
      r="1"
    /></svg>
    <span class="sr-only">More pages</span>
  </span>
</template>
