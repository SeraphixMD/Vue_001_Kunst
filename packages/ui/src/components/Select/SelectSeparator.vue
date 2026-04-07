<script setup lang="ts">
import { SelectSeparator as RekaSelectSeparator } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <RekaSelectSeparator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
