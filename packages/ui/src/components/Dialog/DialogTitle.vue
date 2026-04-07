<script setup lang="ts">
import { DialogTitle as RekaDialogTitle } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <RekaDialogTitle
    :class="cn('text-lg font-semibold text-foreground', props.class)"
  >
    <slot />
  </RekaDialogTitle>
</template>
