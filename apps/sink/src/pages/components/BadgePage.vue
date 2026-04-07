<script setup lang="ts">
import { Badge } from '@kunst/ui'

const variants = ['default', 'secondary', 'destructive', 'outline'] as const
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        variants
      </h3>
      <div class="flex flex-wrap gap-3">
        <Badge
          v-for="v in variants"
          :key="v"
          :variant="v"
        >
          {{ v }}
        </Badge>
      </div>
    </section>
  </div>
</template>
