<script setup lang="ts">
import { PopoverClose as RekaPopoverClose } from 'reka-ui'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <RekaPopoverClose :class="props.class">
    <slot />
  </RekaPopoverClose>
</template>
