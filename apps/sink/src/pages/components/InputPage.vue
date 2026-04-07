<script setup lang="ts">
import { Input, Label } from '@kunst/ui'

const sizes = ['sm', 'default', 'lg'] as const
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      v-for="size in sizes"
      :key="size"
      class="flex flex-col gap-2"
    >
      <Label :for="`input-${size}`">size: {{ size }}</Label>
      <Input
        :id="`input-${size}`"
        :size="size"
        :placeholder="`placeholder (${size})`"
      />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="input-disabled">disabled</Label>
      <Input
        id="input-disabled"
        disabled
        placeholder="cannot edit"
      />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="input-readonly">readonly</Label>
      <Input
        id="input-readonly"
        readonly
        placeholder="readonly value"
      />
    </div>
  </div>
</template>
