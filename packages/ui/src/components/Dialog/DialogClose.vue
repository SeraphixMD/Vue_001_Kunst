<script setup lang="ts">
import { DialogClose as RekaDialogClose } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  asChild?: boolean
}>()
</script>

<template>
  <RekaDialogClose
    :as-child="props.asChild"
    :class="cn('inline-flex items-center justify-center', props.class)"
  >
    <slot />
  </RekaDialogClose>
</template>
