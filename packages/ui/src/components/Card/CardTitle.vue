<script setup lang="ts">
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <h3 :class="cn('font-semibold leading-none tracking-tight text-card-foreground', props.class)">
    <slot />
  </h3>
</template>
