<script setup lang="ts">
import { Button, Spinner } from '@kunst/ui'

const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const sizes = ['sm', 'default', 'lg', 'icon'] as const
</script>

<template>
  <div class="flex flex-col gap-8">
    <section
      v-for="size in sizes"
      :key="size"
    >
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        size: {{ size }}
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <Button
          v-for="v in variants"
          :key="v"
          :variant="v"
          :size="size"
        >
          {{ size === 'icon' ? '+' : v }}
        </Button>
      </div>
    </section>

    <section
      v-for="size in sizes"
      :key="`loading-${size}`"
    >
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        loading / size: {{ size }}
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <Button
          v-for="v in variants"
          :key="v"
          :variant="v"
          :size="size"
          disabled
        >
          <Spinner />
          {{ size === 'icon' ? '' : v }}
        </Button>
      </div>
    </section>
  </div>
</template>
