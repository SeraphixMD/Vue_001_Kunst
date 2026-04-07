<script setup lang="ts">
import { buttonVariants } from './Button.variants.ts'
import type { ButtonProps } from './Button.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <button :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)">
    <slot />
  </button>
</template>
