<script setup lang="ts">
import { ToastProvider as RekaToastProvider } from 'reka-ui'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <RekaToastProvider v-bind="$attrs">
    <slot />
  </RekaToastProvider>
</template>
