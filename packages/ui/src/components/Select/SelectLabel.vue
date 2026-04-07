<script setup lang="ts">
import { SelectLabel as RekaSelectLabel } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <RekaSelectLabel :class="cn('py-1.5 pl-8 pr-2 text-sm font-semibold', props.class)">
    <slot />
  </RekaSelectLabel>
</template>
