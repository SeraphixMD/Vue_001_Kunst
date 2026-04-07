<script setup lang="ts">
import { Spinner } from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </div>
  </div>
</template>
