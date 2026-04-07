<script setup lang="ts">
import { TabsContent as RekaTabsContent } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  value: string
}>()
</script>

<template>
  <RekaTabsContent
    :value="props.value"
    :class="cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)"
  >
    <slot />
  </RekaTabsContent>
</template>
