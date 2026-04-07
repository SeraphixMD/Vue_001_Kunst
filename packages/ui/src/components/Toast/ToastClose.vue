<script setup lang="ts">
import { ToastClose as RekaToastClose } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <RekaToastClose
    :class="cn('absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-destructive-foreground/50 group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive', props.class)"
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
    ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
  </RekaToastClose>
</template>
