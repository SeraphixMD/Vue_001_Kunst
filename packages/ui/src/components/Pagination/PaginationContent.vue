<script setup lang="ts">
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ul :class="cn('flex flex-row items-center gap-0.5', props.class)">
    <slot />
  </ul>
</template>
