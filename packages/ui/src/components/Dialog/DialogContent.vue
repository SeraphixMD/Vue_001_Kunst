<script setup lang="ts">
import {
  DialogContent as RekaDialogContent,
  DialogOverlay as RekaDialogOverlay,
  DialogPortal as RekaDialogPortal,
} from 'reka-ui'
import { dialogVariants } from './Dialog.variants.ts'
import type { DialogProps } from './Dialog.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<DialogProps>(), {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <RekaDialogPortal>
    <RekaDialogOverlay
      class="fixed inset-0 z-modal bg-background/80"
    />
    <RekaDialogContent
      :class="cn(dialogVariants({ variant: props.variant, size: props.size }), props.class)"
    >
      <slot />
    </RekaDialogContent>
  </RekaDialogPortal>
</template>
