<script setup lang="ts">
import { ToastRoot } from 'reka-ui'
import type { ToastProps } from './Toast.contract.ts'
import { toastVariants } from './Toast.variants.ts'
import { cn } from '../../utils/cn.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
})
</script>

<template>
  <ToastRoot
    v-bind="$attrs"
    :class="cn(toastVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </ToastRoot>
</template>
