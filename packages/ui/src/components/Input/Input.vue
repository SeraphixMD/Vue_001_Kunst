<script setup lang="ts">
import { inputVariants } from './Input.variants.ts'
import type { InputProps } from './Input.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<InputProps>(), {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <input :class="cn(inputVariants({ variant: props.variant, size: props.size }), props.class)">
</template>
