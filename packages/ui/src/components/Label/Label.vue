<script setup lang="ts">
import { Label as RekaLabel } from 'reka-ui'
import type { LabelProps } from './Label.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = defineProps<LabelProps>()
</script>

<template>
  <RekaLabel
    :as-child="props.asChild"
    :class="cn(props.class)"
  >
    <slot />
  </RekaLabel>
</template>
