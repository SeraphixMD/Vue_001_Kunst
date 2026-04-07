<script setup lang="ts">
import { Spinner } from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-6">
      <Spinner class="size-3" />
      <Spinner />
      <Spinner class="size-6" />
      <Spinner class="size-8" />
    </div>
  </div>
</template>
