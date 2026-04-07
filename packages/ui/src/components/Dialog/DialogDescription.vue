<script setup lang="ts">
import { DialogDescription as RekaDialogDescription } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <RekaDialogDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </RekaDialogDescription>
</template>
