<script setup lang="ts">
import { AvatarRoot } from 'reka-ui'
import { avatarVariants } from './Avatar.variants.ts'
import type { AvatarProps } from './Avatar.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = withDefaults(defineProps<AvatarProps>(), {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <AvatarRoot :class="cn(avatarVariants({ variant: props.variant, size: props.size }), props.class)">
    <slot />
  </AvatarRoot>
</template>
