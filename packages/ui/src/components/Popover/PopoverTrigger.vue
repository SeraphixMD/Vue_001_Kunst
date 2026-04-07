<script setup lang="ts">
import { PopoverTrigger as RekaPopoverTrigger } from 'reka-ui'

const props = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <RekaPopoverTrigger :as-child="props.asChild">
    <slot />
  </RekaPopoverTrigger>
</template>
