<script setup lang="ts">
import { ToastDescription as RekaToastDescription } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <RekaToastDescription :class="cn('text-sm opacity-90', props.class)">
    <slot />
  </RekaToastDescription>
</template>
