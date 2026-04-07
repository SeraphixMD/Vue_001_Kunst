<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

import scenarios from '../scenario-manifest.ts'

const router = useRouter()
const components = router.getRoutes()
  .filter((r) => r.meta?.kind === 'component')
  .map((r) => r.meta.label as string)
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <h2 class="mb-4 text-lg font-semibold">
        Components
      </h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="name in components"
          :key="name"
        >
          <RouterLink
            :to="`/components/${name.toLowerCase()}`"
            class="text-primary underline-offset-4 hover:underline"
          >
            {{ name }}
          </RouterLink>
        </li>
      </ul>
    </section>
    <section>
      <h2 class="mb-4 text-lg font-semibold">
        Scenarios
      </h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="s in scenarios"
          :key="s.id"
        >
          <RouterLink
            :to="s.path"
            class="text-primary underline-offset-4 hover:underline"
          >
            {{ s.title }}
          </RouterLink>
          <span class="ml-2 text-xs text-muted-foreground">
            {{ s.components.join(' · ') }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
