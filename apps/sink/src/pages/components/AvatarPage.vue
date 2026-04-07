<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from '@kunst/ui'

const sizes = ['sm', 'default', 'lg'] as const
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        with image
      </h3>
      <div class="flex items-center gap-4">
        <Avatar
          v-for="size in sizes"
          :key="size"
          :size="size"
        >
          <AvatarImage
            src="https://i.pravatar.cc/96?img=12"
            alt="Avatar"
          />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
    </section>
    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        fallback only
      </h3>
      <div class="flex items-center gap-4">
        <Avatar
          v-for="size in sizes"
          :key="size"
          :size="size"
        >
          <AvatarImage
            src=""
            alt="broken"
          />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
      </div>
    </section>
  </div>
</template>
