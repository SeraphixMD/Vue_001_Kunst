<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { Button } from '@kunst/ui'

import { useDark } from './useDark.ts'

const { isDark, toggle } = useDark()
const route = useRoute()
const title = computed(() => {
  const label = route.meta['label']
  return typeof label === 'string' ? label : '@kunst/ui sink'
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="flex items-center justify-between border-b border-border px-6 py-4">
      <div class="flex items-center gap-4">
        <RouterLink
          to="/"
          class="text-sm font-medium"
        >
          @kunst/ui
        </RouterLink>
        <span class="text-sm text-muted-foreground">/</span>
        <span class="text-sm">{{ title }}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        @click="toggle"
      >
        {{ isDark ? 'Light' : 'Dark' }}
      </Button>
    </header>
    <main class="mx-auto max-w-4xl px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>
