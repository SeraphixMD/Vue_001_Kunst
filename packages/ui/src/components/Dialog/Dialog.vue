<script setup lang="ts">
import { DialogRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  asChild?: boolean
  defaultOpen?: boolean
  modal?: boolean
}>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()
</script>

<template>
  <DialogRoot
    :default-open="props.defaultOpen"
    :modal="props.modal"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </DialogRoot>
</template>
