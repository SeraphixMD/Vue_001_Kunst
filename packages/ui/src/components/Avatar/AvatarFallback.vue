<script setup lang="ts">
import { AvatarFallback as RekaAvatarFallback } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  delayMs?: number
}>()
</script>

<template>
  <RekaAvatarFallback
    v-bind="props.delayMs !== undefined ? { delayMs: props.delayMs } : {}"
    :class="cn('flex h-full w-full items-center justify-center bg-muted text-muted-foreground', props.class)"
  >
    <slot />
  </RekaAvatarFallback>
</template>
