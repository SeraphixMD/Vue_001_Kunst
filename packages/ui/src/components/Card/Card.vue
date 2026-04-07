<script setup lang="ts">
import type { CardProps } from './Card.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = defineProps<CardProps>()
</script>

<template>
  <div :class="cn('rounded-lg border border-border bg-card text-card-foreground shadow-sm', props.class)">
    <slot />
  </div>
</template>
