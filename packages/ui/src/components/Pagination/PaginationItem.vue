<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>

<template>
  <li :class="props.class">
    <slot />
  </li>
</template>
