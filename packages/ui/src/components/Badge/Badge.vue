<script setup lang="ts">
import { badgeVariants } from './Badge.variants.ts'
import type { BadgeProps } from './Badge.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
})
</script>

<template>
  <span :class="cn(badgeVariants({ variant: props.variant }), props.class)">
    <slot />
  </span>
</template>
