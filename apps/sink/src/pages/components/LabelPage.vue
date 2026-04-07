<script setup lang="ts">
import { Label, Input } from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <Label for="label-1">Email address</Label>
      <Input
        id="label-1"
        placeholder="you@example.com"
      />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="label-2">Full name</Label>
      <Input
        id="label-2"
        placeholder="Ada Lovelace"
      />
    </div>
  </div>
</template>
