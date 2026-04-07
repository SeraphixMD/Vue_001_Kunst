<script setup lang="ts">
import { DialogTrigger as RekaDialogTrigger } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  asChild?: boolean
}>()
</script>

<template>
  <RekaDialogTrigger
    :as-child="props.asChild"
    :class="cn('inline-flex items-center justify-center', props.class)"
  >
    <slot />
  </RekaDialogTrigger>
</template>
