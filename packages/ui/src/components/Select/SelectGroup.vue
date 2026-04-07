<script setup lang="ts">
import { SelectGroup as RekaSelectGroup } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <RekaSelectGroup :class="cn('p-1', props.class)">
    <slot />
  </RekaSelectGroup>
</template>
